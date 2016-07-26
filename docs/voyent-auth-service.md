#Voyent Authentication Service JavaScript API

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
* [forgotPassword](#forgotPassword)

### <a name="getNewAccessToken"></a>getNewAccessToken

```javascript
function voyent.io.auth.getNewAccessToken(params)
```

Retrieve a new access token from the Voyent auth service..

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
| account | Voyent Services account name | String | | true |
| realm | Voyent Services realm (required only for non-admin logins) | String | | false |
| username | User name | String | | true |
| password | User password | String | | true |
| host | The Voyent Services host url. If not supplied, the last used Voyent host, or the default will be used. | String | api.voyent.io | false |
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
function voyent.io.auth.login(params)
```

Login into voyent services.

This function will login into the Voyent auth service and return a user token and expiry timestamp upon
successful authentication. This function does not need to be called if voyent.connect has already been
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
| account | Voyent Services account name | String | | true |
| realm | Voyent Services realm (required only for non-admin logins) | String | | false |
| username | User name | String | | true |
| password | User password | String | | true |
| host | The Voyent Services host url. If not supplied, the last used Voyent host, or the default will be used. | String | api.voyent.io | false |
| ssl | Whether to use SSL for network traffic | Boolean | false | false |
| scopeToPath | If set, the authentication token will be restricted to the given path, unless in development mode. | String | '/' | false |


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
function voyent.io.auth.connect(params)
```

Connect to voyent services.

This function will connect to the Voyent services, and maintain the connection for the specified
timeout period (default 20 minutes). By default, the Voyent push service is also activated, so the client
may send and receive push notifications after connecting.

After connecting to Voyent Services, any Voyent service API may be used without needing to re-authenticate.
After successfully connecting, an authentication token will be stored in session storage and available through 
`voyent.io.auth.getLastAccessToken()`. This authentication information will automatically be used by other Voyent API
calls, so the token does not be included in subsequent calls, but is available if desired.

A simple example of connecting to the Voyent Services and then making a service call is the following:

```javascript
voyent.connect({
          account: 'my_account', 
          realm: 'realmA', 
          user: 'user', 
          password: 'secret'})
  .then( function(){
      console.log("successfully connnected to Voyent Services");
      //now we can fetch some docs
      return voyent.docService.get('documents');
   })
   .then( function(docs){
      for( var d in docs ){ ... };
   })
   .catch( function(error){
      console.log("error connecting to Voyent Services: " + error);
   });
```

In order to automatically reconnect, the `storeCredentials` parameter must be set to true (default), otherwise user credentials will not be available and voyent will not be able to reconnect automatically. Credentials are stored in the browser sessionStorage in encoded form for both key and value. These credentials are not easily retrievable from the browser, and will be removed when the browser session expires, although it is possible that credentials, when stored, may be retrieved and decoded without permission. Thus it is recommended that this feature not be used when stricter security measures are required.

#### Parameters

| Name | Description | Type | Default | Required |
| ---- | ----------- | ---- | ------- | -------- |
| account | Voyent Services account name | String | | true |
| realm | Voyent Services realm (required only for non-admin logins) | String | | false |
| username | User name | String | | true |
| password | User password | String | | true |
| host | The Voyent Services host url. If not supplied, the last used Voyent host, or the default will be used. | String | api.voyent.io | false |
| ssl | Whether to use SSL for network traffic | Boolean | false | false |
| usePushService | Open and connect to the Voyent push service TODO | Boolean | true | false |
| connectionTimeout | The timeout duration, in minutes, that the Voyent login will last during inactivity | Number | 20 | false |
| storeCredentials | Whether to store encrypted credentials in session storage. If set to false, voyent will not attempt to relogin before the session expires. | Boolean | true | false |
| onSessionExpiry | Function callback to be called on session expiry | Function |  | false |
| ssl | Whether to use SSL for network traffic | Boolean | false | false |
| scopeToPath | If set, the authentication token will be restricted to the given path, unless in development mode. | String | '/' | false |

#### Return value

Promise with the following argument: TODO

### <a name="disconnect"></a>disconnect
```javascript
function voyent.io.auth.disconnect()
```

Disconnect from Voyent Services.

This function will logout from Voyent Services and remove all session information from the client.

#### Parameters

No parameters required


#### Return value

Promise with the following argument: TODO

### <a name="getLastAccessToken"></a>getLastAccessToken
```javascript
function voyent.io.auth.getLastAccessToken()
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
function voyent.io.auth.getExpiresIn()
```

Return the current token expiry period.

#### Return value

The token expiry period in milliseconds, eg.:


```javascript
1420574793844
```

### <a name="getTokenSetAtTime"></a>getTokenSetAtTime
```javascript
function voyent.io.auth.getTokenSetAtTime()
```

Return the time the last access token was retrieved.

#### Return value

The unix time of the last access token, eg.:

```javascript
1420574793844
```


### <a name="getTimeRemainingBeforeExpiry"></a>getTimeRemainingBeforeExpiry
```javascript
function voyent.io.auth.getTimeRemainingBeforeExpiry()
```

Return the time, in milliseconds, before the current token expires.

#### Return value

The milliseconds before expiry, eg.:


```javascript
1424
```

### <a name="getConnectSettings"></a>getConnectSettings
```javascript
function voyent.io.auth.getConnectSettings()
```

Return the current settings used by voyent.io.auth.connect()

#### Return value

The configuration settings, eg.:


```javascript
{
  host: 'dev.voyent.io',
  userPushService: true,
  connectionTimeout: 20,
  ssl: true,
  storeCredentials: true,
  onSessionTimeout: undefined
}
```

### <a name="isLoggedIn"></a>isLoggedIn
```javascript
function voyent.io.auth.isLoggedIn()
```

Return whether a current access token exists.

#### Return value

True or false

### <a name="getLastKnownAccount"></a>getLastKnownAccount
```javascript
function voyent.io.auth.getLastKnownAccount()
```

Return the last know account name that was used for the `login` or `connect` functions. 

This value will only be available while the current sessionStorage is still available and 
until the `disconnect` function has been called.

#### Return value

A string value or null.

### <a name="getLastKnownRealm"></a>getLastKnownRealm
```javascript
function voyent.io.auth.getLastKnownRealm()
```

Return the last know realm name that was used for the `login` or `connect` functions. 

This value will only be available while the current sessionStorage is still available and 
until the `disconnect` function has been called.

#### Return value

A string value or null.

### <a name="registerAsNewUser"></a>registerAsNewUser
```javascript
function voyent.io.auth.registerAsNewUser()
```

Register a new user for a realm that supports open user registrations.

In order to allow open (ie. public) user registrations, the Voyent realm must be pre-configured to do so.
Please consult the Voyent Console for more information.

#### Parameters

| Name | Description | Type | Default | Required |
| ---- | ----------- | ---- | ------- | -------- |
| account | Voyent Services account name | String | | true |
| realm | Voyent Services realm | String | | false |
| username | User name | String | | true |
| password | User password | String | | true |
| host | The Voyent Services host url. If not supplied, the last used Voyent host, or the default will be used. | String | api.voyent.io | false |
| ssl | Whether to use SSL for network traffic | Boolean | false | false |
| firstname | The user's first name | String |  | false |
| lastname | The user's last name | String |  | false |
| email | The user's email address | String |  | false |
| custom | Custom user information in JSON format. Any custom information can be stored. | Object |  | false |

#### Return value

A Promise with a no arguments when successful.

#### Example

```javascript
voyent.io.auth.registerAsNewUser({
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
function voyent.io.auth.updateLastActiveTimestamp()
```

Update the last active timestamp for Voyent connect.

### <a name="getLastActiveTimestamp"></a>getLastActiveTimestamp
```javascript
function voyent.io.auth.getLastActiveTimestamp()
```

Return the last active timestamp in milliseconds.

### <a name="checkUserRole"></a>checkUserRole
```javascript
function voyent.io.auth.checkUserRole()
```

Check if the current user has a single role.

#### Parameters

| Name | Description | Type | Default | Required |
| ---- | ----------- | ---- | ------- | -------- |
| account | Voyent Services account name. If not provided, the last known Voyent Account will be used. | String | The last used account name | false |
| realm | The Voyent Services realm. If not provided, the last known Voyent Realm name will be used. | String | The last used realm name | false |
| host | The Voyent Services host url. If not supplied, the last used Voyent host, or the default will be used. | String | api.voyent.io | false |
| ssl | Whether to use SSL for network traffic | Boolean | false | false |
| role | The role name to verify | String |  | true |

#### Example

```javascript
voyent.io.auth.checkUserRole({
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
function voyent.io.auth.checkUserRoles()
```

Check if the current user has a set of roles. The 'op' params can be added to check for 'or' or 'and'.

#### Parameters

| Name | Description | Type | Default | Required |
| ---- | ----------- | ---- | ------- | -------- |
| account | Voyent Services account name. If not provided, the last known Voyent Account will be used. | String | The last used account name | false |
| realm | The Voyent Services realm. If not provided, the last known Voyent Realm name will be used. | String | The last used realm name | false |
| host | The Voyent Services host url. If not supplied, the last used Voyent host, or the default will be used. | String | api.voyent.io | false |
| ssl | Whether to use SSL for network traffic | Boolean | false | false |
| roles | The array of roles to verify | Array |  | true |
| op | 'or' or 'and' | String |  | false |

#### Example

```javascript
voyent.io.auth.checkUserRoles({
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

### <a name="forgotPassword"></a>forgotPassword
```javascript
function voyent.io.auth.forgotPassword()
```

Request a forgotten password to be sent by email.

#### Parameters

| Name | Description | Type | Default | Required |
| ---- | ----------- | ---- | ------- | -------- |
| account | Voyent Services account name. If not provided, the last known Voyent Account will be used. | String | The last used account name | false |
| username | The Voyent Services username. | String | | true |
| realm | The Voyent Services realm. If not provided, the username will be assumed to be an account administrator. | String | | false |
| host | The Voyent Services host url. If not supplied, the last used Voyent host, or the default will be used. | String | api.voyent.io | false |
| ssl | Whether to use SSL for network traffic | Boolean | false | false |

#### Example

```javascript
voyent.io.auth.forgotPassword({
  account: 'myaccount',
  username: 'fred',
  realm: 'myrealm'
}).then(function(result){
  //true if the request succeeded, false otherwise
}).catch(function(error){
  //an error occurred
});
```

#### Return value

An Promise resolving the value of true, if the request succeeded, or false, if it did not.




