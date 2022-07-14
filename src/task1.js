"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transform = void 0;
const stream_1 = require("stream");
const process_1 = require("process");
const transform = async () => {
    class TransformStream extends stream_1.Transform {
        constructor(options = {}) {
            super(options);
        }
        _transform(chunk, enc, callback) {
            const chunkStringField = chunk.toString();
            const reverseChunk = `${chunkStringField.split('').reverse().join('')}\n`;
            this.push(reverseChunk);
            callback();
        }
    }
    const transformString = new TransformStream();
    process_1.stdin.pipe(transformString).pipe(process_1.stdout);
};
exports.transform = transform;
(0, exports.transform)();
