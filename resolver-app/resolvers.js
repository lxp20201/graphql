var axios = require("axios");
const trigger = require("../lib/http/invoke");
const db = require("../db");
var logger = require("../logger/logger");

const Query = {
  user: async () => {
    try {
      let redata = await trigger.makeHttpCall(
        "get",
        "/api/courses/v1/courses/"
      );
      logger.info(redata.data.results);
      return redata.data.results;
    } catch (error) {
      logger.error(error);
      return { httpError: error };
    }
  }
};

const Mutation = {
  login: async (root, args, context, info) => {
    try {
      let redata = await trigger.makeHttpCall("post","/user_api/v1/account/login_session/", args);
      var token=redata.headers['set-cookie']
      redata.headers.setcookie = token;
      return redata;
    } catch (error) {
      logger.error(error);
        throw new Error(error.response.data)
    }
  },  
  verifymail: async (root, args, context, info) => {
    try {
      let redata = await trigger.meanHttpCall("post", "/verifyemail", args);
      logger.info(redata);
      return redata;
    } catch (error) {
      logger.error(error);
      return { httpError: error };
    }
  },
  signin: async (root, args, context, info) => {
    try {
      let redata = await trigger.makeHttpCall(
        "post",
        "/user_api/v1/account/registration",
        args
      );
      logger.info(redata.data);
      return redata;
    } catch (error) {
      logger.error(error);
      return { httpError: error };
    }
  }
};

module.exports = { Query, Mutation };