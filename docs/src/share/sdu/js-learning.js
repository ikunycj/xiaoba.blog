function MydeepCopy(obj) {
    if(obj === null || typeof obj !== 'object') {
        return obj;
    }

    const copy = Array.isArray(obj)? [] : {};

    for(let key in obj) {
        if(obj.hasOwnProperty(key)) {
            copy[key] = MydeepCopy(obj[key]);
        }
    }
    return copy;
}

function MyDebounce(func, delay, immediate) {
    let timer = null;

    return function(...args) {
        const context = this;

        if(immediate && !timer) {
            func.apply(context, arguments);
        }

        clearTimeout(timer); 
        timer = setTimeout(() => {
            timer = null;
            func.apply(context, args)
        }, delay);
    }
}

function MyThrottle(func, delay) {
    let prev = 0;

    return function(...args) {
        const now = Date.now();
        const context = this;
        if(now - prev >= delay) {
            func.apply(context, args);
            prev = now;
        }
    }
}

const obj = { a: 1, b: { c: 2 } };
const deepCopy = MydeepCopy(obj);
deepCopy.b.c = 42;
console.log(obj.b.c); // 输出: 2
