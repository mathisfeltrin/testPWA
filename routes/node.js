var express = require('express');
var router = express.Router();


/* GET users listing. */
router.get("/test", (req, res) => {
    res.send("test de NODE");
})
module.exports = router;