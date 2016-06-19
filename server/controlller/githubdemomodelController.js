import * as mongoose from 'mongoose';
import Githubdemomodel from '../data/githubdemomodel';
import express from 'express';

let router = express.Router();
router.route('/:id?')
  .get(getGithubDemoModel)
  .post(addGithubDemoModel)
  .put(updateGithubDemoModel)
  .delete(deleteGithubDemoModel);

function getGithubDemoModel(req, res) {
  const id = req.params.id;
  if (id) {
    Githubdemomodel.find({id}, (err, singlemodel) => {
      if(err) {
        res.send(err);
      } else {
        res.json(singlemodel);
      }
    });
  } else {
    Githubdemomodel.find((err, model) => {
      if(err) {
        res.send(err);
      } else {
        res.json(model);
      }
    });
  }
}

function addGithubDemoModel(req, res) {
  const newModel = new Githubdemomodel(Object.assign({}, req.body));
  newModel.save((err) => {
    if (err) {
      res.send(err);
    } else {
      res.json(newModel);
    }
  });
}

function updateGithubDemoModel(req, res) {
  const id = req.params.id;
  Githubdemomodel.find({id}, (err, singlemodel) => {
    if(err) {
      res.send(err);
    } else {
      Githubdemomodel.update({id}, req.body, {multi: false}, (err, updatedmodel) => {
        if(err) {
          res.send(err);
        } else {
          res.json(updatedmodel);
        }
      });
    }
  });
}

function deleteGithubDemoModel(req, res) {
  const id = req.params.id;
  Githubdemomodel.remove({id}, (err, removed) => {
    if (err) {
      res.send(err);
    } else {
      res.json(removed);
    }
  });
}

export default router;
