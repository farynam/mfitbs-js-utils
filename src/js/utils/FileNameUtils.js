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