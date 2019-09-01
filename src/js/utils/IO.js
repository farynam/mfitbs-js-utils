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

const fs = require('fs');


export class IO {
    static writeToFile(filename, data, options = {encoding : "utf8", mode : 0o666, flag : "w"}) {
        return new Promise((resolve, reject) => {
            if (!data) {
                reject(new Error("No file contents to write"));
                return;
            }

            if (!filename) {
                reject(new Error("No file name to write"));
                return;
            }

            fs.writeFile(filename, data, options, (err) => {
                if (err) {
                    reject(err);
                    return err;
                }
                resolve(filename);
            });
        });
    }


    static readFile(file, options= {encoding : "utf8", flag: "r"}) {
        return new Promise((resolve, reject) => {
            fs.readFile(file, options, (err, data) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(data);
            });
        });
    }

    static grabDocumentType(docStr, def="<!DOCTYPE html>") {
        const regex = /<!DOCTYPE .+?>/;
        const match = docStr.match(regex);
        if (!match) {
            return def;
        }
        return match[0];
    }

    static writeHtmlToFile(filename, HtmlElement, doctype, options = {encoding : "utf8", mode : 0o666, flag : "w"}) {
        const docStr = HtmlElement.outerHTML;
        return IO.writeToFile(filename, doctype + docStr, options);
    }

}
