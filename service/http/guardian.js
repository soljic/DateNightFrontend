import axios from "axios";

import { API_URL } from "../constants";

export async function AddSpiritusGuardian(
  accessToken,
  spiritusId,
  guardianCode
) {
  return await axios.put(
    `${API_URL}/wapi/spiritus/${spiritusId}/guardian?code=${guardianCode}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
}

export async function DeleteSpiritusGuardian(
  accessToken,
  spiritusId,
  guardianUserId
) {
  return await axios.put(
    `${API_URL}/wapi/spiritus/${spiritusId}/guardian/${guardianUserId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
}
