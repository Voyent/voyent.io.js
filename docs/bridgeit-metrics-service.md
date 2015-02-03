#BridgeIt Metrics Service JavaScript API

## Metrics API

* [findMetrics](#findMetrics)
* [getClientServerTimeGap](#getClientServerTimeGap)
* [addCustomMetric](#addCustomMetric)

### <a name="findMetrics"></a>findMetrics

```javascript
function bridgeit.io.metrics.findMetrics(params)
```

Searches for Metrics in a realm based on an expression

#### Parameters

| Name | Description | Type | Default | Required |
| ---- | ----------- | ---- | ------- | -------- |
| account | BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used. | String | The last used account name | false |
| realm | The BridgeIt Services realm. If not provided, the last known BridgeIt Realm name will be used. | String | The last used realm name | false |
| accessToken | The BridgeIt authentication token. If not provided, the stored token from bridgeit.io.auth.connect() will be used | String | | false |
| host | The BridgeIt Services host url. If not supplied, the last used BridgeIt host, or the default will be used. | String | api.bridgeit.io | false |
| ssl | Whether to use SSL for network traffic | Boolean | false | false |
| expression | The expression for the metrics query TODO document expression format | String |  | false |
| start | The start date for events. Represented in ISO 8601 UTC format (YYYY-MM-DDTHH:mm:ss.sssZ). | String | UNIX epoch  | false |
| stop | The stop date for events. Represented in ISO 8601 UTC format (YYYY-MM-DDTHH:mm:ss.sssZ). | String | current time | false |
| limit | The maximum number of events to return. | Number | 10000 | false |


#### Return value

Promise with the query results.

#### Example

```javascript
bridgeit.io.metrics.findMetrics({
		account: accountId,
		realm: realmId,
		accessToken: "d9f7463d-d100-42b6-aecd-ae21e38e5d02",
		expression: "storage(size)",
		start: "2015-01-05T04:00:00.000Z",
		limit: 50
	})
}).then(function(results){
	console.log('found ' + results.length + ' metrics');
}).catch(function(error){
	console.log('findMetrics failed ' + error);
});
```

### <a name="getClientServerTimeGap"></a>getClientServerTimeGap

```javascript
function bridgeit.io.metrics.getClientServerTimeGap(params)
```

Retrieve the time difference in milliseconds between the provided time and the metrics server time.

Useful for displaying accurate live metrics views. The time difference is returned as 
client time - server time.

#### Parameters

| Name | Description | Type | Default | Required |
| ---- | ----------- | ---- | ------- | -------- |
| account | BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used. | String | The last used account name | false |
| realm | The BridgeIt Services realm. If not provided, the last known BridgeIt Realm name will be used. | String | The last used realm name | false |
| accessToken | The BridgeIt authentication token. If not provided, the stored token from bridgeit.io.auth.connect() will be used | String | | false |
| host | The BridgeIt Services host url. If not supplied, the last used BridgeIt host, or the default will be used. | String | api.bridgeit.io | false |
| ssl | Whether to use SSL for network traffic | Boolean | false | false |

#### Return value

Promise with the the time difference in milliseconds.

#### Example

```javascript
bridgeit.io.metrics.getClientServerTimeGap({
		accessToken: "d9f7463d-d100-42b6-aecd-ae21e38e5d02"
	})
}).then(function(milliseconds){
	console.log('client time is  ' + milliseconds + ' ahead of the server');
}).catch(function(error){
	console.log('something went wrong: ' + error);
});
```

### <a name="addCustomMetric"></a>addCustomMetric

```javascript
function bridgeit.io.metrics.addCustomMetric(params)
```

Store a custom metric in the metrics service.

#### Parameters

| Name | Description | Type | Default | Required |
| ---- | ----------- | ---- | ------- | -------- |
| account | BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used. | String | The last used account name | false |
| realm | The BridgeIt Services realm. If not provided, the last known BridgeIt Realm name will be used. | String | The last used realm name | false |
| accessToken | The BridgeIt authentication token. If not provided, the stored token from bridgeit.io.auth.connect() will be used | String | | false |
| host | The BridgeIt Services host url. If not supplied, the last used BridgeIt host, or the default will be used. | String | api.bridgeit.io | false |
| ssl | Whether to use SSL for network traffic | Boolean | false | false |
| metric | The custom metric that you would like to store, in JSON format. | Object |  | true |

#### Return value

Promise with no argument.

#### Example

```javascript
var now = new Date().getTime();
var metric = {
	value: 'test',
	time: now
};
bridgeit.io.metrics.addCustomMetric({
		accessToken: "d9f7463d-d100-42b6-aecd-ae21e38e5d02",
		metric: metric
	})
}).then(function(){
	console.log('successfully stored the new metric');
}).catch(function(error){
	console.log('something went wrong: ' + error);
});
```