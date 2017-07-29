import request from "superagent";
const appConfig = require("../../../outCalls/config");
import { baseURL } from "../CommonLocal/baseURL";

export function getSearchedDemos(search_by, search_term) {
  let URL = `${baseURL}/api/demos/?search_by=${search_by}&search_term=${search_term}`;
  return new Promise((resolve, reject) => {
    request.get(URL).set("Accept", "application/json").end((err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res.text);
      }
    });
  });
}
