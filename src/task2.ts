
import csv from 'csvtojson'
import {pipeline} from 'stream';
import { promisify } from 'util';
import path from 'path';
import * as fs from 'fs';

const pipelineAsync = promisify(pipeline);
const csvFilePath=path.join(__dirname,'.csv', 'nodejs-hw1-ex1.csv')
const txtFilePath=path.join(__dirname,'.csv', 'nodejs-hw1-ex1.txt')
const readStream = fs.createReadStream(csvFilePath);
const writeStream=fs.createWriteStream(txtFilePath);

const jsonArray =  csv({
  delimiter:';',
		colParser:{
		"amount":"omit",
		"price":function(value:string ){
	return Number(value.replace(',','.'));
		},
	},
	checkType:true
}).preFileLine((fileLineString: string, lineIdx: number)=>{
	if (lineIdx === 0){
		return fileLineString.split(';').map((item)=>item.toLowerCase()).join(';')
	}
	return fileLineString
}).fromFile(csvFilePath);

(async function pipeTransform():Promise<void>{
  try{
    await pipelineAsync(
      readStream,
      jsonArray,
      writeStream
    )
  }
  catch(err) {
    console.error('pipeline failed with error:', err);
  }
  })();
