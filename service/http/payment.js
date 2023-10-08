import axios from "axios";

import { API_URL } from "../constants";

const DEFAULT_PLATFORM = "STRIPE";
const DEFAULT_ACTION = "CREATE_SPIRITUS";
export const CLAIM_SPIRITUS_ACTION = "CLAIM_SPIRITUS";
export const CREATE_SPIRITUS_ACTION = "CREATE_SPIRITUS";

export const PAYMENT_MODE_LIFETIME = "LIFETIME";
export const PAYMENT_MODE_SUBSCRIPTION = "SUBSCRIPTION";

// Get the default product (price and metadata for purchasing a single spiritus)
export async function GetDefaultProduct(accessToken) {
  return await axios.get(
    `${API_URL}/v2/payment/package/default?platform=${DEFAULT_PLATFORM}&action=${DEFAULT_ACTION}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
}

// Get the coupon price for product (price and metadata for purchasing a single spiritus)
export async function GetCouponProduct(accessToken, action, coupon) {
  return await axios.get(
    `${API_URL}/v2/payment/package/coupon?platform=${DEFAULT_PLATFORM}&action=${action}&coupon=${coupon}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
}

export async function CheckoutSpiritus(
  accessToken,
  spiritusId,
  productId,
  coupon
) {
  let url = `${API_URL}/wapi/order/spiritus/${spiritusId}?service=${DEFAULT_PLATFORM}&packageId=${productId}`;
  if (coupon) {
    url = `${API_URL}/wapi/order/spiritus/${spiritusId}?service=${DEFAULT_PLATFORM}&packageId=${productId}&coupon=${coupon}`;
  }

  return await axios.post(url, null, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

export async function GetClaimSpiritusProduct(accessToken) {
  return await axios.get(
    `${API_URL}/v2/payment/package/default?platform=${DEFAULT_PLATFORM}&action=${CLAIM_SPIRITUS_ACTION}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
}

export async function ClaimSpiritus(
  accessToken,
  spiritusId,
  productId,
  coupon
) {
  let url = `${API_URL}/wapi/spiritus/${spiritusId}/claim?service=${DEFAULT_PLATFORM}&packageId=${productId}`;
  if (coupon) {
    url = `${API_URL}/wapi/spiritus/${spiritusId}/claim?service=${DEFAULT_PLATFORM}&packageId=${productId}&coupon=${coupon}`;
  }

  return await axios.post(url, null, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}
