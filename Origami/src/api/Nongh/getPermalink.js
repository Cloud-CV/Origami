import request from "superagent";
const appConfig = require("../../../outCalls/config");
import { baseURL } from "../CommonLocal/baseURL";

export function getPermalinkFromShortURL(shorturl) {
  let URL = `${baseURL}/api/getpermalink/${shorturl}`;
  return new Promise((resolve, reject) => {
    request
      .get(URL)
      .set("Accept", "application/json")
      .end((err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res.text);
        }
      });
  });
}
