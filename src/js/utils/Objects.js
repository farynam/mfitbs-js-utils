

const STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
const ARGUMENT_NAMES = /([^\s,]+)/g;

export class Objects {
    static merge(... objs) {
        const target = {};

        objs.forEach((obj) => {
            Object.assign(target, obj);
        });

        return target;
    }


    static iterateProperties(obj, fun) {

        for (let prop in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, prop)) {
                fun(prop, obj);
            }
        }
    }

    static isFunction(functionToCheck) {
        const a = {};
        return functionToCheck && (a.toString.call(functionToCheck) === '[object Function]'
            || a.toString.call(functionToCheck) === '[object AsyncFunction]');
    }

    static isString(strToCheck) {
        return (typeof strToCheck) === "string";
    }

    static isNumber(numToCheck) {
        return !isNaN(numToCheck);
    }

    static getParamNames(func) {
        const fnStr = func.toString().replace(STRIP_COMMENTS, '');
        let result = fnStr.slice(fnStr.indexOf('(')+1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
        if(result === null)
            result = [];
        return result;
    }

}