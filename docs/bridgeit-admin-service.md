#BridgeIt Admin Service JavaScript API

## Admin API

* [getServiceDefinitions](#getServiceDefinitions)
* [getAccount](#getAccount)
* [createAccount](#createAccount)
* [getLogs](#getLogs)

## Realm API

* [getRealms](#getRealms)
* [getRealm](#getRealm)
* [createRealm](#createRealm)
* [cloneRealm](#cloneRealm)
* [updateRealm](#updateRealm)
* [deleteRealm](#deleteRealm)

## User API

* [getRealmUser](#getRealmUser)
* [getRealmUsers](#getRealmUsers)
* [createRealmUser](#createRealmUser)
* [updateRealmUser](#updateRealmUser)
* [deleteRealmUser](#deleteRealmUser)

## Role API

* [getRealmRoles](#getRealmRoles)
* [createRealmRole](#createRealmRole)
* [updateRealmRole](#updateRealmRole)
* [deleteRealmRole](#deleteRealmRole)

## [Error Codes](#errorCodes)


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

#### Return value

Promise with a JSON object containing a list of BridgeIt services.

eg.

```json
{
  "services": [
    {
      "name": "bridgeit.store",
      "cost": "Call us for details",
      "description": "The Bridgeit storage service for all your content storage needs",
      "permissions": [
        "bridgeit.store.blob.readSelf",
        "bridgeit.store.blob.readAll",
        "bridgeit.store.blob.writeSelf",
        "bridgeit.store.blob.writeAll"
      ]
    },
    {
      "name": "bridgeit.evemt",
      "cost": "Call us for details",
      "description": "The Bridgeit event service measures all your measurable needs",
      "permissions": [
        "bridgeit.event.doGet",
        "bridgeit.event.doPut",
        "bridgeit.event.doPost",
        "bridgeit.event.doDelete"
      ]
    },
    {
      "name": "bridgeit.code",
      "cost": "Call us for details",
      "description": "The Bridgeit code service allows the creation of user defined linkable code structures",
      "permissions": [
        "bridgeit.code.write"
      ]
    },
    {
      "name": "bridgeit.push",
      "cost": "Call us for details",
      "description": "The Bridgeit push service for all your push needs",
      "permissions": [
        "bridgeit.push.modifyGroup",
        "bridgeit.push.pushSelf",
        "bridgeit.push.pushCloudSelf",
        "bridgeit.push.adminGroup",
        "bridgeit.push.pushAll",
        "bridgeit.push.pushCloudAll",
        "bridgeit.push.listen",
        "bridgeit.push.notificationProviderAPNS",
        "bridgeit.push.notificationProviderAmazonSNS",
        "bridgeit.push.notificationProviderBPNS",
        "bridgeit.push.notificationProviderEmail",
        "bridgeit.push.notificationProviderGCM",
        "bridgeit.push.notificationProviderTwilioSMS",
        "bridgeit.push.notificationProviderWNS"
      ]
    },
    {
      "name": "bridgeit.media",
      "description": "The Bridgeit media service processes media elements",
      "permissions": [
        "bridgeit.media.convert"
      ]
    },
    {
      "name": "bridgeit.locate",
      "description": "The Bridgeit family of location services",
      "cost": "Call us for details",
      "permissions": [
        "bridgeit.locate.saveLocation",
        "bridgeit.locate.getLocation",
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
        "bridgeit.locate.savePointOfInterest",
        "bridgeit.locate.getPointOfInterest",
        "bridgeit.locate.deletePointOfInterest",
        "bridgeit.locate.updatePointOfInterest"
      ]
    },
    {
      "name": "bridgeit.doc",
      "description": "The Bridgeit document storage service",
      "cost": "Call us for details",
      "permissions": [
        "bridgeit.doc.saveDocument",
        "bridgeit.doc.getDocument",
        "bridgeit.doc.deleteDocument",
        "bridgeit.doc.updateDocument"
      ]
    },
    {
      "name": "bridgeit.starter",
      "description": "The Bridgeit starter service",
      "cost": "Call us for details",
      "permissions": [
        "bridgeit.starter.postMessage",
        "bridgeit.starter.getMessage",
        "bridgeit.starter.putMessage",
        "bridgeit.starter.deleteMessage"
      ]
    },
    {
      "name": "bridgeit.query",
      "description": "The Bridgeit query service",
      "cost": "Call us for details",
      "permissions": [
        "bridgeit.query.saveQuery",
        "bridgeit.query.getQuery",
        "bridgeit.query.deleteQuery",
        "bridgeit.query.updateQuery"
      ]
    },
    {
      "name": "bridgeit.context",
      "description": "The Bridgeit context service",
      "cost": "Call us for details",
      "permissions": [
        "bridgeit.context.user.readSelf",
        "bridgeit.context.user.writeSelf",
        "bridgeit.context.user.readAny",
        "bridgeit.context.user.writeAny",
        "bridgeit.context.readSelf",
        "bridgeit.context.writeSelf",
        "bridgeit.context.executeSelf",
        "bridgeit.context.readAny",
        "bridgeit.context.writeAny",
        "bridgeit.context.executeAny"
      ]
    }
  ]
}
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

#### Return value

Promise with a JSON object containing a the account.

```json
{
  "account": {
    "accountname": "bsrtests",
    "admins": [
      {
        "email": "pbreau@icesoft.com",
        "firstname": "Philip",
        "lastname": "Breau",
        "username": "admin",
        "service": {
          "permissions": []
        },
        "roles": [
          "admin"
        ],
        "permissions": [
          "bridgeit.auth.viewAccount",
          "bridgeit.auth.createAccount",
          "bridgeit.auth.editAccount",
          "bridgeit.auth.deleteAccount",
          "bridgeit.auth.createUser",
          "bridgeit.auth.viewUser",
          "bridgeit.auth.editUser",
          "bridgeit.auth.deleteUser",
          "bridgeit.auth.viewServices",
          "bridgeit.auth.createApplication",
          "bridgeit.auth.viewApplication",
          "bridgeit.auth.editApplication",
          "bridgeit.auth.deleteApplication",
          "bridgeit.auth.registerContext",
          "bridgeit.auth.createContext",
          "bridgeit.auth.deleteContext",
          "bridgeit.auth.editContext"
        ],
        "disabled": false
      }
    ],
    "description": "bsr test account",
    "realms": [
      {
        "services": [
          "bridgeit.doc",
          "bridgeit.locate",
          "bridgeit.store"
        ],
        "origins": [
          "*"
        ],
        "disabled": false,
        "name": "test_1436189756205"
      },
      {
        "roles": [],
        "tsa_enable": null,
        "quick_user": true,
        "custom": "{}",
        "services": [
          "bridgeit.code",
          "bridgeit.doc",
          "bridgeit.locate",
          "bridgeit.media",
          "bridgeit.event",
          "bridgeit.push",
          "bridgeit.store"
        ],
        "permissions": [
          "bridgeit.code.write",
          "bridgeit.doc.saveDocument",
          "bridgeit.doc.getDocument",
          "bridgeit.doc.deleteDocument",
          "bridgeit.doc.updateDocument",
          "bridgeit.locate.saveLocation",
          "bridgeit.locate.getLocation",
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
          "bridgeit.locate.savePointOfInterest",
          "bridgeit.locate.getPointOfInterest",
          "bridgeit.locate.deletePointOfInterest",
          "bridgeit.locate.updatePointOfInterest",
          "bridgeit.media.convert",
          "bridgeit.event.doGet",
          "bridgeit.event.doPut",
          "bridgeit.event.doPost",
          "bridgeit.event.doDelete",
          "bridgeit.push.modifyGroup",
          "bridgeit.push.pushSelf",
          "bridgeit.push.pushCloudSelf",
          "bridgeit.push.adminGroup",
          "bridgeit.push.pushAll",
          "bridgeit.push.pushCloudAll",
          "bridgeit.push.listen",
          "bridgeit.push.notificationProviderAPNS",
          "bridgeit.push.notificationProviderAmazonSNS",
          "bridgeit.push.notificationProviderBPNS",
          "bridgeit.push.notificationProviderEmail",
          "bridgeit.push.notificationProviderGCM",
          "bridgeit.push.notificationProviderTwilioSMS",
          "bridgeit.push.notificationProviderWNS",
          "bridgeit.store.blob.readSelf",
          "bridgeit.store.blob.readAll",
          "bridgeit.store.blob.writeSelf",
          "bridgeit.store.blob.writeAll",
          "bridgeit.query.saveQuery",
          "bridgeit.query.getQuery",
          "bridgeit.query.deleteQuery",
          "bridgeit.query.updateQuery"
        ],
        "origins": [
          "*"
        ],
        "disabled": false,
        "name": "test"
      }
    ],
    "safeAccountname": "bsrtests"
  }
}
```

### <a name="createAccount"></a>createAccount

```javascript
function bridgeit.io.admin.createAccount(params)
```

Create a new BridgeIt account with a new administrator.  After successfully creating the account, the new administrator will be automatically logged in.

#### Parameters

| Name | Description | Type | Default | Required |
| ---- | ----------- | ---- | ------- | -------- |
| account | The name of the new account | String | | true |
| username | The username for the new administrator | String | | true |
| email | The email of the new administrator | String | | true |
| firstname | The first name of the new administrator | String | | true |
| lastname |The last name of the new administrator | String | | true |
| password | The password of the new administrator | String | | true |
| host | The BridgeIt Services host url. If not supplied, the last used BridgeIt host, or the default will be used. | String | api.bridgeit.io | false |
| ssl | Whether to use SSL for network traffic | Boolean | false | false |

#### Example

```javascript
bridgeit.io.admin.createAccount({
  account: 'my-new-account,
  description: 'my account',
  username: 'albert.mccallum',
  password: 'secretest',
  firstname: 'Albert',
  lastname: 'McCallum',
  email: 'al@mccallum.com'
}).then(function(token){
  //now we can use the token to access services as an administrator
}).catch(function(error){
  console.log('something went wrong: ' + error);
});
```

#### Return value

Promise with an access token for the new administrator.

### <a name="getLogs"></a>getLogs

```javascript
function bridgeit.io.admin.getLogs(params)
```

Get the BridgeIt Service logs for an account.

#### Parameters

| Name | Description | Type | Default | Required |
| ---- | ----------- | ---- | ------- | -------- |
| account | BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used. | String | The last used account name | false |
| accessToken | The BridgeIt authentication token. If not provided, the stored token from bridgeit.io.auth.connect() will be used | String | | false |
| host | The BridgeIt Services host url. If not supplied, the last used BridgeIt host, or the default will be used. | String | api.bridgeit.io | false |
| ssl | Whether to use SSL for network traffic | Boolean | false | false |
| query | A Mongo DB query for finding log entries matching certain criteria | Object | {} | false |
| fields | Specify the exclusion of fields to return in the result set | Object | {} | false |
| options | Additional query options such as limit and sort | Object | {} | false |

#### Example

```javascript
bridgeit.io.admin.getLogs({
		account: accountId,
		accessToken: "d9f7463d-d100-42b6-aecd-ae21e38e5d02"
	})
}).then(function(logs){
	console.log('found the following logs: ' + JSON.stringify(logs));
}).catch(function(error){
	console.log('something went wrong: ' + error);
});
```

#### Return value

Promise with a JSON object with a list of log objects.

```json
[
  {
    "accountName": "bsrtests",
    "realmName": "test",
    "tx": "0000",
    "access_token": "a4b2ee47-dbee-4f4a-bea8-12e536faf5fa",
    "message": "setupModel: User",
    "level": "debug",
    "time": "2015-03-27T18:07:41.042Z"
  },
  {
    "accountName": "bsrtests",
    "realmName": "test",
    "tx": "0000",
    "access_token": "a4b2ee47-dbee-4f4a-bea8-12e536faf5fa",
    "message": "Found entity (via token): user",
    "level": "debug",
    "time": "2015-03-27T18:07:41.264Z"
  },
  {
    "accountName": "bsrtests",
    "realmName": "test",
    "tx": "0000",
    "access_token": "a4b2ee47-dbee-4f4a-bea8-12e536faf5fa",
    "message": "User: user simplest permission check Passed",
    "level": "debug",
    "time": "2015-03-27T18:07:41.271Z"
  }
 ]
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

eg.
```json
{
  "realms": [
    {
      "name": "test_1436189756205",
      "disabled": false,
      "origins": [
        "*"
      ],
      "services": [
        "bridgeit.doc",
        "bridgeit.locate",
        "bridgeit.store"
      ]
    },
    {
      "name": "test",
      "disabled": false,
      "origins": [
        "*"
      ],
      "services": [
        "bridgeit.code",
        "bridgeit.doc",
        "bridgeit.locate",
        "bridgeit.media",
        "bridgeit.event",
        "bridgeit.push",
        "bridgeit.store"
      ],
      "custom": "{}",
      "quick_user": true,
      "tsa_enable": null,
      "roles": []
    }
  ]
}
```

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

```json
{
  "realm": {
    "name": "test",
    "disabled": false,
    "origins": [
      "*"
    ],
    "services": [
      "bridgeit.code",
      "bridgeit.doc",
      "bridgeit.locate",
      "bridgeit.media",
      "bridgeit.event",
      "bridgeit.push",
      "bridgeit.store"
    ],
    "custom": "{}",
    "quick_user": true,
    "tsa_enable": null,
    "roles": []
  }
}
```

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

### <a name="cloneRealm"></a>cloneRealm

```javascript
function bridgeit.io.admin.cloneRealm(params)
```

Clone an existing realm.

#### Parameters

| Name | Description | Type | Default | Required |
| ---- | ----------- | ---- | ------- | -------- |
| account | BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used. | String | The last used account name | false |
| originRealmName | The name of the realm to clone | String |  | true |
| destRealmName | The name of the new realm | String |  | true |
| accessToken | The BridgeIt authentication token. If not provided, the stored token from bridgeit.io.auth.connect() will be used | String | | false |
| host | The BridgeIt Services host url. If not supplied, the last used BridgeIt host, or the default will be used. | String | api.bridgeit.io | false |
| ssl | Whether to use SSL for network traffic | Boolean | false | false |
| realm | The realm name | String | | true |

#### Return value

Promise with the new realm resource URL.

```json
{
  "resourceLocation": "http://dev.bridgeit.io/authadmin/bsrtests/realms/test_1444316248473"
}
```

#### Example

```javascript
bridgeit.io.admin.cloneRealm({
	account: accountId,
	accessToken: "d9f7463d-d100-42b6-aecd-ae21e38e5d02",
	originRealmName: "realmA",
  destRealmName: "realmA_clone"
}).then(function(uri){
	console.log('cloned the new realm: ' + uri);
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
  "services": [
    "bridgeit.code",
    "bridgeit.doc",
    "bridgeit.locate",
    "bridgeit.media",
    "bridgeit.event",
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

Promise with a JSON object with the resource location:

```json
{
  "resourceLocation": "http://dev.bridgeit.io/authadmin/bsrtests/realms/test_1444316248473"
}
```

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

#### Example

```javascript
bridgeit.io.admin.updateRealm({
		account: accountId,
		accessToken: "d9f7463d-d100-42b6-aecd-ae21e38e5d02",
		realmName: newRealmName,
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

#### Return value

Promise with a JSON object the realm information.


### <a name="deleteRealm"></a>deleteRealm

```javascript
function bridgeit.io.admin.deleteRealm(params)
```

Delete a realm for an account.

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

Empty response.

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

eg.

```json
{
  "user": {
    "custom": "",
    "email": "email@email.com",
    "firstname": "user",
    "lastname": "user",
    "username": "user",
    "service": {
      "permissions": []
    },
    "roles": [],
    "disabled": false
  }
}
```

eg.
```json
{
  "users": [
    {
      "username": "user1421759831143",
      "firstname": "First",
      "lastname": "Last",
      "email": "user@email.com",
      "service": {
        "permissions": []
      },
      "roles": [],
      "permissions": [
        "bridgeit.user.editUser",
        "bridgeit.user.viewUser",
        "bridgeit.user.deleteUser"
      ],
      "disabled": false
    },
    {
      "username": "user1421760101882",
      "firstname": "First",
      "lastname": "Last",
      "email": "user@email.com",
      "service": {
        "permissions": []
      },
      "roles": [],
      "permissions": [
        "bridgeit.user.editUser",
        "bridgeit.user.viewUser",
        "bridgeit.user.deleteUser"
      ],
      "disabled": false
    },
    {
      "username": "user1421766095015",
      "firstname": "First",
      "lastname": "Last",
      "email": "user@email.com",
      "service": {
        "permissions": []
      },
      "roles": [],
      "permissions": [
        "bridgeit.user.editUser",
        "bridgeit.user.viewUser",
        "bridgeit.user.deleteUser"
      ],
      "disabled": false
    }
  ]
}
```

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

#### Example

```javascript
bridgeit.io.admin.createRealmUser({
		account: accountId,
		realmName: 'nargles.net'
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

#### Return value

Promise with the new resource URL.

eg. 

```json
{
  "resourceLocation": "http://dev.bridgeit.io/authadmin/bsrtests/realms/test/users/test_1444331522673"
}
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

#### Return value

Empty response.


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

#### Return value

Empty response.

### <a name="getRealmRoles"></a>getRealmRoles

```javascript
function bridgeit.io.admin.getRealmRoles(params)
```

Retrieve a list of the roles for a realm.

#### Parameters

| Name | Description | Type | Default | Required |
| ---- | ----------- | ---- | ------- | -------- |
| account | BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used. | String | The last used account name | false |
| realmName | The BridgeIt Services realm name. If not provided, the last known BridgeIt Realm name will be used. | String | The last used realm name | false |
| accessToken | The BridgeIt authentication token. If not provided, the stored token from bridgeit.io.auth.connect() will be used | String | | false |
| host | The BridgeIt Services host url. If not supplied, the last used BridgeIt host, or the default will be used. | String | api.bridgeit.io | false |
| ssl | Whether to use SSL for network traffic | Boolean | false | false |

#### Return value

Promise with a list of roles.

eg.

```json
{
  "roles": [
    {
      "name": "my_role",
      "permissions": [
        "bridgeit.doc.saveDocument",
        "bridgeit.doc.getDocument",
        "bridgeit.doc.deleteDocument",
        "bridgeit.doc.updateDocument"
      ]
    }
  ]
}
```

#### Example

```javascript
bridgeit.io.admin.getRealmRoles({
		account: accountId,
		realm: 'nargles.net'
		accessToken: "d9f7463d-d100-42b6-aecd-ae21e38e5d02"
	})
}).then(function(roles){
	console.log('found roles: ' + JSON.stringify(roles));
}).catch(function(error){
	console.log('something went wrong: ' + error);
});
```

### <a name="createRealmRole"></a>createRealmRole

```javascript
function bridgeit.io.admin.createRealmRole(params)
```

Create a new role in the realm.

The role object should have the following structure:

```
{
	name: 'my_role',
	permissions: []
}
```

The permissions must be an array of valid permission strings that currently exist in the realm.

#### Parameters

| Name | Description | Type | Default | Required |
| ---- | ----------- | ---- | ------- | -------- |
| account | BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used. | String | The last used account name | false |
| realmName | The BridgeIt Services realm name. If not provided, the last known BridgeIt Realm name will be used. | String | The last used realm name | false |
| accessToken | The BridgeIt authentication token. If not provided, the stored token from bridgeit.io.auth.connect() will be used | String | | false |
| host | The BridgeIt Services host url. If not supplied, the last used BridgeIt host, or the default will be used. | String | api.bridgeit.io | false |
| ssl | Whether to use SSL for network traffic | Boolean | false | false |
| role | The role to create | Object | | true |


#### Example

```javascript
bridgeit.io.admin.createRealmRole({
		account: accountId,
		realm: 'nargles.net'
		accessToken: "d9f7463d-d100-42b6-aecd-ae21e38e5d02",
		role: {
			name: 'my_role',
			permissions: ['bridgeit.doc.getDocument']
		}
	}
	})
}).then(function(uri){
	console.log('created role: ' + uri);
}).catch(function(error){
	console.log('something went wrong: ' + error);
});
```

#### Return value

Promise with a resource location url for the new role.

eg.
```json
{
  "resourceLocation": "http://dev.bridgeit.io/authadmin/bsrtests/realms/test/roles/my_role"
}
```

### <a name="updateRealmRole"></a>updateRealmRole

```javascript
function bridgeit.io.admin.updateRealmRole(params)
```

Update an existing role in the realm.

#### Parameters

| Name | Description | Type | Default | Required |
| ---- | ----------- | ---- | ------- | -------- |
| account | BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used. | String | The last used account name | false |
| realmName | The BridgeIt Services realm name. If not provided, the last known BridgeIt Realm name will be used. | String | The last used realm name | false |
| accessToken | The BridgeIt authentication token. If not provided, the stored token from bridgeit.io.auth.connect() will be used | String | | false |
| host | The BridgeIt Services host url. If not supplied, the last used BridgeIt host, or the default will be used. | String | api.bridgeit.io | false |
| ssl | Whether to use SSL for network traffic | Boolean | false | false |
| role | The role to update | Object | | true |

#### Example

```javascript
bridgeit.io.admin.updateRealmRole({
		account: accountId,
		realm: 'nargles.net'
		accessToken: "d9f7463d-d100-42b6-aecd-ae21e38e5d02",
		role: {
			name: 'my_role',
			permissions: ['bridgeit.doc.getDocument', 'bridgeit.doc.saveDocument']
		}
	}
	})
}).then(function(){
	console.log('updated role');
}).catch(function(error){
	console.log('something went wrong: ' + error);
});
```

#### Return value

Promise with an empty response.

### <a name="deleteRealmRole"></a>deleteRealmRole

```javascript
function bridgeit.io.admin.deleteRealmRole(params)
```

Delete an existing role in the realm.

#### Parameters

| Name | Description | Type | Default | Required |
| ---- | ----------- | ---- | ------- | -------- |
| account | BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used. | String | The last used account name | false |
| realmName | The BridgeIt Services realm name. If not provided, the last known BridgeIt Realm name will be used. | String | The last used realm name | false |
| accessToken | The BridgeIt authentication token. If not provided, the stored token from bridgeit.io.auth.connect() will be used | String | | false |
| host | The BridgeIt Services host url. If not supplied, the last used BridgeIt host, or the default will be used. | String | api.bridgeit.io | false |
| ssl | Whether to use SSL for network traffic | Boolean | false | false |
| id | The id of role to delete | String | | true |

#### Example

```javascript
bridgeit.io.admin.deleteRealmRole({
		account: accountId,
		realm: 'nargles.net'
		accessToken: "d9f7463d-d100-42b6-aecd-ae21e38e5d02",
		id: 'my_role'
	}
	})
}).then(function(){
	console.log('deleted role');
}).catch(function(error){
	console.log('something went wrong: ' + error);
});
```

#### Return value

Empty response

#### <a name="errorCodes"></a>Error Codes

* mismatchedRecordArrayLength
* duplicateResource
* adminAlreadyExists
* lastAdminError
* adminAlreadyExists

