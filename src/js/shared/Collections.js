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

export class Collections {

    static findMatching(col1, fun, ...args) {
        let ret = null;
        col1.forEach((el) =>{
            let res = fun(el, ...args);
            if (res) {
                ret = res;
                return;
            }
        });
        return ret;
    }


    static copyMap(map) {
        let newMap = new Map();

        for (let k in map) {
            newMap[k] = map[k];
        }

        return newMap;
    }


    static arrayFirstElement(arr) {
        return arr.length > 0 ? arr[0] : null;
    }

    static toArray(colLike) {
        if (!colLike) {
            return null;
        }
        const out = [];
        for (let i = 0; i < colLike.length; i++) {
            out.push(colLike[i]);
        }
        return out;
    }

    static isEmpty(col) {
        let len = col.length;
        if (len === undefined) {
            len = col.size;
            if (len === undefined) {
                throw new Error("len undefined");
            }
        }

        return len === 0;
    }

    static cloneArray(arr) {
        return arr.slice(0);
    }
}