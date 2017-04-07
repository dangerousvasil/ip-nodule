# Simple IP module without dependency (for Node JS).

Creating module
```
var ipNodule = require("ip-nodule");
```

#### Validate IP.
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
#### Mask or CIDR diapason.
For net configuration you can use 
192.168.0.0/24 or 192.168.0.0/255.255.255.0
this method return CIDR diapason or false
```
var cidrDiapason =  fromMaskToCidr(24); // 24
var cidrDiapason =  fromMaskToCidr('255.255.255.0'); // 24 
var cidrDiapason =  fromMaskToCidr('255.245.255.0'); // false 

```

#### Get range of ip v4 addresses for current CIDR.
```
var range = ipNodule.cidrv4ToRange(cidr);
```
Method will return 
```
range = { start: '212.212.100.0', end: '212.212.100.255'};

```

  