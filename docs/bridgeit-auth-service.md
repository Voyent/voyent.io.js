#BridgeIt Authentication Service JavaScript API

## Auth API

* [getNewAccessToken](#getNewAccessToken)
* [login](#login)
* [connect](#connect)
* [disconnect](#disconnect)
* [getLastAccessToken](#getLastAccessToken)
* [getExpiresIn](#getExpiresIn)
* [getTokenSetAtTime](#getTokenSetAtTime)
* [getTimeRemainingBeforeExpiry](#getTimeRemainingBeforeExpiry)
* [getConnectSettings](#getConnectSettings)
* [isLoggedIn](#isLoggedIn)
* [getLastKnownAccount](#getLastKnownAccount)
* [getLastKnownRealm](#getLastKnownRealm)
* [registerAsNewUser](#registerAsNewUser)
* [updateLastActiveTimestamp](#updateLastActiveTimestamp)
* [getLastActiveTimestamp](#getLastActiveTimestamp)
* [checkUserRole](#checkUserRole)
* [checkUserRoles](#checkUserRoles)

### <a name="getNewAccessToken"></a>getNewAccessToken

```javascript
function bridgeit.io.auth.getNewAccessToken(params)
```

Retrieve a new access token from the BridgeIt auth service.. 

The function returns a Promise that, when successful, returns an object with the following structure:

```javascript
{
  "access_token": "d9f7463d-d100-42b6-aecd-ae21e38e5d02",
  "expires_in": 1420574793844
}
```

Which contains the access token and the time, in milliseconds that the session will expire in.

Unlike the login, and connect functions, this function does not store the access token after it
is retrieved.

#### Parameters

| Name | Description | Type | Default | Required |
| ---- | ----------- | ---- | ------- | -------- |
| account | BridgeIt Services account name | String | | true |
| realm | BridgeIt Services realm (required only for non-admin logins) | String | | false |
| username | User name | String | | true |
| password | User password | String | | true |
| host | The BridgeIt Services host url. If not supplied, the last used BridgeIt host, or the default will be used. | String | api.bridgeit.io | false |
| ssl | Whether to use SSL for network traffic | Boolean | false | false |

#### Return value

Promise with the access token and expires_in values in the following format:

```javascript
{
   access_token: 'd9f7463d-d100-42b6-aecd-ae21e38e5d02',
   expires_in: 1420574793844
}
```

### <a name="login"></a>login

```javascript
function bridgeit.io.auth.login(params)
```

Login into bridgeit services. 

This function will login into the BridgeIt auth service and return a user token and expiry timestamp upon 
successful authentication. This function does not need to be called if bridgeit.connect has already been
called, as that function will automatically extend the user session, unless the timeout has passed. 

The function returns a Promise that, when successful, returns an object with the following structure:

```javascript
{
  "access_token": "d9f7463d-d100-42b6-aecd-ae21e38e5d02",
  "expires_in": 1420574793844
}
```

Which contains the access token and the time, in milliseconds that the session will expire in.

#### Parameters

| Name | Description | Type | Default | Required |
| ---- | ----------- | ---- | ------- | -------- |
| account | BridgeIt Services account name | String | | true |
| realm | BridgeIt Services realm (required only for non-admin logins) | String | | false |
| username | User name | String | | true |
| password | User password | String | | true |
| host | The BridgeIt Services host url. If not supplied, the last used BridgeIt host, or the default will be used. | String | api.bridgeit.io | false |
| ssl | Whether to use SSL for network traffic | Boolean | false | false |

#### Return value

Promise with the following argument:

```javascript
{
   access_token: 'd9f7463d-d100-42b6-aecd-ae21e38e5d02',
   expires_in: 1420574793844
}
```

### <a name="connect"></a>connect
```javascript
function bridgeit.io.auth.connect(params)
```

Connect to bridgeit services. 

This function will connect to the BridgeIt services, and maintain the connection for the specified 
timeout period (default 20 minutes). By default, the BridgeIt push service is also activated, so the client
may send and receive push notifications after connecting.

After connecting to BridgeIt Services, any BridgeIt service API may be used without needing to re-authenticate.
After successfully connecting, an authentication token will be stored in session storage and available through 
`bridgeit.io.auth.getLastAccessToken()`. This authentication information will automatically be used by other BridgeIt API
calls, so the token does not be included in subsequent calls, but is available if desired.

A simple example of connecting to the BridgeIt Services and then making a service call is the following:

```javascript
bridgeit.connect({
          account: 'my_account', 
          realm: 'realmA', 
          user: 'user', 
          password: 'secret'})
  .then( function(){
      console.log("successfully connnected to BridgeIt Services");
      //now we can fetch some docs
      return bridgeit.docService.get('documents');
   })
   .then( function(docs){
      for( var d in docs ){ ... };
   })
   .catch( function(error){
      console.log("error connecting to BridgeIt Services: " + error);
   });
```

In order to automatically reconnect, the `storeCredentials` parameter must be set to true (default), otherwise user credentials will not be available and bridgeit will not be able to reconnect automatically. Credentials are stored in the browser sessionStorage in encoded form for both key and value. These credentials are not easily retrievable from the browser, and will be removed when the browser session expires, although it is possible that credentials, when stored, may be retrieved and decoded without permission. Thus it is recommended that this feature not be used when stricter security measures are required.

#### Parameters

| Name | Description | Type | Default | Required |
| ---- | ----------- | ---- | ------- | -------- |
| account | BridgeIt Services account name | String | | true |
| realm | BridgeIt Services realm (required only for non-admin logins) | String | | false |
| username | User name | String | | true |
| password | User password | String | | true |
| host | The BridgeIt Services host url. If not supplied, the last used BridgeIt host, or the default will be used. | String | api.bridgeit.io | false |
| ssl | Whether to use SSL for network traffic | Boolean | false | false |
| usePushService | Open and connect to the BridgeIt push service TODO | Boolean | true | false |
| connectionTimeout | The timeout duration, in minutes, that the BridgeIt login will last during inactivity | Number | 20 | false |
| storeCredentials | Whether to store encrypted credentials in session storage. If set to false, bridgeit will not attempt to relogin before the session expires. | Boolean | true | false |
| onSessionExpiry | Function callback to be called on session expiry | Function |  | false |


#### Return value

Promise with the following argument: TODO

### <a name="disconnect"></a>disconnect
```javascript
function bridgeit.io.auth.disconnect()
```

Disconnect from BridgeIt Services. 

This function will logout from BridgeIt Services and remove all session information from the client.

#### Parameters

No parameters required


#### Return value

Promise with the following argument: TODO

### <a name="getLastAccessToken"></a>getLastAccessToken
```javascript
function bridgeit.io.auth.getLastAccessToken()
```

Return the last known Access Token.

#### Parameters

No parameters required


#### Return value

The access token string, eg.:


```javascript
'd9f7463d-d100-42b6-aecd-ae21e38e5d02'
```

### <a name="getExpiresIn"></a>getExpiresIn
```javascript
function bridgeit.io.auth.getExpiresIn()
```

Return the current token expiry period.

#### Return value

The token expiry period in milliseconds, eg.:


```javascript
1420574793844
```

### <a name="getTokenSetAtTime"></a>getTokenSetAtTime
```javascript
function bridgeit.io.auth.getTokenSetAtTime()
```

Return the time the last access token was retrieved.

#### Return value

The unix time of the last access token, eg.:

```javascript
1420574793844
```


### <a name="getTimeRemainingBeforeExpiry"></a>getTimeRemainingBeforeExpiry
```javascript
function bridgeit.io.auth.getTimeRemainingBeforeExpiry()
```

Return the time, in milliseconds, before the current token expires.

#### Return value

The milliseconds before expiry, eg.:


```javascript
1424
```

### <a name="getConnectSettings"></a>getConnectSettings
```javascript
function bridgeit.io.auth.getConnectSettings()
```

Return the current settings used by bridgeit.io.auth.connect()

#### Return value

The configuration settings, eg.:


```javascript
{
  host: 'dev.bridgeit.io',
  userPushService: true,
  connectionTimeout: 20,
  ssl: true,
  storeCredentials: true,
  onSessionTimeout: undefined
}
```

### <a name="isLoggedIn"></a>isLoggedIn
```javascript
function bridgeit.io.auth.isLoggedIn()
```

Return whether a current access token exists.

#### Return value

True or false

### <a name="getLastKnownAccount"></a>getLastKnownAccount
```javascript
function bridgeit.io.auth.getLastKnownAccount()
```

Return the last know account name that was used for the `login` or `connect` functions. 

This value will only be available while the current sessionStorage is still available and 
until the `disconnect` function has been called.

#### Return value

A string value or null.

### <a name="getLastKnownRealm"></a>getLastKnownRealm
```javascript
function bridgeit.io.auth.getLastKnownRealm()
```

Return the last know realm name that was used for the `login` or `connect` functions. 

This value will only be available while the current sessionStorage is still available and 
until the `disconnect` function has been called.

#### Return value

A string value or null.

### <a name="registerAsNewUser"></a>registerAsNewUser
```javascript
function bridgeit.io.auth.registerAsNewUser()
```

Register a new user for a realm that supports open user registrations.

In order to allow open (ie. public) user registrations, the BridgeIt realm must be pre-configured to do so. 
Please consult the BridgeIt Console for more information.

#### Parameters

| Name | Description | Type | Default | Required |
| ---- | ----------- | ---- | ------- | -------- |
| account | BridgeIt Services account name | String | | true |
| realm | BridgeIt Services realm | String | | false |
| username | User name | String | | true |
| password | User password | String | | true |
| host | The BridgeIt Services host url. If not supplied, the last used BridgeIt host, or the default will be used. | String | api.bridgeit.io | false |
| ssl | Whether to use SSL for network traffic | Boolean | false | false |
| firstname | The user's first name | String |  | false |
| lastname | The user's last name | String |  | false |
| email | The user's email address | String |  | false |
| custom | Custom user information in JSON format. Any custom information can be stored. | Object |  | false |

#### Return value

A Promise with a no arguments when successful.

#### Example

```javascript
bridgeit.io.auth.registerAsNewUser({
  account: accountId,
  realm: realmId,
  username: newUserId,
  password: userPassword,
  firstname: 'First',
  lastname: 'Last',
  email: 'user@email.com',
  host: host,
  custom: {
     prefered_correspondence: 'email'
  }
}).then(function(){
  console.log('registerAsNewUser() created new user');
}).catch(function(error){
  console.log('something went wrong: ' + error);
});
```

### <a name="updateLastActiveTimestamp"></a>updateLastActiveTimestamp
```javascript
function bridgeit.io.auth.updateLastActiveTimestamp()
```

Update the last active timestamp for BridgeIt connect.

### <a name="getLastActiveTimestamp"></a>getLastActiveTimestamp
```javascript
function bridgeit.io.auth.getLastActiveTimestamp()
```

Return the last active timestamp in milliseconds.

### <a name="checkUserRole"></a>checkUserRole
```javascript
function bridgeit.io.auth.checkUserRole()
```

Check if the current user has a single role.

#### Parameters

| Name | Description | Type | Default | Required |
| ---- | ----------- | ---- | ------- | -------- |
| account | BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used. | String | The last used account name | false |
| realm | The BridgeIt Services realm. If not provided, the last known BridgeIt Realm name will be used. | String | The last used realm name | false |
| host | The BridgeIt Services host url. If not supplied, the last used BridgeIt host, or the default will be used. | String | api.bridgeit.io | false |
| ssl | Whether to use SSL for network traffic | Boolean | false | false |
| role | The role name to verify | String |  | true |

#### Example

```javascript
bridgeit.io.auth.checkUserRole({
  role: 'myrole'
}).then(function(){
  //user has 'myrole'
}).catch(function(error){
  //user does not have 'myrole'
});
```

#### Return value

An empty Promise that will reject if the user does not have the role, or resolve if the user does have the role.

### <a name="checkUserRoles"></a>checkUserRoles
```javascript
function bridgeit.io.auth.checkUserRoles()
```

Check if the current user has a set of roles. The 'op' params can be added to check for 'or' or 'and'.

#### Parameters

| Name | Description | Type | Default | Required |
| ---- | ----------- | ---- | ------- | -------- |
| account | BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used. | String | The last used account name | false |
| realm | The BridgeIt Services realm. If not provided, the last known BridgeIt Realm name will be used. | String | The last used realm name | false |
| host | The BridgeIt Services host url. If not supplied, the last used BridgeIt host, or the default will be used. | String | api.bridgeit.io | false |
| ssl | Whether to use SSL for network traffic | Boolean | false | false |
| roles | The array of roles to verify | Array |  | true |
| op | 'or' or 'and' | String |  | false |

#### Example

```javascript
bridgeit.io.auth.checkUserRoles({
  roles: ['role1', 'role2'],
  op: 'or'
}).then(function(){
  //user has either role1 or role2
}).catch(function(error){
  //user does not have either role1 or role2
});
```

#### Return value

An empty Promise that will reject if the user does not have the roles, or resolve if the user does have the roles.



