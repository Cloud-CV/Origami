import request from "superagent";
const appConfig = require("../../../outCalls/config");
import { baseURL } from "../CommonLocal/baseURL";

export function modifyDeployed(repoData) {
  let URL = `${baseURL}/api/githubdemomodel/${repoData.id}`;
  return new Promise((resolve, reject) => {
    request
      .put(URL)
      .send(repoData)
      .set("Content-Type", "application/json")
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
