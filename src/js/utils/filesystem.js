const fs = require('fs');

export class FileSystem {

    static rmDir(path) {
        if (fs.existsSync(path)) {
            fs.readdirSync(path).forEach(function (file, index) {
                let curPath = path + "/" + file;
                if (fs.lstatSync(curPath).isDirectory()) { // recurse
                    FileSystem.rmDir(curPath);
                } else { // delete file
                    fs.unlinkSync(curPath);
                }
            });
            fs.rmdirSync(path);
        }
    };

    static rmFile(filePath) {
        fs.unlinkSync(filePath);
    }
}