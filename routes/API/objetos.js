var uuidv4 = require('uuid/v4');
var express = require('express');
var router = express.Router();


var fileModel = require('./newmodel');
var data = null; // 

var zamorano = {
  '_RTN':'',
  'EMPRESA':'',
  'CORREO':null,
  'RUBRO':'',
  'DIRECCION':null,
  'TELEFONO':false,
  'type': 'small' // 
};

router.get('/', function( req, res, next) {
    if(!data){
      fileModel.read(function(err, filedata){
        if(err){
          console.log(err);
          data = [];
          return res.status(500).json({'error':'Error al Obtener Data'});
        }
        data = JSON.parse(filedata);
        return res.status(200).json(data);
      });
    } else {
      return res.status(200).json(data);
    }
  });// get /
  
  router.post('/new', function(req, res, next){
    var _zamorano = Object.assign({} , bigThingTp, req.body);
    var dateT = new Date();
    var dateD = new Date();
    dateD.setDate(dateT.getDate()+ 3);
    _zamorano.fcIng = dateT;
    _zamorano.due = dateD;
    _zamorano._id = uuidv4();
    if(!data){
      data = [];
    }
  data.push(_thingsData);
  fileModel.write(data, function(err){
    if(err){
      console.log(err);
      return res.status(500).json({ 'error': 'Error al Obtener Data' });
    }
    return res.status(200).json(_thingsData);
  });
});// 

router.put('/done/:thingId', function(req, res, next){
    var _zamorano = req.params.thingId;
    var _zamorano = req.body;
    var _zamorano = null;
    var newData = data.map(
      function(doc, i){
        if (doc._id == _zamorano){
          _thingUpdated = Object.assign(
            {},
            doc,
            {"done":true},
            _thingUpds
            );
          return _thingUpdated;
        }
        return doc;
      }
  );// end map
  data = newData;
  fileModel.write(data, function (err) {
    if (err) {
      console.log(err);
      return res.status(500).json({ 'error': 'Error al Guardar Data' });
    }
    return res.status(200).json(_zamoranoUpdated);
  });
});// Set A Thing as Done


router.delete('/delete/:thingId', function(req, res, next){
  var _zamorano = req.params.thingId;
  var newData = data.filter(
    function (doc, i) {
      if (doc._id == _thingId) {
        return false;
      }
      return true;
    }
  );// end map
  data = newData;
  fileModel.write(data, function (err) {
    if (err) {
      console.log(err);
      return res.status(500).json({ 'error': 'Error al Guardar Data' });
    }
    return res.status(200).json({"delete": _thingId});
  });
}); // end delete

fileModel.read(function(err , filedata){
  if(err){
    console.log(err);
  } else{
    data = JSON.parse(filedata);
  }
});

module.exports = router;
