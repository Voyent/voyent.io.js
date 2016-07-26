#Voyent Services Client JavaScript API (DEV BRANCH)

An easy-to-use JavaScript API for Voyent Services.

## [Admin Service API](docs/voyent-admin-service.md)

## [Auth Service API](docs/voyent-auth-service.md)

## [Code Service API](docs/voyent-code-service.md)

## [Context Service API](docs/voyent-context-service.md)

## [Document Service API](docs/voyent-docs-service.md)

## [Location Service API](docs/voyent-location-service.md)

## [Event Service API](docs/voyent-event-service.md)

## [Push Service API](docs/voyent-push-service.md)

## [Query Service API](docs/voyent-query-service.md)

## [Storage Service API](docs/voyent-storage-service.md)

## ES6 Promise Support

The Voyent Services Client API is written with ECMAScript 6 Promise/A+ support. All API functions that use asynchronous network io will return a Promise. If your application already supports ES6 Promises, you can continue using those. ES6 Promises are supported in all modern browsers except IE11 (http://caniuse.com/#search=promise). To support older browsers, you can use a shim, such as `es6-promises`, like so:

```html
<script src="https://es6-promises.s3.amazonaws.com/es6-promise-2.0.1.js"></script>
<script>
    if( !("Promise" in window)){
        window.Promise = ES6Promise.Promise;
    }
</script>
<script src="voyent.js"></script>
<script src="voyent.io.js"></script>
```

## Tests

The BridgetIt JS API Mocha integration tests can be run from the test directory either through the HTML files or with PhantomJS.

```
mocha-phantomjs all-tests.html
```

Mocha and PhantomJS are both required.

## Global voyent.io Functions

* [startTransaction](#startTransaction)
* [endTransaction](#endTransaction)
* [getLastTransactionId](#getLastTransactionId)
* [setCurrentRealm](#setCurrentRealm)
* [getResourcePermissions](#getResourcePermissions)
* [updateResourcePermissions](#updateResourcePermissions)

### <a name="startTransaction"></a>startTransaction

```javascript
function voyent.io.startTransaction()
```

Start a Voyent transaction.

This function will create a new transaction id, and automatially append the id to all voyent network calls. A Voyent transaction is not a ACID transaction, but simply a useful method to aid in
auditing and diagnosing distributed network calls, especially among different services.

#### Example

```javascript
voyent.io.startTransaction();
console.log('started transaction: ' + voyent.io.getLastTransactionId());
voyent.io.auth.login({
	account: accountId,
	username: adminId,
	password: adminPassword,
	host: host
}).then(function(authResponse){
	return voyent.io.documents.createDocument({
		document: newDoc,
		realm: realmId
	});
}).then(function(docURI){
	newDocURI = docURI;
	var uriParts = docURI.split('/');
	var docId = uriParts[uriParts.length-1];
	return voyent.io.documents.deleteDocument({
		account: accountId,
		realm: realmId,
		host: host,
		id: docId
	})
}).then(function(){
	console.log('completed transaction: ' + voyent.io.getLastTransactionId());
	voyent.io.endTransaction();
}).catch(function(error){
	console.log('something went wrong with transaction: ' + voyent.io.getLastTransactionId());
	voyent.io.endTransaction();
});
});
```

### <a name="endTransaction"></a>endTransaction

```javascript
function voyent.io.endTransaction()
```

End a Voyent transaction.

This function will remove the current Voyent transaction id, if one exists.

#### Example

See [startTransaction](#startTransaction).

### <a name="getLastTransactionId"></a>getLastTransactionId

```javascript
function voyent.io.getLastTransactionId()
```

Return the last stored Voyent tranaction id.

#### Example

See [startTransaction](#startTransaction).

### <a name="setCurrentRealm"></a>setCurrentRealm

```javascript
function voyent.io.setCurrentRealm()
```

Set the current realm for all subsequent operations. This is useful when logging in as an admin, who is not in any realm, but needing to
ensure that all other operations are done with a particular realm.

#### Example

```javascript
voyent.io.auth.login({
	account: accountId,
	username: adminId,
	password: adminPassword,
	host: host
}).then(function(authResponse){
	voyent.io.setCurrentRealm('myRealm');
	//realm is no longer required for all subsequent operations
	return voyent.io.documents.createDocument({
		document: newDoc
	});
}).then(function(docURI){
	newDocURI = docURI;
	var uriParts = docURI.split('/');
	var docId = uriParts[uriParts.length-1];
	return voyent.io.documents.deleteDocument({
		account: accountId,
		host: host,
		id: docId
	})
});
```
### <a name="getResourcePermissions"></a>getResourcePermissions

```javascript
function voyent.io.getResourcePermissions()
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

* voyent.io.action.getResourcePermissions()
* voyent.io.documents.getResourcePermissions()
* voyent.io.eventhub.getHandlerResourcePermissions()
* voyent.io.eventhub.getRecognizerResourcePermissions()
* voyent.io.location.getPOIResourcePermissions()
* voyent.io.location.getRegionResourcePermissions()
* voyent.io.location.getPOIResourcePermissions()
* voyent.io.mailbox.getResourcePermissions()

#### Parameters

| Name | Description | Type | Default | Required |
| ---- | ----------- | ---- | ------- | -------- |
| account | Voyent Services account name. If not provided, the last known Voyent Account will be used. | String | The last used account name | false |
| realm | The Voyent Services realm. If not provided, the last known Voyent Realm name will be used. | String | The last used realm name | false |
| accessToken | The Voyent authentication token. If not provided, the stored token from voyent.io.auth.connect() will be used | String | | false |
| host | The Voyent Services host url. If not supplied, the last used Voyent host, or the default will be used. | String | api.voyent.io | false |
| ssl | Whether to use SSL for network traffic | Boolean | false | false |
| service | The service to query | String |  | true |
| path | The path of the resource | String | | true |
| id | The id of the resource | String | | true |

#### Example

```javascript
voyent.io.getResourcePermissions({
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
function voyent.io.updateResourcePermissions()
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

* voyent.io.action.updateResourcePermissions()
* voyent.io.documents.updateResourcePermissions()
* voyent.io.eventhub.updateHandlerResourcePermissions()
* voyent.io.eventhub.updateRecognizerResourcePermissions()
* voyent.io.location.updatePOIResourcePermissions()
* voyent.io.location.updateRegionResourcePermissions()
* voyent.io.location.updatePOIResourcePermissions()
* voyent.io.mailbox.updateResourcePermissions()

#### Parameters

| Name | Description | Type | Default | Required |
| ---- | ----------- | ---- | ------- | -------- |
| account | Voyent Services account name. If not provided, the last known Voyent Account will be used. | String | The last used account name | false |
| realm | The Voyent Services realm. If not provided, the last known Voyent Realm name will be used. | String | The last used realm name | false |
| accessToken | The Voyent authentication token. If not provided, the stored token from voyent.io.auth.connect() will be used | String | | false |
| host | The Voyent Services host url. If not supplied, the last used Voyent host, or the default will be used. | String | api.voyent.io | false |
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

voyent.io.updateResourcePermissions({
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

