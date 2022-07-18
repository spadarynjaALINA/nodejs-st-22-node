import csv from 'csvtojson'
import path,{dirname} from'path';
import * as fs from 'fs';
import { fileURLToPath } from 'url';

const __filename =fileURLToPath(import.meta.url)
const __dirname =dirname(__filename)
const csvFilePath=path.join(__dirname,'.csv', 'nodejs-hw1-ex1.csv')
const txtFilePath=path.join(__dirname,'.csv', 'nodejs-hw1-ex1.txt')
const readStream = fs.createReadStream(csvFilePath);
const writeStream=fs.createWriteStream(txtFilePath);

const jsonArray =  csv({
  delimiter:';',
		colParser:{
		"amount":"omit",
		"price":function(value ){
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
    readStream.pipe(jsonArray).pipe(writeStream)
  }
  catch(err) {
    console.error('pipeline failed with error:', err);
  }
  })();