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