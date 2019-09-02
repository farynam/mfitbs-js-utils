import {ArgsParser} from "../../js/utils/ArgsParser";

describe('FileParser', () => {
    test('emptyArgs', function() {
        const args = ["-=", "-", "-key=", "-=value"];
        const argsParser =  new ArgsParser(args);

        expect(argsParser.nextArg()).toBeNull();
        expect(argsParser.nextArg()).toBeNull();
        expect(argsParser.nextArg()).toBeNull();
        expect(argsParser.nextArg()).toBeNull();
        expect(argsParser.nextArg()).toBeNull();
    });

    test("proper args", function() {
        const args = ["-key1=value1", "-key2=value2", "-key3=value3", "-key4=-value4-", "--key5=-value5-"];
        const argsParser =  new ArgsParser(args);
        expect(argsParser.nextArg().toKV()).toEqual({key:"key1", value : "value1"});
        expect(argsParser.nextArg().toKV()).toEqual({key:"key2", value : "value2"});
        expect(argsParser.nextArg().toKV()).toEqual({key:"key3", value : "value3"});
        expect(argsParser.nextArg().toKV()).toEqual({key:"key4", value : "-value4-"});
        expect(argsParser.nextArg().toKV()).toEqual({key:"key5", value : "-value5-"});
    });

    test("malformed separator", function() {
        const args = ["-key1==value1", "-=key2value2", "-key3===value3", "-key3=value3="];
        const argsParser =  new ArgsParser(args);
        expect(argsParser.nextArg()).toBeNull();
        expect(argsParser.nextArg()).toBeNull();
        expect(argsParser.nextArg()).toBeNull();
        expect(argsParser.nextArg()).toBeNull();
        expect(argsParser.nextArg()).toBeNull();
    });

    test("unamed and named args", function() {
        const args = ["file.js", "-key1=value1", "-key2=value2", "-key3=value3", "-key4=-value4-", "--key5=-value5-"];
        const argsParser =  new ArgsParser(args);
        expect(argsParser.nextArg().toKV()).toEqual({key: null, value : "file.js"});
        expect(argsParser.nextArg().toKV()).toEqual({key:"key1", value : "value1"});
        expect(argsParser.nextArg().toKV()).toEqual({key:"key2", value : "value2"});
        expect(argsParser.nextArg().toKV()).toEqual({key:"key3", value : "value3"});
        expect(argsParser.nextArg().toKV()).toEqual({key:"key4", value : "-value4-"});
        expect(argsParser.nextArg().toKV()).toEqual({key:"key5", value : "-value5-"});
    });

    test("unamed and named args", function() {
        const args = ["file.js", "-key1=value1", "-key2=value2", "-key3=value3", "-key4=-value4-", "--key5=-value5-"];
        const argsParser =  new ArgsParser(args);
        const result = argsParser.args;
        const pattern = {
            key1: "value1",
            key2:"value2",
            key3 :"value3",
            key4 : "-value4-",
            key5 :"-value5-",
            unnamed: ["file.js"]};
        expect(result).toEqual(expect.objectContaining(pattern));
    });


});