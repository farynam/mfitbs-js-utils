export class Collections {

    static findMatching(col1, fun, ...args) {
        let ret = null;
        col1.forEach((el) =>{
            let res = fun(el, ...args);
            if (res) {
                ret = res;
                return;
            }
        });
        return ret;
    }


    static copyMap(map) {
        let newMap = new Map();

        for (let k in map) {
            newMap[k] = map[k];
        }

        return newMap;
    }


    static arrayFirstElement(arr) {
        return arr.length > 0 ? arr[0] : null;
    }

    static toArray(colLike) {
        if (!colLike) {
            return null;
        }
        const out = [];
        for (let i = 0; i < colLike.length; i++) {
            out.push(colLike[i]);
        }
        return out;
    }

    static isEmpty(col) {
        let len = col.length;
        if (len === undefined) {
            len = col.size;
            if (len === undefined) {
                throw new Error("len undefined");
            }
        }

        return len === 0;
    }

    static cloneArray(arr) {
        return arr.slice(0);
    }
}