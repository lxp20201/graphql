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
      console.log(args)
      let redata = await trigger.meanHttpCall("post","login", args);
      if(redata.data && redata.data.success==false){
        return redata;
      }else{
        var token=redata.data.token['set-cookie']
        redata.data.token = token[0];
        return redata;
      }
    } catch (error) {
      logger.error(error);
      if(error.response.data&& error.response.data.error){
        error.response.data.message=error.response.data.error
        return error.response;
      }else{
        throw new Error(error.response.data)
      }
     
       
    }
  },  
  verifymail: async (root, args, context, info) => {
    try {
      let redata = await trigger.meanHttpCall("post", "/verifyemail", args);
      logger.info(redata);
      return redata;
    } catch (error) {
      logger.error(error);
      throw new Error(error.response.data)
    }
  },
  signin: async (root, args, context, info) => {
    try {
    
      let redata = await trigger.meanHttpCall(
        "post",
        "registration",
        args
      );
      if(redata.data.success==false){
        logger.info(redata.data);
        if(redata.data.error){
          return redata
        }else{
          redata.data.message='User Account already exist ? Thank You'
          return redata
        }
        
      }else{
        logger.info(redata.data);
        return redata;
      }
      
    } catch (error) {
      logger.error(error);
      console.log(error.response.data)
      ///return { httpError: error.response.data };
      throw new Error(error.response)
    }
  },
  updateUser: async (root, args, context, info) => {
    try {
      let redata = await trigger.meanHttpCall("post", "/updateuserstatus", args);
      logger.info(redata);
      return redata;
    } catch (error) {
      throw new Error(error.response)
    }
  }
};

module.exports = { Query, Mutation };