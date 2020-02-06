let openedx_instance = {
    baseURL: process.env.openedx,
    // timeout: 50000000,
    headers: { 'Content-Type':'application/x-www-form-urlencoded' }   //'Accept': 'application/json',
           };
  let mean_instance = {
    baseURL: process.env.meanstack,
    timeout: 500000,
    headers: { "Content-Type": "application/json" }
  };
  module.exports={
    openedx_instance,
    mean_instance
  }