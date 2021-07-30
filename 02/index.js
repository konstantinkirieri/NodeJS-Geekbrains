const EventEmitter = require('events');

const hour = +process.argv[2];
const day = +process.argv[3];
const month = +process.argv[4] - 1;
const year = +process.argv[5];

const finishDate = new Date(year, month, day, hour);

// вручную задать финишь для проверки
// const finishDate = new Date(2021, 6, 30, 12, 14);

const requestTypes = [
    {
      type: 'getTime',
      payload: {
        finishDate: finishDate
      }
    },
];

class Finish {
    constructor(param) {
        this.type = param.type,
        this.payload = param.payload
    }
}

class Handler {
    static getTime([payload, newDate]) {
        const restTime = Math.floor((payload.finishDate.getTime() - newDate.getTime()) / 1000)

        if(!restTime) {
            console.log('Время истекло')
            clearInterval(timerId);
        } else {
            console.log(`Осталось ${restTime} секунд`)
        };
    }
}

class MyEmitter extends EventEmitter {};
const emitterObject = new MyEmitter();

emitterObject.on('getTime', Handler.getTime);

let finish = new Finish(requestTypes[0]);

let timerId = setInterval(() => {
    const newDate = new Date();
    emitterObject.emit(finish.type, [finish.payload, newDate]);
}, 1000)