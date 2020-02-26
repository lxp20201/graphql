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
  },
  getcourse: async (root, args, context, info) => {
    try {
      let redata = await trigger.meanHttpCall(
        "get",
        "/viewcourse?user_id="+args.user_id
      );    
      if (redata.data && redata.data.success == false) {       
        redata.data.error = redata.data.message ;   
        redata.data.message = '' ;
        return redata.data;
      } else {
        return redata.data;
      }
    } catch (error) {
      logger.error(error);
      if (error.response.data && error.response.data.error) {
        error.response.data.message = error.response.data.error;
        return error.response;
      } else {
        throw new Error(error.response.data);
      }
    }
  },
  getcoursebyid: async (root, args, context, info) => {
    try {
      let redata = await trigger.meanHttpCall(
        "get",
        "/viewcoursebyid?user_id="+args.user_id+"&_id="+args._id
      );    
      if (redata.data && redata.data.success == false) {       
        redata.data.error = redata.data.message.status ;   
        redata.data.message = '' ;
        return redata.data;
      } else {
        return redata.data;
      }
    } catch (error) {
      logger.error(error);
      if (error.response.data && error.response.data.error) {
        error.response.data.message = error.response.data.error;
        return error.response;
      } else {
        throw new Error(error.response.data);
      }
    }
  }
};

const Mutation = {
  login: async (root, args, context, info) => {
    try {
      console.log(args);
      let redata = await trigger.meanHttpCall("post", "login", args);
      if (redata.data && redata.data.success == false) {
        return redata.data;
      } else {
        redata.data.csrftoken = redata.data.message[0].token        
        redata.data.username = redata.data.message[0].username;
        redata.data.email = redata.data.message[0].email;
        redata.data._id = redata.data.message[0]._id;
        redata.data.name = redata.data.message[0].name;
        redata.data.is_staff = redata.data.message[0].is_staff; 
        redata.data.is_superuser = redata.data.message[0].is_superuser; 
        redata.data.message = redata.data.message[0].message;  
        return redata.data;
      }
    } catch (error) {
      logger.error(error);
      if (error.response.data && error.response.data.error) {
        error.response.data.message = error.response.data.error;
        return error.response;
      } else {
        throw new Error(error.response.data);
      }
    }
  },
  verifymail: async (root, args, context, info) => {
    try {
      console.log(args)
      let redata = await trigger.meanHttpCall("post", "verifyemail", args);
      console.log(redata.data)
      logger.info(redata);
      return redata;
    } catch (error) {
      console.log(error);
      logger.error(error);
      throw new Error(error.response.data);
    }
  },
  signin: async (root, args, context, info) => {
    try {
      let redata = await trigger.meanHttpCall("post", "registration", args);
      if (redata.data.success == false) {
        logger.info(redata.data);
        if (redata.data.error) {
          return redata;
        } else {
          redata.data.message = "User Account already exist ? Thank You";
          return redata;
        }
      } else {
        logger.info(redata.data);
        return redata;
      }
    } catch (error) {
      logger.error(error);
      console.log(error.response.data);
      ///return { httpError: error.response.data };
      throw new Error(error.response);
    }
  },
  updateUser: async (root, args, context, info) => {
    try {
      let redata = await trigger.meanHttpCall(
        "post",
        "/updateuserstatus",
        args
      );
      logger.info(redata);
      return redata;
    } catch (error) {
      throw new Error(error.response);
    }
  },
  admin_dashboard: async (root, args, context, info) => {
    try {
      let redata = await trigger.meanHttpCall(
        "post",
        "/adminuserdashboard",
        args
      );
      if (redata.data && redata.data.success == false) {
        redata.data.error = redata.data.message;
        redata.data.message = [];
        return redata.data;
      } else {
        return redata.data;
      }
    } catch (error) {
      logger.error(error);
      if (error.response.data && error.response.data.error) {
        error.response.data.message = error.response.data.error;
        return error.response;
      } else {
        throw new Error(error.response.data);
      }
    }
  },
  confirmpassword: async (root, args, context, info) => {
    try {
      let redata = await trigger.meanHttpCall(
        "post",
        "/passwordencrypt",  
        args
      );
      if (redata.data && redata.data.success == false) {
        return redata.data;
      } else {
        return redata.data;
      }
    } catch (error) {
      logger.error(error);
      if (error.response.data && error.response.data.error) {
        error.response.data.message = error.response.data.error;
        return error.response;
      } else {
        throw new Error(error.response.data);
      }
    }
  },
  resetpassword: async (root, args, context, info) => {
    try {
      let redata = await trigger.meanHttpCall(
        "post",
        "/forgotpassword",  
        args
      );
      if (redata.data && redata.data.success == false) {       
        return redata.data;
      } else {
        return redata.data;
      }
    } catch (error) {
      logger.error(error);
      if (error.response.data && error.response.data.error) {
        error.response.data.message = error.response.data.error;
        return error.response;
      } else {
        throw new Error(error.response.data);
      }
    }
  },
  checklinkstatus: async (root, args, context, info) => {
    try {
      let redata = await trigger.meanHttpCall(
        "post",
        "/checklinkstatus",  
        args
      );
      if (redata.data && redata.data.success == false) {       
        return redata.data;
      } else {
        return redata.data;
      }
    } catch (error) {
      logger.error(error);
      if (error.response.data && error.response.data.error) {
        error.response.data.message = error.response.data.error;
        return error.response;
      } else {
        throw new Error(error.response.data);
      }
    }
  },
  coursecreation: async (root, args, context, info) => {
    try {
      let redata = await trigger.meanHttpCall(
        "post",
        "/addcourse",  
        args
      );
      if (redata.data && redata.data.success == false) {  
        redata.data.error = redata.data.message ;   
        redata.data.message = '' ;
        return redata.data;
      } else {
        return redata.data;
      }
    } catch (error) {
      logger.error(error);
      if (error.response.data && error.response.data.error) {
        error.response.data.message = error.response.data.error;
        return error.response;
      } else {
        throw new Error(error.response.data);
      }
    }
  },
  enrollcourse: async (root, args, context, info) => {
    try {
      let redata = await trigger.meanHttpCall(
        "post",
        "/enrollcourse",  
        args
      );
      if (redata.data && redata.data.success == false) { 
        return redata.data;
      } else {
        return redata.data;
      }
    } catch (error) {
      logger.error(error);
      if (error.response.data && error.response.data.error) {
        error.response.data.message = error.response.data.error;
        return error.response;
      } else {
        throw new Error(error.response.data);
      }
    }
  }
};

module.exports = { Query, Mutation };
