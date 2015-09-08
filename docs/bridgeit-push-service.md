#BridgeIt Push Service JavaScript API

## Push API

* [startPushService](#startPushService)
* [addPushListener](#addPushListener)
* [sendPushEvent](#sendPushEvent)

### <a name="startPushService"></a>startPushService

```javascript
function bridgeit.io.push.startPushService(params)
```

Initialize and start the BridgeIt Push service.

This will download the necessary code for the Push service, and set the necessary
connection settings for the push server.

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
bridgeit.io.push.startPushService({
		account: accountId,
		realm: realmId,
		accessToken: "d9f7463d-d100-42b6-aecd-ae21e38e5d02"
	})
}).then(function(){
	console.log('successfully initialized push service');
}).catch(function(error){
	console.log('something went wrong: ' + error);
});
```

### <a name="addPushListener"></a>addPushListener

```javascript
function bridgeit.io.push.addPushListener(params)
```

Add listener for notifications belonging to the specified group.

Callbacks must be in global scope for Cloud Push. 

In order to receive a cloud push, the client must also call `bridgeit.register()'. This will 
ensure that the BridgeIt Utility app is installed, and register the user for Cloud notifications.

#### Parameters

| Name | Description | Type | Default | Required |
| ---- | ----------- | ---- | ------- | -------- |
| account | BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used. | String | The last used account name | false |
| realm | The BridgeIt Services realm. If not provided, the last known BridgeIt Realm name will be used. | String | The last used realm name | false |
| accessToken | The BridgeIt authentication token. If not provided, the stored token from bridgeit.io.auth.connect() will be used | String | | false |
| host | The BridgeIt Services host url. If not supplied, the last used BridgeIt host, or the default will be used. | String | api.bridgeit.io | false |
| ssl | Whether to use SSL for network traffic | Boolean | false | false |
| group | The push group name to that will be listened to | String |  | true |
| callback | The callback to be fired when the push event for the group occurs. | Function or String |  | true |
| useCloudPush | Whether cloud push should be used for this listener | Boolean | true | false |

#### Return value

Promise with no arguments.

#### Example

```javascript
function globalFunction(){
	alert('push callback fired!');
}
bridgeit.io.push.addPushListener({
		account: accountId,
		realm: realmId,
		accessToken: "d9f7463d-d100-42b6-aecd-ae21e38e5d02",
		group: 'test',
		callback: globalFunction,
		useCloudPush: true
	})
}).then(function(){
	console.log('successfully added push listener');
}).catch(function(error){
	console.log('something went wrong: ' + error);
});
```

### <a name="removePushListener"></a>addPushListener

```javascript
function bridgeit.io.push.removePushListener(params)
```

Remove listeners for notifications belonging to the specified group.

#### Parameters

| Name | Description | Type | Default | Required |
| ---- | ----------- | ---- | ------- | -------- |
| account | BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used. | String | The last used account name | false |
| realm | The BridgeIt Services realm. If not provided, the last known BridgeIt Realm name will be used. | String | The last used realm name | false |
| accessToken | The BridgeIt authentication token. If not provided, the stored token from bridgeit.io.auth.connect() will be used | String | | false |
| host | The BridgeIt Services host url. If not supplied, the last used BridgeIt host, or the default will be used. | String | api.bridgeit.io | false |
| ssl | Whether to use SSL for network traffic | Boolean | false | false |
| group | The push group name to that will be listened to | String |  | true |

#### Return value

Promise with no arguments.

#### Example

```javascript
bridgeit.io.push.removePushListener({
		account: accountId,
		realm: realmId,
		accessToken: "d9f7463d-d100-42b6-aecd-ae21e38e5d02",
		group: 'test'
	})
}).then(function(){
	console.log('successfully remove push listeners');
}).catch(function(error){
	console.log('something went wrong: ' + error);
});
```

### <a name="sendPushEvent"></a>sendPushEvent

```javascript
function bridgeit.io.push.sendPushEvent(params)
```

Fire a push event and notify the push group.

#### Parameters

| Name | Description | Type | Default | Required |
| ---- | ----------- | ---- | ------- | -------- |
| account | BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used. | String | The last used account name | false |
| realm | The BridgeIt Services realm. If not provided, the last known BridgeIt Realm name will be used. | String | The last used realm name | false |
| accessToken | The BridgeIt authentication token. If not provided, the stored token from bridgeit.io.auth.connect() will be used | String | | false |
| host | The BridgeIt Services host url. If not supplied, the last used BridgeIt host, or the default will be used. | String | api.bridgeit.io | false |
| ssl | Whether to use SSL for network traffic | Boolean | false | false |
| group | The push group name to push to | String |  | true |
| subject | An optional subject heading for cloud push notifications | String |  | false |
| detail | An optional detail message for cloud push notifications | String |  | false |

#### Return value

Promise with no arguments.

#### Example

```javascript
bridgeit.io.push.sendPushEvent({
		account: accountId,
		realm: realmId,
		accessToken: "d9f7463d-d100-42b6-aecd-ae21e38e5d02",
		group: 'test',
		subject: 'New Update',
		detail: 'Please review the recents changes...'
	})
}).then(function(){
	console.log('successfully fired push event');
}).catch(function(error){
	console.log('something went wrong: ' + error);
});
```
