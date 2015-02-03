#BridgeIt Code Service JavaScript API

## Code API

* [start](#start)
* [stop](#stop)
* [restart](#restart)
* [executeFlow](#executeFlow)

### <a name="start"></a>start

```javascript
function bridgeit.io.code.start(params)
```

Creates and starts the code service for the specified realm if one doesn't yet
exist, or starts an existing one.

#### Parameters

| Name | Description | Type | Default | Required |
| ---- | ----------- | ---- | ------- | -------- |
| account | BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used. | String | The last used account name | false |
| realm | The BridgeIt Services realm. If not provided, the last known BridgeIt Realm name will be used. | String | The last used realm name | false |
| accessToken | The BridgeIt authentication token. If not provided, the stored token from bridgeit.io.auth.connect() will be used | String | | false |
| host | The BridgeIt Services host url. If not supplied, the last used BridgeIt host, or the default will be used. | String | api.bridgeit.io | false |
| ssl | Whether to use SSL for network traffic | Boolean | false | false |

#### Return value

Promise with no arguments.

#### Example

```javascript
bridgeit.io.code.start({
		account: accountId,
		realm: realmId,
		accessToken: "d9f7463d-d100-42b6-aecd-ae21e38e5d02"
	})
}).then(function(){
	console.log('successfully launched code service');
}).catch(function(error){
	console.log('something went wrong: ' + error);
});
```

### <a name="stop"></a>stop

```javascript
function bridgeit.io.code.stop(params)
```

Stop a running code service.

#### Parameters

| Name | Description | Type | Default | Required |
| ---- | ----------- | ---- | ------- | -------- |
| account | BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used. | String | The last used account name | false |
| realm | The BridgeIt Services realm. If not provided, the last known BridgeIt Realm name will be used. | String | The last used realm name | false |
| accessToken | The BridgeIt authentication token. If not provided, the stored token from bridgeit.io.auth.connect() will be used | String | | false |
| host | The BridgeIt Services host url. If not supplied, the last used BridgeIt host, or the default will be used. | String | api.bridgeit.io | false |
| ssl | Whether to use SSL for network traffic | Boolean | false | false |

#### Return value

Promise with no arguments.

#### Example

```javascript
bridgeit.io.code.stop({
		account: accountId,
		realm: realmId,
		accessToken: "d9f7463d-d100-42b6-aecd-ae21e38e5d02"
	})
}).then(function(){
	console.log('successfully stopped the code service');
}).catch(function(error){
	console.log('something went wrong: ' + error);
});
```

### <a name="restart"></a>restart

```javascript
function bridgeit.io.code.restart(params)
```

Restart the code service for a realm.

#### Parameters

| Name | Description | Type | Default | Required |
| ---- | ----------- | ---- | ------- | -------- |
| account | BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used. | String | The last used account name | false |
| realm | The BridgeIt Services realm. If not provided, the last known BridgeIt Realm name will be used. | String | The last used realm name | false |
| accessToken | The BridgeIt authentication token. If not provided, the stored token from bridgeit.io.auth.connect() will be used | String | | false |
| host | The BridgeIt Services host url. If not supplied, the last used BridgeIt host, or the default will be used. | String | api.bridgeit.io | false |
| ssl | Whether to use SSL for network traffic | Boolean | false | false |

#### Return value

Promise with no arguments.

#### Example

```javascript
bridgeit.io.code.restart({
		account: accountId,
		realm: realmId,
		accessToken: "d9f7463d-d100-42b6-aecd-ae21e38e5d02"
	})
}).then(function(){
	console.log('successfully restarted code service');
}).catch(function(error){
	console.log('something went wrong: ' + error);
});
```

### <a name="executeFlow"></a>executeFlow

```javascript
function bridgeit.io.code.executeFlow(params)
```

Executes a code flow in the BridgeIt Code service.

#### Parameters

| Name | Description | Type | Default | Required |
| ---- | ----------- | ---- | ------- | -------- |
| account | BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used. | String | The last used account name | false |
| realm | The BridgeIt Services realm. If not provided, the last known BridgeIt Realm name will be used. | String | The last used realm name | false |
| accessToken | The BridgeIt authentication token. If not provided, the stored token from bridgeit.io.auth.connect() will be used | String | | false |
| host | The BridgeIt Services host url. If not supplied, the last used BridgeIt host, or the default will be used. | String | api.bridgeit.io | false |
| ssl | Whether to use SSL for network traffic | Boolean | false | false |
| flow | The code flow name | String |  | true |
| data | Data to be passed to the code flow | Object |  | false |
| httpMethod | 'get' or 'post' | String | 'post' | false |

#### Return value

Promise with no arguments.

#### Example

```javascript
bridgeit.io.code.executeFlow({
		account: accountId,
		realm: realmId,
		accessToken: "d9f7463d-d100-42b6-aecd-ae21e38e5d02"
		flow: 'udpateUserAndEmailManagers',
		httpMethod: 'post',
		data: {
			username: 'user1',
			email: 'email@biz.com'
		}
	})
}).then(function(){
	console.log('successfully launched code flow');
}).catch(function(error){
	console.log('something went wrong: ' + error);
});
```