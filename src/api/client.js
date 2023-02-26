const apiKey = "PBknlDMOSUux9sEyo0ivKtma64f13FVR"
const headers = {
  "Content-Type": "application/json",
  "X-Api-Key": apiKey,
}
const baseUrl = "https://api.intern.d-tt.nl/api"

export default {
  get(url) {
    return fetch(baseUrl + url, { headers })
      .then(response => Promise.resolve(response.json()))
      .catch(error => Promise.reject(error))
  },

  post(url, body) {
    const requestOptions = {
      method: "POST",
      headers: headers,
      body: JSON.stringify( body )
    }
    return fetch(baseUrl + url, requestOptions)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error))
  },
};