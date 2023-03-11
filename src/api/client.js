import axios from "axios";

const apiKey = "PBknlDMOSUux9sEyo0ivKtma64f13FVR";
const headers = {
  "Content-Type": "application/json",
  "X-Api-Key": apiKey,
};
const baseUrl = "https://api.intern.d-tt.nl/api";

export default {
  get(url) {
    return axios.get(baseUrl + url, { headers })
      .then((response) => Promise.resolve(response.data))
      .catch((error) => Promise.reject(error));
  },


 async post(url, body) {
  try {
    const response = await axios.post(baseUrl + url, body, { headers })
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
},

  edit(url, data) {
    const requestUrl = `${baseUrl}${url}/${data.id}`;
    return axios.post(requestUrl, data.body, { headers })
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  },

  delete(url, id) {
    const requestUrl = `${baseUrl}${url}/${id}`;
    return axios.delete(requestUrl, { headers })
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  },

  upload(url, data) {
    const requestUrl = `${baseUrl}${url}/${data.id}/upload`;
    const formData = new FormData();
    formData.append("file", data.body);
    return axios.post(requestUrl, formData, {
      headers: {
        ...headers,
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  },
};
