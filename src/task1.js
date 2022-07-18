process.stdin.on('data',(string)=>{
process.stdout.write(string.toString().split('').reverse().join(''))
process.stdout.write("\n")
})