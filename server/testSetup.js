/* eslint-disable no-var*/
process.env.NODE_ENV = "test";

require("babel-register")();

require.extensions[".css"] = function() {
  return null;
};
require.extensions[".png"] = function() {
  return null;
};
require.extensions[".jpg"] = function() {
  return null;
};

const jsdom = require("jsdom").jsdom;
const exposedProperties = ["window", "navigator", "document"];

global.document = jsdom("");
global.window = document.defaultView;
Object.keys(document.defaultView).forEach(property => {
  if (typeof global[property] === "undefined") {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});

global.navigator = {
  userAgent: "node.js"
};

documentRef = document; //eslint-disable-line no-undef
