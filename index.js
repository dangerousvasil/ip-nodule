"use strict";

/**
 * Check ipv4 format
 * @param ipv4
 * @returns {boolean}
 */
function checkIPv4 (ipv4) {
    var ip = ipv4.split(".");
    if (ip.length !== 4) {
        return false;
    }
    var valid = true;
    ip.forEach(function (octet, i) {
        if (isNaN(octet) || octet > 255 || octet < 0) {
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
function checkIPv6 (ipv6) {
    return (/^(?:[A-F0-9]{1,4}:){7}[A-F0-9]{1,4}$/ig).test(ipv6);
 }

/**
 * Get version of ip
 * @param ip
 * @returns {number}
 */
function getIpVersion (ip) {
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
 * @param cidrv4
 * @returns {{}}
 */
function CIDRv4ToRange (cidrv4) {
    var range = { }
    cidrv4 = cidrv4.split('/');
    var net = parseInt(cidrv4[1]);
    range.start = this.fromLongToIPv4(this.fomIPv4toLong(cidrv4[0]) & ((-1 << (32 - net))));
    var start = this.fomIPv4toLong(range.start);
    range.end = this.fromLongToIPv4(start + Math.pow(2, (32 - net)) - 1);
    return range;
 }


exports.checkIPv4 = checkIPv4;
exports.checkIPv6 = checkIPv6;
exports.getIpVersion = getIpVersion;
exports.fromLongToIPv4 = fromLongToIPv4;
exports.fomIPv4toLong = fomIPv4toLong;
exports.CIDRv4ToRange = CIDRv4ToRange;