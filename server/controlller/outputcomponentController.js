import * as mongoose from 'mongoose';
import Outputcomponentmodel from '../data/outputcomponentmodel';
import express from 'express';

let router = express.Router();
router.route('/:userid/:id?')
  .get(getOutputComponentModel)
  .post(addOutputComponentModel)
  .put(updateOutputComponentModel)
  .delete(deleteOutputComponentModel);

function getOutputComponentModel(req, res) {
  const id = req.params.id;
  const userid = req.params.userid;
  if (id) {
    Outputcomponentmodel.find({ id, userid }, (err, singlemodel) => {
      if (err) {
        res.send(err);
      } else {
        res.json(singlemodel);
      }
    });
  } else {
    Outputcomponentmodel.find({ userid }, (err, model) => {
      if (err) {
        res.send(err);
      } else {
        res.json(model);
      }
    });
  }
}

function addOutputComponentModel(req, res) {
  const newModel = new Outputcomponentmodel(Object.assign({}, req.body));
  newModel.save((err) => {
    if (err) {
      res.send(err);
    } else {
      res.json(newModel);
    }
  });
}

function updateOutputComponentModel(req, res) {
  const id = req.params.id;
  const userid = req.params.userid;
  Outputcomponentmodel.find({ id, userid }, (err, singlemodel) => {
    if (err) {
      res.send(err);
    } else {
      Outputcomponentmodel.update({ id, userid }, req.body, { multi: false }, (err, updatedmodel) => {
        if (err) {
          res.send(err);
        } else {
          res.json(updatedmodel);
        }
      });
    }
  });
}

function deleteOutputComponentModel(req, res) {
  const id = req.params.id;
  const userid = req.params.userid;
  Outputcomponentmodel.remove({ id, userid }, (err, removed) => {
    if (err) {
      res.send(err);
    } else {
      res.json(removed);
    }
  });
}

export default router;
