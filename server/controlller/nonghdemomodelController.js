import * as mongoose from 'mongoose';
import Nonghdemomodel from '../data/nonghdemomodel';
import express from 'express';

let router = express.Router();
router.route('/:id?')
  .get(getNonGHDemoModel)
  .post(addNonGHDemoModel)
  .put(updateNonGHDemoModel)
  .delete(deleteNonGHDemoModel);

function getNonGHDemoModel(req, res) {
  const id = req.params.id;
  if (id) {
    Nonghdemomodel.find({id}, (err, singlemodel) => {
      if(err) {
        res.send(err);
      } else {
        res.json(singlemodel);
      }
    });
  } else {
    Nonghdemomodel.find((err, model) => {
      if(err) {
        res.send(err);
      } else {
        res.json(model);
      }
    });
  }
}

function addNonGHDemoModel(req, res) {
  const newModel = new Nonghdemomodel(Object.assign({}, req.body));
  newModel.save((err) => {
    if (err) {
      res.send(err);
    } else {
      res.json(newModel);
    }
  });
}

function updateNonGHDemoModel(req, res) {
  const id = req.params.id;
  Nonghdemomodel.find({id}, (err, singlemodel) => {
    if(err) {
      res.send(err);
    } else {
      Nonghdemomodel.update({id}, req.body, {multi: false}, (err, updatedmodel) => {
        if(err) {
          res.send(err);
        } else {
          res.json(updatedmodel);
        }
      });
    }
  });
}

function deleteNonGHDemoModel(req, res) {
  const id = req.params.id;
  Nonghdemomodel.remove({id}, (err, removed) => {
    if (err) {
      res.send(err);
    } else {
      res.json(removed);
    }
  });
}

export default router;
