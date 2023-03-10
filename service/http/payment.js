import axios from "axios";
import { API_URL } from "../constants";

const DEFAULT_PLATFORM = "STRIPE";
const DEFAULT_ACTION = "CREATE_SPIRITUS";

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
export async function GetCouponProduct(accessToken, coupon) {
  return await axios.get(
    `${API_URL}/v2/payment/package/coupon?platform=${DEFAULT_PLATFORM}&action=${DEFAULT_ACTION}&coupon=${coupon}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
}


export async function CheckoutSpiritus(accessToken, spiritusId, productId, coupon) {
  let url = `${API_URL}/wapi/order/spiritus/${spiritusId}?service=${DEFAULT_PLATFORM}&packageId=${productId}`
  if (coupon) {
    url = `${API_URL}/wapi/order/spiritus/${spiritusId}?service=${DEFAULT_PLATFORM}&packageId=${productId}&coupon=${coupon}`
  }

  return await axios.post(
    url,
    null,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
}
