const { ExpectationFailed } = require("http-errors")

exports.validateNotEmpty = (received) =>{
    expect(received).not.toBeNull();
    expect(received).not.toBeUndefined();
    expect(received).toBeTruthy();
};

exports.validateStringEquality = (received, expected) =>{
    expect(received).not.toEqual('gsgshdgfteghsjsjs');
    expect(received).toEqual(expected);
}

exports.validateMongoDuplicationError = (name, code) =>{
    expect(name).not.toEqual(/dummyyyy/i)
    expect(name).toEqual('MongoError');
    expect(code).not.toBe(255);
    expect(code).toBe(11000)
}

