import {Transform} from 'stream' ;
import {stdin, stdout} from 'process'
import path from 'path';

  export const transform = async () =>
 {    class TransformStream extends Transform
    {
        constructor ( options = {} )
        {
        super(options)
    }

  _transform(chunk: Buffer, enc: any, callback: () => void) {

          const chunkStringField = chunk.toString();
          const reverseChunk =`${chunkStringField.split('').reverse().join('')}\n`
    this.push(reverseChunk)

      callback();
    }
  }
    const transformString = new TransformStream()
    stdin.pipe(transformString).pipe(stdout)

};
transform()
