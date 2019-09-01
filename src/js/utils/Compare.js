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

export class Compare {

    static eq(obj, ...os) {
        return Compare.any(obj,
            (obj_, o_) => {return obj_ === o_}, ...os);
    }

    static ne(obj, ...os) {
        return Compare.any(obj,
            (obj_, o_) => {return obj_ !== o_}, ...os);
    }

    static le(obj, ...os) {
        return Compare.any(obj,
            (obj_, o_) => {return obj_ <= o_}, ...os);
    }

    static l(obj, ...os) {
        return Compare.any(obj,
            (obj_, o_) => {return obj_ < o_}, ...os);
    }


    static ge(obj, ...os) {
        return Compare.any(obj,
            (obj_, o_) => {return obj_ >= o_}, ...os);
    }

    static g(obj, ...os) {
        return Compare.any(obj,
            (obj, o) => {return obj > o}, ...os);
    }

    static startsWith(str, ...strs) {
        return Compare.any(str,
            (str_, s_) => {return str_.startsWith(s_)}, ...strs);
    }

    static contains(str, ...strs) {
        return Compare.any(str,
            (str_, s_) => {return str_.indexOf(s_) !== -1}, ...strs);
    }

    static any(obj, operator, ...os) {
        let ret = false;
        for (let i = 0; i < os.length; i++) {
            ret |= operator(obj, os[i]);
        }

        return ret;
    }

}