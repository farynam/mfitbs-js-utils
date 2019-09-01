import {Compare} from "./Compare";

export class Strings {
    static isEmpty(str) {
        return str == null || str === "";
    }

    static anyEmpty(...strs) {
        return !strs.reduce((store, curr) => Math.min(store, (curr ? curr.length : 0)), Number.MAX_SAFE_INTEGER);
     }

     static toString(obj) {
         return JSON.stringify(obj);
     }

     static removeTrailersLeft(str, ...trailer) {
         let begin = 0;
         for (begin ; begin < str.length; begin++) {
             if (!Compare.eq(str.charAt(begin), ...trailer)) {
                 break;
             }
         }

         return str.substr(begin);
     }

     static removeTrailersRight(str, ...trailer) {
         let end = str.length -1;
         for (end; end >= 0; end--) {
             if (!Compare.eq(str.charAt(end), ...trailer)) {
                 break;
             }
         }

         return str.substr(0, end + 1);
     }

     static removeTrailers(str, ...trailer) {
         return Strings.removeTrailersRight(Strings.removeTrailersLeft(str, ...trailer), ...trailer);
     }

     static arrayToShortString(arrToString) {
         let out = "";
         arrToString.forEach((e) => {
             out += `${e.toShortStr()},`;
         });

         return `[\n${out}\n]`;
     }

    static arrayToLongString(arrToString) {
        let out = "";
        arrToString.forEach((e) => {
            out += `${e.toLongStr()},\n`;
        });

        return `${out}`;
    }

    static splice(str, start, delCount, newSubStr) {
        return str.slice(0, start) + newSubStr + str.slice(start + Math.abs(delCount));
    };

    static remove(str, from, count) {
        return str.slice(0, from) + str.slice(from + count);
    }
}