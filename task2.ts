const csvFilePath='./nodejs-hw1-ex1.csv'
const csv=require('csvtojson')
const { pipeline } = require('stream');
const { promisify } = require('util');
const pipelineAsync = promisify(pipeline);
const readStream=require('fs').createReadStream(csvFilePath);
const writeStream=require('fs').createWriteStream('./nodejs-hw1-ex2.txt');

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
