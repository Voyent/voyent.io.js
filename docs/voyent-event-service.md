#Voyent Event Service JavaScript API

## Event API

* [findEvents](#findEvents)
* [createCustomEvent](#createCustomEvent)
* [getClientServerTimeGap](#getClientServerTimeGap)

### <a name="findEvents"></a>findEvents

```javascript
function voyent.io.event.findEvents(params)
```

Searches for events in a realm based on a query

#### Parameters

| Name | Description | Type | Default | Required |
| ---- | ----------- | ---- | ------- | -------- |
| account | Voyent Services account name. If not provided, the last known Voyent Account will be used. | String | The last used account name | false |
| realm | The Voyent Services realm. If not provided, the last known Voyent Realm name will be used. | String | The last used realm name | false |
| accessToken | The Voyent authentication token. If not provided, the stored token from voyent.io.auth.connect() will be used | String | | false |
| host | The Voyent Services host url. If not supplied, the last used Voyent host, or the default will be used. | String | api.voyent.io | false |
| ssl | Whether to use SSL for network traffic | Boolean | false | false |
| query | A Mongo DB query for the events | Object | {} | false |
| fields | Specify the inclusion or exclusion of fields to return in the result set | Object | {} | false |
| options | Additional query options such as limit and sort | Object | {} | false |


#### Return value

Promise with the query results.

#### Example

```javascript
//find events for the storage service
voyent.io.event.findEvents({
		account: accountId,
		realm: realmId,
		accessToken: "d9f7463d-d100-42b6-aecd-ae21e38e5d02",
		query: {"service":"storage"}
	})
}).then(function(results){
	console.log('found ' + results.length + ' events');
}).catch(function(error){
	console.log('findEvents failed ' + error);
});
```

### <a name="createCustomEvent"></a>createCustomEvent

```javascript
function voyent.io.event.createCustomEvent(params)
```

Store a custom event in the event service.

#### Parameters

| Name | Description | Type | Default | Required |
| ---- | ----------- | ---- | ------- | -------- |
| account | Voyent Services account name. If not provided, the last known Voyent Account will be used. | String | The last used account name | false |
| realm | The Voyent Services realm. If not provided, the last known Voyent Realm name will be used. | String | The last used realm name | false |
| accessToken | The Voyent authentication token. If not provided, the stored token from voyent.io.auth.connect() will be used | String | | false |
| host | The Voyent Services host url. If not supplied, the last used Voyent host, or the default will be used. | String | api.voyent.io | false |
| ssl | Whether to use SSL for network traffic | Boolean | false | false |
| event | The custom event that you would like to store, in JSON format. | Object | {} | true |

#### Return value

Promise with no argument.

#### Example

```javascript
var now = new Date();
//some custom event, in this case an event for a user login
var event = {
	time: now.toISOString(),
	event : "login",
    username : "johnsmith",
    data: {
    	origin: "http://mycustomapp.com/login"
    }
};
voyent.io.event.createCustomEvent({
		accessToken: "d9f7463d-d100-42b6-aecd-ae21e38e5d02",
		event: event
	})
}).then(function(){
	console.log('successfully stored the new event');
}).catch(function(error){
	console.log('something went wrong: ' + error);
});
```

### <a name="getClientServerTimeGap"></a>getClientServerTimeGap

```javascript
function voyent.io.event.getClientServerTimeGap(params)
```

Retrieve the time difference in milliseconds between the provided time and the event server time.

Useful for displaying accurate live event views. The time difference is returned as
client time - server time.

#### Parameters

| Name | Description | Type | Default | Required |
| ---- | ----------- | ---- | ------- | -------- |
| account | Voyent Services account name. If not provided, the last known Voyent Account will be used. | String | The last used account name | false |
| realm | The Voyent Services realm. If not provided, the last known Voyent Realm name will be used. | String | The last used realm name | false |
| accessToken | The Voyent authentication token. If not provided, the stored token from voyent.io.auth.connect() will be used | String | | false |
| host | The Voyent Services host url. If not supplied, the last used Voyent host, or the default will be used. | String | api.voyent.io | false |
| ssl | Whether to use SSL for network traffic | Boolean | false | false |

#### Return value

Promise with the the time difference in milliseconds.

#### Example

```javascript
voyent.io.event.getClientServerTimeGap({
		accessToken: "d9f7463d-d100-42b6-aecd-ae21e38e5d02"
	})
}).then(function(milliseconds){
	console.log('client time is  ' + milliseconds + ' ahead of the server');
}).catch(function(error){
	console.log('something went wrong: ' + error);
});
```