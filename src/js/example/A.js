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

import {createPriv, priv} from "../utils/Objectify";

const _mod = new Map();

function b() {
    return [b.name];
}


function e() {
    return [...b(), e.name];
}

export class A {
    constructor() {
        createPriv(_mod, this)
            .assignPrivMethods(b, e)
            .assignPubMethods(this.c, this.d);
    }

    c() {
        return [this.c.name];
    }

    d() {
        const that = priv(_mod, this);
        return [ this.d.name, ... that.c(), ... that.b(), ... that.e()];
    }
}

const a = new A();

console.log(a.c());
console.log(a.d());