"use strict";

var assert = require("assert");
var util = require("util");

var ipNodule = require("../");

describe("ip-verions", function () {

    var ip4test = [
        {ip: "212.212.100.110", test: true},
        {ip: "255.255.255.110", test: true},
        {ip: "25e.255.255.110", test: false},
        {ip: "1.1.1.110", test: true},
        {ip: "0000:0000:0000:0000:0000:0000:0000:0001", test: false}
    ];

    ip4test.forEach(function (item) {
        it(item.ip + " -> " + util.inspect(item.test), function () {
            assert.deepEqual(ipNodule.checkIPv4(item.ip), item.test);
        });
    });

    var ip6test = [
        {ip: "212.212.100.110", test: true},
        {ip: "255.255.255.110", test: true},
        {ip: "1.1.1.110", test: true},
        {ip: "0000:0000:0000:0000:0000:0000:0000:0001", test: false}
    ];

    ip6test.forEach(function (item) {
        it(item.ip + " -> " + util.inspect((!item.test)), function () {
            assert.deepEqual(ipNodule.checkIPv6(item.ip), (!item.test));
        });
    });

    var ipversion = [
        {ip: "212.212.100.110", test: 4},
        {ip: "255.255.255.110", test: 4},
        {ip: "1.1.1.110", test: 4},
        {ip: "0000:0000:0000:0000:0000:0000:0000:0001", test: 6}
    ];

    ipversion.forEach(function (item) {
        it(item.ip + " -> " + util.inspect(item.test), function () {
            assert.deepEqual(ipNodule.getIpVersion(item.ip), item.test);
        });
    });
});