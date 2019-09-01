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

import {Maps} from "./Maps";

let counter = 1;

export function priv(_privs, obj) {
    return _privs.get(obj);
}

function _assignPrivMethods(obj, _privs, ...meths) {
    let that = _privs.get(obj);
    if (!that) {
        that = {};
        _privs.set(obj, that)
    }

    meths.forEach((priv) => {
        that[priv.name] = priv;
    });
}

export function createPriv(_privs, obj, thatPriv) {
    Maps.copyProperties(obj, thatPriv);

    const prevPriv = _privs.get(obj.objid);
    if (prevPriv) {
        Maps.copyProperties(thatPriv, prevPriv);
    } else {
        obj.objid = counter++;
        _privs.set(obj, thatPriv);
    }

    return {
        assignPrivMethods : function(...meths) {
            _assignPrivMethods(obj, _privs, ...meths);
            return this;
        },
        assignPubMethods : function(...meths) {
            _assignPrivMethods(obj, _privs, ...meths);
            return this;
        }
    }
}



export class ObjectUtil {
    static clone(obj) {
        return {...obj};
    }
}