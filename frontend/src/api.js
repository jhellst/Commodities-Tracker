// const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";
// const BASE_URL = "http://localhost:5001";

const BASE_URL = process.env.REACT_APP_BACKEND_SERVICE_URL;
console.log("BASE_URL@@@", BASE_URL);


/** API Class.
 *
 * Static class that enables frontend to retrieve/update data from the backend database.
 *
 */
class CommoditiesTrackerApi {
  // Token to be authorize backend requests on protected routes.
  static token = "";

  static async request(endpoint, data = {}, method = "GET") {
    console.log("API REQUEST", endpoint, "data", data, "method", method);
    const url = new URL(`${BASE_URL}/${endpoint}`);
    console.log("Request@", endpoint, CommoditiesTrackerApi.token);
    const headers = {
      authorization: `Bearer ${CommoditiesTrackerApi.token}`,
      'content-type': 'application/json',
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Origin': `${BASE_URL}`,
    };

    // set to undefined since the body property cannot exist on a GET method.
    const body = (method !== "GET")
      ? JSON.stringify(data)
      : undefined;
    const resp = await fetch(url, { method, body, headers });

    //fetch API does not throw an error, have to dig into the resp for msgs
    if (!resp.ok) {
      // console.error("API Error:", resp.statusText, resp.status);
      const { error } = await resp.json();
      throw Array.isArray(error) ? error : [error];
    }

    return await resp.json();
  }



  /** Get all commodities in the database. */
  static async getCommodities() {
    let commodities = await this.request(`commodities`);
    console.log("commodities@api", commodities);
    return commodities;
  }

/** Retrieve historical data for specified ticker symbol from database. */
  static async getCommodityHistoricalData(tickerSymbol) {
    let commodityHistoricalData = await this.request(`commodities/${tickerSymbol}`);
    console.log("commodityHistoricalData@api", commodityHistoricalData);
    return commodityHistoricalData;
  }

  /** Get all custom indices in the database. */
  static async getCustomIndices() {
    let customIndices = await this.request(`custom_indices`);
    return customIndices;
  }

  /** Get a single custom index from the database. */
  static async getCustomIndex(id) {
    let customIndex = await this.request(`custom_indices/${id}`);
    return customIndex;
  }

    /** Get all commodities followed by current user. */
    static async getFollowedCommodities(user_id) {
      let followedCommodities = await this.request(`users/${user_id}/commodities`);
      return followedCommodities;
    }









  /** Registers user via signup form. */
  static async registerUser(userRegisterInfo) {
    const res = await this.request('register', userRegisterInfo, "POST");
    return res;
  }

  /** Log in existing user via login form. */
  static async loginUser(userLoginInfo) {
    const res = await this.request('login', userLoginInfo, "POST");
    return res;
  }

  /** Returns user info (username, user_id) for a user. */
  static async getUserInfo(user_id) {
    const res = await this.request(`users/${user_id}`);
    return res;
  }

  /** Returns token for a valid user. */
  static async getToken(username) {
    // const res = await this.request(`users/${user_id}/token`);
    const res = await this.request(`token/${username}`);
    return res;
  }

}

export default CommoditiesTrackerApi;