"use strict";

/* eslint-env mocha */

var assert = require("assert");
var util = require("util");

var ipNodule = new (require("../"))();

describe("ip-inCidr", function () {

    console.log(ipNodule);
    var ip4test = [
        {ip: "212.212.100.110", test: true},
        {ip: "255.255.255.110", test: true},
        {ip: "1.1.1.110", test: true},
        {ip: "0000:0000:0000:0000:0000:0000:0000:0001", test: false}
    ];

    ip4test.forEach(function (item) {
        it(item.ip + " -> " + util.inspect(item.test), function () {
            assert.deepEqual(ipNodule.checkIPv4(item.ip), item.test);
        });
    });

    ip4test.forEach(function (item) {
        it(item.ip + " -> " + util.inspect((!item.test)), function () {
            assert.deepEqual(ipNodule.checkIPv6(item.ip), (!item.test));
        });
    });

    var ip4version = [
        {ip: "212.212.100.110", test: 4},
        {ip: "255.255.255.110", test: 4},
        {ip: "1.1.1.110", test: 4},
        {ip: "0000:0000:0000:0000:0000:0000:0000:0001", test: 6}
    ];

    ip4version.forEach(function (item) {
        it(item.ip + " -> " + util.inspect(item.test), function () {
            assert.deepEqual(ipNodule.getIpVersion(item.ip), item.test);
        });
    });
});