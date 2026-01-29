async function fetchAccessToken({ clientId, clientSecret, api }) {
  try {
    const auth = window.nodeAPI.toBase64(`${clientId}:${clientSecret}`);

    const response = await window.api.fetch({
      url: `${api}/v1/oauth2/token`,
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "grant_type=client_credentials",
    });
    console.log(response.access_token);
    return response.access_token;
  } catch (error) {
    console.error("Error getting PayPal access token:", error);
    throw error;
  }
}

export const paypal = (options) => {
  const post = async (url, opts = {}) => {
    const { body } = opts;
    const clientId = options.clientId;
    const clientSecret = options.clientSecret;
    const api = options.api;

    const token = await fetchAccessToken({ clientId, clientSecret, api });
    return window.api.fetch({
      url: `${api}${url}`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      ...(body ? { body: JSON.stringify(body) } : {}),
    });
  };

  const get = async (url) => {
    const clientId = options.clientId;
    const clientSecret = options.clientSecret;
    const api = options.api;
    const token = await fetchAccessToken({ clientId, clientSecret, api });
    return window.api.fetch({
      url: `${api}${url}`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  };

  const createMetric = ({
    name,
    code,
    type,
    description,
    aggregation_type,
    field_filters,
  }) => {
    return post("/v1/commerce/billing/metrics", {
      body: {
        name,
        code,
        type,
        description,
        aggregation_type,
        field_filters,
      },
    });
  };

  const activateUsageBasedBilling = async () => {
    const res = await post("/v1/commerce/billing/activate");
    console.log({ res });
    return res;
  };

  return {
    activateUsageBasedBilling,
    post,
    get,
    createMetric,
  };
};
