import {createPriv, priv} from "./Objectify";
import {Strings} from "./strings";

const _mod = new Map();

function _parseArg(arg) {
    if (!arg.startsWith("-")) {
        return this.last  = new Arg(null, arg);
    }

    arg = arg.replace(/^-+/, "");
    const maybePair = arg.split("=");
    if (maybePair.length !== 2) {
        return null;
    }

    if (Strings.anyEmpty(...maybePair)) {
        return null;
    }

    return this.last = new Arg(... maybePair);
}

class Arg {
    constructor(key, value) {
        createPriv(_mod, this, {
           key : key,
           value : value
        });
    }

    isNamed() {
        const that = priv(_mod, this);
        return that.key != null;
    }

    get key() {
        return priv(_mod, this).key;
    }

    get value() {
        return priv(_mod, this).value;
    }

    toKV() {
        const that = priv(_mod, this);
        return {
            key : this.key,
            value: this.value
        }
    }
}


export class ArgsParser {

    constructor(argv) {
        createPriv(_mod, this, {
            argv : argv,
            argIndex : 0,
            last: null,
            argObj : null
        }).assignPrivMethods(_parseArg);
    }

    nextArg() {
        const that = priv(_mod, this);
        if (that.argIndex === that.argv.length) {
            return null;
        }

        let ret = that._parseArg(that.argv[that.argIndex++]);
        if (!ret) {
            return this.nextArg();
        }
        return ret;
    }

    get args() {
        const that = priv(_mod, this);

        const argObj = {};
        while (this.nextArg()) {
            const last = that.last;
            if (last.key) {
                argObj[last.key] = last.value;
            } else {
                if (!argObj.unnamed) {
                    argObj.unnamed = [];
                }
                argObj.unnamed.push(last.value);
            }
        }

        if (Object.keys(argObj).length === 0) {
            return null;
        }

        return argObj;
    }


}