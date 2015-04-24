#BridgeIt Query Service JavaScript API

## Queries API

* [createQuery](#createQuery)
* [updateQuery](#updateQuery)
* [getQuery](#getQuery)
* [findQueries](#findQueries)
* [deleteQuery](#deleteQuery)

### <a name="createQuery"></a>createQuery

```javascript
function bridgeit.io.query.createQuery(params)
```

Create and store a new query in the query service.

#### Parameters

| Name | Description | Type | Default | Required |
| ---- | ----------- | ---- | ------- | -------- |
| account | BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used. | String | The last used account name | false |
| realm | The BridgeIt Services realm. If not provided, the last known BridgeIt Realm name will be used. | String | The last used realm name | false |
| accessToken | The BridgeIt authentication token. If not provided, the stored token from bridgeit.io.auth.connect() will be used | String | | false |
| host | The BridgeIt Services host url. If not supplied, the last used BridgeIt host, or the default will be used. | String | api.bridgeit.io | false |
| ssl | Whether to use SSL for network traffic | Boolean | false | false |
| query | The query to be created | Object |  | false |
| id | The query id. If not provided, the service will return a new id | String |  | false |

#### Return value

Promise with the query URI:

```javascript
http://api.bridgeit.io/query/demox_corporate/realms/nargles.net/queries/88b9a1f3-36f7-4041-b6d2-7d5a21f193c7
```

#### Example

```javascript
var newQuery = { "query": { "$or": [ {"color": "red"},{"color": "blue"} ] } };

bridgeit.io.query.createQuery({
    account: accountId,
    realm: realmId,
    accessToken: "d9f7463d-d100-42b6-aecd-ae21e38e5d02"
    query: newQuery
  });
}).then(function(uri){
  console.log('created query: ' + uri);
}).catch(function(error){
  console.log('something went wrong: ' + error);
});
```

### <a name="updateQuery"></a>updateQuery

```javascript
function bridgeit.io.query.updateQuery(params)
```

Update a query in the query service.

#### Parameters

| Name | Description | Type | Default | Required |
| ---- | ----------- | ---- | ------- | -------- |
| account | BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used. | String | The last used account name | false |
| realm | The BridgeIt Services realm. If not provided, the last known BridgeIt Realm name will be used. | String | The last used realm name | false |
| accessToken | The BridgeIt authentication token. If not provided, the stored token from bridgeit.io.auth.connect() will be used | String | | false |
| host | The BridgeIt Services host url. If not supplied, the last used BridgeIt host, or the default will be used. | String | api.bridgeit.io | false |
| ssl | Whether to use SSL for network traffic | Boolean | false | false |
| query | The query to be created | Object |  | false |
| id | The query id, the query to be updated | String |  | true |

#### Return value

Promise with the resource URI:

```javascript
http://api.bridgeit.io/query/demox_corporate/realms/nargles.net/queries/1234
```

#### Example

```javascript
var newQuery = { "query": { "$or": [ {"color": "red"},{"color": "blue"} ] } };

bridgeit.io.query.updateQuery({
    account: accountId,
    realm: realmId,
    accessToken: "d9f7463d-d100-42b6-aecd-ae21e38e5d02"
    id: '1234',
    query: newQuery
  })
}).then(function(uri){
  console.log('updated query: ' + uri);;
}).catch(function(error){
  console.log('something went wrong: ' + error);
});
```

### <a name="getQuery"></a>getQuery

```javascript
function bridgeit.io.query.getQuery(params)
```

Fetch a query from the query service.

#### Parameters

| Name | Description | Type | Default | Required |
| ---- | ----------- | ---- | ------- | -------- |
| account | BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used. | String | The last used account name | false |
| realm | The BridgeIt Services realm. If not provided, the last known BridgeIt Realm name will be used. | String | The last used realm name | false |
| accessToken | The BridgeIt authentication token. If not provided, the stored token from bridgeit.io.auth.connect() will be used | String | | false |
| host | The BridgeIt Services host url. If not supplied, the last used BridgeIt host, or the default will be used. | String | api.bridgeit.io | false |
| ssl | Whether to use SSL for network traffic | Boolean | false | false |
| id | The query id, the query to fetch | String |  | true |

#### Return value

Promise with the query object.

#### Example

```javascript
bridgeit.io.query.getQuery({
    account: accountId,
    realm: realmId,
    accessToken: "d9f7463d-d100-42b6-aecd-ae21e38e5d02"
    id: queryId
  })
}).then(function(query){
  //do something with the query
}).catch(function(error){
  console.log('something went wrong: ' + error);
});
```

### <a name="findQueries"></a>findQueries

```javascript
function bridgeit.io.query.findQueries(params)
```

Return queries matching specific search criteria.

#### Parameters

| Name | Description | Type | Default | Required |
| ---- | ----------- | ---- | ------- | -------- |
| account | BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used. | String | The last used account name | false |
| realm | The BridgeIt Services realm. If not provided, the last known BridgeIt Realm name will be used. | String | The last used realm name | false |
| accessToken | The BridgeIt authentication token. If not provided, the stored token from bridgeit.io.auth.connect() will be used | String | | false |
| host | The BridgeIt Services host url. If not supplied, the last used BridgeIt host, or the default will be used. | String | api.bridgeit.io | false |
| ssl | Whether to use SSL for network traffic | Boolean | false | false |
| query | A Mongo DB query for the queries | Object |  | false |
| fields | Specify the inclusion or exclusion of fields to return in the result set | Object |  | false |
| options | Additional query options such as limit and sort | Object |  | false |

#### Return value

Promise with the query results

```javascript
[
  {_id: '1', "query": { "$or": [ {"color": "red"},{"color": "blue"} ] }, "properties": { "key": 1429828560192 } }
]
```

#### Example

```javascript
var key = new Date().getTime();
var storedQuery = { "query": { "$or": [ {"color": "red"},{"color": "blue"} ] }, "properties": { "key": key } };

bridgeit.io.query.findQueries({
    account: accountId,
    realm: realmId,
    accessToken: "d9f7463d-d100-42b6-aecd-ae21e38e5d02"
    query: {"properties.key": key}
  })
}).then(function(results){
  if( results ) {
    //do something with the results
  }
}).catch(function(error){
  console.log('something went wrong: ' + error);
});
```

### <a name="deleteQuery"></a>deleteQuery

```javascript
function bridgeit.io.query.deleteQuery(params)
```

Delete a query in the query service.

#### Parameters

| Name | Description | Type | Default | Required |
| ---- | ----------- | ---- | ------- | -------- |
| account | BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used. | String | The last used account name | false |
| realm | The BridgeIt Services realm. If not provided, the last known BridgeIt Realm name will be used. | String | The last used realm name | false |
| accessToken | The BridgeIt authentication token. If not provided, the stored token from bridgeit.io.auth.connect() will be used | String | | false |
| host | The BridgeIt Services host url. If not supplied, the last used BridgeIt host, or the default will be used. | String | api.bridgeit.io | false |
| ssl | Whether to use SSL for network traffic | Boolean | false | false |
| id | The query id, the query to be deleted | String |  | true |

#### Return value

Promise with an empty response

#### Example

```javascript
bridgeit.io.query.deleteQuery({
    account: accountId,
    realm: realmId,
    accessToken: "d9f7463d-d100-42b6-aecd-ae21e38e5d02"
    id: '1234'
  })
}).then(function(){
  console.log('deleted query');
}).catch(function(error){
  console.log('deleteQuery failed ' + error);
});
```
