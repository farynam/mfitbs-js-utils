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

import {Types} from "./Types";

export class Maps {
    static isEmpty( obj ) {
        for ( let name in obj ) {
            return false;
        }
        return true;
    }

    static copyProperties(srcObj, targetObj, force = false) {
        for (let key in srcObj) {
            if (force || !targetObj.hasOwnProperty(key)) {
                targetObj[key] = srcObj[key];
            }
        }

        return targetObj;
    }

    static mergeProperties(srcObj, targetObj) {
        for (let key in srcObj) {
            if (targetObj.hasOwnProperty(key)) {
                if (Types.isArray(targetObj[key], srcObj[key])) {
                    targetObj[key] = targetObj[key].concat(srcObj[key]);
                }
            } else {
                targetObj[key] = srcObj[key];
            }
        }

        return targetObj;
    }


}