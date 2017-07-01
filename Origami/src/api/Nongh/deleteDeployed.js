import request from "superagent";
const appConfig = require("../../../outCalls/config");
import { baseURL } from "../CommonLocal/baseURL";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export function deleteDeployed(userid, id) {
  let URL = `${baseURL}/api/demo/${userid}/${id}`;
  return new Promise((resolve, reject) => {
    request
      .delete(URL)
      .set("Accept", "application/json")
      .set("X-CSRFToken", cookies.get("csrftoken"))
      .end((err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res.text);
        }
      });
  });
}
