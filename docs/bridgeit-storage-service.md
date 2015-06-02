#BridgeIt Storage Service JavaScript API

## Storage API

* [getMetaInfo](#getMetaInfo)
* [uploadBlob](#uploadBlob)
* [uploadFile](#uploadFile)
* [getBlob](#getBlob)
* [deleteBlob](#deleteBlob)

### <a name="getMetaInfo"></a>getMetaInfo

```javascript
function bridgeit.io.storage.getMetaInfo(params)
```

Retrieve a list of blob meta information for the realms.

The user must have the permission 'bridgeit.store.blob.readSelf' to see meta information for blobs that 
they have created or they must have the permission 'bridgeit.store.blob.readAll' to see meta 
information for blobs that all users have created.

#### Parameters

| Name | Description | Type | Default | Required |
| ---- | ----------- | ---- | ------- | -------- |
| account | BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used. | String | The last used account name | false |
| realm | The BridgeIt Services realm. If not provided, the last known BridgeIt Realm name will be used. | String | The last used realm name | false |
| accessToken | The BridgeIt authentication token. If not provided, the stored token from bridgeit.io.auth.connect() will be used | String | | false |
| host | The BridgeIt Services host url. If not supplied, the last used BridgeIt host, or the default will be used. | String | api.bridgeit.io | false |
| ssl | Whether to use SSL for network traffic | Boolean | false | false |
| scope |  'all' or 'self', return meta information for blobs belonging to all users, or only those belonging to the current user | String | 'self'  | false |

#### Return value

Promise with a list of blob meta information.

#### Example

```javascript
bridgeit.io.storage.getMetaInfo({
	scope: 'all',
	realm: 'myrealm'
}).then(function(list){
	console.log('found meta information for ' + list.length + ' blobs');
}).catch(function(error){
	console.log('something went wrong: ' + error);
});
```

### <a name="uploadBlob"></a>uploadBlob

```javascript
function bridgeit.io.storage.uploadBlob(params)
```

Upload a [W3C Blob](https://developer.mozilla.org/en/docs/Web/API/Blob) object to the storage service.

#### Parameters

| Name | Description | Type | Default | Required |
| ---- | ----------- | ---- | ------- | -------- |
| account | BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used. | String | The last used account name | false |
| realm | The BridgeIt Services realm. If not provided, the last known BridgeIt Realm name will be used. | String | The last used realm name | false |
| accessToken | The BridgeIt authentication token. If not provided, the stored token from bridgeit.io.auth.connect() will be used | String | | false |
| host | The BridgeIt Services host url. If not supplied, the last used BridgeIt host, or the default will be used. | String | api.bridgeit.io | false |
| ssl | Whether to use SSL for network traffic | Boolean | false | false |
| blob |  The blob object to upload | Object |  | true |
| progressCallback | A callback for upload progress updates | Function | | false |

#### Return value

Promise with a resource URI for the uploaded blob.

A progressCallback can also be specified for listening to upload progress events.

#### Example

```javascript
var folderIcon = "data:image/gif;base64,R0lGODlhEAAOALMAAOazToeHh0tLS/7LZv/0jvb29t/f3//Ub/
/ge8WSLf/rhf/3kdbW1mxsbP//mf///yH5BAAAAAAALAAAAAAQAA4AAARe8L1Ekyky67QZ1hLnjM5UUde0ECwLJoExKcpp
V0aCcGCmTIHEIUEqjgaORCMxIC6e0CcguWw6aFjsVMkkIr7g77ZKPJjPZqIyd7sJAgVGoEGv2xsBxqNgYPj/gAwXEQA7";
var byteString = atob(folderIcon);
var mimeType = "image/jpeg";

var ia = new Uint8Array(byteString.length);
for(var i = 0; i < byteString.length ; i++ ){
	ia[i] = byteString.charCodeAt(i);
}
var blob = new Blob([ia], {type:mimeType});

bridgeit.io.storage.uploadBlob({
	blob: blob,
	realm: 'myrealm',
	progressCallback: function(progress, xhr){
		console.log('upload ' + (100*progress) + '% complete');
	}
}).then(function(uri){
	console.log('uploaded resource:  ' + uri);
}).catch(function(error){
	console.log('something went wrong: ' + error);
});
```

### <a name="uploadFile"></a>uploadFile

```javascript
function bridgeit.io.storage.uploadFile(params)
```

Upload a file to the storage service.

A progressCallback can also be specified for listening to upload progress events.

#### Parameters

| Name | Description | Type | Default | Required |
| ---- | ----------- | ---- | ------- | -------- |
| account | BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used. | String | The last used account name | false |
| realm | The BridgeIt Services realm. If not provided, the last known BridgeIt Realm name will be used. | String | The last used realm name | false |
| accessToken | The BridgeIt authentication token. If not provided, the stored token from bridgeit.io.auth.connect() will be used | String | | false |
| host | The BridgeIt Services host url. If not supplied, the last used BridgeIt host, or the default will be used. | String | api.bridgeit.io | false |
| ssl | Whether to use SSL for network traffic | Boolean | false | false |
| file |  The file object to upload | Object |  | true |
| progressCallback | A callback for upload progress updates | Function | | false |

#### Return value

Promise with a resource URI for the uploaded blob.

#### Example

```javascript
var file = document.getElementById('fileInput').files[0];

bridgeit.io.storage.uploadFile({
	file: file,
	realm: 'myrealm',
	progressCallback: function(progress, xhr){
		console.log('upload ' + (100*progress) + '% complete');
	}
}).then(function(uri){
	console.log('uploaded resource:  ' + uri);
}).catch(function(error){
	console.log('something went wrong: ' + error);
});
```


### <a name="getBlob"></a>getBlob

```javascript
function bridgeit.io.storage.getBlob(params)
```

Fetch a blob from the storage service by id.

#### Parameters

| Name | Description | Type | Default | Required |
| ---- | ----------- | ---- | ------- | -------- |
| account | BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used. | String | The last used account name | false |
| realm | The BridgeIt Services realm. If not provided, the last known BridgeIt Realm name will be used. | String | The last used realm name | false |
| accessToken | The BridgeIt authentication token. If not provided, the stored token from bridgeit.io.auth.connect() will be used | String | | false |
| host | The BridgeIt Services host url. If not supplied, the last used BridgeIt host, or the default will be used. | String | api.bridgeit.io | false |
| ssl | Whether to use SSL for network traffic | Boolean | false | false |
| id |  The id of the blob | String |  | true |

#### Return value

Promise with a Uint8Array.

#### Example

```javascript
bridgeit.io.storage.getBlob({
	id: 'myblobId',
	realm: 'myrealm'
}).then(function(blob){
	console.log('downloaded blob:  ' + blob);
}).catch(function(error){
	console.log('something went wrong: ' + error);
});
```

### <a name="deleteBlob"></a>deleteBlob

```javascript
function bridgeit.io.storage.deleteBlob(params)
```

Delete a blob from the storage service by id.

#### Parameters

| Name | Description | Type | Default | Required |
| ---- | ----------- | ---- | ------- | -------- |
| account | BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used. | String | The last used account name | false |
| realm | The BridgeIt Services realm. If not provided, the last known BridgeIt Realm name will be used. | String | The last used realm name | false |
| accessToken | The BridgeIt authentication token. If not provided, the stored token from bridgeit.io.auth.connect() will be used | String | | false |
| host | The BridgeIt Services host url. If not supplied, the last used BridgeIt host, or the default will be used. | String | api.bridgeit.io | false |
| ssl | Whether to use SSL for network traffic | Boolean | false | false |
| id |  The id of the blob | String |  | true |

#### Return value

Promise with no arguments.

#### Example

```javascript
bridgeit.io.storage.deleteBlob({
	id: 'myblobId',
	realm: 'myrealm'
}).then(function(){
	console.log('deleted blob');
}).catch(function(error){
	console.log('something went wrong: ' + error);
});
```
