#BridgeIt Admin Service JavaScript API

## Admin API

* [getServiceDefinitions](#getServiceDefinitions)
* [getAccount](#getAccount)

## Realm API

* [getRealms](#getRealms)
* [getRealm](#getRealm)
* [createRealm](#createRealm)
* [updateRealm](#updateRealm)
* [deleteRealm](#deleteRealm)

## User API

* [getRealmUser](#getRealmUser)
* [getRealmUsers](#getRealmUsers)
* [createRealmUser](#createRealmUser)
* [updateRealmUser](#updateRealmUser)
* [deleteRealmUser](#deleteRealmUser)

### <a name="getServiceDefinitions"></a>getServiceDefinitions

```javascript
function bridgeit.io.admin.getServiceDefinitions(params)
```

Get the BridgeIt Service definitions.

#### Parameters

| Name | Description | Type | Default | Required |
| ---- | ----------- | ---- | ------- | -------- |
| account | BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used. | String | The last used account name | false |
| accessToken | The BridgeIt authentication token. If not provided, the stored token from bridgeit.io.auth.connect() will be used | String | | false |
| host | The BridgeIt Services host url. If not supplied, the last used BridgeIt host, or the default will be used. | String | api.bridgeit.io | false |
| ssl | Whether to use SSL for network traffic | Boolean | false | false |

#### Return value

Promise with a JSON object containing a list of BridgeIt services.

#### Example

```javascript
bridgeit.io.admin.getServiceDefinitions({
		account: accountId,
		accessToken: "d9f7463d-d100-42b6-aecd-ae21e38e5d02"
	})
}).then(function(services){
	console.log('found the following bridgeit services: ' + JSON.stringify(services));
}).catch(function(error){
	console.log('something went wrong: ' + error);
});
```

### <a name="getAccount"></a>getAccount

```javascript
function bridgeit.io.admin.getAccount(params)
```

Get information for the current account, including a list of admins, and realms.

#### Parameters

| Name | Description | Type | Default | Required |
| ---- | ----------- | ---- | ------- | -------- |
| account | BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used. | String | The last used account name | false |
| accessToken | The BridgeIt authentication token. If not provided, the stored token from bridgeit.io.auth.connect() will be used | String | | false |
| host | The BridgeIt Services host url. If not supplied, the last used BridgeIt host, or the default will be used. | String | api.bridgeit.io | false |
| ssl | Whether to use SSL for network traffic | Boolean | false | false |

#### Return value

Promise with a JSON object containing a the account.

#### Example

```javascript
bridgeit.io.admin.getAccount({
		account: accountId,
		accessToken: "d9f7463d-d100-42b6-aecd-ae21e38e5d02"
	})
}).then(function(account){
	console.log('found the following account: ' + JSON.stringify(account));
}).catch(function(error){
	console.log('something went wrong: ' + error);
});
```

## Realm Admin Functions

### <a name="getRealms"></a>getRealms

```javascript
function bridgeit.io.admin.getRealms(params)
```

Get a list of realms for an account.

#### Parameters

| Name | Description | Type | Default | Required |
| ---- | ----------- | ---- | ------- | -------- |
| account | BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used. | String | The last used account name | false |
| accessToken | The BridgeIt authentication token. If not provided, the stored token from bridgeit.io.auth.connect() will be used | String | | false |
| host | The BridgeIt Services host url. If not supplied, the last used BridgeIt host, or the default will be used. | String | api.bridgeit.io | false |
| ssl | Whether to use SSL for network traffic | Boolean | false | false |

#### Return value

Promise with a JSON object with a list of realm objects.

#### Example

```javascript
bridgeit.io.admin.getRealms({
		account: accountId,
		accessToken: "d9f7463d-d100-42b6-aecd-ae21e38e5d02"
	})
}).then(function(realms){
	console.log('found the following realms: ' + JSON.stringify(realms));
}).catch(function(error){
	console.log('something went wrong: ' + error);
});
```

### <a name="getRealm"></a>getRealm

```javascript
function bridgeit.io.admin.getRealm(params)
```

Get a list of realms for an account.

#### Parameters

| Name | Description | Type | Default | Required |
| ---- | ----------- | ---- | ------- | -------- |
| account | BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used. | String | The last used account name | false |
| realmName | The BridgeIt Services realm name. If not provided, the last known BridgeIt Realm name will be used. | String | The last used realm name | false |
| accessToken | The BridgeIt authentication token. If not provided, the stored token from bridgeit.io.auth.connect() will be used | String | | false |
| host | The BridgeIt Services host url. If not supplied, the last used BridgeIt host, or the default will be used. | String | api.bridgeit.io | false |
| ssl | Whether to use SSL for network traffic | Boolean | false | false |
| realm | The realm name | String | | true |

#### Return value

Promise with a JSON object the realm information.

#### Example

```javascript
bridgeit.io.admin.getRealm({
		account: accountId,
		accessToken: "d9f7463d-d100-42b6-aecd-ae21e38e5d02",
		realm: 'nargles.net'
	})
}).then(function(realm){
	console.log('found the following realm: ' + JSON.stringify(realm));
}).catch(function(error){
	console.log('something went wrong: ' + error);
});
```

### <a name="createRealm"></a>createRealm

```javascript
function bridgeit.io.admin.createRealm(params)
```

Create a new realm for an account.

A realm object should have the following structure:

```
{
	name: <string>,
	disabled: true|false(default),
	permissions: [], //list of default permissions for all users
	services: [], //list of provided services for the realm
	origins: [], //list of host origins who are allowed access to the realm,
	tsa_enable: true|false(default) //enable or disable two stage authentication
}
```

An example of a realm definition is:

```
{
	"name": "nargles.net"
	"disabled": false,
	"permissions": [
		"bridgeit.metrics.doGet",
		"bridgeit.metrics.doPut",
		"bridgeit.metrics.doPost",
		"bridgeit.push.listen",
		"bridgeit.media.convert",
		"bridgeit.locate.saveLocation",
		"bridgeit.locate.getLocation",
		"bridgeit.doc.getDocument",
		"bridgeit.locate.deleteLocation",
		"bridgeit.locate.saveRegion",
		"bridgeit.locate.getRegion",
		"bridgeit.locate.getDevicesInRegion",
		"bridgeit.locate.deleteRegion",
		"bridgeit.locate.updateRegion",
		"bridgeit.locate.saveMonitor",
		"bridgeit.locate.getMonitor",
		"bridgeit.locate.deleteMonitor",
		"bridgeit.locate.updateMonitor",
		"bridgeit.code.write",
		"bridgeit.doc.saveDocument"
	],
	"services": [
		"bridgeit.code",
		"bridgeit.doc",
		"bridgeit.locate",
		"bridgeit.media",
		"bridgeit.metrics",
		"bridgeit.push",
		"bridgeit.store"
	],
	"origins": ["*"],
	"tsa_enable": true
}
```


#### Parameters

| Name | Description | Type | Default | Required |
| ---- | ----------- | ---- | ------- | -------- |
| account | BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used. | String | The last used account name | false |
| realm | The realm object to create. | Object |  | true |
| accessToken | The BridgeIt authentication token. If not provided, the stored token from bridgeit.io.auth.connect() will be used | String | | false |
| host | The BridgeIt Services host url. If not supplied, the last used BridgeIt host, or the default will be used. | String | api.bridgeit.io | false |
| ssl | Whether to use SSL for network traffic | Boolean | false | false |
| realm | The realm name | String | | true |

#### Return value

Promise with a JSON object the realm information.

#### Example

```javascript
bridgeit.io.admin.createRealm({
		account: accountId,
		accessToken: "d9f7463d-d100-42b6-aecd-ae21e38e5d02",
		realm: {
			name: 'myNewRealm',
			origins: ['*'],
			services: ["bridgeit.doc","bridgeit.locate","bridgeit.store"]
		}
	})
}).then(function(realm){
	console.log('found the following realm: ' + JSON.stringify(realm));
}).catch(function(error){
	console.log('something went wrong: ' + error);
});
```

### <a name="updateRealm"></a>updateRealm

```javascript
function bridgeit.io.admin.updateRealm(params)
```

Update a realm for an account.

#### Parameters

| Name | Description | Type | Default | Required |
| ---- | ----------- | ---- | ------- | -------- |
| account | BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used. | String | The last used account name | false |
| realm | The realm object to update. | Object |  | true |
| accessToken | The BridgeIt authentication token. If not provided, the stored token from bridgeit.io.auth.connect() will be used | String | | false |
| host | The BridgeIt Services host url. If not supplied, the last used BridgeIt host, or the default will be used. | String | api.bridgeit.io | false |
| ssl | Whether to use SSL for network traffic | Boolean | false | false |
| realm | The realm name | String | | true |

#### Return value

Promise with a JSON object the realm information.

#### Example

```javascript
bridgeit.io.admin.updateRealm({
		account: accountId,
		accessToken: "d9f7463d-d100-42b6-aecd-ae21e38e5d02",
		realm: {
			name: 'realmName',
			origins: ['*'],
			services: ["bridgeit.doc","bridgeit.locate","bridgeit.store"]
		}
	})
}).then(function(realm){
	console.log('found the following realm: ' + JSON.stringify(realm));
}).catch(function(error){
	console.log('something went wrong: ' + error);
});
```

### <a name="deleteRealm"></a>deleteRealm

```javascript
function bridgeit.io.admin.deleteRealm(params)
```

Update a realm for an account.

#### Parameters

| Name | Description | Type | Default | Required |
| ---- | ----------- | ---- | ------- | -------- |
| account | BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used. | String | The last used account name | false |
| realmName | The BridgeIt Services realm name. If not provided, the last known BridgeIt Realm name will be used. | String | The last used realm name | false |
| accessToken | The BridgeIt authentication token. If not provided, the stored token from bridgeit.io.auth.connect() will be used | String | | false |
| host | The BridgeIt Services host url. If not supplied, the last used BridgeIt host, or the default will be used. | String | api.bridgeit.io | false |
| ssl | Whether to use SSL for network traffic | Boolean | false | false |
| realm | The realm name | String | | true |

#### Return value

Promise with a JSON object the realm information.

#### Example

```javascript
bridgeit.io.admin.deleteRealm({
		account: accountId,
		accessToken: "d9f7463d-d100-42b6-aecd-ae21e38e5d02",
		realmName: 'nargles.net'
	})
}).then(function(realm){
	console.log('found the following realm: ' + JSON.stringify(realm));
}).catch(function(error){
	console.log('something went wrong: ' + error);
});
```

## User Admin Functions

### <a name="getRealmUser"></a>getRealmUser

```javascript
function bridgeit.io.admin.getRealmUser(params)
```

Get a user for an account realm.

#### Parameters

| Name | Description | Type | Default | Required |
| ---- | ----------- | ---- | ------- | -------- |
| account | BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used. | String | The last used account name | false |
| realmName | The BridgeIt Services realm name. If not provided, the last known BridgeIt Realm name will be used. | String | The last used realm name | false |
| accessToken | The BridgeIt authentication token. If not provided, the stored token from bridgeit.io.auth.connect() will be used | String | | false |
| host | The BridgeIt Services host url. If not supplied, the last used BridgeIt host, or the default will be used. | String | api.bridgeit.io | false |
| ssl | Whether to use SSL for network traffic | Boolean | false | false |
| username | The user id | String | | true |

#### Return value

Promise with a JSON object the user information.

#### Example

```javascript
bridgeit.io.admin.getRealmUser({
		account: accountId,
		realm: 'nargles.net'
		accessToken: "d9f7463d-d100-42b6-aecd-ae21e38e5d02",
		username: 'johnsmith'
	})
}).then(function(user){
	console.log('found the following user: ' + JSON.stringify(user));
}).catch(function(error){
	console.log('something went wrong: ' + error);
});
```

### <a name="getRealmUsers"></a>getRealmUsers

```javascript
function bridgeit.io.admin.getRealmUsers(params)
```

Get the users for an account realm.

#### Parameters

| Name | Description | Type | Default | Required |
| ---- | ----------- | ---- | ------- | -------- |
| account | BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used. | String | The last used account name | false |
| realmName | The BridgeIt Services realm name. If not provided, the last known BridgeIt Realm name will be used. | String | The last used realm name | false |
| accessToken | The BridgeIt authentication token. If not provided, the stored token from bridgeit.io.auth.connect() will be used | String | | false |
| host | The BridgeIt Services host url. If not supplied, the last used BridgeIt host, or the default will be used. | String | api.bridgeit.io | false |
| ssl | Whether to use SSL for network traffic | Boolean | false | false |

#### Return value

Promise with a JSON object containing a list of realm users.

#### Example

```javascript
bridgeit.io.admin.getRealmUsers({
		account: accountId,
		realm: 'nargles.net'
		accessToken: "d9f7463d-d100-42b6-aecd-ae21e38e5d02"
	})
}).then(function(users){
	console.log('found the following users: ' + JSON.stringify(users));
}).catch(function(error){
	console.log('something went wrong: ' + error);
});
```


### <a name="createRealmUser"></a>createRealmUser

```javascript
function bridgeit.io.admin.createRealmUser(params)
```

Create a new user for an account realm.

#### Parameters

| Name | Description | Type | Default | Required |
| ---- | ----------- | ---- | ------- | -------- |
| account | BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used. | String | The last used account name | false |
| realmName | The BridgeIt Services realm name. If not provided, the last known BridgeIt Realm name will be used. | String | The last used realm name | false |
| accessToken | The BridgeIt authentication token. If not provided, the stored token from bridgeit.io.auth.connect() will be used | String | | false |
| host | The BridgeIt Services host url. If not supplied, the last used BridgeIt host, or the default will be used. | String | api.bridgeit.io | false |
| ssl | Whether to use SSL for network traffic | Boolean | false | false |
| user | The user record to create | Object | | true |

#### Return value

Promise with the new resource URL.

#### Example

```javascript
bridgeit.io.admin.createRealmUser({
		account: accountId,
		realm: 'nargles.net'
		accessToken: "d9f7463d-d100-42b6-aecd-ae21e38e5d02",
		user:  {
			username: 'test_' + new Date().getTime(),
			firstname: 'test',
			lastname: 'test',
			email: 'test@email.com',
			password: 'password'
		}
	})
}).then(function(url){
	console.log('created the new user: ' + url);
}).catch(function(error){
	console.log('something went wrong: ' + error);
});
```

### <a name="updateRealmUser"></a>updateRealmUser

```javascript
function bridgeit.io.admin.updateRealmUser(params)
```

Update a user for an account realm.

#### Parameters

| Name | Description | Type | Default | Required |
| ---- | ----------- | ---- | ------- | -------- |
| account | BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used. | String | The last used account name | false |
| realmName | The BridgeIt Services realm name. If not provided, the last known BridgeIt Realm name will be used. | String | The last used realm name | false |
| accessToken | The BridgeIt authentication token. If not provided, the stored token from bridgeit.io.auth.connect() will be used | String | | false |
| host | The BridgeIt Services host url. If not supplied, the last used BridgeIt host, or the default will be used. | String | api.bridgeit.io | false |
| ssl | Whether to use SSL for network traffic | Boolean | false | false |
| user | The user record to update | Object | | true |

#### Return value

Promise with the new resource URL.

#### Example

```javascript
bridgeit.io.admin.updateRealmUser({
		account: accountId,
		realm: 'nargles.net'
		accessToken: "d9f7463d-d100-42b6-aecd-ae21e38e5d02",
		user:  {
			username: 'test_' + new Date().getTime(),
			firstname: 'test',
			lastname: 'test',
			email: 'test@email.com',
			password: 'password'
		}
	})
}).then(function(url){
	console.log('updated the user: ' + url);
}).catch(function(error){
	console.log('something went wrong: ' + error);
});
```

### <a name="deleteRealmUser"></a>deleteRealmUser

```javascript
function bridgeit.io.admin.deleteRealmUser(params)
```

Delete a realm user for an account.

#### Parameters

| Name | Description | Type | Default | Required |
| ---- | ----------- | ---- | ------- | -------- |
| account | BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used. | String | The last used account name | false |
| realmName | The BridgeIt Services realm name. If not provided, the last known BridgeIt Realm name will be used. | String | The last used realm name | false |
| accessToken | The BridgeIt authentication token. If not provided, the stored token from bridgeit.io.auth.connect() will be used | String | | false |
| host | The BridgeIt Services host url. If not supplied, the last used BridgeIt host, or the default will be used. | String | api.bridgeit.io | false |
| ssl | Whether to use SSL for network traffic | Boolean | false | false |
| username | The user name to delete | String | | true |

#### Return value

Promise with the new resource URL.

#### Example

```javascript
bridgeit.io.admin.deleteRealmUser({
		account: accountId,
		realm: 'nargles.net'
		accessToken: "d9f7463d-d100-42b6-aecd-ae21e38e5d02",
		username: 'userABC'
	})
}).then(function(){
	console.log('deleted the user');
}).catch(function(error){
	console.log('something went wrong: ' + error);
});
```

