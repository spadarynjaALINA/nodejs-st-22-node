const {Transform} = require('stream') ;
const {stdin} = require('process')
const {stdout} = require('process')

  const transform = async () =>
 {
    class TransformStream extends Transform
    {
        constructor ( options = {} )
        {
        super(options)
    }

  _transform(chunk, enc, callback) {
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
