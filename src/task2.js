"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const csvtojson_1 = __importDefault(require("csvtojson"));
const stream_1 = require("stream");
const util_1 = require("util");
const path_1 = __importDefault(require("path"));
const fs = __importStar(require("fs"));
const pipelineAsync = (0, util_1.promisify)(stream_1.pipeline);
const csvFilePath = path_1.default.join(__dirname, '.csv', 'nodejs-hw1-ex1.csv');
const txtFilePath = path_1.default.join(__dirname, '.csv', 'nodejs-hw1-ex1.txt');
const readStream = fs.createReadStream(csvFilePath);
const writeStream = fs.createWriteStream(txtFilePath);
const jsonArray = (0, csvtojson_1.default)({
    delimiter: ';',
    colParser: {
        "amount": "omit",
        "price": function (value) {
            return Number(value.replace(',', '.'));
        },
    },
    checkType: true
}).preFileLine((fileLineString, lineIdx) => {
    if (lineIdx === 0) {
        return fileLineString.split(';').map((item) => item.toLowerCase()).join(';');
    }
    return fileLineString;
}).fromFile(csvFilePath);
(async function pipeTransform() {
    try {
        await pipelineAsync(readStream, jsonArray, writeStream);
    }
    catch (err) {
        console.error('pipeline failed with error:', err);
    }
})();
