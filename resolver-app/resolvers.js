var axios = require("axios");
const trigger = require("../lib/http/invoke");

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
      let redata = await trigger.meanHttpCall("post","login", args);
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
      console.log(args)
      let redata = await trigger.meanHttpCall(
        "post",
        "registration",
        args
      );
      logger.info(redata.data);
      return redata;
    } catch (error) {
      logger.error(error);
      console.log(error.response.data)
      ///return { httpError: error.response.data };
      throw new Error(error.response)
    }
  }
};

module.exports = { Query, Mutation };