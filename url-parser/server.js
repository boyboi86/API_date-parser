var express = require('express'),
    moment = require('moment'),
    fs = require('fs'),
    path = require('path');
    
var app = express();
var port = process.env.PORT || 8080;

//listening to port
app.listen(port, function(){
    console.log("listening on port: " + port)
})

//render default html page
app.get('/', function(req, res){
   var file = path.join(__dirname, 'index.html');
   fs.createReadStream(file, 'utf8', function(err){
       if(err){
           console.log('error rendering file')
           res.sendStatus(404);
       } else {
           console.log('file served');
       }
   }).pipe(res);
   
});
    
//add semi-colon for param responds    
app.get('/:dateString', function (req, res){
    var dateForm,
        query = req.params.dateString;
    var regex = /^\d{8,}$/
    
//test if param contains 8 digits that represents seconds
    if(regex.test(query)){
     dateForm = moment(query, "X");
  } else {
    dateForm = moment(query, "MMMM D, YYYY");
  }
  
//if earlier on test is false, url will return null
  if(dateForm.isValid()){
      res.json({
          unix: dateForm.format("X"),
          natural: dateForm.format("MMMM D, YYYY")
      })} else {
          res.json({
              unix: null,
              natural: null
          })
      }
})