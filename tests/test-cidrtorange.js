"use strict";

var assert = require("assert");
var util = require("util");

var ipNodule = require("../");

describe("cidrv4-toRange", function () {

    var ip4test = [
        {
            cidr: "212.212.100.110/24", test: {
            broadcast: "212.212.100.255",
            end: "212.212.100.254",
            network: "212.212.100.0",
            start: "212.212.100.1"
        }},
        {
            cidr: "212.212.100.110/255.255.255.0", test: {
            broadcast: "212.212.100.255",
            end: "212.212.100.254",
            network: "212.212.100.0",
            start: "212.212.100.1"
        }},
        {cidr: "212.212.100.110/32", test: {start: '212.212.100.110', end: '212.212.100.110', broadcast: 'single IP'}},
        {
            cidr: "212.212.100.110/31",
            test: {start: '212.212.100.110', end: '212.212.100.111', broadcast: "point to point"}
        },
        {
            cidr: "212.212.100.110/255.255.255.255",
            test: {start: '212.212.100.110', end: '212.212.100.110', broadcast: 'single IP'}
        }
    ];

    ip4test.forEach(function (item) {
        it(item.cidr + " -> " + util.inspect(item.test), function () {
            assert.deepEqual(ipNodule.convertCIDRv4ToRange(item.cidr), item.test);
        });
    });


    var cidrtest = [
        {cidr: "24", test: 24},
        {cidr: "212.212.100.110", test: false},
        {cidr: "255.255.255.255", test: 32},
        {cidr: "224.0.0.0", test: 3},
        {cidr: "255.255.255.255", test: 32}
    ];

    cidrtest.forEach(function (item) {
        it(item.cidr + " -> " + util.inspect(item.test), function () {
            assert.deepEqual(ipNodule.generateCIDRv4Mask(item.cidr), item.test);
        });
    });

});