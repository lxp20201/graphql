const axiosConfig = require('../../lib/http/axios').openedx_instance;
const meanConfig = require('../../lib/http/axios').mean_instance;
var httpReq = require("request");
const axios = require("axios");
const qs = require('querystring')

module.exports = {
    makeHTTPRequest: function(options, callback, errorCallback) {
        options.gzip = true;
        options.timeout = "1200000";
        httpReq = require("request");
        httpReq(options, function(error, response, body) {
          if (!error && response.statusCode == 200) {
            if (body === "") {
              callback({ message: "no result found" });
            } else {
              var info = JSON.parse(body);
              callback(info);
            }
          } else {
            callback({ error: true, message: body != "" ? body : error }, null);
          }
        });
      },
  makeHttpCall: async function(method, url, postParam) {
    switch (method) {
      case "get":
        return await this.makeGetCall(url);
        break;
      case "post":
        return await this.makePostCall(url, postParam);
        break;
      case "put":
        return await this.makePutCall(url, postParam);
        break;
      case "patch":
        return await this.makePatchCall(url, postParam);
        break;
    }
  },
  makeGetCall: async function(url, postParam) {
    let config = axiosConfig;
    return  axios.get(url, config);
  },
  makePostCall: async function(url, postParam) {
    let config = axiosConfig;
    return await axios.post(url, qs.stringify(postParam), config)
},
  makePutCall: async function(url, postParam) {
    let config = axiosConfig;
    return await axios.put(url, postParam, config);  
  },
  makePatchCall: async function(url, postParam) {
    let config = axiosConfig;
    return await axios.patch(url, postParam, config);
  },
  meanHttpCall: async function(method, url, postParam) {
    switch (method) {
      case "get":
        return await this.meanGetCall(url);
        break;
      case "post":
        return await this.meanPostCall(url, postParam);
        break;
      case "put":
        return await this.meanPutCall(url, postParam);
        break;
      case "patch":
        return await this.meanPatchCall(url, postParam);
        break;
    }
  },
  meanGetCall: async function(url, postParam) {
    let config = meanConfig;
    return  axios.get(url, config);
  },
  meanPostCall: async function(url, postParam) {
    let config = meanConfig;
    return await axios.post(url, postParam, config);
  },
  meanPutCall: async function(url, postParam) {
    let config = meanConfig;
    return await axios.put(url, postParam, config);
  },
  meanPatchCall: async function(url, postParam) {
    let config = meanConfig;
    return await axios.patch(url, postParam, config);
  }
}