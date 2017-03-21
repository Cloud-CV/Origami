import Nonghdemomodel from "../data/nonghdemomodel";
import express from "express";

let router = express.Router();
router
  .route("/:userid/:id?")
  .get(getNonGHDemoModel)
  .post(addNonGHDemoModel)
  .put(updateNonGHDemoModel)
  .delete(deleteNonGHDemoModel);

function getNonGHDemoModel(req, res) {
  const id = req.params.id;
  const userid = req.params.userid;
  if (id) {
    Nonghdemomodel.find({ id, userid }, (err, singlemodel) => {
      if (err) {
        res.send(err);
      } else {
        res.json(singlemodel);
      }
    });
  } else {
    Nonghdemomodel.find({ userid }, (err, model) => {
      if (err) {
        res.send(err);
      } else {
        res.json(model);
      }
    });
  }
}

function addNonGHDemoModel(req, res) {
  const newModel = new Nonghdemomodel(Object.assign({}, req.body));
  newModel.save(err => {
    if (err) {
      res.send(err);
    } else {
      res.json(newModel);
    }
  });
}

function updateNonGHDemoModel(req, res) {
  const id = req.params.id;
  const userid = req.params.userid;
  Nonghdemomodel.find({ id, userid }, (err, singlemodel) => {
    if (err) {
      res.send(err);
    } else {
      Nonghdemomodel.update(
        { id, userid },
        req.body,
        { multi: false },
        (err, updatedmodel) => {
          if (err) {
            res.send(err);
          } else {
            res.json(updatedmodel);
          }
        }
      );
    }
  });
}

function deleteNonGHDemoModel(req, res) {
  const id = req.params.id;
  const userid = req.params.userid;
  Nonghdemomodel.remove({ id, userid }, (err, removed) => {
    if (err) {
      res.send(err);
    } else {
      res.json(removed);
    }
  });
}

export default router;
