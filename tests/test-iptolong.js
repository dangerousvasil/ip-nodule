"use strict";

var assert = require("assert");
var util = require("util");

var ipNodule = require("../");

describe("ipv4-toLong", function () {

    var ip4test = [
        {ip: "212.212.100.110", test: true},
        {ip: "255.255.255.110", test: true},
        {ip: "355.355.155.110", test: false},
        {ip: "1.1.1.110", test: true},
        {ip: "127.0.0.1", test: true}
    ];

    ip4test.forEach(function (item) {
        it(item.ip + " -> " + util.inspect(item.test), function () {
            assert.deepEqual(
                ipNodule.fromLongToIPv4(
                    ipNodule.fomIPv4toLong(item.ip)
                ) === item.ip
                , item.test);
        });
    });

});