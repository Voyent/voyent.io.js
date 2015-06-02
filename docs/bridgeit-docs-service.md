#BridgeIt Documents Service JavaScript API

## Documents API

* [createDocument](#createDocument)
* [updateDocument](#updateDocument)
* [getDocument](#getDocument)
* [findDocuments](#findDocuments)
* [deleteDocument](#deleteDocument)

### <a name="createDocument"></a>createDocument

```javascript
function bridgeit.io.documents.createDocument(params)
```

Create and store a new JSON document in the document service.

#### Parameters

| Name | Description | Type | Default | Required |
| ---- | ----------- | ---- | ------- | -------- |
| account | BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used. | String | The last used account name | false |
| realm | The BridgeIt Services realm. If not provided, the last known BridgeIt Realm name will be used. | String | The last used realm name | false |
| accessToken | The BridgeIt authentication token. If not provided, the stored token from bridgeit.io.auth.connect() will be used | String | | false |
| host | The BridgeIt Services host url. If not supplied, the last used BridgeIt host, or the default will be used. | String | api.bridgeit.io | false |
| ssl | Whether to use SSL for network traffic | Boolean | false | false |
| document | The JSON document to be created | Object |  | false |
| collection | The name of the document collection. | String | 'documents' | false |

#### Return value

Promise with the resource URI:

```javascript
http://api.bridgeit.io/docs/demox_corporate/realms/nargles.net/documents/88b9a1f3-36f7-4041-b6d2-7d5a21f193c7
```

#### Example

```javascript
var doc = {test: true};
        
bridgeit.io.documents.createDocument({
    account: accountId,
    realm: realmId,
    accessToken: "d9f7463d-d100-42b6-aecd-ae21e38e5d02"
    document: doc
  });
}).then(function(uri){
  console.log('created doc: ' + uri);
}).catch(function(error){
  console.log('something went wrong: ' + error);
});
```

### <a name="updateDocument"></a>updateDocument

```javascript
function bridgeit.io.documents.updateDocument(params)
```

Update a JSON document in the document service.

#### Parameters

| Name | Description | Type | Default | Required |
| ---- | ----------- | ---- | ------- | -------- |
| account | BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used. | String | The last used account name | false |
| realm | The BridgeIt Services realm. If not provided, the last known BridgeIt Realm name will be used. | String | The last used realm name | false |
| accessToken | The BridgeIt authentication token. If not provided, the stored token from bridgeit.io.auth.connect() will be used | String | | false |
| host | The BridgeIt Services host url. If not supplied, the last used BridgeIt host, or the default will be used. | String | api.bridgeit.io | false |
| ssl | Whether to use SSL for network traffic | Boolean | false | false |
| id | The document id | String |  | true |
| document | The JSON document to be created | Object |  | false |
| collection | The name of the document collection. | String | 'documents' | false |


#### Return value

Promise with the resource URI:

```javascript
http://api.bridgeit.io/docs/demox_corporate/realms/nargles.net/documents/88b9a1f3-36f7-4041-b6d2-7d5a21f193c7
```

#### Example

```javascript
var doc = {test: true};
        
bridgeit.io.documents.updateDocument({
    account: accountId,
    realm: realmId,
    accessToken: "d9f7463d-d100-42b6-aecd-ae21e38e5d02"
    id: '1234',
    document: doc
  })
}).then(function(){
  console.log('updated doc');
}).catch(function(error){
  console.log('something went wrong: ' + error);
});
```

### <a name="getDocument"></a>getDocument

```javascript
function bridgeit.io.documents.getDocument(params)
```

Fetch a JSON document from the document service.

#### Parameters

| Name | Description | Type | Default | Required |
| ---- | ----------- | ---- | ------- | -------- |
| account | BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used. | String | The last used account name | false |
| realm | The BridgeIt Services realm. If not provided, the last known BridgeIt Realm name will be used. | String | The last used realm name | false |
| accessToken | The BridgeIt authentication token. If not provided, the stored token from bridgeit.io.auth.connect() will be used | String | | false |
| host | The BridgeIt Services host url. If not supplied, the last used BridgeIt host, or the default will be used. | String | api.bridgeit.io | false |
| ssl | Whether to use SSL for network traffic | Boolean | false | false |
| id | The document id | String |  | true |
| collection | The name of the document collection. | String | 'documents' | false |


#### Return value

Promise with the document JSON object.

#### Example

```javascript
bridgeit.io.documents.getDocument({
    account: accountId,
    realm: realmId,
    accessToken: "d9f7463d-d100-42b6-aecd-ae21e38e5d02"
    id: docId
  })
}).then(function(doc){
  //do something with the doc
}).catch(function(error){
  console.log('something went wrong: ' + error);
});
```

### <a name="findDocuments"></a>findDocuments

```javascript
function bridgeit.io.documents.findDocuments(params)
```

Create and store a new JSON document in the document service.

#### Parameters

| Name | Description | Type | Default | Required |
| ---- | ----------- | ---- | ------- | -------- |
| account | BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used. | String | The last used account name | false |
| realm | The BridgeIt Services realm. If not provided, the last known BridgeIt Realm name will be used. | String | The last used realm name | false |
| accessToken | The BridgeIt authentication token. If not provided, the stored token from bridgeit.io.auth.connect() will be used | String | | false |
| host | The BridgeIt Services host url. If not supplied, the last used BridgeIt host, or the default will be used. | String | api.bridgeit.io | false |
| ssl | Whether to use SSL for network traffic | Boolean | false | false |
| query | A Mongo DB query for the documents | Object |  | false |
| collection | The name of the document collection. | String | 'documents' | false |


#### Return value

Promise with the query results

```javascript
[
  {_id: '1', val: true},
  {_id: '2', val: false}
]
```

#### Example

```javascript
var key = new Date().getTime();

bridgeit.io.documents.findDocuments({
    account: accountId,
    realm: realmId,
    accessToken: "d9f7463d-d100-42b6-aecd-ae21e38e5d02"
    query: {key: key}
  })
}).then(function(results){
  if( results && results.length === 1 && results[0].value )
    //do something with the results
  else{
    console.log('did not receive expected doc: ' + JSON.stringify(doc));
  }
}).catch(function(error){
  console.log('something went wrong: ' + error);
});
```

### <a name="deleteDocument"></a>deleteDocument

```javascript
function bridgeit.io.documents.deleteDocument(params)
```

Delete a JSON document in the document service.

#### Parameters

| Name | Description | Type | Default | Required |
| ---- | ----------- | ---- | ------- | -------- |
| account | BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used. | String | The last used account name | false |
| realm | The BridgeIt Services realm. If not provided, the last known BridgeIt Realm name will be used. | String | The last used realm name | false |
| accessToken | The BridgeIt authentication token. If not provided, the stored token from bridgeit.io.auth.connect() will be used | String | | false |
| host | The BridgeIt Services host url. If not supplied, the last used BridgeIt host, or the default will be used. | String | api.bridgeit.io | false |
| ssl | Whether to use SSL for network traffic | Boolean | false | false |
| id | The document id | String |  | true |
| collection | The name of the document collection. | String | 'documents' | false |


#### Return value

Promise with an empty response

#### Example

```javascript
bridgeit.io.documents.deleteDocument({
    account: accountId,
    realm: realmId,
    accessToken: "d9f7463d-d100-42b6-aecd-ae21e38e5d02"
    id: '1234'
  })
}).then(function(){
  console.log('deleted doc');
  done();
}).catch(function(error){
  console.log('deleteDocument failed ' + error);
});
```
