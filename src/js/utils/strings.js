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

import {Compare} from "./Compare";

export class Strings {
    static isEmpty(str) {
        return str == null || str === "";
    }

    static anyEmpty(...strs) {
        return !strs.reduce((store, curr) => Math.min(store, (curr ? curr.length : 0)), Number.MAX_SAFE_INTEGER);
     }

     static toString(obj) {
         return JSON.stringify(obj);
     }

     static removeTrailersLeft(str, ...trailer) {
         let begin = 0;
         for (begin ; begin < str.length; begin++) {
             if (!Compare.eq(str.charAt(begin), ...trailer)) {
                 break;
             }
         }

         return str.substr(begin);
     }

     static removeTrailersRight(str, ...trailer) {
         let end = str.length -1;
         for (end; end >= 0; end--) {
             if (!Compare.eq(str.charAt(end), ...trailer)) {
                 break;
             }
         }

         return str.substr(0, end + 1);
     }

     static removeTrailers(str, ...trailer) {
         return Strings.removeTrailersRight(Strings.removeTrailersLeft(str, ...trailer), ...trailer);
     }

     static arrayToShortString(arrToString) {
         let out = "";
         arrToString.forEach((e) => {
             out += `${e.toShortStr()},`;
         });

         return `[\n${out}\n]`;
     }

    static arrayToLongString(arrToString) {
        let out = "";
        arrToString.forEach((e) => {
            out += `${e.toLongStr()},\n`;
        });

        return `${out}`;
    }

    static splice(str, start, delCount, newSubStr) {
        return str.slice(0, start) + newSubStr + str.slice(start + Math.abs(delCount));
    };

    static remove(str, from, count) {
        return str.slice(0, from) + str.slice(from + count);
    }
}