#BridgeIt Location Service JavaScript API

## Location API

* [createRegion](#createRegion)
* [deleteRegion](#deleteRegion)
* [getAllRegions](#getAllRegions)
* [findRegions](#findRegions)
* [findMonitors](#findMonitors)
* [createMonitor](#createMonitor)
* [deleteMonitor](#deleteMonitor)
* [getAllMonitors](#getAllMonitors)
* [createPOI](#createPOI)
* [findPOIs](#findPOIs)
* [deletePOI](#deletePOI)
* [getAllPOIs](#getAllPOIs)
* [updateLocation](#updateLocation)
* [updateLocationCoordinates](#updateLocationCoordinates)
* [getLastUserLocation](#getLastUserLocation)

### <a name="createRegion"></a>createRegion

```javascript
function bridgeit.services.location.createRegion(params)
```

Create a new region in the location service.

#### Parameters

| Name | Description | Type | Default | Required |
| ---- | ----------- | ---- | ------- | -------- |
| account | BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used. | String | The last used account name | false |
| realm | The BridgeIt Services realm. If not provided, the last known BridgeIt Realm name will be used. | String | The last used realm name | false |
| accessToken | The BridgeIt authentication token. If not provided, the stored token from bridgeit.services.auth.connect() will be used | String | | false |
| host | The BridgeIt Services host url. If not supplied, the last used BridgeIt host, or the default will be used. | String | api.bridgeit.io | false |
| ssl | Whether to use SSL for network traffic | Boolean | false | false |
| id | The region id. If not provided, the service will return a new id. | String |  | false |
| region | The region geoJSON document that describes the region to be created | Object |  | false |

#### Return value

Promise with the resource URI:

```javascript
http://api.bridgeit.io/locate/demox_corporate/realms/nargles.net/regions/88b9a1f3-36f7-4041-b6d2-7d5a21f193c7
```

#### Example

```javascript
var newRegion = { 
  location: {
	properties: {
	  country: 'Canada'
	}
  }
};
bridgeit.services.location.createRegion({
	account: accountId,
	realm: realmId,
	accessToken: "d9f7463d-d100-42b6-aecd-ae21e38e5d02"
	region: newRegion
  });
}).then(function(uri){
  console.log('new region URI: ' + uri);
}).catch(function(error){
  console.log('createRegion failed ' + error);
});
```

### <a name="deleteRegion"></a>deleteRegion

```javascript
function bridgeit.services.location.deleteRegion(params)
```

Delete a region in the location service.

#### Parameters

| Name | Description | Type | Default | Required |
| ---- | ----------- | ---- | ------- | -------- |
| account | BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used. | String | The last used account name | false |
| realm | The BridgeIt Services realm. If not provided, the last known BridgeIt Realm name will be used. | String | The last used realm name | false |
| accessToken | The BridgeIt authentication token. If not provided, the stored token from bridgeit.services.auth.connect() will be used | String | | false |
| host | The BridgeIt Services host url. If not supplied, the last used BridgeIt host, or the default will be used. | String | api.bridgeit.io | false |
| ssl | Whether to use SSL for network traffic | Boolean | false | false |
| id | The region id. | String |  | true |

#### Return value

Promise with no arguments.

#### Example

```javascript
bridgeit.services.location.deleteRegion({
	account: accountId,
	realm: realmId,
	accessToken: "d9f7463d-d100-42b6-aecd-ae21e38e5d02"
	id: '1234'
  })
}).then(function(){
  console.log('successfully deleted region');
}).catch(function(error){
  console.log('deleteRegion failed ' + error);
});
```

### <a name="getAllRegions"></a>getAllRegions

```javascript
function bridgeit.services.location.getAllRegions(params)
```

Fetches all saved regions for the realm from the location service.

#### Parameters

| Name | Description | Type | Default | Required |
| ---- | ----------- | ---- | ------- | -------- |
| account | BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used. | String | The last used account name | false |
| realm | The BridgeIt Services realm. If not provided, the last known BridgeIt Realm name will be used. | String | The last used realm name | false |
| accessToken | The BridgeIt authentication token. If not provided, the stored token from bridgeit.services.auth.connect() will be used | String | | false |
| host | The BridgeIt Services host url. If not supplied, the last used BridgeIt host, or the default will be used. | String | api.bridgeit.io | false |
| ssl | Whether to use SSL for network traffic | Boolean | false | false |

#### Return value

Promise with a result list of regions.

#### Example

```javascript
bridgeit.services.location.getAllRegions({
	account: accountId,
	realm: realmId,
	host: host,
	accessToken: "d9f7463d-d100-42b6-aecd-ae21e38e5d02"
  })
}).then(function(results){
  console.log('found ' + results.length + ' regions');
}).catch(function(error){
  console.log('getAllRegions failed ' + error);
});
```

### <a name="findRegions"></a>findRegions

```javascript
function bridgeit.services.location.findRegions(params)
```

Searches for regions in a realm based on a Mongo DB query.

#### Parameters

| Name | Description | Type | Default | Required |
| ---- | ----------- | ---- | ------- | -------- |
| account | BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used. | String | The last used account name | false |
| realm | The BridgeIt Services realm. If not provided, the last known BridgeIt Realm name will be used. | String | The last used realm name | false |
| accessToken | The BridgeIt authentication token. If not provided, the stored token from bridgeit.services.auth.connect() will be used | String | | false |
| host | The BridgeIt Services host url. If not supplied, the last used BridgeIt host, or the default will be used. | String | api.bridgeit.io | false |
| ssl | Whether to use SSL for network traffic | Boolean | false | false |
| query | The Mongo DB query | Object |  | false |

#### Return value

Promise with a result list of regions.

#### Example

```javascript
bridgeit.services.location.findRegions({
	account: accountId,
	realm: realmId,
	host: host,
	accessToken: "d9f7463d-d100-42b6-aecd-ae21e38e5d02"
	query: { 
		  location: {
			properties: {
			  country: 'Canada'
			}
		  }
		}
  })
}).then(function(results){
  console.log('found ' + results.length + ' regions');
}).catch(function(error){
  console.log('findRegions failed ' + error);
});
```

### <a name="findMonitors"></a>findMonitors

```javascript
function bridgeit.services.location.findMonitors(params)
```

Searches for location monitors in a realm based on a Mongo DB query.

#### Parameters

| Name | Description | Type | Default | Required |
| ---- | ----------- | ---- | ------- | -------- |
| account | BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used. | String | The last used account name | false |
| realm | The BridgeIt Services realm. If not provided, the last known BridgeIt Realm name will be used. | String | The last used realm name | false |
| accessToken | The BridgeIt authentication token. If not provided, the stored token from bridgeit.services.auth.connect() will be used | String | | false |
| host | The BridgeIt Services host url. If not supplied, the last used BridgeIt host, or the default will be used. | String | api.bridgeit.io | false |
| ssl | Whether to use SSL for network traffic | Boolean | false | false |
| query | The Mongo DB query | Object |  | false |

#### Return value

Promise with a result list of monitors.

#### Example

```javascript
bridgeit.services.location.findMonitors({
	account: accountId,
	realm: realmId,
	accessToken: "d9f7463d-d100-42b6-aecd-ae21e38e5d02"
	query: { 
		  location: {
			properties: {
			  country: 'Canada'
			}
		  }
		}
  })
}).then(function(results){
  console.log('found ' + results.length + ' monitors');
}).catch(function(error){
  console.log('findMonitors failed ' + error);
});
```

### <a name="createMonitor"></a>createMonitor

```javascript
function bridgeit.services.location.createMonitor(params)
```

Create a new monitor in the location service.

#### Parameters

| Name | Description | Type | Default | Required |
| ---- | ----------- | ---- | ------- | -------- |
| account | BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used. | String | The last used account name | false |
| realm | The BridgeIt Services realm. If not provided, the last known BridgeIt Realm name will be used. | String | The last used realm name | false |
| accessToken | The BridgeIt authentication token. If not provided, the stored token from bridgeit.services.auth.connect() will be used | String | | false |
| host | The BridgeIt Services host url. If not supplied, the last used BridgeIt host, or the default will be used. | String | api.bridgeit.io | false |
| ssl | Whether to use SSL for network traffic | Boolean | false | false |
| id | The region id. If not provided, the service will return a new id. | String |  | false |
| monitor | The monitor JSON document that describes the monitor to be created | Object |  | false |

#### Return value

Promise with the resource URI:

```javascript
http://api.bridgeit.io/locate/demox_corporate/realms/nargles.net/monitors/88b9a1f3-36f7-4041-b6d2-7d5a21f193c7
```

#### Example

```javascript
var newMonitor = {
	  label: 'Various Cities Monitor',
	  active: true,
	  elapsedTimeLimit: 5,
	  locationChangeLimit: 100,
	  locationNearLimit: 1000,
	  regions: {
		ids: ['Victoria', 'Calgary', 'Paris']
	  },
	  poi: {
		ids: ['statueofliberty'],
		tags: ['monument']
	  },
	  events: ['bridgeit.locate.locationChanged', 'bridgeit.locate.enteredRegion', 'bridgeit.locate.exitedRegion'],
	  destinations: [
		{
		  url: 'http://dev.bridgeit.io/code/bridgeit.test/flows/customflowid',
		  payload: {}
		},
		{
		  url: 'push://bridgeit/studentPushGroup',
		  payload: {}
		},
		{
		  url: 'ws://joe:seakret@bridgeit/dummyEntry',
		  payload: {}
		}
	  ]
	};
bridgeit.services.location.createMonitor({
	account: accountId,
	realm: realmId,
	accessToken: "d9f7463d-d100-42b6-aecd-ae21e38e5d02"
	monitor: newMonitor
  });
}).then(function(uri){
  console.log('new monitor URI: ' + uri);
}).catch(function(error){
  console.log('createMonitor failed ' + error);
});
```

### <a name="deleteMonitor"></a>deleteMonitor

```javascript
function bridgeit.services.location.deleteMonitor(params)
```

Delete a monitor in the location service.

#### Parameters

| Name | Description | Type | Default | Required |
| ---- | ----------- | ---- | ------- | -------- |
| account | BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used. | String | The last used account name | false |
| realm | The BridgeIt Services realm. If not provided, the last known BridgeIt Realm name will be used. | String | The last used realm name | false |
| accessToken | The BridgeIt authentication token. If not provided, the stored token from bridgeit.services.auth.connect() will be used | String | | false |
| host | The BridgeIt Services host url. If not supplied, the last used BridgeIt host, or the default will be used. | String | api.bridgeit.io | false |
| ssl | Whether to use SSL for network traffic | Boolean | false | false |
| id | The monitor id. | String |  | true |

#### Return value

Promise with no arguments.

#### Example

```javascript
bridgeit.services.location.deleteMonitor({
	account: accountId,
	realm: realmId,
	accessToken: "d9f7463d-d100-42b6-aecd-ae21e38e5d02"
	id: '1234'
  })
}).then(function(){
  console.log('successfully deleted monitor');
}).catch(function(error){
  console.log('deleteMonitor failed ' + error);
});
```

### <a name="getAllMonitors"></a>getAllMonitors

```javascript
function bridgeit.services.location.getAllMonitors(params)
```

Fetches all saved monitors for the realm from the location service.

#### Parameters

| Name | Description | Type | Default | Required |
| ---- | ----------- | ---- | ------- | -------- |
| account | BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used. | String | The last used account name | false |
| realm | The BridgeIt Services realm. If not provided, the last known BridgeIt Realm name will be used. | String | The last used realm name | false |
| accessToken | The BridgeIt authentication token. If not provided, the stored token from bridgeit.services.auth.connect() will be used | String | | false |
| host | The BridgeIt Services host url. If not supplied, the last used BridgeIt host, or the default will be used. | String | api.bridgeit.io | false |
| ssl | Whether to use SSL for network traffic | Boolean | false | false |

#### Return value

Promise with a result list of monitors.

#### Example

```javascript
bridgeit.services.location.getAllMonitors({
	account: accountId,
	realm: realmId,
	accessToken: "d9f7463d-d100-42b6-aecd-ae21e38e5d02"
  })
}).then(function(results){
  console.log('found ' + results.length + ' monitors');
}).catch(function(error){
  console.log('getAllMonitors failed ' + error);
});
```

### <a name="createPOI"></a>createPOI

```javascript
function bridgeit.services.location.createPOI(params)
```

Creates a new Point of Interest in the location service.

#### Parameters

| Name | Description | Type | Default | Required |
| ---- | ----------- | ---- | ------- | -------- |
| account | BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used. | String | The last used account name | false |
| realm | The BridgeIt Services realm. If not provided, the last known BridgeIt Realm name will be used. | String | The last used realm name | false |
| accessToken | The BridgeIt authentication token. If not provided, the stored token from bridgeit.services.auth.connect() will be used | String | | false |
| host | The BridgeIt Services host url. If not supplied, the last used BridgeIt host, or the default will be used. | String | api.bridgeit.io | false |
| ssl | Whether to use SSL for network traffic | Boolean | false | false |
| poi | A JSON Object describing the Point of Interest. | Boolean | false | false |

#### Return value

Promise with new resource URI.

#### Example

```javascript
bridgeit.services.location.createPOI({
	account: accountId,
	realm: realmId,
	accessToken: "d9f7463d-d100-42b6-aecd-ae21e38e5d02"
	poi: {
		_id: 'statueofliberty',
		label: 'Statue of Liberty',
		location: {
			type: 'Feature',
			geometry: {
				type: 'Point',
				coordinates: [
					-74.0445004,
					40.6892494
				]
			},
			properties: {
				tags: ['statue', 'USA', 'tourist', 'monument']
			}
		}
	}
  });
}).then(function(uri){
  console.log('new poi URI: ' + uri);
});
```

### <a name="findPOIs"></a>findPOIs

```javascript
function bridgeit.services.location.findPOIs(params)
```

Searches for Points of Interest in a realm based on a Mongo DB query.

#### Parameters

| Name | Description | Type | Default | Required |
| ---- | ----------- | ---- | ------- | -------- |
| account | BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used. | String | The last used account name | false |
| realm | The BridgeIt Services realm. If not provided, the last known BridgeIt Realm name will be used. | String | The last used realm name | false |
| accessToken | The BridgeIt authentication token. If not provided, the stored token from bridgeit.services.auth.connect() will be used | String | | false |
| host | The BridgeIt Services host url. If not supplied, the last used BridgeIt host, or the default will be used. | String | api.bridgeit.io | false |
| ssl | Whether to use SSL for network traffic | Boolean | false | false |
| query | The Mongo DB query | Object |  | false |

#### Return value

Promise with a result list of Points of Interest.

#### Example

```javascript
bridgeit.services.location.findPOIs({
	account: accountId,
	realm: realmId,
	accessToken: "d9f7463d-d100-42b6-aecd-ae21e38e5d02"
	query: { 
		  location: {
			properties: {
			  country: 'Canada'
			}
		  }
		}
  })
}).then(function(results){
  console.log('found ' + results.length + ' POIs');
}).catch(function(error){
  console.log('findPOIs failed ' + error);
});
```

### <a name="deletePOI"></a>deletePOI

```javascript
function bridgeit.services.location.deletePOI(params)
```

Delete a POI in the location service.

#### Parameters

| Name | Description | Type | Default | Required |
| ---- | ----------- | ---- | ------- | -------- |
| account | BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used. | String | The last used account name | false |
| realm | The BridgeIt Services realm. If not provided, the last known BridgeIt Realm name will be used. | String | The last used realm name | false |
| accessToken | The BridgeIt authentication token. If not provided, the stored token from bridgeit.services.auth.connect() will be used | String | | false |
| host | The BridgeIt Services host url. If not supplied, the last used BridgeIt host, or the default will be used. | String | api.bridgeit.io | false |
| ssl | Whether to use SSL for network traffic | Boolean | false | false |
| id | The POI id. | String |  | true |

#### Return value

Promise with no arguments.

#### Example

```javascript
bridgeit.services.location.deletePOI({
	account: accountId,
	realm: realmId,
	accessToken: "d9f7463d-d100-42b6-aecd-ae21e38e5d02"
	id: '1234'
  })
}).then(function(){
  console.log('successfully deleted POI');
}).catch(function(error){
  console.log('deletePOI failed ' + error);
});
```

### <a name="getAllPOIs"></a>getAllPOIs

```javascript
function bridgeit.services.location.getAllPOIs(params)
```

Fetches all saved POIs for the realm from the location service.

#### Parameters

| Name | Description | Type | Default | Required |
| ---- | ----------- | ---- | ------- | -------- |
| account | BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used. | String | The last used account name | false |
| realm | The BridgeIt Services realm. If not provided, the last known BridgeIt Realm name will be used. | String | The last used realm name | false |
| accessToken | The BridgeIt authentication token. If not provided, the stored token from bridgeit.services.auth.connect() will be used | String | | false |
| host | The BridgeIt Services host url. If not supplied, the last used BridgeIt host, or the default will be used. | String | api.bridgeit.io | false |
| ssl | Whether to use SSL for network traffic | Boolean | false | false |

#### Return value

Promise with a result list of POIs.

#### Example

```javascript
bridgeit.services.location.getAllPOIs({
	account: accountId,
	realm: realmId,
	accessToken: "d9f7463d-d100-42b6-aecd-ae21e38e5d02"
  })
}).then(function(results){
  console.log('found ' + results.length + ' POIs');
}).catch(function(error){
  console.log('getAllPOIs failed ' + error);
});
```

### <a name="updateLocation"></a>updateLocation

```javascript
function bridgeit.services.location.updateLocation(params)
```

Update the location of the current user.

The location is stored in the location service with a location document.

```javascript
{
	label: 'My Favourite iPad',
	location: {
		geometry: {
			type: 'Point',
			coordinates: [ -123.35, 48.43 ]
		},
		properties: {
			label: 'Somewhere interesting in Victoria',
			accuracy: 50,
			altitude: 1000,
			altitudeAccuracy: 5,
			speed: 3,
			heading: 90,
			timestamp: '2014-04-01T11:11:11.11Z',
			jguid: 'e33f9ce8-b9cc-40ad-8f96-ad32303bc6da'
		}
	}
}
```

The location document extra properties are optional.


#### Parameters

| Name | Description | Type | Default | Required |
| ---- | ----------- | ---- | ------- | -------- |
| account | BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used. | String | The last used account name | false |
| realm | The BridgeIt Services realm. If not provided, the last known BridgeIt Realm name will be used. | String | The last used realm name | false |
| accessToken | The BridgeIt authentication token. If not provided, the stored token from bridgeit.services.auth.connect() will be used | String | | false |
| host | The BridgeIt Services host url. If not supplied, the last used BridgeIt host, or the default will be used. | String | api.bridgeit.io | false |
| ssl | Whether to use SSL for network traffic | Boolean | false | false |
| location | A JSON object describing the location | Object |  | true |

#### Return value

Promise with a resource URI.

#### Example

```javascript
bridgeit.services.location.updateLocation({
	location: validLocationWithoutId
}).then(function(uri){
	console.log('location URI(): ' + uri);
}).catch(function(error){
	console.log('something went wrong: ' + error);
});
```

### <a name="updateLocationCoordinates"></a>updateLocationCoordinates

```javascript
function bridgeit.services.location.updateLocationCoordinates(params)
```

Update the location of the current user with a latitude and longitude.


#### Parameters

| Name | Description | Type | Default | Required |
| ---- | ----------- | ---- | ------- | -------- |
| account | BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used. | String | The last used account name | false |
| realm | The BridgeIt Services realm. If not provided, the last known BridgeIt Realm name will be used. | String | The last used realm name | false |
| accessToken | The BridgeIt authentication token. If not provided, the stored token from bridgeit.services.auth.connect() will be used | String | | false |
| host | The BridgeIt Services host url. If not supplied, the last used BridgeIt host, or the default will be used. | String | api.bridgeit.io | false |
| ssl | Whether to use SSL for network traffic | Boolean | false | false |
| lat | The location latitude | Number |  | true |
| lon | The location longitude | Number |  | true |
| label | The location label | String |  | false |

#### Return value

Promise with a resource URI.

#### Example

```javascript
bridgeit.services.location.updateLocationCoordinates({
	lon: -123.35,
	lat: 48.43,
	label: 'test label'
}).then(function(uri){
	console.log('location URI(): ' + uri);
}).catch(function(error){
	console.log('something went wrong: ' + error);
});
```
### <a name="getLastUserLocation"></a>getLastUserLocation

```javascript
function bridgeit.services.location.getLastUserLocation(params)
```

Get the last known user location from the location service.

#### Parameters

| Name | Description | Type | Default | Required |
| ---- | ----------- | ---- | ------- | -------- |
| account | BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used. | String | The last used account name | false |
| realm | The BridgeIt Services realm. If not provided, the last known BridgeIt Realm name will be used. | String | The last used realm name | false |
| accessToken | The BridgeIt authentication token. If not provided, the stored token from bridgeit.services.auth.connect() will be used | String | | false |
| host | The BridgeIt Services host url. If not supplied, the last used BridgeIt host, or the default will be used. | String | api.bridgeit.io | false |
| ssl | Whether to use SSL for network traffic | Boolean | false | false |
| username | The user id | String | | true |

#### Return value

Promise with a location JSON object.

#### Example

```javascript
bridgeit.services.location.getLastUserLocation({
	username: 'jsmith'
}).then(function(location){
	console.log('location: ' + JSON.stringify(location));
}).catch(function(error){
	console.log('something went wrong: ' + error);
});
```
