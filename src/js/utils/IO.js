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
