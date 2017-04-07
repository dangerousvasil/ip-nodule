"use strict";

var ipNodule = function ipNodule() {
    if (!(this instanceof ipNodule)) {
        return new ipNodule();
    }
};

/**
 * Check ipv4 format
 * @param ipv4
 * @returns {boolean}
 */
ipNodule.prototype.checkIPv4 = function (ipv4) {
    var valid = true;
    var ip = ipv4.split(".");
    if(ip.length !== 4) {
        return false;
    }
    ip.forEach(function (octet, i) {
        if (octet != parseInt(octet)
            || octet > 255
            || octet < 0) {
            valid = false;
        }
    });
    return valid;
};

/**
 * Check ip v6 format
 * @param ipv6
 * @returns {boolean}
 */
ipNodule.prototype.checkIPv6 = function (ipv6) {
    return (/^(?:[A-F0-9]{1,4}:){7}[A-F0-9]{1,4}$/ig).test(ipv6);
};

/**
 * Get version of ip
 * @param ip
 * @returns {number}
 */
ipNodule.prototype.getIpVersion = function (ip) {
    if (this.checkIPv4(ip)) {
        return 4;
    } else if (this.checkIPv6(ip)) {
        return 6;
    }
    return 0;
};

/**
 * Convert ip to int
 * @param ip
 * @returns {number}
 */
ipNodule.prototype.fomIPv4toLong = function toInt(ip) {
    var ipl = 0;
    ip.split('.').forEach(function (octet) {
        ipl <<= 8;
        ipl += parseInt(octet);
    });
    return (ipl >>> 0);
};

/**
 * Convert int to ip
 * @param ipl
 * @returns {string}
 */
ipNodule.prototype.fromLongToIPv4 = function fromInt(ipl) {
    return ( (ipl >>> 24) + '.' +
    (ipl >> 16 & 255) + '.' +
    (ipl >> 8 & 255) + '.' +
    (ipl & 255) );
};
/**
 * Get CIDR start and end networking
 * @param cidrv4
 * @returns {{}}
 */
ipNodule.prototype.cidrv4ToRange = function (cidrv4) {
    var range = {};
    cidrv4 = cidrv4.split('/');
    var net = parseInt(cidrv4[1]);
    range.start = this.fromLongToIPv4(this.fomIPv4toLong(cidrv4[0]) & ((-1 << (32 - net))));
    var start = this.fomIPv4toLong(range.start);
    range.end = this.fromLongToIPv4(start + Math.pow(2, (32 - net)) - 1);
    return range;
};

module.exports = ipNodule;