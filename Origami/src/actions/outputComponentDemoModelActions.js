import * as types from "./actionTypes";
import { getComponentDeployed } from "../api/CommonLocal/getComponentDeployed";
import { addComponentDeployed } from "../api/CommonLocal/addComponentDeployed";
import {
  modifyComponentDeployed
} from "../api/CommonLocal/modifyComponentDeployed";
import {
  deleteComponentDeployed
} from "../api/CommonLocal/deleteComponentDeployed";

export function updateOutputComponentModelSuccess(model) {
  return { type: types.ADD_OUTPUT_COMPONENT_DEMO_MODEL_SUCCESS, model };
}

export function killOutputComponentModelSuccess() {
  return { type: types.KILL_OUTPUT_COMPONENT_DEMO_MODEL_SUCCESS };
}

export function updateOutputComponentModel(newModelData) {
  return function(dispatch) {
    return new Promise((resolve, reject) => {
      getComponentDeployed(
        newModelData.user_id,
        newModelData.id,
        "output"
      ).then(data => {
        if (JSON.parse(data).text !== "Not Found") {
          modifyComponentDeployed(newModelData.user_id, newModelData, "output")
            .then(() => {
              dispatch(updateOutputComponentModelSuccess(newModelData));
              resolve("dispatched output component model update call");
            })
            .catch(err => {
              reject("cannot dispatch output component model update call");
            });
        } else {
          addComponentDeployed(newModelData.user_id, newModelData, "output")
            .then(() => {
              dispatch(updateOutputComponentModelSuccess(newModelData));
              resolve("dispatched output component model update call");
            })
            .catch(err => {
              reject("cannot dispatch output component model update call");
            });
        }
      });
    });
  };
}

export function killOutputComponentModel(user_id, repoId) {
  return function(dispatch) {
    return new Promise((reject, resolve) => {
      deleteComponentDeployed(user_id, repoId, "output").then(() => {
        dispatch(killOutputComponentModelSuccess());
      });
    });
  };
}
