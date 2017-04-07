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


ipNodule.prototype.fomIPv4toLong = function toInt(ip){
    var ipl=0;
    ip.split('.').forEach(function( octet ) {
        ipl<<=8;
        ipl+=parseInt(octet);
    });
    return(ipl >>>0);
};

ipNodule.prototype.fromLongToIPv4 = function fromInt(ipl){
    return ( (ipl>>>24) +'.' +
    (ipl>>16 & 255) +'.' +
    (ipl>>8 & 255) +'.' +
    (ipl & 255) );
};

ipNodule.prototype.cidrv4ToRange = function(cidrv4) {
    var range = {};
    cidrv4 = cidrv4.split('/');
    var net = parseInt(cidrv4[1]);
    range.start = this.fromLongToIPv4(this.fomIPv4toLong(cidrv4[0]) & ((-1 << (32 - net))));
    var start = this.fomIPv4toLong(range.start);
    range.end = this.fromLongToIPv4(start + Math.pow(2, (32 - net)) - 1);
    return range;
}

module.exports = ipNodule;