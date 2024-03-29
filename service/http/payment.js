import axios from "axios";

import { API_URL } from "../constants";

const DEFAULT_PLATFORM = "STRIPE";

export const CLAIM_SPIRITUS_ACTION = "CLAIM_SPIRITUS";
export const CREATE_SPIRITUS_ACTION = "CREATE_SPIRITUS";
export const UPGRADE_SUBSCRIPTION_ACTION = "LIFETIME_TRANSFER";

export const SUPPORTED_ACTIONS = [
  CLAIM_SPIRITUS_ACTION,
  CREATE_SPIRITUS_ACTION,
  UPGRADE_SUBSCRIPTION_ACTION,
];

export const PAYMENT_MODE_LIFETIME = "LIFETIME";
export const PAYMENT_MODE_SUBSCRIPTION = "SUBSCRIPTION";

// fetch products from stripe
// returns lifetime, subscription and a list of other products that
// also includes lifetime and subscription.
// If selected action is UPGRADE_SUBSCRIPTION_ACTION, subscription product will be null.
export async function GetLocalizedProducts(
  accessToken,
  action,
  currency,
  lang
) {
  let lifetimeProduct = null;
  let subscriptionProduct = null;
  let allProducts = [];

  const res = await GetProducts(accessToken, action, currency, lang);
  if (!res?.data?.stripePackages) {
    throw new Error("no checkout packages found");
  }

  if (action === UPGRADE_SUBSCRIPTION_ACTION) {
    lifetimeProduct = res?.data;
    return {
      lifetime: lifetimeProduct,
      subscription: null,
      allProducts: [lifetimeProduct],
    };
  }

  allProducts = res?.data.stripePackages || [];
  // get first occurence of lifetime and subscription product
  for (const product of allProducts) {
    if (product.mode === PAYMENT_MODE_LIFETIME) {
      lifetimeProduct = product;
      continue;
    }
    if (product.mode === PAYMENT_MODE_SUBSCRIPTION) {
      subscriptionProduct = product;
      continue;
    }

    if (lifetimeProduct && subscriptionProduct) {
      break;
    }
  }

  // both plans must be available to proceed
  if (!lifetimeProduct || !subscriptionProduct) {
    throw new Error("missing lifetime or subscription product");
  }

  return {
    lifetime: lifetimeProduct,
    subscription: subscriptionProduct,
    allProducts,
  };
}

// Get available products for action type, currency and language
export async function GetProducts(accessToken, action, currency, lang) {
  return await axios.get(
    `${API_URL}/v2/payment/package/default?platform=${DEFAULT_PLATFORM}&action=${action}&currency=${
      currency || "eur"
    }`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Accept-Language": lang ? lang : "en",
      },
    }
  );
}

// Get the coupon price for product (price and metadata for purchasing a single spiritus)
export async function GetCouponProduct(
  accessToken,
  action,
  coupon,
  currency,
  lang
) {
  return await axios.get(
    `${API_URL}/v2/payment/package/coupon?platform=${DEFAULT_PLATFORM}&action=${action}&coupon=${coupon}&currency=${
      currency || "eur"
    }`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Accept-Language": lang ? lang : "en",
      },
    }
  );
}

export async function CheckoutSpiritus(
  accessToken,
  spiritusId,
  productId,
  coupon,
  lang
) {
  let url = `${API_URL}/wapi/order/spiritus/${spiritusId}?service=${DEFAULT_PLATFORM}&packageId=${productId}`;
  if (coupon) {
    url = `${API_URL}/wapi/order/spiritus/${spiritusId}?service=${DEFAULT_PLATFORM}&packageId=${productId}&coupon=${coupon}`;
  }

  return await axios.post(url, null, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Accept-Language": lang ? lang : "en",
    },
  });
}

export async function UpgradeSpiritus(
  accessToken,
  spiritusId,
  productId,
  coupon,
  lang
) {
  let url = `${API_URL}/wapi/order/spiritus/lifetime/${spiritusId}?service=${DEFAULT_PLATFORM}&packageId=${productId}`;
  if (coupon) {
    url = `${API_URL}/wapi/order/spiritus/lifetime/${spiritusId}?service=${DEFAULT_PLATFORM}&packageId=${productId}&coupon=${coupon}`;
  }

  return await axios.post(url, null, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Accept-Language": lang ? lang : "en",
    },
  });
}

export async function ClaimSpiritus(
  accessToken,
  spiritusId,
  productId,
  coupon,
  lang
) {
  let url = `${API_URL}/wapi/spiritus/${spiritusId}/claim?service=${DEFAULT_PLATFORM}&packageId=${productId}`;
  if (coupon) {
    url = `${API_URL}/wapi/spiritus/${spiritusId}/claim?service=${DEFAULT_PLATFORM}&packageId=${productId}&coupon=${coupon}`;
  }

  return await axios.post(url, null, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Accept-Language": lang ? lang : "en",
    },
  });
}

export async function PricingPageInfo(lang) {
  return await axios.get(`${API_URL}/v2/payment/package/default/info`, {
    headers: {
      "Accept-Language": lang ? lang : "en",
    },
  });
}
