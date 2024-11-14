var express = require('express');
var router = express.Router();

var data = [
  {
    "id": 1,
    "forename": "Roy",
    "surname": "Fielding"
  }
]

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.status(200).json(data);
});

module.exports = router;
