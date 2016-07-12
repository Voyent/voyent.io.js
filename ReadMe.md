#BridgeIt Services Client JavaScript API (DEV BRANCH)

An easy-to-use JavaScript API for BridgeIt Services.

## [Admin Service API](docs/bridgeit-admin-service.md)

## [Auth Service API](docs/bridgeit-auth-service.md)

## [Code Service API](docs/bridgeit-code-service.md)

## [Context Service API](docs/bridgeit-context-service.md)

## [Document Service API](docs/bridgeit-docs-service.md)

## [Location Service API](docs/bridgeit-location-service.md)

## [Event Service API](docs/bridgeit-event-service.md)

## [Push Service API](docs/bridgeit-push-service.md)

## [Query Service API](docs/bridgeit-query-service.md)

## [Storage Service API](docs/bridgeit-storage-service.md)

## ES6 Promise Support

The BridgeIt Services Client API is written with ECMAScript 6 Promise/A+ support. All API functions that use asynchronous network io will return a Promise. If your application already supports ES6 Promises, you can continue using those. ES6 Promises are supported in all modern browsers except IE11 (http://caniuse.com/#search=promise). To support older browsers, you can use a shim, such as `es6-promises`, like so:

```html
<script src="https://es6-promises.s3.amazonaws.com/es6-promise-2.0.1.js"></script>
<script>
    if( !("Promise" in window)){
        window.Promise = ES6Promise.Promise;
    }
</script>
<script src="bridgeit.js"></script>
<script src="bridgeit.io.js"></script>
```

## Tests

The BridgetIt JS API Mocha integration tests can be run from the test directory either through the HTML files or with PhantomJS.

```
mocha-phantomjs all-tests.html
```

Mocha and PhantomJS are both required.

## Global bridgeit.io Functions

* [startTransaction](#startTransaction)
* [endTransaction](#endTransaction)
* [getLastTransactionId](#getLastTransactionId)
* [setCurrentRealm](#setCurrentRealm)
* [getResourcePermissions](#getResourcePermissions)
* [updateResourcePermissions](#updateResourcePermissions)

### <a name="startTransaction"></a>startTransaction

```javascript
function bridgeit.io.startTransaction()
```

Start a BridgeIt transaction.

This function will create a new transaction id, and automatially append the id to all bridgeit network calls. A BridgeIt transaction is not a ACID transaction, but simply a useful method to aid in 
auditing and diagnosing distributed network calls, especially among different services.

#### Example

```javascript
bridgeit.io.startTransaction();
console.log('started transaction: ' + bridgeit.io.getLastTransactionId());
bridgeit.io.auth.login({
	account: accountId,
	username: adminId,
	password: adminPassword,
	host: host
}).then(function(authResponse){
	return bridgeit.io.documents.createDocument({
		document: newDoc,
		realm: realmId
	});
}).then(function(docURI){
	newDocURI = docURI;
	var uriParts = docURI.split('/');
	var docId = uriParts[uriParts.length-1];
	return bridgeit.io.documents.deleteDocument({
		account: accountId,
		realm: realmId,
		host: host,
		id: docId
	})
}).then(function(){
	console.log('completed transaction: ' + bridgeit.io.getLastTransactionId());
	bridgeit.io.endTransaction();
}).catch(function(error){
	console.log('something went wrong with transaction: ' + bridgeit.io.getLastTransactionId());
	bridgeit.io.endTransaction();
});
});
```

### <a name="endTransaction"></a>endTransaction

```javascript
function bridgeit.io.endTransaction()
```

End a BridgeIt transaction.

This function will remove the current BridgeIt transaction id, if one exists.

#### Example

See [startTransaction](#startTransaction).

### <a name="getLastTransactionId"></a>getLastTransactionId

```javascript
function bridgeit.io.getLastTransactionId()
```

Return the last stored BridgeIt tranaction id.

#### Example

See [startTransaction](#startTransaction).

### <a name="setCurrentRealm"></a>setCurrentRealm

```javascript
function bridgeit.io.setCurrentRealm()
```

Set the current realm for all subsequent operations. This is useful when logging in as an admin, who is not in any realm, but needing to
ensure that all other operations are done with a particular realm.

#### Example

```javascript
bridgeit.io.auth.login({
	account: accountId,
	username: adminId,
	password: adminPassword,
	host: host
}).then(function(authResponse){
	bridgeit.io.setCurrentRealm('myRealm');
	//realm is no longer required for all subsequent operations
	return bridgeit.io.documents.createDocument({
		document: newDoc
	});
}).then(function(docURI){
	newDocURI = docURI;
	var uriParts = docURI.split('/');
	var docId = uriParts[uriParts.length-1];
	return bridgeit.io.documents.deleteDocument({
		account: accountId,
		host: host,
		id: docId
	})
});
```
### <a name="getResourcePermissions"></a>getResourcePermissions

```javascript
function bridgeit.io.getResourcePermissions()
```

Return the permissions block for a resource.

A permissions block has the following structure:

```javascript
{
    "_id": "de6959d0-a885-425c-847a-3289d07321ae",
    "owner": "steve.maryka",
    "rights": {
        "owner": ["r","u","d","x","pr","pu"],
        "realm": ["r","x"],
        "roles": {
            "demoAdmin": ["r","u","d","x","pu"]
        }
    }
}
```

The permissions block contains granular permissions for the owner, the realm users, and 0 or more defined roles.

A permissions list contains the following codes:

* *r*: Read
* *u*: Update
* *d*: Delete
* *x*: Execute
* *pr*: Permissions Read
* *pu*: Permissions Update
* *mu*: Client Metadata Update

The following services and paths are currently supported:

* 'documents'
	* 'documents'
	* The name of any other document collection
* 'action'
	* 'actions'
* 'eventhub'
	* 'handlers'
	* 'recognizers'
* 'query'
	* 'queries'
* 'storage'
	* 'blobs'
* 'mailbox'
	* 'mailboxes'
* 'location'
	* 'regions'
	* 'poi'

The following service-specific convenience functions are also available:

* bridgeit.io.action.getResourcePermissions()
* bridgeit.io.documents.getResourcePermissions()
* bridgeit.io.eventhub.getHandlerResourcePermissions()
* bridgeit.io.eventhub.getRecognizerResourcePermissions()
* bridgeit.io.location.getPOIResourcePermissions()
* bridgeit.io.location.getRegionResourcePermissions()
* bridgeit.io.location.getPOIResourcePermissions()
* bridgeit.io.mailbox.getResourcePermissions()

#### Parameters

| Name | Description | Type | Default | Required |
| ---- | ----------- | ---- | ------- | -------- |
| account | BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used. | String | The last used account name | false |
| realm | The BridgeIt Services realm. If not provided, the last known BridgeIt Realm name will be used. | String | The last used realm name | false |
| accessToken | The BridgeIt authentication token. If not provided, the stored token from bridgeit.io.auth.connect() will be used | String | | false |
| host | The BridgeIt Services host url. If not supplied, the last used BridgeIt host, or the default will be used. | String | api.bridgeit.io | false |
| ssl | Whether to use SSL for network traffic | Boolean | false | false |
| service | The service to query | String |  | true |
| path | The path of the resource | String | | true |
| id | The id of the resource | String | | true |

#### Example

```javascript
bridgeit.io.getResourcePermissions({
	account: accountId,
	username: adminId,
	password: adminPassword,
	host: host,
	service: 'documents',
	path: 'documents',
	id: 'resourceId'
}).then(function(permissions){
	console.log('permissions', permissions);
});
```

### <a name="updateResourcePermissions"></a>updateResourcePermissions

```javascript
function bridgeit.io.updateResourcePermissions()
```

Update the permissions block for a resource.

A permissions block has the following structure:

```javascript
{
    "_id": "de6959d0-a885-425c-847a-3289d07321ae",
    "owner": "steve.maryka",
    "rights": {
        "owner": ["r","u","d","x","pr","pu"],
        "realm": ["r","x"],
        "roles": {
            "demoAdmin": ["r","u","d","x","pu"]
        }
    }
}
```

The permissions block contains granular permissions for the owner, the realm users, and 0 or more defined roles.

A permissions list contains the following codes:

* *r*: Read
* *u*: Update
* *d*: Delete
* *x*: Execute
* *pr*: Permissions Read
* *pu*: Permissions Update
* *mu*: Client Metadata Update

The following services and paths are currently supported:

* 'documents'
	* 'documents'
	* The name of any other document collection
* 'action'
	* 'actions'
* 'eventhub'
	* 'handlers'
	* 'recognizers'
* 'query'
	* 'queries'
* 'storage'
	* 'blobs'
* 'mailbox'
	* 'mailboxes'
* 'location'
	* 'regions'
	* 'poi'

The following service-specific convenience functions are also available:

* bridgeit.io.action.updateResourcePermissions()
* bridgeit.io.documents.updateResourcePermissions()
* bridgeit.io.eventhub.updateHandlerResourcePermissions()
* bridgeit.io.eventhub.updateRecognizerResourcePermissions()
* bridgeit.io.location.updatePOIResourcePermissions()
* bridgeit.io.location.updateRegionResourcePermissions()
* bridgeit.io.location.updatePOIResourcePermissions()
* bridgeit.io.mailbox.updateResourcePermissions()

#### Parameters

| Name | Description | Type | Default | Required |
| ---- | ----------- | ---- | ------- | -------- |
| account | BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used. | String | The last used account name | false |
| realm | The BridgeIt Services realm. If not provided, the last known BridgeIt Realm name will be used. | String | The last used realm name | false |
| accessToken | The BridgeIt authentication token. If not provided, the stored token from bridgeit.io.auth.connect() will be used | String | | false |
| host | The BridgeIt Services host url. If not supplied, the last used BridgeIt host, or the default will be used. | String | api.bridgeit.io | false |
| ssl | Whether to use SSL for network traffic | Boolean | false | false |
| service | The service to query | String |  | true |
| path | The path of the resource | String | | true |
| id | The id of the resource | String | | true |
| permissions | The permissions block | String | | true |

#### Example

```javascript
var permissionsBlock == {
    "_id": "de6959d0-a885-425c-847a-3289d07321ae",
    "owner": "steve.maryka",
    "rights": {
        "owner": ["r","u","d","x","pr","pu"],
        "realm": ["r","x"],
        "roles": {
            "demoAdmin": ["r","u","d","x","pu"]
        }
    }
};

bridgeit.io.updateResourcePermissions({
	account: accountId,
	username: adminId,
	password: adminPassword,
	host: host,
	service: 'documents',
	path: 'documents',
	id: 'resourceId',
	permissions: permissionsBlock
}).then(function(permissions){
	console.log('permissions', permissions);
});
```

