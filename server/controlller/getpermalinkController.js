import Permalinkmodel from '../data/permalinkmodel';
import express from 'express';

let router = express.Router();
router.route('/:shorturl')
  .get(getPermalink);

function getPermalink(req, res) {
  const shorturl = req.params.shorturl;
  if (shorturl) {
    Permalinkmodel.find({ shortRelativeURL: `/p/${shorturl}` }, (err, singlemodel) => {
      if (err) {
        res.send(err);
      } else {
        res.json(singlemodel);
      }
    });
  } else {
    res.send(404).json({ err: 'Not found' });
  }
}

export default router;
