const fs = require('fs');
const { Transform } = require('stream');
const PATH_LOG = './access.log'  //введите свой путь

const readStream = fs.createReadStream(PATH_LOG, {encoding: 'utf8'});
const writeStream = fs.createWriteStream('89.123.1.41_requests.log', {encoding: 'utf8', flags: 'a'});

const firstIP = /\n((?!89.123.1.41).)*$/gm
// const secondIP = /\n((?!34.48.240.111).)*$/gm 

const transformStream = new Transform({
    transform(chunk, encoding, callback) {
        const transformStream = chunk.toString().replace(firstIP, '');
        this.push(transformStream);
        callback();
    }
})

readStream.pipe(transformStream).pipe(writeStream);

//большая прозьба разобрать на уроке как бы сделали Вы,
//потому что я уверен не у меня одного мозг вскипел,
//хотя я посмотрел урок и потом еще раз все проделал и разобрал по методичке
//но в итоге получилось реализовать не полный функционал