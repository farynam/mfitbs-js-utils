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

import {Strings} from "./strings";


export class FileNameUtils {
    static getDir(fileName) {
        let idx = fileName.lastIndexOf("/");//filename.tmp
        if (idx === -1) {
            return fileName;
        }

        return fileName.substr(0, idx);
    }

    static getFile(fileName) {
        let idx = fileName.lastIndexOf("/");
        return fileName.substr(idx + 1);
    }

    static getRelativeToDir(fileRel, fileRelTo) {
        let fileRelArray = fileRel.split("/");
        let fileRelToArray = fileRelTo.split("/");

        //remove file part
        const fileRelArrayDir = fileRelArray.slice(0, fileRelArray.length - 1);
        const fileRelToArrayDir = fileRelToArray.slice(0, fileRelToArray.length - 1);

        let path = fileRelToArrayDir.concat(fileRelArrayDir);

        //cleanup
        const pathFinal = [];
        for (let i = 0; i < path.length; i++) {
            const pathElem = path[i];
            if (pathElem === "..") {
                pathFinal.pop();
                continue;
            }
            pathFinal.push(pathElem);
        }

        pathFinal.push(fileRelArray[fileRelArray.length - 1]);

        return pathFinal.reduce((acc, val) => {
            if (acc) {
                return `${acc}/${val}`;
            } else {
                return val;
            }
        }, "");
    }

    static normalizeFilePath(filePath) {
        let result = null;
        let regex = /\/\w+\/\.\./g;
        do {
            if (result !== null) {
                filePath = Strings.remove(filePath, result.index, result[0].length);
                regex = /\/\w+\/\.\./g;
            }
            result = regex.exec(filePath);
        } while (result !== null);

        filePath = filePath.replace(/\.\//g, "");
        filePath = filePath.replace(/\/\//g, "/");
        return filePath;
    }
}