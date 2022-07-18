var csvFilePath='./nodejs-hw1-ex1.csv'
var csv=require('csvtojson')
var { pipeline } = require('stream');
var { promisify } = require('util');

var readStream=require('fs').createReadStream(csvFilePath);
var writeStream=require('fs').createWriteStream('./nodejs-hw1-ex2.txt');

var jsonArray =  csv({
  delimiter:';',
		colParser:{
		"amount":"omit",
		"price":function(value){
	return Number(value.replace(',','.'));
		},
	},
	checkType:true
}).preFileLine((fileLineString, lineIdx)=>{
	if (lineIdx === 0){
		return fileLineString.split(';').map((item)=>item.toLowerCase()).join(';')
	}
	return fileLineString
}).fromFile(csvFilePath);


( function pipeTransform(){
  try{

      readStream.pipe( jsonArray).pipe(writeStream)

  }
  catch(err) {
    console.error('pipeline failed with error:', err);
  }
  })();
