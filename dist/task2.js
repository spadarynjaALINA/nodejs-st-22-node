"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

var _csvtojson = _interopRequireDefault(require("csvtojson"));

var _path = _interopRequireWildcard(require("path"));

var fs = _interopRequireWildcard(require("fs"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import { fileURLToPath } from 'url';
// const __filename =fileURLToPath(import.meta.url)
// const __dirname =dirname(__filename)
var csvFilePath = _path["default"].join(__dirname, '.csv', 'nodejs-hw1-ex1.csv');

var txtFilePath = _path["default"].join(__dirname, '.csv', 'nodejs-hw1-ex1.txt');

var readStream = fs.createReadStream(csvFilePath);
var writeStream = fs.createWriteStream(txtFilePath);
var jsonArray = (0, _csvtojson["default"])({
  delimiter: ';',
  colParser: {
    "amount": "omit",
    "price": function price(value) {
      return Number(value.replace(',', '.'));
    }
  },
  checkType: true
}).preFileLine(function (fileLineString, lineIdx) {
  if (lineIdx === 0) {
    return fileLineString.split(';').map(function (item) {
      return item.toLowerCase();
    }).join(';');
  }

  return fileLineString;
}).fromFile(csvFilePath);

(function pipeTransform() {
  try {
    readStream.pipe(jsonArray).pipe(writeStream);
  } catch (err) {
    console.error('pipeline failed with error:', err);
  }
})();