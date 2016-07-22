import * as mongoose from 'mongoose';
import Rootsettingsmodel from '../data/rootsettingsmodel';
import express from 'express';

let router = express.Router();
router.route('/')
  .get(getRootSettings)
  .post(addRootSettings);

function getRootSettings(req, res) {
  Rootsettingsmodel.find((err, model) => {
    if (err) {
      res.send(err);
    } else {
      res.json(model);
    }
  });
}

function addRootSettings(req, res) {
  Rootsettingsmodel.find((err, model) => {
    if (err) {
      res.send(err);
    } else if (Object.keys(model).length > 0) {
      res.status(400).send('Root user already exists');
    } else {
      const newModel = new Rootsettingsmodel(Object.assign({}, req.body));
      newModel.save((err) => {
        if (err) {
          res.send(err);
        } else {
          res.json(newModel);
        }
      });
    }
  });
}

export default router;
