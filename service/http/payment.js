import axios from "axios";
import { API_URL } from "../constants";

const DEFAULT_PLATFORM = "STRIPE";
const DEFAULT_ACTION = "CREATE_SPIRITUS";

// Get the default product (price and metadata for purchasing a single spiritus)
export async function GetDefaultProduct(accessToken, id) {
  return await axios.get(
    `${API_URL}/v2/payment/package/default?platform=${DEFAULT_PLATFORM}&action=${DEFAULT_ACTION}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  // `/api/checkout/${spiritusId}?service=${DEFAULT_PLATFORM}&packageId=${productId}/`,
}

export async function CheckoutSpiritus(accessToken, spiritusId, productId) {
  return await axios.post(
    `${API_URL}/wapi/order/spiritus/${spiritusId}?service=${DEFAULT_PLATFORM}&packageId=${productId}`,
    // `/api/checkout/${spiritusId}?service=${DEFAULT_PLATFORM}&packageId=${productId}`,
    null,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
}
