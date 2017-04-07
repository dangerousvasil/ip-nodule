"use strict";

/**
 * Check valid integer as string
 * @param i
 * @returns {boolean}
 */
function isNumber(i) {
    return (i == parseInt(i));
}

/**
 * Check ipv4 format
 * @param ipv4
 * @returns {boolean}
 */
function checkIPv4(ipv4) {
    var ip = ipv4.split(".");
    if (ip.length !== 4) {
        return false;
    }
    var valid = true;
    ip.forEach(function (octet, i) {
        if (!isNumber(octet) || octet > 255 || octet < 0) {
            valid = false;
        }
    });
    return valid;
}

/**
 * Check ip v6 format
 * @param ipv6
 * @returns {boolean}
 */
function checkIPv6(ipv6) {
    return (/^(?:[A-F0-9]{1,4}:){7}[A-F0-9]{1,4}$/ig).test(ipv6);
}

/**
 * Get version of ip
 * @param ip
 * @returns {number}
 */
function getIpVersion(ip) {
    if (this.checkIPv4(ip)) {
        return 4;
    } else if (this.checkIPv6(ip)) {
        return 6;
    }
    return 0;
}

/**
 * Convert ip to int
 * @param ip
 * @returns {number}
 */
function fomIPv4toLong(ip) {
    var ipl = 0;
    ip.split('.').forEach(function (octet) {
        ipl <<= 8;
        ipl += parseInt(octet);
    });
    return (ipl >>> 0);
}

/**
 * Convert int to ip
 * @param ipl
 * @returns {string}
 */
function fromLongToIPv4(ipl) {
    return ( (ipl >>> 24) + '.' +
    (ipl >> 16 & 255) + '.' +
    (ipl >> 8 & 255) + '.' +
    (ipl & 255) );
}
/**
 * Get CIDR start and end networking
 * @param netmask
 * @returns {{}}
 */
function convertCIDRv4ToRange(netmask) {
    var range = {};
    netmask = netmask.split('/');
    var mask = fromMaskToCidr(netmask[1]);
    if (!mask || !checkIPv4(netmask[0])) {
        return false;
    }
    range.start = this.fromLongToIPv4(this.fomIPv4toLong(netmask[0]) & ((-1 << (32 - mask))));
    var start = this.fomIPv4toLong(range.start);
    range.end = this.fromLongToIPv4(start + Math.pow(2, (32 - mask)) - 1);
    return range;
}
/**
 * For net configuration you can use 192.168.0.0/24 or 192.168.0.0/255.255.255.0
 * this method return CIDR diapason or false
 * @param mask
 * @returns {int}
 */
function fromMaskToCidr(mask) {
    if (isNumber(mask) && ( 0 < mask < 33)) {
        return mask;
    } else if (checkIPv4(mask)) {
        var match = fomIPv4toLong(mask).toString(2).split(/^(1*)0*$/gi);
        if (match[1] && !isNaN(match[1].length) && match[1].length) {
            return match[1].length;
        }
    }
    return false;
}

/**
 * Exports to soft
 */
exports.checkIPv4 = checkIPv4;
exports.checkIPv6 = checkIPv6;
exports.getIpVersion = getIpVersion;

exports.fromLongToIPv4 = fromLongToIPv4;
exports.fomIPv4toLong = fomIPv4toLong;

exports.convertCIDRv4ToRange = convertCIDRv4ToRange;
exports.generateCIDRv4Mask = fromMaskToCidr;