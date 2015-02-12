#BridgeIt Admin Service JavaScript API

## Admin API

* [getServiceDefinitions](#getServiceDefinitions)
* [getAccount](#getAccount)
* [getAccountRealms](#getAccountRealms)
* [getAccountRealm](#getAccountRealm)

## Realm User Admin API

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
| realm | The BridgeIt Services realm. If not provided, the last known BridgeIt Realm name will be used. | String | The last used realm name | false |
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
| String | The last used realm name | false |
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

### <a name="getAccountRealms"></a>getAccountRealms

```javascript
function bridgeit.io.admin.getAccountRealms(params)
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
bridgeit.io.admin.getAccountRealms({
		account: accountId,
		accessToken: "d9f7463d-d100-42b6-aecd-ae21e38e5d02"
	})
}).then(function(realms){
	console.log('found the following realms: ' + JSON.stringify(realms));
}).catch(function(error){
	console.log('something went wrong: ' + error);
});
```

### <a name="getAccountRealm"></a>getAccountRealm

```javascript
function bridgeit.io.admin.getAccountRealm(params)
```

Get a list of realms for an account.

#### Parameters

| Name | Description | Type | Default | Required |
| ---- | ----------- | ---- | ------- | -------- |
| account | BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used. | String | The last used account name | false |
| realm | The BridgeIt Services realm. If not provided, the last known BridgeIt Realm name will be used. | String | The last used realm name | false |
| accessToken | The BridgeIt authentication token. If not provided, the stored token from bridgeit.io.auth.connect() will be used | String | | false |
| host | The BridgeIt Services host url. If not supplied, the last used BridgeIt host, or the default will be used. | String | api.bridgeit.io | false |
| ssl | Whether to use SSL for network traffic | Boolean | false | false |
| realm | The realm name | String | | true |

#### Return value

Promise with a JSON object the realm information.

#### Example

```javascript
bridgeit.io.admin.getAccountRealm({
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

## Realm User Admin Functions

### <a name="getRealmUser"></a>getRealmUser

```javascript
function bridgeit.io.admin.getRealmUser(params)
```

Get a user for an account realm.

#### Parameters

| Name | Description | Type | Default | Required |
| ---- | ----------- | ---- | ------- | -------- |
| account | BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used. | String | The last used account name | false |
| realm | The BridgeIt Services realm. If not provided, the last known BridgeIt Realm name will be used. | String | The last used realm name | false |
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
| realm | The BridgeIt Services realm. If not provided, the last known BridgeIt Realm name will be used. | String | The last used realm name | false |
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
| realm | The BridgeIt Services realm. If not provided, the last known BridgeIt Realm name will be used. | String | The last used realm name | false |
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
| realm | The BridgeIt Services realm. If not provided, the last known BridgeIt Realm name will be used. | String | The last used realm name | false |
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
| realm | The BridgeIt Services realm. If not provided, the last known BridgeIt Realm name will be used. | String | The last used realm name | false |
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

