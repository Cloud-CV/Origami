import Permalinkmodel from '../data/permalinkmodel';
import express from 'express';

let router = express.Router();
router.route('/:userId?/:projectId?')
  .get(getPermalink)
  .post(addPermalink)
  .put(updatePermalink)
  .delete(deletePermalink);

function getPermalink(req, res) {
  const userId = req.params.userId;
  const projectId = req.params.projectId;
  if (userId && projectId) {
    Permalinkmodel.find({ userId, projectId }, (err, singlemodel) => {
      if (err) {
        res.send(err);
      } else {
        res.json(singlemodel);
      }
    });
  } else {
    Permalinkmodel.find((err, model) => {
      if (err) {
        res.send(err);
      } else {
        res.json(model);
      }
    });
  }
}

function addPermalink(req, res) {
  const newModel = new Permalinkmodel(Object.assign({}, req.body));
  newModel.save((err) => {
    if (err) {
      res.send(err);
    } else {
      res.json(newModel);
    }
  });
}

function updatePermalink(req, res) {
  const userId = req.params.userId;
  const projectId = req.params.projectId;
  Permalinkmodel.find({ userId, projectId }, (err, singlemodel) => {
    if (err) {
      res.send(err);
    } else {
      Permalinkmodel.update({ userId, projectId }, req.body, { multi: false }, (err, updatedmodel) => {
        if (err) {
          res.send(err);
        } else {
          res.json(updatedmodel);
        }
      });
    }
  });
}

function deletePermalink(req, res) {
  const userId = req.params.userId;
  const projectId = req.params.projectId;
  Permalinkmodel.remove({ userId, projectId }, (err, removed) => {
    if (err) {
      res.send(err);
    } else {
      res.json(removed);
    }
  });
}

export default router;
