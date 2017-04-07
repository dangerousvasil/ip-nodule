# Simple IP module without dependency (for Node JS)

Creating module
```
var ipNodule = new (require("ip-nodule"))();
```

#### Validate IP
Validate V4
```
var isValid = ipNodule.checkIPv4(ipv4);
```
Validate V6
```
var isValid = ipNodule.checkIPv6(ipv6);
```
Get 4 or 6 if not valid return false
```
var version = ipNodule.getIpVersion(ip);
```

#### Get range of ip v4 addresses for current cidr.
```
var range = ipNodule.cidrv4ToRange(cidr);
```
Method will return 
```
range = { start: '212.212.100.0', end: '212.212.100.255'};

```