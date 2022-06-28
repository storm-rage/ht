let config = {
  _baseURL: process.env.VUE_APP_BASE_URL,
  set baseURL(val) {
    this._baseURL = val;
  },
  get baseURL() {
    return this._baseURL
  }
}
export default config;
