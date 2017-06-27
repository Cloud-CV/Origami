import request from "superagent";
const appConfig = require("../../../outCalls/config");
import { baseURL } from "./baseURL";
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export function deleteComponentDeployed(userid, repoId, type) {
  let URL = `${baseURL}/api/${type}component/${userid}/${repoId}`;
  return new Promise((resolve, reject) => {
    request.delete(URL)
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
