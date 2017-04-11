"use strict";

/**
 * Check valid integer as string
 * @param i
 * @returns {boolean}
 */
function isNumber(i) {
    return (i == parseInt(i));
}

var ipNodule = {
    errors: [],

    addError: function (error) {
        this.errors.push(error);
    },
    clearError: function () {
        this.errors = [];
    },
    getError: function () {
        return this.errors;
    },
    /**
     * Check ipv4 format
     * @param ipv4
     * @returns {boolean}
     */
    checkIPv4: function (ipv4) {
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
    },

    /**
     * Check ip v6 format
     * @param ipv6
     * @returns {boolean}
     */
    checkIPv6: function (ipv6) {
        return (/^(?:[A-F0-9]{1,4}:){7}[A-F0-9]{1,4}$/ig).test(ipv6);
    },

    /**
     * Get version of ip
     * @param ip
     * @returns {number}
     */
    getIpVersion: function (ip) {
        if (this.checkIPv4(ip)) {
            return 4;
        } else if (this.checkIPv6(ip)) {
            return 6;
        }
        return 0;
    },

    /**
     * Convert ip to int
     * @param ip
     * @returns {number}
     */
    fomIPv4toLong: function (ip) {
        var ipl = 0;
        ip.split('.').forEach(function (octet) {
            ipl <<= 8;
            ipl += parseInt(octet);
        });
        return (ipl >>> 0);
    },

    /**
     * Convert int to ip
     * @param ipl
     * @returns {string}
     */
    fromLongToIPv4: function (ipl) {
        return ( (ipl >>> 24) + '.' +
        (ipl >> 16 & 255) + '.' +
        (ipl >> 8 & 255) + '.' +
        (ipl & 255) );
    },
    /**
     * Get CIDR start and end networking
     * @param netmask
     * @returns {{}}
     */
    convertCIDRv4ToRange: function (netmask) {
        this.clearError();
        var range = {};
        netmask = netmask.split('/');
        var mask = this.generateCIDRv4Mask(netmask[1]);
        if (!mask || !this.checkIPv4(netmask[0])) {
            this.addError('Invalid net/mask');
            return false;
        }
        var start = this.fomIPv4toLong(netmask[0]) & ((-1 << (32 - mask)));
        var end = start + Math.pow(2, (32 - mask)) - 1;

        if (mask == 32) {
            range.start = this.fromLongToIPv4(start);
            range.broadcast = 'single IP';
            range.end = this.fromLongToIPv4(end);
        } else if (mask == 31) {
            range.start = this.fromLongToIPv4(start);
            range.broadcast = 'point to point';
            range.end = this.fromLongToIPv4(end);
        } else {
            range.network = this.fromLongToIPv4(start);
            range.start = this.fromLongToIPv4(start + 1);
            range.end = this.fromLongToIPv4(end - 1);
            range.broadcast = this.fromLongToIPv4(end);
        }
        return range;
    },
    /**
     * For net configuration you can use 192.168.0.0/24 or 192.168.0.0/255.255.255.0
     * this method return CIDR diapason or false
     * @param mask
     * @returns {int}
     */
    generateCIDRv4Mask: function (mask) {
        if (isNumber(mask) && ( 0 < mask < 33)) {
            return mask;
        } else if (this.checkIPv4(mask)) {
            var match = this.fomIPv4toLong(mask).toString(2).split(/^(1*)0*$/gi);
            if (match[1] && !isNaN(match[1].length) && match[1].length) {
                return match[1].length;
            }
        }
        this.addError('Invalid mask');
        return false;
    }
};

/**
 * Exports to soft
 */
module.exports = ipNodule;
