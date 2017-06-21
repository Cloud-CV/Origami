import * as types from "./actionTypes";
import { addDeployed } from "../api/GithubLocal/addDeployed";
import { getDeployed } from "../api/GithubLocal/getDeployed";
import { modifyDeployed } from "../api/GithubLocal/modifyDeployed";
import { deleteDeployed } from "../api/GithubLocal/deleteDeployed";

export function updateGithubDemoModelSuccess(model) {
  return { type: types.BUILD_NEW_GITHUB_DEMO_MODEL_SUCCESS, model };
}

export function killGithubDemoModelSuccess() {
  return { type: types.KILL_GITHUB_DEMO_MODEL_SUCCESS };
}

export function addToDBGithubDemoModel(newModelData) {
  return function(dispatch) {
    return new Promise((resolve, reject) => {
      getDeployed(newModelData.id).then(data => {
        if (JSON.parse(data).length > 0) {
          modifyDeployed(newModelData)
            .then(data => {
              resolve("dispatched github model update call");
            })
            .catch(err => {
              reject("cannot dispatch github model update call, DB failed");
            });
        } else {
          addDeployed(newModelData)
            .then(data => {
              resolve("dispatched github model update call");
            })
            .catch(err => {
              reject("cannot dispatch github model update call, DB failed");
            });
        }
      });
    });
  };
}

export function updateGithubDemoModel(newModelData) {
  return function(dispatch) {
    return new Promise((resolve, reject) => {
      dispatch(updateGithubDemoModelSuccess(newModelData));
      resolve("dispatched github model update call");
    });
  };
}

export function killGithubDemoModel(repoId) {
  return function(dispatch) {
    return new Promise((resolve, reject) => {
      deleteDeployed(repoId)
        .then(() => {
          dispatch(killGithubDemoModelSuccess());
          resolve("dispatched github demo kill call");
        })
        .catch(err => {
          reject("cannot dispatch github demo kill call, DB failed");
        });
    });
  };
}
