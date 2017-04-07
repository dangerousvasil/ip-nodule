"use strict";

var assert = require("assert");
var util = require("util");

var ipNodule = require("../");

describe("cidrv4-toRange", function () {

    var ip4test = [
        {cidr: "212.212.100.110/24", test: { start: '212.212.100.0', end: '212.212.100.255' }},
        {cidr: "212.212.100.110/32", test: { start: '212.212.100.110', end: '212.212.100.110' }}
    ];

    ip4test.forEach(function (item) {
        it(item.cidr + " -> " + util.inspect(item.test), function () {
            assert.deepEqual(ipNodule.CIDRv4ToRange(item.cidr), item.test);
        });
    });

});