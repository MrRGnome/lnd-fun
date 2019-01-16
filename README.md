﻿# LND Dashboard

This is a dashboard for interacting with and inspecting your `lnd` node.

## Disclaimer

This project was a bit of a mess when I originally adopted it from http://lnd.fun. You may find some bugs.

Please submit PR's for these issues as you come across them. At the moment this is only tested on a Windows 10/lnd/bitcoind stack but the code to enable POSIX support has been added and just needs testing.

## Getting started

This assumes you have a running `lnd` node on the Bitcoin testnet, using default macaroon authentication. It also requires you have yarn and nodejs installed, you can find nodejs at https://nodejs.org/en/download/ and yarn at https://yarnpkg.com/lang/en/docs/install/

```bash
$ yarn install
```

The install scripts will help you create configuration files for LND dashboard including users and their permissions as well as whitelisted IP addresses. Once completed to start the dashboard use:

```bash
$ yarn start
```

Unless specified in the configuration file config.json or during the install process LND Dashboard will run on testnet. To run on mainnet pass the argument "--mainnet"

```bash
$ yarn start --mainnet
```
To reconfigure your node you can run the following at anytime to regenerate yoru config.json file

```bash
$ node install/setup
```

You can also edit the root config.json file directly after it is generated. You can find an example below:

```bash
{
	"host": "127.0.0.1",
	"network": "testnet",
	"whitelist": [
		"127.0.0.1",
		"::1",
		"localhost"
	],
	"guiport": 8888,
	"lnd_daemon": "127.0.0.1:10009",
	"users": [
		{"usename": "user", "password": "donotmanuallyinputpasswords,theyarehashes", "permission":"admin"}
    ],
    "cookieSecret": "dontmanuallyinput",
    "salt": "dontmanuallyinput"
}
```

'host' is the IP to listen to (set 0.0.0.0 to listen to all ipv4 - unrecommended and potential security issue)

'network' is the desired network to run on and implied location to look for macroons (non default macroon paths not yet supported)

'whitelist' is the requesting IP addresses allowed to interact with the wallet, by default only local addresses.

'guiport' is the port the dashboard GUI is hosted on

'lnd_daemon' is the location of your lightning nodes gRPC port

'users' is an array of users and their permissions. Valid permissions are 'admin', 'invoice', and 'readonly'. Users passwords should not be manually changed.

'cookieSecret' is used to sign authentication cookies and should be autogenerated by the install process. Do not change.

'salt' is the password salt used for hashing user passwords and is autogenerated by the install process. Do not change.


:zap: Go to [`https://127.0.0.1:8888`](https://127.0.0.1:8888), and you're done! :zap: