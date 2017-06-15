import * as types from "./actionTypes";
import { getComponentDeployed } from "../api/CommonLocal/getComponentDeployed";
import { addComponentDeployed } from "../api/CommonLocal/addComponentDeployed";
import {
  modifyComponentDeployed
} from "../api/CommonLocal/modifyComponentDeployed";
import {
  deleteComponentDeployed
} from "../api/CommonLocal/deleteComponentDeployed";

export function updateInputComponentModelSuccess(model) {
  return { type: types.ADD_INPUT_COMPONENT_DEMO_MODEL_SUCCESS, model };
}

export function killInputComponentModelSuccess() {
  return { type: types.KILL_INPUT_COMPONENT_DEMO_MODEL_SUCCESS };
}

export function updateInputComponentModel(newModelData) {
  return function(dispatch) {
    return new Promise((resolve, reject) => {
      getComponentDeployed(
        newModelData.userid,
        newModelData.id,
        "input"
      ).then(data => {
        if (JSON.parse(data).length > 0) {
          modifyComponentDeployed(newModelData.userid, newModelData, "input")
            .then(() => {
              dispatch(updateInputComponentModelSuccess(newModelData));
              resolve("dispatched input component model update call");
            })
            .catch(err => {
              reject("cannot dispatch input component model update call");
            });
        } else {
          addComponentDeployed(newModelData.userid, newModelData, "input")
            .then(() => {
              dispatch(updateInputComponentModelSuccess(newModelData));
              resolve("dispatched input component model update call");
            })
            .catch(err => {
              reject("cannot dispatch input component model update call");
            });
        }
      });
    });
  };
}

export function killInputComponentModel(userid, repoId) {
  return function(dispatch) {
    return new Promise((reject, resolve) => {
      deleteComponentDeployed(userid, repoId, "input").then(() => {
        dispatch(killInputComponentModelSuccess());
      });
    });
  };
}
