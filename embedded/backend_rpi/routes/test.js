var express = require("express");
var router = express.Router();
const axios = require("axios");
var fs = require("fs");
var sensorData = [];
/*DB 에서 가져올 센서 값*/
router.get("/sensor", function (req, res, next) {
  //   res.send({ "temp": "36", "humid": "56", "noise": "168", "light": "32" });
  res.json({"temp" : `${sensorData[0]}`, "humid" : `${sensorData[1]}`, "noise" : `${sensorData[2]}`, "light" : `${sensorData[3]}`});

  
});

router.post("/sensor", function (req, res, next) {
  //   res.send("DB로 보낼 센서값");
  sensorData = []
  sensorData.push(req.body["temp"]);
  sensorData.push(req.body["humid"]);
  sensorData.push(req.body["noise"]);
  sensorData.push(req.body["light"]);
  console.log(sensorData);
  res.json(sensorData);
});

router.post("/timer", function (req, res, next) {
  //   res.send("2");
  res.json(req.body);
});
router.post("/stopwatch", function (req, res, next) {
  //   res.send("3");
  res.json(req.body);
});
// router.post('/getModule', function(req, res, next) {
//     console.log("1" + req.headers["x-access-token"]);
//     axios.post('http://127.0.0.1:4500/auth/getModule', {
//             module_id: req.body.module_id,
//             headers:{
//                 "x-access-token" : req.headers["x-access-token"]
//             }
//         })
//         .then(response => {
//             res.send(response.data)
//             console.log(response.data)
//             console.log(22222)

//         })
//         .catch(function(error) {
//             res.send(error)
//             console.log(11111)
//             console.log(error);
//         });
// });

// router.post('/setModule', function(req, res, next) {
//     axios.post('http://127.0.0.1:4500/unauth/setModule', {
//             module_id : req.body.module_id,
//             module_data : req.body.module_data
//         })
//         .then(response => {
//             res.send(response.data)
//         })
//         .catch(function(error) {
//             res.send(error)
//             console.log(error);
//         });
// });

module.exports = router;
