import request from "superagent";
const appConfig = require("../../../outCalls/config");
import { baseURL } from "./baseURL";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export function addComponentDeployed(user_id, componentData, type) {
  let URL = `${baseURL}/api/${type}component/${user_id}`;
  return new Promise((resolve, reject) => {
    request
      .post(URL)
      .send(componentData)
      .set("Content-Type", "application/json")
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
