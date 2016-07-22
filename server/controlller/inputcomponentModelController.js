import * as mongoose from 'mongoose';
import Inputcomponentmodel from '../data/inputcomponentmodel';
import express from 'express';

let router = express.Router();
router.route('/:userid/:id?')
  .get(getInputComponentModel)
  .post(addInputComponentModel)
  .put(updateInputComponentModel)
  .delete(deleteInputComponentModel);

function getInputComponentModel(req, res) {
  const id = req.params.id;
  const userid = req.params.userid;
  if (id) {
    Inputcomponentmodel.find({ id, userid }, (err, singlemodel) => {
      if (err) {
        res.send(err);
      } else {
        res.json(singlemodel);
      }
    });
  } else {
    Inputcomponentmodel.find({ userid }, (err, model) => {
      if (err) {
        res.send(err);
      } else {
        res.json(model);
      }
    });
  }
}

function addInputComponentModel(req, res) {
  const newModel = new Inputcomponentmodel(Object.assign({}, req.body));
  newModel.save((err) => {
    if (err) {
      res.send(err);
    } else {
      res.json(newModel);
    }
  });
}

function updateInputComponentModel(req, res) {
  const id = req.params.id;
  const userid = req.params.userid;
  Inputcomponentmodel.find({ id, userid }, (err, singlemodel) => {
    if (err) {
      res.send(err);
    } else {
      Inputcomponentmodel.update({ id, userid }, req.body, { multi: false }, (err, updatedmodel) => {
        if (err) {
          res.send(err);
        } else {
          res.json(updatedmodel);
        }
      });
    }
  });
}

function deleteInputComponentModel(req, res) {
  const id = req.params.id;
  const userid = req.params.userid;
  Inputcomponentmodel.remove({ id, userid }, (err, removed) => {
    if (err) {
      res.send(err);
    } else {
      res.json(removed);
    }
  });
}

export default router;
