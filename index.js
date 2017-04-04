"use strict";

var ipNodule = function ipNodule() {
    if (!(this instanceof ipNodule)) {
        return new ipNodule();
    }
};

ipNodule.prototype.checkIPv4 = function (ipv4) {
    //Check Format
    var ip = ipv4.split(".");
    if (ip.length != 4) {
        return false;
    }
    //Check parts
    for (var c = 0; c < 4; c++) {
        if (isNaN(parseFloat(ip[c]))
            || !isFinite(ip[c])
            || ip[c] < 0
            || ip[c] > 255
            || ip[c].indexOf(" ") !== -1
            || ip[c].match(/^-\d+$/)) {
            return false;
        }
    }
    return true;
};

ipNodule.prototype.checkIPv6 = function(ipv6) {
    return (/^(?:[A-F0-9]{1,4}:){7}[A-F0-9]{1,4}$/ig).test(ipv6);
};

ipNodule.prototype.getIpVersion = function(ip) {
    if (this.checkIPv4(ip)) {
        return 4;
    } else if (this.checkIPv6(ip)) {
        return 6;
    }
    return 0;
};

module.exports = ipNodule;