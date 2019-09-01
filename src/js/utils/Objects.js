

/*
 * *
 *  * Copyright 2019 Marcin Faryna. All rights reserved.
 *  *
 *  * Licensed under the Apache License, Version 2.0 (the "License");
 *  * you may not use this file except in compliance with the License.
 *  * You may obtain a copy of the License at
 *  *
 *  *     http://www.apache.org/licenses/LICENSE-2.0
 *  *
 *  * Unless required by applicable law or agreed to in writing, software
 *  * distributed under the License is distributed on an "AS IS" BASIS,
 *  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  * See the License for the specific language governing permissions and
 *  * limitations under the License.
 *
 */

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