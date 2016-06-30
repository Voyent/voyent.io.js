if( ! ('bridgeit' in window)){
	throw new Error('bridgeit-services.js requires bridgeit.js, please include bridgeit.js before bridgeit-services.js');
}

(function(b) {

	"use strict";

	/************************* Private ********************/

	function fireEvent(el, eventName, detail){
		console.log('bridgeit.io firing event ' + eventName + ' on element ' + el, detail);
		var event;
		if( 'CustomEvent' in window ){
			event = new CustomEvent(eventName, { 'detail': detail });
		}
		else if(document.createEvent){//IE 10 & other older browsers
			event = document.createEvent('HTMLEvents');
			event.initEvent(eventName, true, true);
		}
		else if(document.createEventObject){// IE < 9
			event = document.createEventObject();
			event.eventType = eventName;
		}
		event.eventName = eventName;
		if(el.dispatchEvent){
			el.dispatchEvent(event);
		}else if(el.fireEvent && htmlEvents['on'+eventName]){// IE < 9
			el.fireEvent('on'+event.eventType, event);// can trigger only real event (e.g. 'click')
		}else if(el[eventName]){
			el[eventName]();
		}else if(el['on'+eventName]){
			el['on'+eventName]();
		}
	}

	/* Action */
	function validateRequiredAction(params, reject){
		validateParameter('action', 'The action parameter is required', params, reject);
	}

	/* Admin */
	function validateRequiredUser(params, reject){
		validateParameter('user', 'The user parameter is required', params, reject);
	}

	function validateRequiredRealm(params, reject){
		validateParameter('realm', 'The realm parameter is required', params, reject);
	}

	function validateRequiredRole(params, reject){
		validateParameter('role', 'The role parameter is required', params, reject);
	}

	function validateAndReturnRequiredAdmin(params, reject){
		var admin = params.admin;
		if( admin ){
			return admin;
		}
		else{
			return reject(Error('The admin parameter is required'));
		}
	}

	/* Auth */
	function validateRequiredRealm(params, reject){
		validateParameter('realm', 'The BridgeIt realm is required', params, reject);
	}

	function validateRequiredPassword(params, reject){
		validateParameter('password', 'The password parameter is required', params, reject);
	}

	function validateAndReturnRequiredAccessToken(params, reject){
		var token = params.accessToken || services.auth.getLastAccessToken();
		if( token ){
			return token;
		}
		else{
			return reject(Error('A BridgeIt access token is required'));
		}
	}

	function validateAndReturnRequiredRealmName(params, reject){
		var realm = params.realmName;
		if( realm ){
			realm = encodeURI(realm);
		}
		else{
			realm = services.auth.getLastKnownRealm();
		}
		if( realm ){
			services.setCurrentRealm(realm);
			return realm;
		}
		else{
			return reject(Error('The BridgeIt realm is required'));
		}
	}

	function validateAndReturnRequiredOriginRealmName(params, reject){
		var realm = params.originRealmName;
		if( realm ){
			realm = encodeURI(realm);
		}
		else{
			realm = services.auth.getLastKnownRealm();
		}
		if( realm ){
			return realm;
		}
		else{
			return reject(Error('The BridgeIt originRealmName is required'));
		}
	}

	function validateAndReturnRequiredDestRealmName(params, reject){
		var realm = params.destRealmName;
		if( realm ){
			realm = encodeURI(realm);
			return realm;
		}
		else{
			return reject(Error('The BridgeIt destRealmName is required'));
		}
	}

	function validateAndReturnRequiredRealm(params, reject){
		var realm = params.realm;
		if( realm ){
			realm = encodeURI(realm);
		}
		else{
			realm = services.auth.getLastKnownRealm();
		}
		if( realm ){
			b.setSessionStorageItem(btoa(REALM_KEY), btoa(realm));
			return realm;
		}
		else{
			return reject(Error('The BridgeIt realm is required'));
		}
	}

	function validateAndReturnRequiredAccount(params, reject){
		var account = params.account;
		if( account ){
			account = encodeURI(account);
		}
		else{
			account = services.auth.getLastKnownAccount();
		}
		if( account ){
			b.setSessionStorageItem(btoa(ACCOUNT_KEY), btoa(account));
			return account;
		}
		else{
			return reject(Error('The BridgeIt account is required'));
		}
	}

	function validateAndReturnRequiredUsername(params, reject){
		var username = params.username;
		if( !username ){
			username = services.auth.getLastKnownUsername();
		}
		if( username ){
			b.setSessionStorageItem(btoa(USERNAME_KEY), btoa(username));
			return username;
		}
		else{
			return reject(Error('The BridgeIt username is required'));
		}
	}

	function validateAndReturnRequiredRole(params, reject){
		var role = params.role;
		if( role ){
			return role;
		}
		else{
			return reject(Error('The BridgeIt role parameter is required'));
		}
	}

	function validateAndReturnRequiredRoles(params, reject){
		var roles = params.roles;
		if( roles ){
			return roles;
		}
		else{
			return reject(Error('The BridgeIt roles parameter is required'));
		}
	}

	function validateAndReturnRequiredEmail(params, reject){
		var email = params.email;
		if( email ){
			return email;
		}
		else{
			return reject(Error('The BridgeIt email parameter is required'));
		}
	}

	function validateAndReturnRequiredFirstname(params, reject){
		var firstname = params.firstname;
		if( firstname ){
			return firstname;
		}
		else{
			return reject(Error('The BridgeIt firstname parameter is required'));
		}
	}

	function validateAndReturnRequiredLastname(params, reject){
		var lastname = params.lastname;
		if( lastname ){
			return lastname;
		}
		else{
			return reject(Error('The BridgeIt lastname parameter is required'));
		}
	}

	function validateRequiredUsername(params, reject){
		validateParameter('username', 'The username parameter is required', params, reject);
	}

	/* EventHub */
	function validateRequiredHandler(params, reject){
		validateParameter('handler', 'The handler parameter is required', params, reject);
	}
	function validateRequiredRecognizer(params, reject){
		validateParameter('recognizer', 'The recognizer parameter is required', params, reject);
	}

	/* Locate */
	function validateRequiredRegion(params, reject){
		validateParameter('region', 'The region parameter is required', params, reject);
	}

	function validateRequiredMonitor(params, reject){
		validateParameter('monitor', 'The monitor parameter is required', params, reject);
	}

	function validateRequiredPOI(params, reject){
		validateParameter('poi', 'The poi parameter is required', params, reject);
	}

	function validateRequiredLocation(params, reject){
		validateParameter('location', 'The location parameter is required', params, reject);
	}

	function validateRequiredLat(params, reject){
		validateParameter('lat', 'The lat parameter is required', params, reject);
	}

	function validateRequiredLon(params, reject){
		validateParameter('lon', 'The lon parameter is required', params, reject);
	}

	/* Event */
	function validateRequiredEvent(params, reject){
		validateParameter('event', 'The event parameter is required', params, reject);
	}

	/* Mailbox */
	function validateRequiredMailbox(params, reject){
		validateParameter('mailbox', 'The mailbox parameter is required', params, reject);
	}

	/* Storage */
	function validateRequiredBlob(params, reject){
		validateParameter('blob', 'The blob parameter is required', params, reject);
	}

	function validateRequiredFile(params, reject){
		validateParameter('file', 'The file parameter is required', params, reject);
	}

	/* Code */
	function validateRequiredFlow(params, reject){
		validateParameter('flow', 'The flow parameter is required', params, reject);
	}

	/* Context */
	function validateRequiredState(params, reject){
		validateParameter('state', 'The state parameter is required', params, reject);
	}

	/* Document */
	function validateCollection(params){
		return params.collection ? params.collection : 'documents';
	}

	/* Query */
	function validateRequiredQuery(params, reject){
		validateParameter('query', 'The query parameter is required', params, reject);
	}

	function validateRequiredTransformer(params, reject){
		validateParameter('transformer', 'The transformer parameter is required', params, reject);
	}

	/* Push */
	function validateRequiredGroup(params, reject){
		validateParameter('group', 'The group parameter is required', params, reject);
	}

	function validateRequiredCallback(params, reject){
		validateParameter('group', 'The callback parameter is required', params, reject);
	}

	/* Misc */
	function validateRequiredId(params, reject){
		validateParameter('id', 'The id is required', params, reject);
	}

	function validateRequiredData(params, reject){
		validateParameter('data', 'The data parameter is required', params, reject);
	}

	function validateParameter(name, msg, params, reject){
		if( !params[name] ){
			reject(Error(msg));
			return;
		}
	}

	function getTransactionURLParam(){
		var txId = services.getLastTransactionId();
		if( txId ){
			return 'tx=' + txId;
		}
		else{
			return '';
		}
	}

	function getRealmResourceURL(servicePath, account, realm, resourcePath, token, ssl, params){
		var protocol = ssl ? 'https://' : 'http://';
		var txParam = getTransactionURLParam();
		var url = protocol + servicePath +
			'/' + account + '/realms/' + realm + '/' + resourcePath + '?' +
			(token ? 'access_token=' + token : '') +
			(txParam ? '&' + txParam : '');
		if( params ){
			for( var key in params ){
				var param = params[key];
				if( typeof param === 'object'){
					try{
						param = JSON.stringify(param);
					}
					catch(e){
						param = params[key];
					}
				}
				url += ('&' + key + '=' + param);
			}
		}
		return url;
	}

	function extractResponseValues(xhr){
		return {
			status: xhr.status,
			statusText: xhr.statusText,
			response: xhr.response,
			responseText: xhr.responseText,
			responseType: xhr.responseType,
			responseXML: xhr.responseXML
		}
	}

	function getFunctionName(fn) {
		var ret = fn.toString();
		ret = ret.substr('function '.length);
		ret = ret.substr(0, ret.indexOf('('));
		return ret;
	}

	function findFunctionInGlobalScope(fn){
		if (!fn)  {
			return null;
		}
		var functionName;
		if( typeof fn === "string" ){
			functionName = fn;
			var parts = functionName.split(".");
			var theObject = window;
			for (var i = 0; i < parts.length; i++) {
				theObject = theObject[parts[i]];
				if (!theObject) {
					return null;
				}
			}
			if (window == theObject)  {
				return null;
			}
			return theObject;
		}
		else if( typeof fn === "function" ){
			return fn;
		}
	}

	if (!b['io']) {
		b.io = {};

	}

	var services = b.io;

	//internal keys
	var TOKEN_KEY = 'bridgeitToken';
	var TOKEN_EXPIRES_KEY = 'bridgeitTokenExpires';
	var TOKEN_SET_KEY = 'bridgeitTokenSet';
	var CONNECT_SETTINGS_KEY = 'bridgeitConnectSettings';
	var LAST_ACTIVE_TS_KEY = 'bridgeitLastActiveTimestamp';
	var ACCOUNT_KEY = 'bridgeitAccount';
	var REALM_KEY = 'bridgeitRealm';
	var ADMIN_KEY = 'bridgeitAdmin';
	var USERNAME_KEY = 'bridgeitUsername';
	var PASSWORD_KEY = 'bridgeitPassword';
	var RELOGIN_CB_KEY = 'bridgeitReloginCallback';
	var TRANSACTION_KEY = 'bridgeitTransaction';
	var CLOUD_CALLBACKS_KEY = "bridgeit.cloudcallbacks";
	var CLOUD_PUSH_KEY = "ice.notifyBack";
	var USER_STORE_KEY = "bridgeitUserStore";
	var USER_STORE_SETTING_KEY = "bridgeitUserStoreSetting";
	var LAST_UPDATED = "last_updated";
	var PUSH_CALLBACKS = 'pushCallbacks';
	var SCOPE_TO_PATH_KEY = "bridgeitScopeToPath";

	b.$ = {

		serializePostData: function(data){
			//TODO
		},

		get: function(url, headers){
			return new Promise(function(resolve, reject) {
				var request = new XMLHttpRequest();
				request.open('GET', url, true);
				if( headers ){
					for( var header in headers ){
						request.setRequestHeader(header, headers[header]);
					}
				}
				request.onreadystatechange = function() {
					if (this.readyState === 4) {
						if (this.status >= 200 && this.status < 400) {
							resolve(this.responseText);
						} else {
							reject(extractResponseValues(this));
						}
					}
				};
				request.onabort = function(evt){
					reject(evt);
				};
				request.onerror = function(err){
					reject(err);
				};
				request.send();
				request = null;
			});
		},

		getJSON: function(url, headers){
			return new Promise(function(resolve, reject) {
				var request = new XMLHttpRequest();
				request.open('GET', url, true);
				if( headers ){
					for( var header in headers ){
						request.setRequestHeader(header, headers[header]);
					}
				}
				request.onreadystatechange = function() {
					if (this.readyState === 4) {
						if (this.status >= 200 && this.status < 400) {
							resolve(JSON.parse(this.responseText));
						} else {
							reject(extractResponseValues(this));
						}
					}
				};
				request.onabort = function(evt){
					reject(evt);
				};
				request.onerror = function(err){
					reject(err);
				};
				request.send();
				request = null;
			});
		},

		getBlob: function(url, headers){
			return new Promise(function(resolve, reject){
				var request = new XMLHttpRequest();
				if( headers ){
					for( var header in headers ){
						request.setRequestHeader(header, headers[header]);
					}
				}
				request.onreadystatechange = function(){
					if (this.readyState === 4){
						if( this.status === 200){
							resolve(new Uint8Array(this.response));
						}
						else{
							reject(this);
						}
					}
				};
				request.onabort = function(evt){
					reject(evt);
				};
				request.onerror = function(err){
					reject(err);
				};
				request.open('GET', url);
				request.responseType = 'arraybuffer';
				request.send();
				request = null;
			});
		},

		post: function(url, data, headers, isFormData, contentType, progressCallback, onabort, onerror){
			return new Promise(function(resolve, reject) {
				console.log('sending post to ' + url);
				contentType = contentType || "application/json";
				var request = new XMLHttpRequest();
				request.open('POST', url, true);
				request.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
				if( !isFormData ){
					request.setRequestHeader("Content-type", contentType);
				}
				if( headers ){
					for( var header in headers ){
						request.setRequestHeader(header, headers[header]);
					}
				}
				if( progressCallback ){
					request.upload.addEventListener("progress", function(evt){
						services.auth.updateLastActiveTimestamp();
						if (evt.lengthComputable){
							var percentComplete = evt.loaded / evt.total;
							progressCallback(percentComplete, request);
						}
					}, false);
				}
				request.onabort = function(evt){
					if( onabort ){
						onabort();
					}
					reject(evt);
				};
				request.onerror = function(err){
					if( onerror ){
						request.onerror = onerror;
					}
					reject(err);
				};

				request.onreadystatechange = function() {
					if (this.readyState === 4) {
						if (this.status >= 200 && this.status < 400) {
							if( this.responseText ){
								var json = null;
								try{
									json = JSON.parse(this.responseText);
									resolve(json);
								}
								catch(e){
									resolve(extractResponseValues(this));
								}
							}
							else{
								resolve();
							}
						} else {
							reject(extractResponseValues(this));
						}
					}
				};
				if( data ){
					request.send(isFormData ? data : JSON.stringify(data));
				}
				else{
					request.send();
				}
			});
		},

		put: function(url, data, headers, isFormData, contentType){
			return new Promise(function(resolve, reject) {
				console.log('sending put to ' + url);
				contentType = contentType || "application/json";
				var request = new XMLHttpRequest();
				request.open('PUT', url, true);
				request.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
				if( !isFormData ){
					request.setRequestHeader("Content-type", contentType);
				}
				if( headers ){
					for( var header in headers ){
						request.setRequestHeader(header, headers[header]);
					}
				}
				//request.setRequestHeader("Connection", "close");
				request.onreadystatechange = function() {
					if (this.readyState === 4) {
						if (this.status >= 200 && this.status < 400) {
							if( this.responseText ){
								var json = null;
								try{
									json = JSON.parse(this.responseText);
									resolve(json);
								}
								catch(e){
									resolve(extractResponseValues(this));
								}
							}
							else{
								resolve();
							}
						} else {
							reject(extractResponseValues(this));
						}
					}
				};
				request.onabort = function(evt){
					reject(evt);
				};
				request.onerror = function(err){
					reject(err);
				};
				if( data ){
					request.send(isFormData ? data : JSON.stringify(data));
				}
				else{
					request.send();
				}

				request = null;
			});
		},

		doDelete: function(url, headers){
			return new Promise(function(resolve, reject) {
				console.log('sending delete to ' + url);
				var request = new XMLHttpRequest();
				request.open('DELETE', url, true);
				if( headers ){
					for( var header in headers ){
						request.setRequestHeader(header, headers[header]);
					}
				}
				request.onreadystatechange = function() {
					if (this.readyState === 4) {
						if (this.status >= 200 && this.status < 400) {
							services.auth.updateLastActiveTimestamp();
							resolve();
						} else {
							reject(extractResponseValues(this));
						}
					}
				};
				request.onabort = function(evt){
					reject(evt);
				};
				request.onerror = function(err){
					reject(err);
				};
				request.send();
				request = null;
			});
		},

		newUUID: function()  {
			return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
				var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
				return v.toString(16);
			});
		}


	};

	services.configureHosts = function(url){
		var isLocal = ['localhost','127.0.0.1'].indexOf(url) > -1;
		if( !url ){
			services.baseURL = 'dev.bridgeit.io';
		}
		else{
			services.baseURL = url;
		}
		var baseURL = services.baseURL;
		services.authURL = baseURL + (isLocal ? ':55010' : '') + '/auth';
		services.authAdminURL = baseURL + (isLocal ? ':55010' : '') + '/authadmin';
		services.locateURL = baseURL + (isLocal ? ':55020' : '') + '/locate';
		services.documentsURL = baseURL + (isLocal ? ':55080' : '') + '/docs';
		services.storageURL = baseURL + (isLocal ? ':55030' : '') + '/storage';
		services.metricsURL = baseURL + (isLocal ? ':55040' : '') + '/metrics';
		services.eventURL = baseURL + (isLocal ? ':55050' : '') + '/event';
		services.contextURL = baseURL + (isLocal ? ':55060' : '') + '/context';
		services.codeURL = baseURL + (isLocal ? ':55090' : '') + '/code';
		services.pushURL = baseURL + (isLocal ? ':8080' : '') + '/push';
		services.pushRESTURL = services.pushURL + '/rest';
		services.queryURL = baseURL + (isLocal ? ':55110' : '') + '/query';
		services.actionURL = baseURL + (isLocal ? ':55130' : '') + '/action';
		services.eventhubURL = baseURL + (isLocal ? ':55200' : '') + '/eventhub';
		services.mailboxURL = baseURL + (isLocal ? ':55120' : '') + '/mailbox';
		services.deviceURL = baseURL + (isLocal ? ':55160' : '') + '/device';
	};

	services.checkHost = function(params){
		//TODO use last configured host if available
		if( params.host ){
			services.configureHosts(params.host);
		}
	};

	services.startTransaction = function(){
		b.setSessionStorageItem(btoa(TRANSACTION_KEY), b.$.newUUID());
		console.log('bridgeit: started transaction ' + bridgeit.io.getLastTransactionId());
	};

	services.endTransaction = function(){
		b.removeSessionStorageItem(btoa(TRANSACTION_KEY));
		console.log('bridgeit: ended transaction ' + bridgeit.io.getLastTransactionId());
	};

	services.getLastTransactionId = function(){
		return b.getSessionStorageItem(btoa(TRANSACTION_KEY));
	};

	services.setCurrentRealm = function(realm){
		b.setSessionStorageItem(btoa(REALM_KEY), btoa(realm));
	};

	services.getResourcePermissions = function(params){
		return new Promise(
			function(resolve, reject) {
				params = params ? params : {};
				services.checkHost(params);

				//validate
				var account = validateAndReturnRequiredAccount(params, reject);
				var realm = validateAndReturnRequiredRealm(params, reject);
				var token = validateAndReturnRequiredAccessToken(params, reject);
				validateRequiredId(params, reject);
				validateParameter('service', 'The service parameter is required', params, reject);
				validateParameter('path', 'The path parameter is required', params, reject);

				var serviceURL;
				switch(params.service){
					case 'documents': serviceURL = services.documentsURL; break;
					case 'action': serviceURL = services.actionURL; break;
					case 'eventhub': serviceURL = services.eventhubURL; break;
					case 'query': serviceURL = services.queryURL; break;
					case 'storage': serviceURL = services.storageURL; break;
					case 'mailbox': serviceURL = services.mailboxURL; break;
					case 'location': serviceURL = services.locateURL; break;
				}

				var url = getRealmResourceURL(serviceURL, account, realm, params.path + '/' + params.id + '/permissions', token, params.ssl);

				b.$.getJSON(url).then(function(json){
					services.auth.updateLastActiveTimestamp();
					var permissionsBlock;
					if( json.directory && json.directory.length > 0 ){
						permissionsBlock = json.directory[0];
					}
					else{
						permissionsBlock = json;
					}
					resolve(permissionsBlock);
				})['catch'](function(error){
					reject(error);
				});
			}
		);
	};

	services.updateResourcePermissions = function(params){
		return new Promise(
			function(resolve, reject) {
				params = params ? params : {};
				services.checkHost(params);

				//validate
				var account = validateAndReturnRequiredAccount(params, reject);
				var realm = validateAndReturnRequiredRealm(params, reject);
				var token = validateAndReturnRequiredAccessToken(params, reject);
				validateRequiredId(params, reject);
				validateParameter('permissions', 'The permissions parameter is required', params, reject);
				validateParameter('service', 'The service parameter is required', params, reject);
				validateParameter('path', 'The path parameter is required', params, reject);

				var serviceURL;
				switch(params.service){
					case 'documents': serviceURL = services.documentsURL; break;
					case 'action': serviceURL = services.actionURL; break;
				}

				var url = getRealmResourceURL(serviceURL, account, realm, params.path + '/' + params.id + '/permissions', token, params.ssl);

				b.$.put(url, params.permissions).then(function(json){
					services.auth.updateLastActiveTimestamp();
					resolve(json);
				})['catch'](function(error){
					reject(error);
				});
			}
		);
	},

	services.action = {
		/**
		 * Execute an action
		 *
		 * @alias executeAction
		 * @param {Object} params params
		 * @param {String} params.id The action id, the action to be executed
		 * @param {String} params.account BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used.
		 * @param {String} params.realm The BridgeIt Services realm. If not provided, the last known BridgeIt Realm name will be used.
		 * @param {String} params.accessToken The BridgeIt authentication token. If not provided, the stored token from bridgeit.io.auth.connect() will be used
		 * @param {String} params.host The BridgeIt Services host url. If not supplied, the last used BridgeIt host, or the default will be used. (optional)
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 * @returns {String} The resource URI
		 */
		executeAction: function(params){
			return new Promise(
				function(resolve, reject) {
					params = params ? params : {};
					services.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);
					validateRequiredId(params, reject);

					var url = getRealmResourceURL(services.actionURL, account, realm,
						'actions/' + params.id, token, params.ssl, {'op': 'exec'});

					b.$.post(url).then(function(response){
						services.auth.updateLastActiveTimestamp();
						resolve(response);
					})['catch'](function(error){
						reject(error);
					});

				}
			);
		},

		/**
		 * Create a new action
		 *
		 * @alias createAction
		 * @param {Object} params params
		 * @param {String} params.id The action id
		 * @param {Object} params.action The action to be created
		 * @param {String} params.account BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used.
		 * @param {String} params.realm The BridgeIt Services realm. If not provided, the last known BridgeIt Realm name will be used.
		 * @param {String} params.accessToken The BridgeIt authentication token. If not provided, the stored token from bridgeit.io.auth.connect() will be used
		 * @param {String} params.host The BridgeIt Services host url. If not supplied, the last used BridgeIt host, or the default will be used. (optional)
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 * @returns {String} The resource URI
		 */
		createAction: function(params){
			return new Promise(
				function(resolve, reject) {
					params = params ? params : {};
					services.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);
					validateRequiredId(params, reject);
					validateRequiredAction(params, reject);

					var url = getRealmResourceURL(services.actionURL, account, realm,
						'actions/' + params.id, token, params.ssl);

					b.$.post(url, params.action).then(function(response){
						services.auth.updateLastActiveTimestamp();
						resolve(response.uri);
					})['catch'](function(error){
						reject(error);
					});

				}
			);
		},

		/**
		 * Update an action
		 *
		 * @alias updateAction
		 * @param {Object} params params
		 * @param {String} params.id The action id, the action to be updated
		 * @param {Object} params.action The new action
		 * @param {String} params.account BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used.
		 * @param {String} params.realm The BridgeIt Services realm. If not provided, the last known BridgeIt Realm name will be used.
		 * @param {String} params.accessToken The BridgeIt authentication token. If not provided, the stored token from bridgeit.io.auth.connect() will be used
		 * @param {String} params.host The BridgeIt Services host url. If not supplied, the last used BridgeIT host, or the default will be used. (optional)
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 */
		updateAction: function(params){
			return new Promise(
				function(resolve, reject) {
					params = params ? params : {};
					services.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);
					validateRequiredId(params, reject);
					validateRequiredAction(params, reject);

					var url = getRealmResourceURL(services.actionURL, account, realm,
						'actions/' + params.id, token, params.ssl);

					b.$.put(url, params.action).then(function(){
						services.auth.updateLastActiveTimestamp();
						resolve();
					})['catch'](function(error){
						reject(error);
					});
				}
			);
		},

		/**
		 * Fetch an action
		 *
		 * @alias getAction
		 * @param {Object} params params
		 * @param {String} params.id The action id, the action to fetch
		 * @param {String} params.account BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used.
		 * @param {String} params.realm The BridgeIt Services realm. If not provided, the last known BridgeIt Realm name will be used.
		 * @param {String} params.accessToken The BridgeIt authentication token. If not provided, the stored token from bridgeit.io.auth.connect() will be used
		 * @param {String} params.host The BridgeIt Services host url. If not supplied, the last used BridgeIT host, or the default will be used. (optional)
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 * @returns {Object} The action
		 */
		getAction: function(params){
			return new Promise(
				function(resolve, reject) {
					params = params ? params : {};
					services.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);
					validateRequiredId(params, reject);

					var url = getRealmResourceURL(services.actionURL, account, realm,
						'actions/' + params.id, token, params.ssl);

					b.$.getJSON(url).then(function(action){
						services.auth.updateLastActiveTimestamp();
						resolve(action);
					})['catch'](function(error){
						reject(error);
					});
				}
			);
		},

		/**
		 * Searches for actions in a realm based on a query
		 *
		 * @alias findActions
		 * @param {Object} params params
		 * @param {String} params.account BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used.
		 * @param {String} params.realm The BridgeIt Services realm. If not provided, the last known BridgeIt Realm name will be used.
		 * @param {String} params.accessToken The BridgeIt authentication token. If not provided, the stored token from bridgeit.io.auth.connect() will be used
		 * @param {String} params.host The BridgeIt Services host url. If not supplied, the last used BridgeIT host, or the default will be used. (optional)
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 * @param {Object} params.query A mongo query for the actions
		 * @param {Object} params.fields Specify the inclusion or exclusion of fields to return in the result set
		 * @param {Object} params.options Additional query options such as limit and sort
		 * @returns {Object} The results
		 */
		findActions: function(params){
			return new Promise(
				function(resolve, reject) {

					params = params ? params : {};
					services.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);

					var url = getRealmResourceURL(services.actionURL, account, realm,
						'actions/', token, params.ssl, {
							'query': params.query ? encodeURIComponent(JSON.stringify(params.query)) : {},
							'fields': params.fields ? encodeURIComponent(JSON.stringify(params.fields)) : {},
							'options': params.options ? encodeURIComponent(JSON.stringify(params.options)) : {}
						});

					b.$.getJSON(url).then(function(actions){
						services.auth.updateLastActiveTimestamp();
						resolve(actions);
					})['catch'](function(response){
						reject(response);
					});

				}
			);
		},

		/**
		 * Delete an action
		 *
		 * @alias deleteAction
		 * @param {Object} params params
		 * @param {String} params.id The action id, the action to be deleted
		 * @param {String} params.account BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used.
		 * @param {String} params.realm The BridgeIt Services realm. If not provided, the last known BridgeIt Realm name will be used.
		 * @param {String} params.accessToken The BridgeIt authentication token. If not provided, the stored token from bridgeit.io.auth.connect() will be used
		 * @param {String} params.host The BridgeIt Services host url. If not supplied, the last used BridgeIT host, or the default will be used. (optional)
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 */
		deleteAction: function(params){
			return new Promise(
				function(resolve, reject) {
					params = params ? params : {};
					services.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);
					validateRequiredId(params, reject);

					var url = getRealmResourceURL(services.actionURL, account, realm,
						'actions/' + params.id, token, params.ssl);

					b.$.doDelete(url).then(function(){
						services.auth.updateLastActiveTimestamp();
						resolve();
					})['catch'](function(error){
						reject(error);
					});
				}
			);
		},

		/**
		 * Fetch available task groups
		 *
		 * @alias getTaskGroups
		 * @param {Object} params params
		 * @param {String} params.account BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used.
		 * @param {String} params.realm The BridgeIt Services realm. If not provided, the last known BridgeIt Realm name will be used.
		 * @param {String} params.accessToken The BridgeIt authentication token. If not provided, the stored token from bridgeit.io.auth.connect() will be used
		 * @param {String} params.host The BridgeIt Services host url. If not supplied, the last used BridgeIT host, or the default will be used. (optional)
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 * @returns {Object} The task group schemas
		 */
		getTaskGroups: function(params){
			return new Promise(
					function(resolve, reject) {
						params = params ? params : {};
						services.checkHost(params);

						//validate
						var account = validateAndReturnRequiredAccount(params, reject);
						var realm = validateAndReturnRequiredRealm(params, reject);
						var token = validateAndReturnRequiredAccessToken(params, reject);

						var url = getRealmResourceURL(services.actionURL, account, realm,
								'taskGroups/', token, params.ssl);

						b.$.getJSON(url).then(function(tasksGroups){
							services.auth.updateLastActiveTimestamp();
							resolve(tasksGroups);
						})['catch'](function(error){
							reject(error);
						});
					}
			);
		},

		/**
		 * Fetch available tasks
		 *
		 * @alias getTasks
		 * @param {Object} params params
		 * @param {String} params.account BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used.
		 * @param {String} params.realm The BridgeIt Services realm. If not provided, the last known BridgeIt Realm name will be used.
		 * @param {String} params.accessToken The BridgeIt authentication token. If not provided, the stored token from bridgeit.io.auth.connect() will be used
		 * @param {String} params.host The BridgeIt Services host url. If not supplied, the last used BridgeIT host, or the default will be used. (optional)
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 * @returns {Object} The task schemas
		 */
		getTasks: function(params){
			return new Promise(
				function(resolve, reject) {
					params = params ? params : {};
					services.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);

					var url = getRealmResourceURL(services.actionURL, account, realm,
						'tasks/', token, params.ssl);

					b.$.getJSON(url).then(function(tasks){
						services.auth.updateLastActiveTimestamp();
						resolve(tasks);
					})['catch'](function(error){
						reject(error);
					});
				}
			);
		},

		getResourcePermissions: function(params){
			params.service = 'action';
			params.path = 'actions';
			return services.getResourcePermissions(params);
		},

		updateResourcePermissions: function(params){
			params.service = 'action';
			params.path = 'actions';
			return services.updateResourcePermissions(params);
		},
	};

	services.admin = {

		/**
		 * Get the BridgeIt Service definitions.
		 *
		 * @alias getServiceDefinitions
		 * @param {Object} params params
		 * @param {String} params.host The BridgeIt Services host url. If not supplied, the last used BridgeIT host, or the default will be used. (optional)
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 * @returns Promise with a json object of the service definitions
		 *
		 */
		getServiceDefinitions: function(params){
			return new Promise(
				function(resolve, reject) {
					params = params ? params : {};

					services.checkHost(params);

					//validate
					var token = validateAndReturnRequiredAccessToken(params, reject);
					var protocol = params.ssl ? 'https://' : 'http://';
					var txParam = getTransactionURLParam();
					var url = protocol + services.authAdminURL + '/system/services/?access_token=' + token +
						(txParam ? '&' + txParam : '');

					b.$.getJSON(url).then(function(json){
						services.auth.updateLastActiveTimestamp();
						resolve(json);
					})['catch'](function(error){
						reject(error);
					});

				}
			);
		},

		getAccount: function(params){
			return new Promise(function(resolve, reject) {
				params = params ? params : {};
				services.checkHost(params);

				//validate
				var account = validateAndReturnRequiredAccount(params, reject);
				var token = validateAndReturnRequiredAccessToken(params, reject);

				var protocol = params.ssl ? 'https://' : 'http://';
				var txParam = getTransactionURLParam();
				var url = protocol + services.authAdminURL + '/' + account + '?access_token=' + token +
					(txParam ? '&' + txParam : '');

				b.$.getJSON(url).then(function(json){
					services.auth.updateLastActiveTimestamp();
					resolve(json.account);
				})['catch'](function(error){
					reject(error);
				});

			});
		},

		/**
		 * Create a new BridgeIt Account. After successfully creating the account, the new administrator will
		 * be automatically logged in.
		 *
		 * @alias createAccount
		 * @param {Object} params params
		 * @param {String} params.host The BridgeIt Services host url. If not supplied, the last used BridgeIT host, or the default will be used. (optional)
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 * @param {String} params.account The name of the new account (required)
		 * @param {String} params.username The username for the new administrator (required)
		 * @param {String} params.email The email of the new administrator (required)
		 * @param {String} params.firstname The first name of the new administrator (required)
		 * @param {String} params.lastname The last name of the new administrator (required)
		 * @param {String} params.password The password of the new administrator (required)
		 * @returns Promise with an access token for the new administrator
		 *
		 */
		 createAccount: function(params){

			return new Promise(function(resolve, reject) {
				params = params ? params : {};
				services.checkHost(params);

				//validate
				var account = {admins: []};
				var accountname = validateAndReturnRequiredAccount(params, reject);
				account.accountname = accountname;

				if( params.description ){
					account.description = params.description;
				}

				var admin = {};
				var username = validateAndReturnRequiredUsername(params, reject);
				admin.username = username;
				validateRequiredPassword(params, reject);
				admin.password = params.password;
				admin.email = validateAndReturnRequiredEmail(params, reject);
				admin.firstname = validateAndReturnRequiredFirstname(params, reject);
				admin.lastname = validateAndReturnRequiredLastname(params, reject);

				admin.permissions = [
					'bridgeit.auth.viewAccount',
				    'bridgeit.auth.createAccount',
				    'bridgeit.auth.editAccount',
				    'bridgeit.auth.deleteAccount',

				    'bridgeit.auth.createUser',
				    'bridgeit.auth.viewUser',
				    'bridgeit.auth.editUser',
				    'bridgeit.auth.deleteUser',

				    'bridgeit.auth.viewServices',
				    'bridgeit.auth.registerContext',
				    'bridgeit.auth.createContext',
				    'bridgeit.auth.deleteContext',
				    'bridgeit.auth.editContext'];
				account.admins.push(admin);

				var protocol = params.ssl ? 'https://' : 'http://';
				var txParam = getTransactionURLParam();
				var url = protocol + services.authAdminURL + '/' + (txParam ? '&' + txParam : '');
				var loggedInAt = new Date().getTime();
				b.$.post(url, {account: account}).then(function(json){
					services.auth.updateLastActiveTimestamp();

					b.setSessionStorageItem(btoa(TOKEN_KEY), json.token.access_token);
					b.setSessionStorageItem(btoa(TOKEN_EXPIRES_KEY), json.token.expires_in);
					b.setSessionStorageItem(btoa(TOKEN_SET_KEY), loggedInAt);
					b.setSessionStorageItem(btoa(ACCOUNT_KEY), btoa(accountname));
					b.setSessionStorageItem(btoa(USERNAME_KEY), btoa(username));
					b.setSessionStorageItem(btoa(ADMIN_KEY), btoa('true'));
					resolve(json.token.access_token);
				})['catch'](function(error){
					reject(error);
				});

			});
		},

		/* Realm admin */

		getRealms: function(params){
			return new Promise(function(resolve, reject) {
				params = params ? params : {};
				services.checkHost(params);

				//validate
				var account = validateAndReturnRequiredAccount(params, reject);
				var token = validateAndReturnRequiredAccessToken(params, reject);

				var protocol = params.ssl ? 'https://' : 'http://';
				var txparam = getTransactionURLParam();
				var url = protocol + services.authAdminURL + '/' + account + '/realms/'
						+ '?access_token=' + token + '&' + getTransactionURLParam();

				b.$.getJSON(url).then(function(json){
					services.auth.updateLastActiveTimestamp();
					resolve(json.realms);
				})['catch'](function(error){
					reject(error);
				});

			});
		},

		getRealm: function(params){
			return new Promise(function(resolve, reject) {
				params = params ? params : {};
				services.checkHost(params);

				var account = validateAndReturnRequiredAccount(params, reject);
				var token = validateAndReturnRequiredAccessToken(params, reject);
				var realm = validateAndReturnRequiredRealmName(params, reject);

				var url = getRealmResourceURL(services.authAdminURL, account, realm,
					'', token, params.ssl);

				b.$.getJSON(url).then(function(json){
					services.auth.updateLastActiveTimestamp();
					resolve(json.realm);
				})['catch'](function(error){
					reject(error);
				});

			});
		},

		updateRealm: function(params){
			return new Promise(function(resolve, reject) {
				params = params ? params : {};
				services.checkHost(params);

				var account = validateAndReturnRequiredAccount(params, reject);
				var token = validateAndReturnRequiredAccessToken(params, reject);
				validateRequiredRealm(params, reject);

				var url = getRealmResourceURL(services.authAdminURL, account, params.realm.name,
					'', token, params.ssl);

				b.$.put(url, {realm: params.realm}).then(function(){
					services.auth.updateLastActiveTimestamp();
					resolve();
				})['catch'](function(error){
					reject(error);
				});

			});
		},

		createRealm: function(params){
			return new Promise(function(resolve, reject) {
				params = params ? params : {};
				services.checkHost(params);

				var account = validateAndReturnRequiredAccount(params, reject);
				var token = validateAndReturnRequiredAccessToken(params, reject);
				var realmName = validateAndReturnRequiredRealmName(params, reject);
				validateRequiredRealm(params, reject);

				var protocol = params.ssl ? 'https://' : 'http://';
				var txParam = getTransactionURLParam();
				var url = protocol + services.authAdminURL + '/' + account + '/realms?access_token=' + token +
					(txParam ? '&' + txParam : '');

				b.$.post(url, {realm: params.realm}).then(function(json){
					services.auth.updateLastActiveTimestamp();
					resolve(json.resourceLocation);
				})['catch'](function(error){
					reject(error);
				});

			});
		},

		cloneRealm: function(params){
			return new Promise(function(resolve, reject) {
				params = params ? params : {};
				services.checkHost(params);

				var account = validateAndReturnRequiredAccount(params, reject);
				var token = validateAndReturnRequiredAccessToken(params, reject);
				var originRealmName = validateAndReturnRequiredOriginRealmName(params, reject);
				var destRealmName = validateAndReturnRequiredDestRealmName(params, reject);

				var protocol = params.ssl ? 'https://' : 'http://';
				var txParam = getTransactionURLParam();
				var url = protocol + services.authAdminURL + '/' + account + '/realms/' + originRealmName + '/clone/' +
					destRealmName + '?access_token=' + token + (txParam ? '&' + txParam : '');

				b.$.post(url, {realm: params.realm}).then(function(json){
					services.auth.updateLastActiveTimestamp();
					resolve(json.resourceLocation);
				})['catch'](function(error){
					reject(error);
				});

			});
		},

		deleteRealm: function(params){
			return new Promise(function(resolve, reject) {
				params = params ? params : {};
				services.checkHost(params);

				var account = validateAndReturnRequiredAccount(params, reject);
				var token = validateAndReturnRequiredAccessToken(params, reject);
				var realmName = validateAndReturnRequiredRealmName(params, reject);

				var url = getRealmResourceURL(services.authAdminURL, account, realmName,
					'', token, params.ssl);

				console.log('bridgeit.io.admin.deleteRealm() ' + url);

				b.$.doDelete(url).then(function(){
					services.auth.updateLastActiveTimestamp();
					resolve();
				})['catch'](function(error){
					reject(error);
				});

			});
		},

		/* Realm Users */

		getRealmUsers: function(params){
			return new Promise(function(resolve, reject) {
				params = params ? params : {};
				services.checkHost(params);

				//validate
				var account = validateAndReturnRequiredAccount(params, reject);
				var realm = validateAndReturnRequiredRealmName(params, reject);
				var token = validateAndReturnRequiredAccessToken(params, reject);

				var url = getRealmResourceURL(services.authAdminURL, account, realm,
					'users/', token, params.ssl, {
						'query': params.query ? encodeURIComponent(JSON.stringify(params.query)) : {},
						'fields': params.fields ? encodeURIComponent(JSON.stringify(params.fields)) : {},
						'options': params.options ? encodeURIComponent(JSON.stringify(params.options)) : {}
					}
				);

				b.$.getJSON(url).then(function(json){
					services.auth.updateLastActiveTimestamp();
					resolve(json.users);
				})['catch'](function(error){
					reject(error);
				});
			});
		},

		createRealmUser: function(params){
			return new Promise(function(resolve, reject) {
				params = params ? params : {};
				services.checkHost(params);

				var account = validateAndReturnRequiredAccount(params, reject);
				var realm = validateAndReturnRequiredRealmName(params, reject);
				var token = validateAndReturnRequiredAccessToken(params, reject);

				validateRequiredUser(params, reject);

				var url = getRealmResourceURL(services.authAdminURL, account, realm,
					'users', token, params.ssl);

				b.$.post(url, {user: params.user}).then(function(response){
					services.auth.updateLastActiveTimestamp();
					resolve(response.resourceLocation);
				})['catch'](function(error){
					reject(error);
				});
			});
		},

		getRealmUser: function(params){
			return new Promise(function(resolve, reject) {
				params = params ? params : {};
				services.checkHost(params);

				//validate
				var account = validateAndReturnRequiredAccount(params, reject);
				var realm = validateAndReturnRequiredRealmName(params, reject);
				var token = validateAndReturnRequiredAccessToken(params, reject);
				var username = validateAndReturnRequiredUsername(params, reject);

				var url = getRealmResourceURL(services.authAdminURL, account, realm,
					'users/' + username, token, params.ssl);

				b.$.getJSON(url).then(function(json){
					services.auth.updateLastActiveTimestamp();
					resolve(json.user);
				})['catch'](function(error){
					reject(error);
				});

			});
		},

		updateRealmUser: function(params){
			return new Promise(function(resolve, reject) {
				params = params ? params : {};
				services.checkHost(params);

				var account = validateAndReturnRequiredAccount(params, reject);
				var realm = validateAndReturnRequiredRealmName(params, reject);
				var token = validateAndReturnRequiredAccessToken(params, reject);

				validateRequiredUser(params, reject);

				var url = getRealmResourceURL(services.authAdminURL, account, realm,
					'users/' + params.user.username, token, params.ssl);

				b.$.put(url, {user: params.user}).then(function(response){
					services.auth.updateLastActiveTimestamp();
					resolve();
				})['catch'](function(error){
					reject(error);
				});
			});
		},

		deleteRealmUser: function(params){
			return new Promise(function(resolve, reject) {
				params = params ? params : {};
				services.checkHost(params);

				var account = validateAndReturnRequiredAccount(params, reject);
				var realm = validateAndReturnRequiredRealmName(params, reject);
				var token = validateAndReturnRequiredAccessToken(params, reject);
				var username = validateAndReturnRequiredUsername(params, reject);

				var url = getRealmResourceURL(services.authAdminURL, account, realm,
					'users/' + params.username, token, params.ssl);

				b.$.doDelete(url).then(function(){
					services.auth.updateLastActiveTimestamp();
					resolve();
				})['catch'](function(error){
					reject(error);
				});
			});
		},

		/* Realm Roles */

		getRealmRoles: function(params){
			return new Promise(function(resolve, reject) {
				params = params ? params : {};
				services.checkHost(params);

				//validate
				var account = validateAndReturnRequiredAccount(params, reject);
				var realm = validateAndReturnRequiredRealmName(params, reject);
				var token = validateAndReturnRequiredAccessToken(params, reject);

				var url = getRealmResourceURL(services.authAdminURL, account, realm,
					'roles', token, params.ssl);

				b.$.getJSON(url).then(function(json){
					services.auth.updateLastActiveTimestamp();
					resolve(json.roles);
				})['catch'](function(error){
					reject(error);
				});
			});
		},

		createRealmRole: function(params){
			return new Promise(function(resolve, reject) {
				params = params ? params : {};
				services.checkHost(params);

				validateRequiredRole(params, reject);

				//validate
				var account = validateAndReturnRequiredAccount(params, reject);
				var realm = validateAndReturnRequiredRealmName(params, reject);
				var token = validateAndReturnRequiredAccessToken(params, reject);

				var url = getRealmResourceURL(services.authAdminURL, account, realm,
					'roles', token, params.ssl);

				b.$.post(url, {role: params.role}).then(function(response){
					services.auth.updateLastActiveTimestamp();
					resolve(response.resourceLocation);
				})['catch'](function(error){
					reject(error);
				});
			});
		},

		updateRealmRole: function(params){
			return new Promise(function(resolve, reject) {
				params = params ? params : {};
				services.checkHost(params);

				validateRequiredRole(params, reject);

				//validate
				var account = validateAndReturnRequiredAccount(params, reject);
				var realm = validateAndReturnRequiredRealmName(params, reject);
				var token = validateAndReturnRequiredAccessToken(params, reject);

				var url = getRealmResourceURL(services.authAdminURL, account, realm,
					'roles/' + params.role.name, token, params.ssl);

				b.$.put(url, {role: params.role}).then(function(response){
					services.auth.updateLastActiveTimestamp();
					resolve();
				})['catch'](function(error){
					reject(error);
				});
			});
		},

		deleteRealmRole: function(params){
			return new Promise(function(resolve, reject) {
				params = params ? params : {};
				services.checkHost(params);

				validateRequiredId(params, reject);

				var account = validateAndReturnRequiredAccount(params, reject);
				var realm = validateAndReturnRequiredRealmName(params, reject);
				var token = validateAndReturnRequiredAccessToken(params, reject);

				var url = getRealmResourceURL(services.authAdminURL, account, realm,
					'roles/' + params.id, token, params.ssl);

				b.$.doDelete(url).then(function(response){
					services.auth.updateLastActiveTimestamp();
					resolve();
				})['catch'](function(error){
					reject(error);
				});
			});
		},

		getLogs: function(params) {
			return new Promise(function(resolve, reject) {
				params = params ? params : {};
				services.checkHost(params);

				var protocol = params.ssl ? 'https://' : 'http://';
				var account = validateAndReturnRequiredAccount(params, reject);
				var token = validateAndReturnRequiredAccessToken(params, reject);

				var query = params.query ? encodeURIComponent(JSON.stringify(params.query)) : '{}';
				var fields = params.fields ? encodeURIComponent(JSON.stringify(params.fields)) : '{}';
				var options = params.options ? encodeURIComponent(JSON.stringify(params.options)) : '{}';

				var url = protocol + services.authAdminURL + '/' + account + '/logging/?access_token=' +
						token + '&query=' + query + '&fields=' + fields + '&options=' + options;

				b.$.getJSON(url).then(function(logs){
					services.auth.updateLastActiveTimestamp();
					resolve(logs);
				})['catch'](function(error){
					reject(error);
				});

			});
		},

		getDebugLogs: function(params) {
			return new Promise(function(resolve, reject) {
				params = params ? params : {};
				services.checkHost(params);

				var protocol = params.ssl ? 'https://' : 'http://';
				var account = validateAndReturnRequiredAccount(params, reject);
				var realm = validateAndReturnRequiredRealm(params, reject);
				var token = validateAndReturnRequiredAccessToken(params, reject);

				var query = params.query ? encodeURIComponent(JSON.stringify(params.query)) : '{}';
				var fields = params.fields ? encodeURIComponent(JSON.stringify(params.fields)) : '{}';
				var options = params.options ? encodeURIComponent(JSON.stringify(params.options)) : '{}';

				var url = protocol + services.authAdminURL + '/' + account + '/realms/' + realm +
					'/debugLogging/?access_token=' + token + '&query=' + query + '&fields=' + fields + '&options=' + options;

				b.$.getJSON(url).then(function(logs){
					services.auth.updateLastActiveTimestamp();
					resolve(logs);
				})['catch'](function(error){
					reject(error);
				});

			});
		},

		createAdministrator: function(params){
			return new Promise(function(resolve, reject) {
				params = params ? params : {};
				services.checkHost(params);

				var account = validateAndReturnRequiredAccount(params, reject);
				var token = validateAndReturnRequiredAccessToken(params, reject);
				var admin = validateAndReturnRequiredAdmin(params, reject);

				var protocol = params.ssl ? 'https://' : 'http://';
				var txParam = getTransactionURLParam();
				var url = protocol + services.authAdminURL + '/' + account + '/admins/?access_token=' + token +
					(txParam ? '&' + txParam : '');

				b.$.post(url, {admin: admin}).then(function(response){
					services.auth.updateLastActiveTimestamp();
					resolve();
				})['catch'](function(error){
					reject(error);
				});
			});
		},

		updateAdministrator: function(params){
			return new Promise(function(resolve, reject) {
				params = params ? params : {};
				services.checkHost(params);

				var account = validateAndReturnRequiredAccount(params, reject);
				var token = validateAndReturnRequiredAccessToken(params, reject);
				var admin = validateAndReturnRequiredAdmin(params, reject);

				var protocol = params.ssl ? 'https://' : 'http://';
				var txParam = getTransactionURLParam();
				var url = protocol + services.authAdminURL + '/' + account + '/admins/' + admin.username +
					'/?access_token=' + token + (txParam ? '&' + txParam : '');

				b.$.put(url, {admin: admin}).then(function(response){
					services.auth.updateLastActiveTimestamp();
					resolve();
				})['catch'](function(error){
					reject(error);
				});
			});
		},

		deleteAdministrator: function(params){
			return new Promise(function(resolve, reject) {
				params = params ? params : {};
				services.checkHost(params);

				validateRequiredUsername(params, reject);

				var account = validateAndReturnRequiredAccount(params, reject);
				var token = validateAndReturnRequiredAccessToken(params, reject);
				var username = validateAndReturnRequiredUsername(params, reject);

				var protocol = params.ssl ? 'https://' : 'http://';
				var txParam = getTransactionURLParam();
				var url = protocol + services.authAdminURL + '/' + account + '/admins/' + username + '/?access_token=' + token +
					(txParam ? '&' + txParam : '');

				b.$.doDelete(url).then(function(response){
					services.auth.updateLastActiveTimestamp();
					resolve();
				})['catch'](function(error){
					reject(error);
				});
			});
		},



	};

	/* AUTH SERVICE */
	services.auth = {

		/**
		 * Retrieve a new access token from the BridgeIt auth service.
		 *
		 * The function returns a Promise that, when successful, returns an object with the following structure:
		 *    {
		 *       "access_token": "d9f7463d-d100-42b6-aecd-ae21e38e5d02",
		 *       "expires_in": 1420574793844
		 *    }
		 *
		 * Which contains the access token and the time, in milliseconds that the session will expire in.
		 *
		 * Unlike the login, and connect functions, this function does not store the access token after it
		 * is retrieved.
		 *
		 * @alias getNewAccessToken
		 * @param {Object} params params
		 * @param {String} params.account BridgeIt Services account name (required)
		 * @param {String} params.realm BridgeIt Services realm (required only for non-admin logins)
		 * @param {String} params.username User name (required)
		 * @param {String} params.password User password (required)
		 * @param {String} params.host The BridgeIt Services host url. If not supplied, the last used BridgeIT host, or the default will be used. (optional)
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 * @returns Promise with the following argument:
		 *      {
		 *          access_token: 'xxx',
		 *          expires_in: 99999
		 *      }
		 *
		 */
		 getNewAccessToken: function(params){
			return new Promise(
				function(resolve, reject) {
					params = params ? params : {};
					services.checkHost(params);

					if( !params.realm ){
						params.realm = 'admin';
					}

					//validation
					if( !params.account ){
						reject(Error('BridgeIt account required for new access token'));
						return;
					}
					if( !params.password ){
						reject(Error('password required for new access token'));
						return;
					}
					if( !params.username ){
						reject(Error('username required for new access token'));
						return;
					}
					var protocol = params.ssl ? 'https://' : 'http://';
					var url = protocol + services.authURL + '/' + encodeURI(params.account) +
						'/realms/' + encodeURI(params.realm) + '/token/?' + getTransactionURLParam();

					b.$.post(url, {
						strategy: 'query',
						username: params.username,
						password: params.password
					}).then(function(authResponse){
												resolve(authResponse);
					})['catch'](function(error){
						reject(error);
					});
				}
			);
		},

		/**
		 * Login into bridgeit services.
		 *
		 * This function will login into the BridgeIt auth service and return a user token and expiry timestamp upon
		 * successful authentication. This function does not need to be called if bridgeit.connect has already been
		 * called, as that function will automatically extend the user session, unless the timeout has passed.
		 *
		 * The function returns a Promise that, when successful, returns an object with the following structure:
		 *    {
		 *       "access_token": "d9f7463d-d100-42b6-aecd-ae21e38e5d02",
		 *       "expires_in": 1420574793844
		 *    }
		 *
		 * Which contains the access token and the time, in milliseconds that the session will expire in.
		 *
		 * @alias login
		 * @param {Object} params params
		 * @param {String} params.account BridgeIt Services account name (required)
		 * @param {String} params.realm BridgeIt Services realm (required only for non-admin logins)
		 * @param {Boolean} params.admin The client should or should not log in as an account administrator
		 * @param {String} params.username User name (required)
		 * @param {String} params.password User password (required)
		 * @param {String} params.host The BridgeIt Services host url. If not supplied, the last used BridgeIT host, or the default will be used. (optional)
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 * @param {String} params.scopeToPath (default '/') If set, the authentication token will be restricted to the given path, unless on localhost.
		 * @returns Promise with the following argument:
		 *      {
		 *          access_token: 'xxx',
		 *          expires_in: 99999
		 *      }
		 *
		 */
		login: function(params) {
			return new Promise(function(resolve, reject) {
				params = params ? params : {};
				services.checkHost(params);

				if( !params.realm ){
					params.realm = 'admin';
				}

				//validation
				if( !params.account ){
					reject(Error('BridgeIt account required for login'));
					return;
				}
				if( !params.password ){
					reject(Error('password required for login'));
					return;
				}
				if( !params.username ){
					reject(Error('username required for login'));
					return;
				}
				var protocol = params.ssl ? 'https://' : 'http://';
				var txParam = getTransactionURLParam();
        //here
				var url = protocol + services.authURL + '/' + encodeURI(params.account) +
					'/realms/' + (params.admin === 'true' ? 'admin' : encodeURI(params.realm)) + '/token/' + ( txParam ? ('?' + txParam) : '');

        //var url = protocol + services.authURL + '/' + encodeURI(params.account) +
        //  '/realms/' + encodeURI(params.realm) + '/token/' + ( txParam ? ('?' + txParam) : '');


				var loggedInAt = new Date().getTime();
				b.$.post(url, {
					strategy: 'query',
					username: params.username,
					password: params.password
				}).then(function(authResponse){
					if( !params.suppressUpdateTimestamp ){
						services.auth.updateLastActiveTimestamp();
					}
					b.setSessionStorageItem(btoa(TOKEN_KEY), authResponse.access_token);
						b.setSessionStorageItem(btoa(TOKEN_EXPIRES_KEY), authResponse.expires_in);
						b.setSessionStorageItem(btoa(TOKEN_SET_KEY), loggedInAt);
						b.setSessionStorageItem(btoa(ACCOUNT_KEY), btoa(params.account));
						b.setSessionStorageItem(btoa(REALM_KEY), btoa(params.realm));
						b.setSessionStorageItem(btoa(USERNAME_KEY), btoa(params.username));
						b.setSessionStorageItem(btoa(ADMIN_KEY), btoa(params.admin));
					if( params.scopeToPath ){
						b.setSessionStorageItem(btoa(SCOPE_TO_PATH_KEY), btoa(params.scopeToPath));
					}
					fireEvent(window, 'bridgeit-login-succeeded', {});
					resolve(authResponse);
				})['catch'](function(error){
					reject(error);
				});
			});
		},

		/**
		 * Connect to bridgeit services.
		 *
		 * This function will connect to the BridgeIt services, and maintain the connection for the specified
		 * timeout period (default 20 minutes). By default, the BridgeIt push service is also activated, so the client
		 * may send and receive push notifications after connecting.
		 *
		 * After connecting to BridgeIt Services, any BridgeIt service API may be used without needing to re-authenticate.
		 * After successfully connecting an authentication will be stored in session storage and available through
		 * sessionStorage.bridgeitToken. This authentication information will automatically be used by other BridgeIt API
		 * calls, so the token does not be included in subsequent calls, but is available if desired.
		 *
		 * A simple example of connecting to the BridgeIt Services and then making a service call is the following:
		 *
		 * bridgeit.connect({
		 *           account: 'my_account',
		 *           realm: 'realmA',
		 *           user: 'user',
		 *           password: 'secret'})
		 *   .then( function(){
		 *      console.log("successfully connnected to BridgeIt Services");
		 *      //now we can fetch some docs
		 *      return bridgeit.docService.get('documents');
		 *   })
		 *   .then( function(docs){
		 *      for( var d in docs ){ ... };
		 *   })
		 *   .catch( function(error){
		 *      console.log("error connecting to BridgeIt Services: " + error);
		 *   });
		 *
		 * @alias connect
		 * @param {Object} params params
		 * @param {String} params.account BridgeIt Services account name
		 * @param {Boolean} params.admin The client should or should not log in as an account administrator
		 * @param {String} params.realm BridgeIt Services realm
		 * @param {String} params.username User name
		 * @param {String} params.password User password
		 * @param {String} params.host The BridgeIt Services host url, defaults to api.bridgeit.io
		 * @param {Boolean} params.usePushService Open and connect to the BridgeIt push service, default true
		 * @param {Boolean} params.connectionTimeout The timeout duration, in minutes, that the BridgeIt login will last during inactivity. Default 20 minutes.
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 * @param {Boolean} params.storeCredentials (default true) Whether to store encrypted credentials in session storage. If set to false, bridgeit will not attempt to relogin before the session expires.
		 * @param {Function} params.onSessionExpiry Function callback to be called on session expiry. If you wish to ensure that disconnect is not called until after your onSessionExpiry callback has completed, please return a Promise from your function.
		 * @param {String} params.scopeToPath (default '/') If set, the authentication token will be restricted to the given path, unless on localhost.
		 * @returns Promise with service definitions
		 *
		 */
		connect: function(params){
			return new Promise(function(resolve, reject) {

				/* The function callback set to run before the next timeout,
				   will automatically reset the next setTimeout call if necessary */
				function connectCallback(){
					console.log(new Date().toISOString() + ' bridgeit.io.auth.connect: callback running');
					var connectSettings = services.auth.getConnectSettings();
					if( !connectSettings ){
						console.log(new Date().toISOString() + ' bridgeit.io.auth.connect: error, could not retrieve settings');
						return;
					}

					var timeoutMillis = connectSettings.connectionTimeout * 60 * 1000;

					//first check if connectionTimeout has expired
					var now = new Date().getTime();
					var inactiveMillis = now - services.auth.getLastActiveTimestamp();
					var millisUntilTimeoutExpires = timeoutMillis - inactiveMillis;
					console.log('bridgeit.io.auth.connect: getLastActiveTimestamp: ' + services.auth.getLastActiveTimestamp());
					console.log('bridgeit.io.auth.connect: connection timeout ms: ' + timeoutMillis);
					console.log('bridgeit.io.auth.connect: current timestamp: ' + now);
					console.log('bridgeit.io.auth.connect: inactive ms: ' + inactiveMillis + '(' + (inactiveMillis/1000/60) + ' mins)');
					console.log('bridgeit.io.auth.connect: ms until timeout: ' + millisUntilTimeoutExpires + '(' + (millisUntilTimeoutExpires/1000/60) + ' mins)');

					//if we haven't exceeded the connection timeout, reconnect
					if( millisUntilTimeoutExpires > 0 ){
						console.log(new Date().toISOString() + ' bridgeit.io.auth.connect: timeout has not been exceeded, ' +
							services.auth.getTimeRemainingBeforeExpiry()/1000/60 + ' mins remaining before token expires, ' +
							millisUntilTimeoutExpires/1000/60 + ' mins remaining before timeout expires');

						//if we the time remaining before expiry is less than the session timeout
						//refresh the access token and set the timeout
						if( timeoutMillis > millisUntilTimeoutExpires ){
							services.auth.refreshAccessToken().then(function(){
								var cbId = setTimeout(connectCallback, services.auth.getExpiresIn() - timeoutPadding);
								b.setSessionStorageItem(btoa(RELOGIN_CB_KEY), cbId);
								console.log( new Date().toISOString() + ' bridgeit.io.auth.connect: setting next connection check to ' + services.auth.getExpiresIn() / 1000 / 60 + ' mins, expiresIn: ' +
									(services.auth.getExpiresIn()/1000/60) + ' mins, remaining: '  +
									(services.auth.getTimeRemainingBeforeExpiry()/1000/60) + ' mins');

							});
						}
					}
					else{
						console.log( new Date().toISOString() + ' bridgeit.io.auth.connect: timeout has expired, disconnecting..');

						//look for the onSessionExpiry callback on the params first,
						//as functions could be passed by reference
						//secondly by settings, which would only be passed by name
						var expiredCallback = params.onSessionExpiry;
						if( !expiredCallback ){
							expiredCallback = connectSettings.onSessionExpiry;
						}

						//if there's no onSessionExpiry, call disconnect immediately
						//otherwise search for onSessionExpiry function, if not found
						//call disconnect() immediately, otherwise call onSessionExpiry
						//if callback if a promise, wait until the promise completes
						//before disconnecting, otherwise, wait 500ms then disconnect
						if( expiredCallback ){
							var expiredCallbackFunction;
							if( typeof expiredCallback === 'function'){
								expiredCallbackFunction = expiredCallback;
							}
							else if( typeof expiredCallback === 'string'){
								expiredCallbackFunction = findFunctionInGlobalScope(expiredCallback);
							}
							if( expiredCallbackFunction ){
								var expiredCallbackPromise = expiredCallbackFunction();
								if( expiredCallbackPromise && expiredCallbackPromise.then ){
									expiredCallbackPromise.then(services.auth.disconnect)
									['catch'](services.auth.disconnect);
								}
								else{
									setTimeout(services.auth.disconnect, 500);
								}
							}
							else{
								console.log( new Date().toISOString() + ' bridgeit.io.auth.connect: error calling onSessionExpiry callback, ' +
									'could not find function: ' + expiredCallback);
								services.auth.disconnect();
							}

						}
						else{
							services.auth.disconnect();
						}

					}
				}

				/* initialize the timing for the callback check */
				function initConnectCallback(){

					//if the desired connection timeout is greater the token expiry
					//set the callback check for just before the token expires
					var callbackTimeout;
					if( connectionTimeoutMillis > services.auth.getTimeRemainingBeforeExpiry()){
						callbackTimeout = services.auth.getTimeRemainingBeforeExpiry() - timeoutPadding;
					}
					//otherwise the disired timeout is less then the token expiry
					//so set the callback to happen just at specified timeout
					else{
						callbackTimeout = connectionTimeoutMillis;
					}

					var tokenSetAt = new Date();
					tokenSetAt.setTime(services.auth.getTokenSetAtTime());
					console.log( new Date().toISOString() + ' bridgeit.io.auth.connect: setting next connection check to ' + callbackTimeout / 1000 / 60 + ' mins, expiresIn: ' +
						(services.auth.getExpiresIn()/1000/60) + ' mins, remaining: '  +
						(services.auth.getTimeRemainingBeforeExpiry()/1000/60) + ' mins, token set at ' + tokenSetAt);
					var cbId = setTimeout(connectCallback, callbackTimeout);
					b.setSessionStorageItem(btoa(RELOGIN_CB_KEY), cbId);

					if( settings.usePushService ){
						services.push.startPushService(settings);
					}
				}

				/* initialize basic settings */
				function initSettings(){

					params = params ? params : {};
					services.checkHost(params);
					if( !params.storeCredentials){
						params.storeCredentials = true;
					}

					//store connect settings
					settings = {
						host: services.baseURL,
						usePushService: params.usePushService,
						connectionTimeout: params.connectionTimeout || 20,
						ssl: params.ssl,
						storeCredentials: params.storeCredentials || true,
						onSessionExpiry: params.onSessionExpiry,
						admin: params.admin
					};
					if( params.scopeToPath ){
						settings.scopeToPath = params.scopeToPath;
					}

					//settings.connectionTimeout = 5;

					b.setSessionStorageItem(btoa(CONNECT_SETTINGS_KEY), btoa(JSON.stringify(settings)));

					if( params.onSessionExpiry ){
						if( typeof params.onSessionExpiry === 'function'){
							var name = getFunctionName(params.onSessionExpiry);
							if( name ){
								settings.onSessionExpiry = name;
							}
						}
					}


					connectionTimeoutMillis =  (settings.connectionTimeout) * 60 * 1000;

				}

				/* store the provided credentials */
				function saveCredentials(){
					b.setSessionStorageItem(btoa(ACCOUNT_KEY), btoa(bridgeit.io.auth.getLastKnownAccount()));
					b.setSessionStorageItem(btoa(REALM_KEY), btoa(bridgeit.io.auth.getLastKnownRealm()));
					b.setSessionStorageItem(btoa(USERNAME_KEY), btoa(params.username));
					b.setSessionStorageItem(btoa(PASSWORD_KEY), btoa(params.password));
				}

				var timeoutPadding = 60000;
				var settings;
				var connectionTimeoutMillis;
				initSettings();

				if( services.auth.isLoggedIn()){
					initConnectCallback();
					resolve();
				}
				else{
					services.auth.login(params).then(function(authResponse){
						console.log(new Date().toISOString() + ' bridgeit.io.auth.connect: received auth response');
						saveCredentials();
						initConnectCallback();
						resolve();
					})['catch'](function(error){
						reject(error);
					});
				}
			});
		},

		refreshAccessToken: function(){
			return new Promise(function(resolve, reject) {
				if( !services.auth.isLoggedIn()){
					reject('bridgeit.io.auth.refreshAccessToken() not logged in, cant refresh token');
				}
				else{
					var loginParams = services.auth.getConnectSettings();
					if( !loginParams ){
						reject('bridgeit.io.auth.refreshAccessToken() no connect settings, cant refresh token');
					}
					else{
						loginParams.account = atob(b.getSessionStorageItem(btoa(ACCOUNT_KEY)));
						loginParams.realm = atob(b.getSessionStorageItem(btoa(REALM_KEY)));
						loginParams.username = atob(b.getSessionStorageItem(btoa(USERNAME_KEY)));
						loginParams.password = atob(b.getSessionStorageItem(btoa(PASSWORD_KEY)));
						loginParams.suppressUpdateTimestamp = true;
						loginParams.admin = atob(b.getSessionStorageItem(btoa(ADMIN_KEY)));
						console.log('bridgeit.io.auth.refreshAccessToken()');
						services.auth.login(loginParams).then(function(authResponse){
							fireEvent(window, 'bridgeit-access-token-refreshed', services.auth.getLastAccessToken());
							if( loginParams.usePushService ){
								services.push.startPushService(loginParams);
							}
							resolve(authResponse);
						})['catch'](function(response){
							reject(response);
						});
					}
				}

			});
		},

		/**
		 * Disconnect from BridgeIt Services.
		 *
		 * This function will logout from BridgeIt Services and remove all session information from the client.
		 *
		 * TODO
		 *
		 * @alias disconnect
		 * @param {Object} params params
		 * @param {String} params.account BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used.
		 * @param {String} params.realm The BridgeIt Services realm. If not provided, the last known BridgeIt Realm name will be used.
		 * @param {String} params.username User name (required)
		 * @param {String} params.password User password (required)
		 * @param {String} params.host The BridgeIt Services host url. If not supplied, the last used BridgeIT host, or the default will be used. (optional)
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 * @returns Promise with the following argument:
		 *      {
		 *          access_token: 'xxx',
		 *          expires_in: 99999
		 *      }
		 *
		 */
		disconnect: function(){
			b.removeSessionStorageItem(btoa(TOKEN_KEY));
			b.removeSessionStorageItem(btoa(TOKEN_EXPIRES_KEY));
			b.removeSessionStorageItem(btoa(CONNECT_SETTINGS_KEY));
			b.removeSessionStorageItem(btoa(TOKEN_SET_KEY));
			b.removeSessionStorageItem(btoa(ACCOUNT_KEY));
			b.removeSessionStorageItem(btoa(REALM_KEY));
			b.removeSessionStorageItem(btoa(USERNAME_KEY));
			b.removeSessionStorageItem(btoa(PASSWORD_KEY));
			b.removeSessionStorageItem(btoa(LAST_ACTIVE_TS_KEY));
			var cbId = b.getSessionStorageItem(btoa(RELOGIN_CB_KEY));
			if( cbId ){
				clearTimeout(cbId);
			}
			b.removeSessionStorageItem(btoa(RELOGIN_CB_KEY));
			console.log(new Date().toISOString() + ' bridgeit has disconnected')
		},

		getLastAccessToken: function(){
			return b.getSessionStorageItem(btoa(TOKEN_KEY));
		},

		getExpiresIn: function(){
			var expiresInStr = b.getSessionStorageItem(btoa(TOKEN_EXPIRES_KEY));
			if( expiresInStr ){
				return parseInt(expiresInStr,10);
			}
		},

		getTokenSetAtTime: function(){
			var tokenSetAtStr = b.getSessionStorageItem(btoa(TOKEN_SET_KEY));
			if( tokenSetAtStr ){
				return parseInt(tokenSetAtStr,10);
			}
		},

		getTimeRemainingBeforeExpiry: function(){
			var expiresIn = services.auth.getExpiresIn();
			var token = services.auth.getExpiresIn();
			if( expiresIn && token ){
				var now = new Date().getTime();
				return (services.auth.getTokenSetAtTime() + expiresIn) - now;
			}
		},

		getConnectSettings: function(){
			var settingsStr = b.getSessionStorageItem(btoa(CONNECT_SETTINGS_KEY));
			if( settingsStr ){
				return JSON.parse(atob(settingsStr));
			}
		},

		isLoggedIn: function(){
			var token = b.getSessionStorageItem(btoa(TOKEN_KEY)),
				tokenExpiresInStr = b.getSessionStorageItem(btoa(TOKEN_EXPIRES_KEY)),
				tokenExpiresIn = tokenExpiresInStr ? parseInt(tokenExpiresInStr,10) : null,
				tokenSetAtStr = b.getSessionStorageItem(btoa(TOKEN_SET_KEY)),
				tokenSetAt = tokenSetAtStr ? parseInt(tokenSetAtStr,10) : null,
				scopeToPathCipher = b.getSessionStorageItem(btoa(SCOPE_TO_PATH_KEY)),
				scopeToPath = scopeToPathCipher ? atob(scopeToPathCipher) : '/',
				isDev = window.location.port !== '',
				currentPath = window.location.pathname;
			//console.log('bridgeit.io.auth.isLoggedIn: token=' + token + ' tokenExpiresIn=' + tokenExpiresIn + 'tokenSetAt=' + tokenSetAt + ' (new Date().getTime() < (tokenExpiresIn + tokenSetAt))=' + (new Date().getTime() < (tokenExpiresIn + tokenSetAt)) + ' (currentPath.indexOf(scopeToPath) === 0)=' + (currentPath.indexOf(scopeToPath) === 0));
			var result = token && tokenExpiresIn && tokenSetAt && (new Date().getTime() < (tokenExpiresIn + tokenSetAt) ) && (isDev || currentPath.indexOf(scopeToPath) === 0);
			return !!result;
		},

		getLastKnownAccount: function(){
			var accountCipher = b.getSessionStorageItem(btoa(ACCOUNT_KEY));
			if( accountCipher ){
				return atob(accountCipher);
			}
		},

		getLastKnownRealm: function(){
			var realmCipher = b.getSessionStorageItem(btoa(REALM_KEY));
			if( realmCipher ){
				return atob(realmCipher);
			}
		},

		getLastKnownUsername: function () {
			var usernameCipher = b.getSessionStorageItem(btoa(USERNAME_KEY));
			if (usernameCipher) {
				return atob(usernameCipher);
			}
		},


		/**
		 * Register a new user for a realm that supports open user registrations.
		 *
		 * @alias registerAsNewUser
		 * @param {Object} params params
		 * @param {String} params.account BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used.
		 * @param {String} params.realm The BridgeIt Services realm. If not provided, the last known BridgeIt Realm name will be used.
		 * @param {String} params.username User name (required)
		 * @param {String} params.password User password (required)
		 * @param {String} params.host The BridgeIt Services host url. If not supplied, the last used BridgeIT host, or the default will be used. (optional)
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 * @param {String} params.firstname The user's first name (optional)
		 * @param {String} params.lastname The user's last name (optional)
		 * @param {String} params.email The user's email (optional)
		 * @param {Object} params.custom Custom user information
		 * @returns Promise
		 */
		registerAsNewUser: function(params){
			return new Promise(
				function(resolve, reject) {
					params = params ? params : {};
					services.checkHost(params);

					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);

					validateRequiredUsername(params, reject);
					validateRequiredPassword(params, reject);

					var user = {
						username: params.username,
						password: params.password
					};

					if( 'firstname' in params ){
						user.firstname = params.firstname;
					}
					if( 'lastname' in params ){
						user.lastname = params.lastname;
					}
					if( 'email' in params ){
						user.email = params.email;
					}
					if( 'custom' in params ){
						user.custom = params.custom;
					}

					var url = getRealmResourceURL(services.authAdminURL, account, realm,
						'quickuser', token, params.ssl);

					b.$.post(url, {user: user}).then(function(response){
						services.auth.updateLastActiveTimestamp();
						resolve(response);
					})['catch'](function(error){
						reject(error);
					});
				}
			);
		},

		/**
		 * Check if the current user has a single role.
		 *
		 * @alias checkUserRole
		 * @param {Object} params params
		 * @param {String} params.account BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used.
		 * @param {String} params.realm The BridgeIt Services realm. If not provided, the last known BridgeIt Realm name will be used.
		 * @param {String} params.host The BridgeIt Services host url. If not supplied, the last used BridgeIT host, or the default will be used. (optional)
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 * @param {String} params.role The single role to check for
		 * @returns Promise
		 */
		 checkUserRole: function(params){
			return new Promise(function(resolve, reject) {
				params = params ? params : {};
				services.checkHost(params);

				var account = validateAndReturnRequiredAccount(params, reject);
				var realm = validateAndReturnRequiredRealm(params, reject);
				var token = validateAndReturnRequiredAccessToken(params, reject);
				var role = validateAndReturnRequiredRole(params, reject);

				var url = getRealmResourceURL(services.authAdminURL, account, realm,
					'rolecheck/', token, params.ssl, {roleName: role});

				b.$.getJSON(url).then(function(response){
					if( response.results ){
						services.auth.updateLastActiveTimestamp();
						resolve(true);
					}
					else{
						reject(response);
					}
				})['catch'](function(response){
					if( response.status == 403){
						services.auth.updateLastActiveTimestamp();
						resolve(false);
					}
					else{
						reject(response);
					}
				});
			});
		},

		/**
		 * Check if the current user has a set of roles. The 'op' params can be added to check for 'or' or 'and'.
		 *
		 * @alias checkUserRole
		 * @param {Object} params params
		 * @param {String} params.account BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used.
		 * @param {String} params.realm The BridgeIt Services realm. If not provided, the last known BridgeIt Realm name will be used.
		 * @param {String} params.host The BridgeIt Services host url. If not supplied, the last used BridgeIT host, or the default will be used. (optional)
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 * @param {Array} params.roles The array of roles to check for
		 * @param {Array} params.roles The array of roles to check for
		 * @param {String} params.op The operator 'and' or 'or' ??? TODO
		 * @param {String} params.username The username parameter TODO may be later removed http://jira.icesoft.org/browse/NTFY-216
		 * @returns Promise
		 */
		 checkUserRoles: function(params){
			return new Promise(function(resolve, reject) {
				params = params ? params : {};
				services.checkHost(params);

				var account = validateAndReturnRequiredAccount(params, reject);
				var realm = validateAndReturnRequiredRealm(params, reject);
				var token = validateAndReturnRequiredAccessToken(params, reject);
				var roles = validateAndReturnRequiredRoles(params, reject);
				var username = validateAndReturnRequiredUsername(params, reject);

				var payload = {
					roleBlock:  [{
						name: 'first',
						roles: roles,
						op: params.op
					}]
				};

				var url = getRealmResourceURL(services.authAdminURL, account, realm,
					'users/' + username + '/rolecheck', token, params.ssl);

				b.$.post(url, payload).then(function(response){
					services.auth.updateLastActiveTimestamp();
					resolve(true);
				})['catch'](function(response){
					if( response.status == 403){
						services.auth.updateLastActiveTimestamp();
						resolve(false);
					}
					else{
						reject(response);
					}
				});
			});
		},


		/**
		 * Update the last active timestamp for BridgeIt auth. This value is used
		 * when checking for clients-side session timeouts.
		 * @alias updateLastActiveTimestamp
		 */
		updateLastActiveTimestamp: function(){
			b.setSessionStorageItem(btoa(LAST_ACTIVE_TS_KEY), new Date().getTime());
		},

		/**
		 * Return the timestamp of the last bridgeit op or when bridgeit.io.auth.updateLastActiveTimestamp()
		 * was called.
		 * @alias getLastActiveTimestamp
		 */
		getLastActiveTimestamp: function(){
			return b.getSessionStorageItem(btoa(LAST_ACTIVE_TS_KEY));
		},

		forgotPassword: function(params){
			return new Promise(function(resolve, reject) {
				params = params ? params : {};
				services.checkHost(params);

				var account = validateAndReturnRequiredAccount(params, reject);
				var username = validateAndReturnRequiredUsername(params, reject);

				var protocol = params.ssl ? 'https://' : 'http://';
				var txParam = getTransactionURLParam();
				var url = protocol + services.authAdminURL + '/' + account + '/';

				if( params.realm ){
					url += 'realms/' + params.realm + '/users/' + username + '/emailpassword';
				}
				else{ //admin
					url += 'admins/' + username + '/emailpassword';
				}
				url += (txParam ? '?' + txParam : '');

				b.$.post(url).then(function(response){
					services.auth.updateLastActiveTimestamp();
					resolve(true);
				})['catch'](function(response){
					reject(response);
				});
			});
		}
	};

	/* DOC SERVICE */
	services.documents = {

		/**
		 * Create a new document
		 *
		 * @alias createDocument
		 * @param {Object} params params
		 * @param {String} params.collection The name of the document collection.  Defaults to 'documents'.
		 * @param {String} params.id The document id. If not provided, the service will return a new id
		 * @param {Object} params.document The document to be created
		 * @param {String} params.account BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used.
		 * @param {String} params.realm The BridgeIt Services realm. If not provided, the last known BridgeIt Realm name will be used.
		 * @param {String} params.accessToken The BridgeIt authentication token. If not provided, the stored token from bridgeit.io.auth.connect() will be used
		 * @param {String} params.host The BridgeIt Services host url. If not supplied, the last used BridgeIT host, or the default will be used. (optional)
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 * @returns {String} The resource URI
		 */
		createDocument: function(params){
			return new Promise(
				function(resolve, reject) {
					params = params ? params : {};
					services.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var collection = validateCollection(params);
					var token = validateAndReturnRequiredAccessToken(params, reject);

					var url = getRealmResourceURL(services.documentsURL, account, realm,
						collection + '/' + (params.id ? params.id : ''), token, params.ssl);

					b.$.post(url, params.document).then(function(response){
						services.auth.updateLastActiveTimestamp();
						resolve(response.uri);
					})['catch'](function(error){
						reject(error);
					});

				}
			);
		},

		/**
		 * Update a document
		 *
		 * @alias updateDocument
		 * @param {Object} params params
		 * @param {String} params.collection The name of the document collection.  Defaults to 'documents'.
		 * @param {String} params.id The document id.
		 * @param {Object} params.document The document to be created
		 * @param {String} params.account BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used.
		 * @param {String} params.realm The BridgeIt Services realm. If not provided, the last known BridgeIt Realm name will be used.
		 * @param {String} params.accessToken The BridgeIt authentication token. If not provided, the stored token from bridgeit.io.auth.connect() will be used
		 * @param {String} params.host The BridgeIt Services host url. If not supplied, the last used BridgeIT host, or the default will be used. (optional)
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 * @returns {String} The resource URI
		 */
		updateDocument: function(params){
			return new Promise(
				function(resolve, reject) {
					params = params ? params : {};
					services.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var collection = validateCollection(params);
					var token = validateAndReturnRequiredAccessToken(params, reject);
					validateRequiredId(params, reject);

					var url = getRealmResourceURL(services.documentsURL, account, realm,
						collection + '/' + params.id, token, params.ssl);

					b.$.put(url, params.document).then(function(){
						services.auth.updateLastActiveTimestamp();
						resolve();
					})['catch'](function(error){
						reject(error);
					});
				}
			);
		},

		/**
		 * Fetch a document
		 *
		 * @alias getDocument
		 * @param {Object} params params
		 * @param {String} params.collection The name of the document collection.  Defaults to 'documents'.
		 * @param {String} params.id The document id. If not provided, the service will return a new id
		 * @param {String} params.account BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used.
		 * @param {String} params.realm The BridgeIt Services realm. If not provided, the last known BridgeIt Realm name will be used.
		 * @param {String} params.accessToken The BridgeIt authentication token. If not provided, the stored token from bridgeit.io.auth.connect() will be used
		 * @param {String} params.host The BridgeIt Services host url. If not supplied, the last used BridgeIT host, or the default will be used. (optional)
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 * @returns {Object} The document
		 */
		 getDocument: function(params){
			return new Promise(
				function(resolve, reject) {
					params = params ? params : {};
					services.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var collection = validateCollection(params);
					var token = validateAndReturnRequiredAccessToken(params, reject);
					validateRequiredId(params, reject);

					var url = getRealmResourceURL(services.documentsURL, account, realm,
						collection + '/' + params.id, token, params.ssl);

					b.$.getJSON(url).then(function(doc){
						services.auth.updateLastActiveTimestamp();
						//the document service always returns a list, so
						//check if we have a list of one, and if so, return the single item
						if( doc.length && doc.length === 1 ){
							resolve(doc[0]);
						}
						else{
							resolve(doc);
						}
					})['catch'](function(error){
						reject(error);
					});
				}
			);
		},

		/**
		 * Searches for documents in a realm based on a query
		 *
		 * @alias findDocuments
		 * @param {Object} params params
		 * @param {String} params.collection The name of the document collection.  Defaults to 'documents'.
		 * @param {String} params.account BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used.
		 * @param {String} params.realm The BridgeIt Services realm. If not provided, the last known BridgeIt Realm name will be used.
		 * @param {String} params.accessToken The BridgeIt authentication token. If not provided, the stored token from bridgeit.io.auth.connect() will be used
		 * @param {String} params.host The BridgeIt Services host url. If not supplied, the last used BridgeIT host, or the default will be used. (optional)
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 * @param {Object} params.query A mongo query for the documents
		 * @param {Object} params.fields Specify the inclusion or exclusion of fields to return in the result set
		 * @param {Object} params.options Additional query options such as limit and sort
		 * @returns {Object} The results
		 */
		 findDocuments: function(params){
			return new Promise(
				function(resolve, reject) {

					params = params ? params : {};
					services.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var collection = validateCollection(params);
					var token = validateAndReturnRequiredAccessToken(params, reject);

					var url = getRealmResourceURL(services.documentsURL, account, realm,
						collection, token, params.ssl, {
							'query': params.query ? encodeURIComponent(JSON.stringify(params.query)) : {},
							'fields': params.fields ? encodeURIComponent(JSON.stringify(params.fields)) : {},
							'options': params.options ? encodeURIComponent(JSON.stringify(params.options)) : {}
					});

					b.$.getJSON(url).then(function(doc){
						services.auth.updateLastActiveTimestamp();
						resolve(doc);
					})['catch'](function(response){
						//service currently returns a 404 when no documents are found
						if( response.status == 404 ){
							resolve(null);
						}
						else{
							reject(response);
						}
					});

				}
			);
		},

		/**
		 * Delete a new document
		 *
		 * @alias deleteDocument
		 * @param {Object} params params
		 * @param {String} params.collection The name of the document collection.  Defaults to 'documents'.
		 * @param {String} params.id The document id. If not provided, the service will return a new id
		 * @param {String} params.account BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used.
		 * @param {String} params.realm The BridgeIt Services realm. If not provided, the last known BridgeIt Realm name will be used.
		 * @param {String} params.accessToken The BridgeIt authentication token. If not provided, the stored token from bridgeit.io.auth.connect() will be used
		 * @param {String} params.host The BridgeIt Services host url. If not supplied, the last used BridgeIT host, or the default will be used. (optional)
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 */
		deleteDocument: function(params){
			return new Promise(
				function(resolve, reject) {
					params = params ? params : {};
					services.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var collection = validateCollection(params);
					var token = validateAndReturnRequiredAccessToken(params, reject);
					validateRequiredId(params, reject);

					var url = getRealmResourceURL(services.documentsURL, account, realm,
						collection + '/' + params.id, token, params.ssl);

					b.$.doDelete(url).then(function(response){
						services.auth.updateLastActiveTimestamp();
						resolve();
					})['catch'](function(error){
						reject(error);
					});
				}
			);
		},

		getResourcePermissions: function(params){
			params.service = 'documents';
			params.path = 'documents';
			return services.getResourcePermissions(params);
		},

		updateResourcePermissions: function(params){
			params.service = 'documents';
			params.path = 'documents';
			return services.updateResourcePermissions(params);
		},

	};

	services.eventhub = {
		/**
		 * Create a new event handler
		 *
		 * @alias createHandler
		 * @param {Object} params params
		 * @param {String} params.id The handler id
		 * @param {Object} params.handler The event handler to be created
		 * @param {String} params.account BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used.
		 * @param {String} params.realm The BridgeIt Services realm. If not provided, the last known BridgeIt Realm name will be used.
		 * @param {String} params.accessToken The BridgeIt authentication token. If not provided, the stored token from bridgeit.io.auth.connect() will be used
		 * @param {String} params.host The BridgeIt Services host url. If not supplied, the last used BridgeIt host, or the default will be used. (optional)
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 * @returns {String} The resource URI
		 */
		createHandler: function(params){
			return new Promise(
				function(resolve, reject) {
					params = params ? params : {};
					services.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);
					validateRequiredHandler(params, reject);

					var url = getRealmResourceURL(services.eventhubURL, account, realm,
						'handlers/' + (params.id ? params.id : ''), token, params.ssl);

					b.$.post(url, params.handler).then(function(response){
						services.auth.updateLastActiveTimestamp();
						resolve(response.uri);
					})['catch'](function(error){
						reject(error);
					});

				}
			);
		},

		/**
		 * Update an event handler
		 *
		 * @alias updateHandler
		 * @param {Object} params params
		 * @param {String} params.id The handler id, the event handler to be updated
		 * @param {Object} params.handler The new event handler
		 * @param {String} params.account BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used.
		 * @param {String} params.realm The BridgeIt Services realm. If not provided, the last known BridgeIt Realm name will be used.
		 * @param {String} params.accessToken The BridgeIt authentication token. If not provided, the stored token from bridgeit.io.auth.connect() will be used
		 * @param {String} params.host The BridgeIt Services host url. If not supplied, the last used BridgeIT host, or the default will be used. (optional)
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 */
		updateHandler: function(params){
			return new Promise(
				function(resolve, reject) {
					params = params ? params : {};
					services.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);
					validateRequiredId(params, reject);
					validateRequiredHandler(params, reject);

					var url = getRealmResourceURL(services.eventhubURL, account, realm,
						'handlers/' + params.id, token, params.ssl);

					b.$.put(url, params.handler).then(function(){
						services.auth.updateLastActiveTimestamp();
						resolve();
					})['catch'](function(error){
						reject(error);
					});
				}
			);
		},

		/**
		 * Fetch an event handler
		 *
		 * @alias getHandler
		 * @param {Object} params params
		 * @param {String} params.id The handler id, the event handler to fetch
		 * @param {String} params.account BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used.
		 * @param {String} params.realm The BridgeIt Services realm. If not provided, the last known BridgeIt Realm name will be used.
		 * @param {String} params.accessToken The BridgeIt authentication token. If not provided, the stored token from bridgeit.io.auth.connect() will be used
		 * @param {String} params.host The BridgeIt Services host url. If not supplied, the last used BridgeIT host, or the default will be used. (optional)
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 * @returns {Object} The event handler
		 */
		getHandler: function(params){
			return new Promise(
				function(resolve, reject) {
					params = params ? params : {};
					services.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);
					validateRequiredId(params, reject);

					var url = getRealmResourceURL(services.eventhubURL, account, realm,
						'handlers/' + params.id, token, params.ssl);

					b.$.getJSON(url).then(function(handler){
						services.auth.updateLastActiveTimestamp();
						resolve(handler);
					})['catch'](function(error){
						reject(error);
					});
				}
			);
		},

		/**
		 * Searches for event handlers in a realm based on a query
		 *
		 * @alias findHandlers
		 * @param {Object} params params
		 * @param {String} params.account BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used.
		 * @param {String} params.realm The BridgeIt Services realm. If not provided, the last known BridgeIt Realm name will be used.
		 * @param {String} params.accessToken The BridgeIt authentication token. If not provided, the stored token from bridgeit.io.auth.connect() will be used
		 * @param {String} params.host The BridgeIt Services host url. If not supplied, the last used BridgeIT host, or the default will be used. (optional)
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 * @param {Object} params.query A mongo query for the event handlers
		 * @param {Object} params.fields Specify the inclusion or exclusion of fields to return in the result set
		 * @param {Object} params.options Additional query options such as limit and sort
		 * @returns {Object} The results
		 */
		findHandlers: function(params){
			return new Promise(
				function(resolve, reject) {

					params = params ? params : {};
					services.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);

					var url = getRealmResourceURL(services.eventhubURL, account, realm,
						'handlers/', token, params.ssl, {
							'query': params.query ? encodeURIComponent(JSON.stringify(params.query)) : {},
							'fields': params.fields ? encodeURIComponent(JSON.stringify(params.fields)) : {},
							'options': params.options ? encodeURIComponent(JSON.stringify(params.options)) : {}
						});

					b.$.getJSON(url).then(function(handlers){
						services.auth.updateLastActiveTimestamp();
						resolve(handlers);
					})['catch'](function(response){
						reject(response);
					});

				}
			);
		},

		/**
		 * Delete an event handler
		 *
		 * @alias deleteHandler
		 * @param {Object} params params
		 * @param {String} params.id The handler id, the event handler to be deleted
		 * @param {String} params.account BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used.
		 * @param {String} params.realm The BridgeIt Services realm. If not provided, the last known BridgeIt Realm name will be used.
		 * @param {String} params.accessToken The BridgeIt authentication token. If not provided, the stored token from bridgeit.io.auth.connect() will be used
		 * @param {String} params.host The BridgeIt Services host url. If not supplied, the last used BridgeIT host, or the default will be used. (optional)
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 */
		deleteHandler: function(params){
			return new Promise(
				function(resolve, reject) {
					params = params ? params : {};
					services.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);
					validateRequiredId(params, reject);

					var url = getRealmResourceURL(services.eventhubURL, account, realm,
						'handlers/' + params.id, token, params.ssl);

					b.$.doDelete(url).then(function(){
						services.auth.updateLastActiveTimestamp();
						resolve();
					})['catch'](function(error){
						reject(error);
					});
				}
			);
		},

		/**
		 * Delete event handlers in a realm based on a query
		 *
		 * @alias deleteHandlers
		 * @param {Object} params params
		 * @param {String} params.account BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used.
		 * @param {String} params.realm The BridgeIt Services realm. If not provided, the last known BridgeIt Realm name will be used.
		 * @param {String} params.accessToken The BridgeIt authentication token. If not provided, the stored token from bridgeit.io.auth.connect() will be used
		 * @param {String} params.host The BridgeIt Services host url. If not supplied, the last used BridgeIT host, or the default will be used. (optional)
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 * @param {Object} params.query A mongo query for the event handlers
		 * @param {Object} params.fields Specify the inclusion or exclusion of fields to return in the result set
		 * @param {Object} params.options Additional query options such as limit and sort
		 */
		deleteHandlers: function(params){
			return new Promise(
				function(resolve, reject) {
					params = params ? params : {};
					services.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);

					var url = getRealmResourceURL(services.eventhubURL, account, realm,
						'handlers/', token, params.ssl, {
							'query': params.query ? encodeURIComponent(JSON.stringify(params.query)) : {},
							'fields': params.fields ? encodeURIComponent(JSON.stringify(params.fields)) : {},
							'options': params.options ? encodeURIComponent(JSON.stringify(params.options)) : {}
						});

					b.$.doDelete(url).then(function(){
						services.auth.updateLastActiveTimestamp();
						resolve();
					})['catch'](function(error){
						reject(error);
					});
				}
			);
		},

		/**
		 * Create a new event recognizer
		 *
		 * @alias createRecognizer
		 * @param {Object} params params
		 * @param {String} params.id The recognizer id
		 * @param {Object} params.recognizer The event recognizer to be created
		 * @param {String} params.account BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used.
		 * @param {String} params.realm The BridgeIt Services realm. If not provided, the last known BridgeIt Realm name will be used.
		 * @param {String} params.accessToken The BridgeIt authentication token. If not provided, the stored token from bridgeit.io.auth.connect() will be used
		 * @param {String} params.host The BridgeIt Services host url. If not supplied, the last used BridgeIt host, or the default will be used. (optional)
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 * @returns {String} The resource URI
		 */
		createRecognizer: function(params) {
			return new Promise(
				function(resolve, reject) {
					params = params ? params : {};
					services.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);
					validateRequiredRecognizer(params, reject);

					var url = getRealmResourceURL(services.eventhubURL, account, realm,
						'recognizers/' + (params.id ? params.id : ''), token, params.ssl);

					b.$.post(url, params.recognizer).then(function(response) {
						services.auth.updateLastActiveTimestamp();
						resolve(response.uri);
					})['catch'](function(error) {
						reject(error);
					});

				}
			);
		},

		/**
		 * Update an event recognizer
		 *
		 * @alias updateRecognizer
		 * @param {Object} params params
		 * @param {String} params.id The recognizer id, the event recognizer to be updated
		 * @param {Object} params.recognizer The new event recognizer
		 * @param {String} params.account BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used.
		 * @param {String} params.realm The BridgeIt Services realm. If not provided, the last known BridgeIt Realm name will be used.
		 * @param {String} params.accessToken The BridgeIt authentication token. If not provided, the stored token from bridgeit.io.auth.connect() will be used
		 * @param {String} params.host The BridgeIt Services host url. If not supplied, the last used BridgeIT host, or the default will be used. (optional)
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 */
		updateRecognizer: function(params) {
			return new Promise(
				function(resolve, reject) {
					params = params ? params : {};
					services.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);
					validateRequiredId(params, reject);
					validateRequiredRecognizer(params, reject);

					var url = getRealmResourceURL(services.eventhubURL, account, realm,
						'recognizers/' + params.id, token, params.ssl);

					b.$.put(url, params.recognizer).then(function() {
						services.auth.updateLastActiveTimestamp();
						resolve();
					})['catch'](function(error) {
						reject(error);
					});
				}
			);
		},

		/**
		 * Fetch an event recognizer
		 *
		 * @alias getRecognizer
		 * @param {Object} params params
		 * @param {String} params.id The recognizer id, the event recognizer to fetch
		 * @param {String} params.account BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used.
		 * @param {String} params.realm The BridgeIt Services realm. If not provided, the last known BridgeIt Realm name will be used.
		 * @param {String} params.accessToken The BridgeIt authentication token. If not provided, the stored token from bridgeit.io.auth.connect() will be used
		 * @param {String} params.host The BridgeIt Services host url. If not supplied, the last used BridgeIT host, or the default will be used. (optional)
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 * @returns {Object} The event recognizer
		 */
		getRecognizer: function(params) {
			return new Promise(
				function(resolve, reject) {
					params = params ? params : {};
					services.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);
					validateRequiredId(params, reject);

					var url = getRealmResourceURL(services.eventhubURL, account, realm,
						'recognizers/' + params.id, token, params.ssl);

					b.$.getJSON(url).then(function(recognizer) {
						services.auth.updateLastActiveTimestamp();
						resolve(recognizer);
					})['catch'](function(error) {
						reject(error);
					});
				}
			);
		},

		/**
		 * Searches for event recognizers in a realm based on a query
		 *
		 * @alias findRecognizers
		 * @param {Object} params params
		 * @param {String} params.account BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used.
		 * @param {String} params.realm The BridgeIt Services realm. If not provided, the last known BridgeIt Realm name will be used.
		 * @param {String} params.accessToken The BridgeIt authentication token. If not provided, the stored token from bridgeit.io.auth.connect() will be used
		 * @param {String} params.host The BridgeIt Services host url. If not supplied, the last used BridgeIT host, or the default will be used. (optional)
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 * @param {Object} params.query A mongo query for the event recognizers
		 * @param {Object} params.fields Specify the inclusion or exclusion of fields to return in the result set
		 * @param {Object} params.options Additional query options such as limit and sort
		 * @returns {Object} The results
		 */
		findRecognizers: function(params) {
			return new Promise(
				function(resolve, reject) {

					params = params ? params : {};
					services.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);

					var url = getRealmResourceURL(services.eventhubURL, account, realm,
						'recognizers/', token, params.ssl, {
							'query': params.query ? encodeURIComponent(JSON.stringify(params.query)) : {},
							'fields': params.fields ? encodeURIComponent(JSON.stringify(params.fields)) : {},
							'options': params.options ? encodeURIComponent(JSON.stringify(params.options)) : {}
						});

					b.$.getJSON(url).then(function(recognizers) {
						services.auth.updateLastActiveTimestamp();
						resolve(recognizers);
					})['catch'](function(response) {
						reject(response);
					});

				}
			);
		},

		/**
		 * Delete an event recognizer
		 *
		 * @alias deleteRecognizer
		 * @param {Object} params params
		 * @param {String} params.id The recognizer id, the event recognizer to be deleted
		 * @param {String} params.account BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used.
		 * @param {String} params.realm The BridgeIt Services realm. If not provided, the last known BridgeIt Realm name will be used.
		 * @param {String} params.accessToken The BridgeIt authentication token. If not provided, the stored token from bridgeit.io.auth.connect() will be used
		 * @param {String} params.host The BridgeIt Services host url. If not supplied, the last used BridgeIT host, or the default will be used. (optional)
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 */
		deleteRecognizer: function(params) {
			return new Promise(
				function(resolve, reject) {
					params = params ? params : {};
					services.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);
					validateRequiredId(params, reject);

					var url = getRealmResourceURL(services.eventhubURL, account, realm,
						'recognizers/' + params.id, token, params.ssl);

					b.$.doDelete(url).then(function() {
						services.auth.updateLastActiveTimestamp();
						resolve();
					})['catch'](function(error) {
						reject(error);
					});
				}
			);
		},

		/**
		 * Delete event recognizers in a realm based on a query
		 *
		 * @alias deleteRecognizers
		 * @param {Object} params params
		 * @param {String} params.account BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used.
		 * @param {String} params.realm The BridgeIt Services realm. If not provided, the last known BridgeIt Realm name will be used.
		 * @param {String} params.accessToken The BridgeIt authentication token. If not provided, the stored token from bridgeit.io.auth.connect() will be used
		 * @param {String} params.host The BridgeIt Services host url. If not supplied, the last used BridgeIT host, or the default will be used. (optional)
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 * @param {Object} params.query A mongo query for the event recognizers
		 * @param {Object} params.fields Specify the inclusion or exclusion of fields to return in the result set
		 * @param {Object} params.options Additional query options such as limit and sort
		 */
		deleteRecognizers: function(params) {
			return new Promise(
				function(resolve, reject) {
					params = params ? params : {};
					services.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);

					var url = getRealmResourceURL(services.eventhubURL, account, realm,
						'recognizers/', token, params.ssl, {
							'query': params.query ? encodeURIComponent(JSON.stringify(params.query)) : {},
							'fields': params.fields ? encodeURIComponent(JSON.stringify(params.fields)) : {},
							'options': params.options ? encodeURIComponent(JSON.stringify(params.options)) : {}
						});

					b.$.doDelete(url).then(function() {
						services.auth.updateLastActiveTimestamp();
						resolve();
					})['catch'](function(error) {
						reject(error);
					});
				}
			);
		},

		getRecognizerResourcePermissions: function(params){
			params.path = 'recognizers';
			return services.eventhub.getResourcePermissions(params);
		},

		updateRecognizerResourcePermissions: function(params){
			params.path = 'recognizers';
			return services.eventhub.getResourcePermissions(params);
		},

		getHandlerResourcePermissions: function(params){
			params.path = 'handlers';
			return services.eventhub.getResourcePermissions(params);
		},

		updateHandlerResourcePermissions: function(params){
			params.path = 'handlers';
			return services.eventhub.updateResourcePermissions(params);
		},

		getResourcePermissions: function(params){
			params.service = 'eventhub';
			return services.getResourcePermissions(params);
		},

		updateResourcePermissions: function(params){
			params.service = 'eventhub';
			return services.updateResourcePermissions(params);
		},
	};

	/* LOCATE SERVICE */
	services.location = {

		/**
		 * Create a new region
		 *
		 * @alias createRegion
		 * @param {Object} params params
		 * @param {String} params.id The region id. If not provided, the service will return a new id
		 * @param {Object} params.region The region geoJSON document that describes the region to be created
		 * @param {String} params.account BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used.
		 * @param {String} params.realm The BridgeIt Services realm. If not provided, the last known BridgeIt Realm name will be used.
		 * @param {String} params.accessToken The BridgeIt authentication token. If not provided, the stored token from bridgeit.io.auth.connect() will be used
		 * @param {String} params.host The BridgeIt Services host url. If not supplied, the last used BridgeIT host, or the default will be used. (optional)
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 * @returns {String} The resource URI
		 */
		 createRegion: function(params){
			return new Promise(
				function(resolve, reject) {
					params = params ? params : {};
					services.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);
					validateRequiredRegion(params, reject);

					var url = getRealmResourceURL(services.locateURL, account, realm,
						'regions/' + (params.id ? params.id : ''), token, params.ssl);

					b.$.post(url, params.region).then(function(response){
						services.auth.updateLastActiveTimestamp();
						resolve(response.uri);
					})['catch'](function(error){
						reject(error);
					});
				}
			);
		},

		/**
		 * Update a region
		 *
		 * @alias updateRegion
		 * @param {Object} params params
		 * @param {String} params.id The region id, the region to be updated
		 * @param {Object} params.region The new region
		 * @param {String} params.account BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used.
		 * @param {String} params.realm The BridgeIt Services realm. If not provided, the last known BridgeIt Realm name will be used.
		 * @param {String} params.accessToken The BridgeIt authentication token. If not provided, the stored token from bridgeit.io.auth.connect() will be used
		 * @param {String} params.host The BridgeIt Services host url. If not supplied, the last used BridgeIT host, or the default will be used. (optional)
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 */
		updateRegion: function(params){
			return new Promise(
				function(resolve, reject) {
					params = params ? params : {};
					services.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);
					validateRequiredId(params, reject);
					validateRequiredRegion(params, reject);

					var url = getRealmResourceURL(services.locateURL, account, realm,
							'regions/' + params.id, token, params.ssl);

					b.$.put(url, params.region).then(function(){
						services.auth.updateLastActiveTimestamp();
						resolve();
					})['catch'](function(error){
						reject(error);
					});
				}
			);
		},

		/**
		 * Delete a new region
		 *
		 * @alias deleteRegion
		 * @param {Object} params params
		 * @param {String} params.id The region id.
		 * @param {String} params.account BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used.
		 * @param {String} params.realm The BridgeIt Services realm. If not provided, the last known BridgeIt Realm name will be used.
		 * @param {String} params.accessToken The BridgeIt authentication token. If not provided, the stored token from bridgeit.io.auth.connect() will be used
		 * @param {String} params.host The BridgeIt Services host url. If not supplied, the last used BridgeIT host, or the default will be used. (optional)
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 */
		 deleteRegion: function(params){
			return new Promise(
				function(resolve, reject) {
					params = params ? params : {};
					services.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);
					validateRequiredId(params, reject);

					var url = getRealmResourceURL(services.locateURL, account, realm,
						'regions/' + params.id, token, params.ssl);

					b.$.doDelete(url).then(function(response){
						services.auth.updateLastActiveTimestamp();
						resolve();
					})['catch'](function(error){
						reject(error);
					});
				}
			);
		},

		/**
		 * Fetches all saved regions for the realm
		 *
		 * @alias getAllRegions
		 * @param {Object} params params
		 * @param {String} params.account BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used.
		 * @param {String} params.realm The BridgeIt Services realm. If not provided, the last known BridgeIt Realm name will be used.
		 * @param {String} params.accessToken The BridgeIt authentication token. If not provided, the stored token from bridgeit.io.auth.connect() will be used
		 * @param {String} params.host The BridgeIt Services host url. If not supplied, the last used BridgeIT host, or the default will be used. (optional)
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 * @returns {Object} The results
		 */
		 getAllRegions: function(params){
			return new Promise(
				function(resolve, reject) {

					params = params ? params : {};
					services.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);

					var url = getRealmResourceURL(services.locateURL, account, realm,
						'regions', token, params.ssl);

					b.$.getJSON(url).then(function(response){
						services.auth.updateLastActiveTimestamp();
						resolve(response);
					})['catch'](function(error){
						reject(error);
					});
				}
			);
		},

		/**
		 * Searches for regions in a realm based on a query
		 *
		 * @alias findRegions
		 * @param {Object} params params
		 * @param {String} params.account BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used.
		 * @param {String} params.realm The BridgeIt Services realm. If not provided, the last known BridgeIt Realm name will be used.
		 * @param {String} params.accessToken The BridgeIt authentication token. If not provided, the stored token from bridgeit.io.auth.connect() will be used
		 * @param {String} params.host The BridgeIt Services host url. If not supplied, the last used BridgeIT host, or the default will be used. (optional)
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 * @param {Object} params.query A mongo query for the regions
		 * @param {Object} params.fields Specify the inclusion or exclusion of fields to return in the result set
		 * @param {Object} params.options Additional query options such as limit and sort
		 * @returns {Object} The results
		 */
		 findRegions: function(params){
			return new Promise(
				function(resolve, reject) {
					params = params ? params : {};
					services.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);

					var url = getRealmResourceURL(services.locateURL, account, realm,
						'regions', token, params.ssl, {
							'query': params.query ? encodeURIComponent(JSON.stringify(params.query)) : {},
							'fields': params.fields ? encodeURIComponent(JSON.stringify(params.fields)) : {},
							'options': params.options ? encodeURIComponent(JSON.stringify(params.options)) : {}
						});

					b.$.getJSON(url).then(function(response){
						services.auth.updateLastActiveTimestamp();
						resolve(response);
					})['catch'](function(error){
						if( error.status === 404 ){
							resolve();
						}
						else{
							reject(error);
						}
					});
				}
			);
		},

		/**
		 * Searches for monitors in a realm based on a query
		 *
		 * @alias findMonitors
		 * @param {Object} params params
		 * @param {String} params.account BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used.
		 * @param {String} params.realm The BridgeIt Services realm. If not provided, the last known BridgeIt Realm name will be used.
		 * @param {String} params.accessToken The BridgeIt authentication token. If not provided, the stored token from bridgeit.io.auth.connect() will be used
		 * @param {String} params.host The BridgeIt Services host url. If not supplied, the last used BridgeIT host, or the default will be used. (optional)
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 * @param {Object} params.query A mongo query for the monitors
		 * @param {Object} params.fields Specify the inclusion or exclusion of fields to return in the result set
		 * @param {Object} params.options Additional query options such as limit and sort
		 * @returns {Object} The results
		 */
		 findMonitors: function(params){
			return new Promise(
				function(resolve, reject) {
					params = params ? params : {};
					services.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);

					var url = getRealmResourceURL(services.locateURL, account, realm,
						'monitors', token, params.ssl, {
							'query': params.query ? encodeURIComponent(JSON.stringify(params.query)) : {},
							'fields': params.fields ? encodeURIComponent(JSON.stringify(params.fields)) : {},
							'options': params.options ? encodeURIComponent(JSON.stringify(params.options)) : {}
						});

					b.$.getJSON(url).then(function(response){
						services.auth.updateLastActiveTimestamp();
						resolve(response);
					})['catch'](function(error){
						if( error.status === 404 ){
							resolve();
						}
						else{
							reject(error);
						}
					});
				}
			);
		},

		/**
		 * Create a new location monitor
		 *
		 * @alias createMonitor
		 * @param {Object} params params
		 * @param {String} params.id The monitor id. If not provided, the service will return a new id
		 * @param {Object} params.monitor The monitor document that describes the monitor to be created
		 * @param {String} params.account BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used.
		 * @param {String} params.realm The BridgeIt Services realm. If not provided, the last known BridgeIt Realm name will be used.
		 * @param {String} params.accessToken The BridgeIt authentication token. If not provided, the stored token from bridgeit.io.auth.connect() will be used
		 * @param {String} params.host The BridgeIt Services host url. If not supplied, the last used BridgeIT host, or the default will be used. (optional)
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 * @returns {String} The resource URI
		 */
		 createMonitor: function(params){
			return new Promise(
				function(resolve, reject) {
					params = params ? params : {};
					services.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);
					validateRequiredMonitor(params, reject);

					var url = getRealmResourceURL(services.locateURL, account, realm,
						'monitors' + (params.id ? '/' + params.id : ''), token, params.ssl);

					b.$.post(url, params.monitor).then(function(response){
						services.auth.updateLastActiveTimestamp();
						resolve(response.uri);
					})['catch'](function(error){
						reject(error);
					});
				}
			);
		},

		/**
		 * Delete a new monitor
		 *
		 * @alias deleteMonitor
		 * @param {Object} params params
		 * @param {String} params.id The region id.
		 * @param {String} params.account BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used.
		 * @param {String} params.realm The BridgeIt Services realm. If not provided, the last known BridgeIt Realm name will be used.
		 * @param {String} params.accessToken The BridgeIt authentication token. If not provided, the stored token from bridgeit.io.auth.connect() will be used
		 * @param {String} params.host The BridgeIt Services host url. If not supplied, the last used BridgeIT host, or the default will be used. (optional)
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 */
		 deleteMonitor: function(params){
			return new Promise(
				function(resolve, reject) {
					params = params ? params : {};
					services.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);
					validateRequiredId(params, reject);

					var url = getRealmResourceURL(services.locateURL, account, realm,
						'monitors/' + params.id, token, params.ssl);

					b.$.doDelete(url).then(function(response){
						services.auth.updateLastActiveTimestamp();
						resolve();
					})['catch'](function(error){
						reject(error);
					});
				}
			);
		},

		/**
		 * Fetches all saved monitors for the realm
		 *
		 * @alias getAllMonitors
		 * @param {Object} params params
		 * @param {String} params.account BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used.
		 * @param {String} params.realm The BridgeIt Services realm. If not provided, the last known BridgeIt Realm name will be used.
		 * @param {String} params.accessToken The BridgeIt authentication token. If not provided, the stored token from bridgeit.io.auth.connect() will be used
		 * @param {String} params.host The BridgeIt Services host url. If not supplied, the last used BridgeIT host, or the default will be used. (optional)
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 * @returns {Object} The results
		 */
		 getAllMonitors: function(params){
			return new Promise(
				function(resolve, reject) {
					params = params ? params : {};
					services.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);

					var url = getRealmResourceURL(services.locateURL, account, realm,
						'monitors', token, params.ssl);

					b.$.getJSON(url).then(function(response){
						services.auth.updateLastActiveTimestamp();
						resolve(response);
					})['catch'](function(error){
						reject(error);
					});
				}
			);
		},

		/**
		 * Create a new location point of interest
		 *
		 * @alias createPOI
		 * @param {Object} params params
		 * @param {String} params.id The POI id. If not provided, the service will return a new id
		 * @param {Object} params.poi The POI document that describes the POI to be created
		 * @param {String} params.account BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used.
		 * @param {String} params.realm The BridgeIt Services realm. If not provided, the last known BridgeIt Realm name will be used.
		 * @param {String} params.accessToken The BridgeIt authentication token. If not provided, the stored token from bridgeit.io.auth.connect() will be used
		 * @param {String} params.host The BridgeIt Services host url. If not supplied, the last used BridgeIT host, or the default will be used. (optional)
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 * @returns {String} The resource URI
		 */
		 createPOI: function(params){
			return new Promise(
				function(resolve, reject) {
					params = params ? params : {};
					services.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);
					validateRequiredPOI(params, reject);

					var url = getRealmResourceURL(services.locateURL, account, realm,
						'poi' + (params.id ? '/' + params.id : ''), token, params.ssl);

					b.$.post(url, params.poi).then(function(response){
						services.auth.updateLastActiveTimestamp();
						resolve(response.uri);
					})['catch'](function(error){
						reject(error);
					});
				}
			);
		},

		/**
		 * Update a poi
		 *
		 * @alias updatePOI
		 * @param {Object} params params
		 * @param {String} params.id The poi id, the poi to be updated
		 * @param {Object} params.poi The new poi
		 * @param {String} params.account BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used.
		 * @param {String} params.realm The BridgeIt Services realm. If not provided, the last known BridgeIt Realm name will be used.
		 * @param {String} params.accessToken The BridgeIt authentication token. If not provided, the stored token from bridgeit.io.auth.connect() will be used
		 * @param {String} params.host The BridgeIt Services host url. If not supplied, the last used BridgeIT host, or the default will be used. (optional)
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 */
		updatePOI: function(params){
			return new Promise(
				function(resolve, reject) {
					params = params ? params : {};
					services.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);
					validateRequiredId(params, reject);
					validateRequiredPOI(params, reject);

					var url = getRealmResourceURL(services.locateURL, account, realm,
							'poi/' + params.id, token, params.ssl);

					b.$.put(url, params.poi).then(function(){
						services.auth.updateLastActiveTimestamp();
						resolve();
					})['catch'](function(error){
						reject(error);
					});
				}
			);
		},

		/**
		 * Searches for POIs in a realm based on a query
		 *
		 * @alias findPOIs
		 * @param {Object} params params
		 * @param {String} params.account BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used.
		 * @param {String} params.realm The BridgeIt Services realm. If not provided, the last known BridgeIt Realm name will be used.
		 * @param {String} params.accessToken The BridgeIt authentication token. If not provided, the stored token from bridgeit.io.auth.connect() will be used
		 * @param {String} params.host The BridgeIt Services host url. If not supplied, the last used BridgeIT host, or the default will be used. (optional)
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 * @param {Object} params.query A mongo query for the points of interest
		 * @param {Object} params.fields Specify the inclusion or exclusion of fields to return in the result set
		 * @param {Object} params.options Additional query options such as limit and sort
		 * @returns {Object} The results
		 */
		 findPOIs: function(params){
			return new Promise(
				function(resolve, reject) {
					params = params ? params : {};
					services.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);

					var url = getRealmResourceURL(services.locateURL, account, realm,
						'poi', token, params.ssl, {
							'query': params.query ? encodeURIComponent(JSON.stringify(params.query)) : {},
							'fields': params.fields ? encodeURIComponent(JSON.stringify(params.fields)) : {},
							'options': params.options ? encodeURIComponent(JSON.stringify(params.options)) : {}
						});

					b.$.getJSON(url).then(function(response){
						services.auth.updateLastActiveTimestamp();
						resolve(response);
					})['catch'](function(error){
						if( error.status === 404 ){
							resolve();
						}
						else{
							reject(error);
						}
					});
				}
			);
		},

		/**
		 * Delete a new POI
		 *
		 * @alias deletePOI
		 * @param {Object} params params
		 * @param {String} params.id The POI id.
		 * @param {String} params.account BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used.
		 * @param {String} params.realm The BridgeIt Services realm. If not provided, the last known BridgeIt Realm name will be used.
		 * @param {String} params.accessToken The BridgeIt authentication token. If not provided, the stored token from bridgeit.io.auth.connect() will be used
		 * @param {String} params.host The BridgeIt Services host url. If not supplied, the last used BridgeIT host, or the default will be used. (optional)
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 */
		 deletePOI: function(params){
			return new Promise(
				function(resolve, reject) {
					params = params ? params : {};
					services.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);
					validateRequiredId(params, reject);

					var url = getRealmResourceURL(services.locateURL, account, realm,
						'poi/' + params.id, token, params.ssl);

					b.$.doDelete(url).then(function(response){
						services.auth.updateLastActiveTimestamp();
						resolve();
					})['catch'](function(error){
						reject(error);
					});
				}
			);
		},

		/**
		 * Fetches all saved POIs for the realm
		 *
		 * @alias getAllPOIs
		 * @param {Object} params params
		 * @param {String} params.account BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used.
		 * @param {String} params.realm The BridgeIt Services realm. If not provided, the last known BridgeIt Realm name will be used.
		 * @param {String} params.accessToken The BridgeIt authentication token. If not provided, the stored token from bridgeit.io.auth.connect() will be used
		 * @param {String} params.host The BridgeIt Services host url. If not supplied, the last used BridgeIT host, or the default will be used. (optional)
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 * @returns {Object} The results
		 */
		 getAllPOIs: function(params){
			return new Promise(
				function(resolve, reject) {
					params = params ? params : {};
					services.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);

					var url = getRealmResourceURL(services.locateURL, account, realm,
						'poi', token, params.ssl);

					b.$.getJSON(url).then(function(response){
						services.auth.updateLastActiveTimestamp();
						resolve(response);
					})['catch'](function(error){
						reject(error);
					});
				}
			);
		},

		/**
		 * Searches for locations in a realm based on a query
		 *
		 * @alias findLocations
		 * @param {Object} params params
		 * @param {String} params.account BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used.
		 * @param {String} params.realm The BridgeIt Services realm. If not provided, the last known BridgeIt Realm name will be used.
		 * @param {String} params.accessToken The BridgeIt authentication token. If not provided, the stored token from bridgeit.io.auth.connect() will be used
		 * @param {String} params.host The BridgeIt Services host url. If not supplied, the last used BridgeIT host, or the default will be used. (optional)
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 * @param {Object} params.query A mongo query for the locations
		 * @param {Object} params.fields Specify the inclusion or exclusion of fields to return in the result set
		 * @param {Object} params.options Additional query options such as limit and sort
		 * @returns {Object} The results
		 */
		 findLocations: function(params){
			return new Promise(
				function(resolve, reject) {
					params = params ? params : {};
					services.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);

					var url = getRealmResourceURL(services.locateURL, account, realm,
						'locations', token, params.ssl, {
							'query': params.query ? encodeURIComponent(JSON.stringify(params.query)) : {},
							'fields': params.fields ? encodeURIComponent(JSON.stringify(params.fields)) : {},
							'options': params.options ? encodeURIComponent(JSON.stringify(params.options)) : {}
						});

					b.$.getJSON(url).then(function(response){
						services.auth.updateLastActiveTimestamp();
						resolve(response);
					})['catch'](function(error){
						if( error.status === 404 ){
							resolve();
						}
						else{
							reject(error);
						}
					});
				}
			);
		},

		/**
		 * Update the location of the current user.
		 *
		 * @alias updateLocation
		 * @param {Object} params params
		 * @param {String} params.account BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used.
		 * @param {String} params.realm The BridgeIt Services realm. If not provided, the last known BridgeIt Realm name will be used.
		 * @param {String} params.accessToken The BridgeIt authentication token. If not provided, the stored token from bridgeit.io.auth.connect() will be used
		 * @param {String} params.host The BridgeIt Services host url. If not supplied, the last used BridgeIT host, or the default will be used. (optional)
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 * @param {Object} params.location The location
		 */
		 updateLocation: function(params){
			return new Promise(
				function(resolve, reject) {
					params = params ? params : {};
					services.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);
					validateRequiredLocation(params, reject);

					var url = getRealmResourceURL(services.locateURL, account, realm,
						'locations', token, params.ssl);

					b.$.post(url, params.location).then(function(response){
						services.auth.updateLastActiveTimestamp();
						resolve(response);
					})['catch'](function(error){
						reject(error);
					});
				}
			);
		},

		/**
		 * Set the current users location with a latitude and longitude
		 *
		 * @alias updateLocationCoordinates
		 * @param {Object} params params
		 * @param {String} params.account BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used.
		 * @param {String} params.realm The BridgeIt Services realm. If not provided, the last known BridgeIt Realm name will be used.
		 * @param {String} params.accessToken The BridgeIt authentication token. If not provided, the stored token from bridgeit.io.auth.connect() will be used
		 * @param {String} params.host The BridgeIt Services host url. If not supplied, the last used BridgeIT host, or the default will be used. (optional)
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 * @param {Number} params.latitude The location latitude
		 * @param {Number} params.longitude The location longitude
		 * @param {String} params.label An optional label
		 */
		 updateLocationCoordinates: function(params){
			return new Promise(
				function(resolve, reject) {
					params = params ? params : {};
					services.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);
					validateRequiredLat(params, reject);
					validateRequiredLon(params, reject);

					var location = {
						location: {
							geometry: {
								type: 'Point',
								coordinates: [ params.lon, params.lat ]
							},
							properties: {
								timestamp: new Date().toISOString()
							}
						}
					};

					if( params.label ){
						location.label = params.label;
					}

					var url = getRealmResourceURL(services.locateURL, account, realm,
						'locations', token, params.ssl);

					b.$.post(url, location).then(function(response){
						services.auth.updateLastActiveTimestamp();
						resolve(response);
					})['catch'](function(error){
						reject(error);
					});
				}
			);
		},


		/**
		 * Get the last known user location from the location service.
		 *
		 * @alias getLastUserLocation
		 * @param {Object} params params
		 * @param {String} params.account BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used.
		 * @param {String} params.realm The BridgeIt Services realm. If not provided, the last known BridgeIt Realm name will be used.
		 * @param {String} params.accessToken The BridgeIt authentication token. If not provided, the stored token from bridgeit.io.auth.connect() will be used
		 * @param {String} params.host The BridgeIt Services host url. If not supplied, the last used BridgeIT host, or the default will be used. (optional)
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 * @param {String} params.username
		 * @returns {Object} The single result, if any, of the user location.


		 http://dev.bridgeit.io/locate/bsrtests/realms/test/locations
			?access_token=4be2fc2f-a53b-4987-9446-88d519faaa77
			&query={%22username%22:%22user%22}
			&options={%22sort%22:[[%22lastUpdated%22,%22desc%22]]}
			&results=one

		 var locationURL = apiURL + '/locations' +
					'?access_token=' + encodeURIComponent(bsr.auth.getCurrentToken()) +
					'&query={"username": "' + encodeURIComponent(user) + '"} +' +
					'&options={"sort":[["lastUpdated","desc"]]}' +
					'&results=one';
		 */

		 getLastUserLocation: function(params){
			return new Promise(
				function(resolve, reject) {
					params = params ? params : {};
					services.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);
					var username = validateAndReturnRequiredUsername(params, reject);

					var url = getRealmResourceURL(services.locateURL, account, realm,
						'locations/' + username, token, params.ssl, {
							'results': 'last'
						});

					b.$.getJSON(url).then(function(response){
						services.auth.updateLastActiveTimestamp();
						resolve(response);
					})['catch'](function(response){
						if( response.status === 403 ){
							resolve(null);
						}
						else{
							reject(response);
						}
					});
				}
			);
		},

		getRegionResourcePermissions: function(params){
			params.path = 'regions';
			return services.location.getResourcePermissions(params);
		},

		updateRegionResourcePermissions: function(params){
			params.path = 'regions';
			return services.location.getResourcePermissions(params);
		},

		getPOIResourcePermissions: function(params){
			params.path = 'poi';
			return services.location.getResourcePermissions(params);
		},

		updatePOIResourcePermissions: function(params){
			params.path = 'poi';
			return services.location.updateResourcePermissions(params);
		},

		getResourcePermissions: function(params){
			params.service = 'location';
			return services.getResourcePermissions(params);
		},

		updateResourcePermissions: function(params){
			params.service = 'location';
			return services.updateResourcePermissions(params);
		},
	};

	services.mailbox = {
		/**
		 * Create a new mailbox
		 *
		 * @alias createMailbox
		 * @param {Object} params params
		 * @param {String} params.id The user id
		 * @param {Object} params.mailbox The mailbox to be created
		 * @param {String} params.account BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used.
		 * @param {String} params.realm The BridgeIt Services realm. If not provided, the last known BridgeIt Realm name will be used.
		 * @param {String} params.accessToken The BridgeIt authentication token. If not provided, the stored token from bridgeit.io.auth.connect() will be used
		 * @param {String} params.host The BridgeIt Services host url. If not supplied, the last used BridgeIt host, or the default will be used. (optional)
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 * @returns {String} The resource URI
		 */
		createMailbox: function (params) {
			return new Promise(
				function (resolve, reject) {
					params = params ? params : {};
					services.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);
					validateRequiredMailbox(params, reject);

					var url = getRealmResourceURL(services.mailboxURL, account, realm,
						'mailboxes/' + (params.id ? params.id : ''), token, params.ssl);

					b.$.post(url, params.mailbox).then(function (response) {
						services.auth.updateLastActiveTimestamp();
						resolve(response.uri);
					})['catch'](function (error) {
						reject(error);
					});

				}
			);
		},

		/**
		 * Update a mailbox
		 *
		 * @alias updateMailbox
		 * @param {Object} params params
		 * @param {String} params.id The user id, the user's mailbox to be updated
		 * @param {Object} params.mailbox The new mailbox
		 * @param {String} params.account BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used.
		 * @param {String} params.realm The BridgeIt Services realm. If not provided, the last known BridgeIt Realm name will be used.
		 * @param {String} params.accessToken The BridgeIt authentication token. If not provided, the stored token from bridgeit.io.auth.connect() will be used
		 * @param {String} params.host The BridgeIt Services host url. If not supplied, the last used BridgeIT host, or the default will be used. (optional)
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 */
		updateMailbox: function (params) {
			return new Promise(
				function (resolve, reject) {
					params = params ? params : {};
					services.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);
					validateRequiredId(params, reject);
					validateRequiredMailbox(params, reject);

					var url = getRealmResourceURL(services.mailboxURL, account, realm,
						'mailboxes/' + params.id, token, params.ssl);

					b.$.put(url, params.mailbox).then(function () {
						services.auth.updateLastActiveTimestamp();
						resolve();
					})['catch'](function (error) {
						reject(error);
					});
				}
			);
		},

		/**
		 * Fetch a mailbox
		 *
		 * @alias getMailbox
		 * @param {Object} params params
		 * @param {String} params.id The user id, the user's mailbox to fetch
		 * @param {String} params.account BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used.
		 * @param {String} params.realm The BridgeIt Services realm. If not provided, the last known BridgeIt Realm name will be used.
		 * @param {String} params.accessToken The BridgeIt authentication token. If not provided, the stored token from bridgeit.io.auth.connect() will be used
		 * @param {String} params.host The BridgeIt Services host url. If not supplied, the last used BridgeIT host, or the default will be used. (optional)
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 * @returns {Object} The mailbox
		 */
		getMailbox: function (params) {
			return new Promise(
				function (resolve, reject) {
					params = params ? params : {};
					services.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);
					validateRequiredId(params, reject);

					var url = getRealmResourceURL(services.mailboxURL, account, realm,
						'mailboxes/' + params.id, token, params.ssl);

					b.$.getJSON(url).then(function (mailbox) {
						services.auth.updateLastActiveTimestamp();
						resolve(mailbox);
					})['catch'](function (error) {
						reject(error);
					});
				}
			);
		},

		/**
		 * Searches for mailboxes in a realm based on a query
		 *
		 * @alias findMailboxes
		 * @param {Object} params params
		 * @param {String} params.account BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used.
		 * @param {String} params.realm The BridgeIt Services realm. If not provided, the last known BridgeIt Realm name will be used.
		 * @param {String} params.accessToken The BridgeIt authentication token. If not provided, the stored token from bridgeit.io.auth.connect() will be used
		 * @param {String} params.host The BridgeIt Services host url. If not supplied, the last used BridgeIT host, or the default will be used. (optional)
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 * @param {Object} params.query A mongo query for the mailboxes
		 * @param {Object} params.fields Specify the inclusion or exclusion of fields to return in the result set
		 * @param {Object} params.options Additional query options such as limit and sort
		 * @returns {Object} The results
		 */
		findMailboxes: function (params) {
			return new Promise(
				function (resolve, reject) {

					params = params ? params : {};
					services.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);

					var url = getRealmResourceURL(services.mailboxURL, account, realm,
						'mailboxes/', token, params.ssl, {
							'query': params.query ? encodeURIComponent(JSON.stringify(params.query)) : {},
							'fields': params.fields ? encodeURIComponent(JSON.stringify(params.fields)) : {},
							'options': params.options ? encodeURIComponent(JSON.stringify(params.options)) : {}
						});

					b.$.getJSON(url).then(function (mailboxes) {
						services.auth.updateLastActiveTimestamp();
						resolve(mailboxes);
					})['catch'](function (response) {
						reject(response);
					});

				}
			);
		},

		/**
		 * Delete a mailbox
		 *
		 * @alias deleteMailbox
		 * @param {Object} params params
		 * @param {String} params.id The user id, the user's mailbox to be deleted
		 * @param {String} params.account BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used.
		 * @param {String} params.realm The BridgeIt Services realm. If not provided, the last known BridgeIt Realm name will be used.
		 * @param {String} params.accessToken The BridgeIt authentication token. If not provided, the stored token from bridgeit.io.auth.connect() will be used
		 * @param {String} params.host The BridgeIt Services host url. If not supplied, the last used BridgeIT host, or the default will be used. (optional)
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 */
		deleteMailbox: function (params) {
			return new Promise(
				function (resolve, reject) {
					params = params ? params : {};
					services.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);
					validateRequiredId(params, reject);

					var url = getRealmResourceURL(services.mailboxURL, account, realm,
						'mailboxes/' + params.id, token, params.ssl);

					b.$.doDelete(url).then(function () {
						services.auth.updateLastActiveTimestamp();
						resolve();
					})['catch'](function (error) {
						reject(error);
					});
				}
			);
		},

		/**
		 * Delete mailboxes in a realm based on a query
		 *
		 * @alias deleteMailboxes
		 * @param {Object} params params
		 * @param {String} params.account BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used.
		 * @param {String} params.realm The BridgeIt Services realm. If not provided, the last known BridgeIt Realm name will be used.
		 * @param {String} params.accessToken The BridgeIt authentication token. If not provided, the stored token from bridgeit.io.auth.connect() will be used
		 * @param {String} params.host The BridgeIt Services host url. If not supplied, the last used BridgeIT host, or the default will be used. (optional)
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 * @param {Object} params.query A mongo query for the mailboxes
		 * @param {Object} params.fields Specify the inclusion or exclusion of fields to return in the result set
		 * @param {Object} params.options Additional query options such as limit and sort
		 */
		deleteMailboxes: function (params) {
			return new Promise(
				function (resolve, reject) {
					params = params ? params : {};
					services.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);

					var url = getRealmResourceURL(services.mailboxURL, account, realm,
						'mailboxes/', token, params.ssl, {
							'query': params.query ? encodeURIComponent(JSON.stringify(params.query)) : {},
							'fields': params.fields ? encodeURIComponent(JSON.stringify(params.fields)) : {},
							'options': params.options ? encodeURIComponent(JSON.stringify(params.options)) : {}
						});

					b.$.doDelete(url).then(function () {
						services.auth.updateLastActiveTimestamp();
						resolve();
					})['catch'](function (error) {
						reject(error);
					});
				}
			);
		},

		/**
		 * Searches for mail in a user's mailbox based on a query
		 *
		 * @alias findMail
		 * @param {Object} params params
		 * @param {String} params.id The user id, the user's mail to search
		 * @param {String} params.account BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used.
		 * @param {String} params.realm The BridgeIt Services realm. If not provided, the last known BridgeIt Realm name will be used.
		 * @param {String} params.accessToken The BridgeIt authentication token. If not provided, the stored token from bridgeit.io.auth.connect() will be used
		 * @param {String} params.host The BridgeIt Services host url. If not supplied, the last used BridgeIT host, or the default will be used. (optional)
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 * @param {Object} params.query A mongo query for the mail
		 * @param {Object} params.fields Specify the inclusion or exclusion of fields to return in the result set
		 * @param {Object} params.options Additional query options such as limit and sort
		 * @returns {Object} Matching mail records
		 */
		findMail: function (params) {
			return new Promise(
				function (resolve, reject) {

					params = params ? params : {};
					services.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);
					validateRequiredId(params, reject);

					var url = getRealmResourceURL(services.mailboxURL, account, realm,
						'mailboxes/' + params.id + '/mail', token, params.ssl, {
							'query': params.query ? encodeURIComponent(JSON.stringify(params.query)) : {},
							'fields': params.fields ? encodeURIComponent(JSON.stringify(params.fields)) : {},
							'options': params.options ? encodeURIComponent(JSON.stringify(params.options)) : {}
						});

					b.$.getJSON(url).then(function (mail) {
						services.auth.updateLastActiveTimestamp();
						resolve(mail);
					})['catch'](function (response) {
						reject(response);
					});

				}
			);
		},

		getMailboxResourcePermissions: function(params){
			params.path = 'mailboxes';
			return services.mailbox.getResourcePermissions(params);
		},

		updateMailboxResourcePermissions: function(params){
			params.path = 'mailboxes';
			return services.mailbox.getResourcePermissions(params);
		},

		getResourcePermissions: function(params){
			params.service = 'mailbox';
			return services.getResourcePermissions(params);
		},

		updateResourcePermissions: function(params){
			params.service = 'mailbox';
			return services.updateResourcePermissions(params);
		},
	};

	/* METRICS SERVICE. Left in for backwards-compatibility. */
	services.metrics = {

		/**
		 * Searches for events in a realm based on a query
		 *
		 * @alias findEvents
		 * @param {Object} params params
		 * @param {String} params.account BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used.
		 * @param {String} params.realm The BridgeIt Services realm. If not provided, the last known BridgeIt Realm name will be used.
		 * @param {String} params.accessToken The BridgeIt authentication token. If not provided, the stored token from bridgeit.io.auth.connect() will be used
		 * @param {String} params.host The BridgeIt Services host url. If not supplied, the last used BridgeIT host, or the default will be used. (optional)
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 * @param {Object} params.query A mongo query for the events
		 * @param {Object} params.fields Specify the inclusion or exclusion of fields to return in the result set
		 * @param {Object} params.options Additional query options such as limit and sort
		 * @returns {Object} The results
		 */
		findEvents: function(params){
			return new Promise(
				function(resolve, reject) {
					params = params ? params : {};
					services.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);

					var url = getRealmResourceURL(services.eventURL, account, realm,
						'events', token, params.ssl, {
							'query': params.query ? encodeURIComponent(JSON.stringify(params.query)) : {},
							'fields': params.fields ? encodeURIComponent(JSON.stringify(params.fields)) : {},
							'options': params.options ? encodeURIComponent(JSON.stringify(params.options)) : {}
						});

					b.$.getJSON(url).then(function(events){
						services.auth.updateLastActiveTimestamp();
						resolve(events);
					})['catch'](function(error){
						reject(error);
					});
				}
			);
		},

		/**
		 * Store a custom event in the event service.
		 *
		 * @alias createCustomEvent
		 * @param {Object} params params
		 * @param {String} params.account BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used.
		 * @param {String} params.realm The BridgeIt Services realm. If not provided, the last known BridgeIt Realm name will be used.
		 * @param {String} params.accessToken The BridgeIt authentication token. If not provided, the stored token from bridgeit.io.auth.connect() will be used
		 * @param {String} params.host The BridgeIt Services host url. If not supplied, the last used BridgeIT host, or the default will be used. (optional)
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 * @param {Object} params.event The custom event that you would like to store, in JSON format.
		 * @returns {String} The resource URI
		 */
		createCustomEvent: function(params){
			return new Promise(
				function(resolve, reject) {
					params = params ? params : {};
					services.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);
					validateRequiredEvent(params, reject);

					var url = getRealmResourceURL(services.eventURL, account, realm,
						'events', token, params.ssl);

					b.$.post(url, params.event).then(function(response){
						services.auth.updateLastActiveTimestamp();
						resolve();
					})['catch'](function(error){
						reject(error);
					});
				}
			);
		},

		/**
		 * Retrieve the time difference in milliseconds between the provided time and the event server time.
		 *
		 * Useful for displaying accurate live metrics views. The time difference is returned as client time - server time.
		 *
		 * @alias getClientServerTimeGap
		 * @param {Object} params params
		 * @param {String} params.account BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used.
		 * @param {String} params.realm The BridgeIt Services realm. If not provided, the last known BridgeIt Realm name will be used.
		 * @param {String} params.accessToken The BridgeIt authentication token. If not provided, the stored token from bridgeit.io.auth.connect() will be used
		 * @param {String} params.host The BridgeIt Services host url. If not supplied, the last used BridgeIT host, or the default will be used. (optional)
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 * @returns {Number} The time difference in milliseconds
		 */
		 getClientServerTimeGap: function(params){
			return new Promise(
				function(resolve, reject) {
					params = params ? params : {};
					services.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);

					var url = getRealmResourceURL(services.eventURL, account, realm,
						'time', token, params.ssl, {
							clientTime: encodeURIComponent(new Date().toISOString())
						});

					b.$.getJSON(url).then(function(response){
						if( response.timeOffset){
							services.auth.updateLastActiveTimestamp();
							resolve(response.timeOffset);
						}
						else{
							reject(new Error('getClientServerTimeGap() could not parse response: ' +
								JSON.stringify(response)));
						}
					})['catch'](function(error){
						reject(error);
					});
				}
			);
		}


	};

  var eventArray = [];
  var eventsRunning;
  var runningIndex = 0;
  var eventIndex = 0;
	/* EVENTS SERVICE. */
	services.event = {

		/**
		 * Searches for events in a realm based on a query
		 *
		 * @alias findEvents
		 * @param {Object} params params
		 * @param {String} params.account BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used.
		 * @param {String} params.realm The BridgeIt Services realm. If not provided, the last known BridgeIt Realm name will be used.
		 * @param {String} params.accessToken The BridgeIt authentication token. If not provided, the stored token from bridgeit.io.auth.connect() will be used
		 * @param {String} params.host The BridgeIt Services host url. If not supplied, the last used BridgeIT host, or the default will be used. (optional)
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 * @param {Object} params.query A mongo query for the events
		 * @param {Object} params.fields Specify the inclusion or exclusion of fields to return in the result set
		 * @param {Object} params.options Additional query options such as limit and sort
		 * @returns {Object} The results
		 */
		findEvents: function(params){
			return new Promise(
				function(resolve, reject) {
					params = params ? params : {};
					services.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);

					var url = getRealmResourceURL(services.eventURL, account, realm,
						'events', token, params.ssl, {
							'query': params.query ? encodeURIComponent(JSON.stringify(params.query)) : {},
							'fields': params.fields ? encodeURIComponent(JSON.stringify(params.fields)) : {},
							'options': params.options ? encodeURIComponent(JSON.stringify(params.options)) : {}
						});

					b.$.getJSON(url).then(function(events){
						services.auth.updateLastActiveTimestamp();
						resolve(events);
					})['catch'](function(error){
						reject(error);
					});
				}
			);
		},

		/**
		 * Store a custom event in the event service.
		 *
		 * @alias createCustomEvent
		 * @param {Object} params params
		 * @param {String} params.account BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used.
		 * @param {String} params.realm The BridgeIt Services realm. If not provided, the last known BridgeIt Realm name will be used.
		 * @param {String} params.accessToken The BridgeIt authentication token. If not provided, the stored token from bridgeit.io.auth.connect() will be used
		 * @param {String} params.host The BridgeIt Services host url. If not supplied, the last used BridgeIT host, or the default will be used. (optional)
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 * @param {Object} params.event The custom event that you would like to store, in JSON format.
		 * @returns {String} The resource URI
		 */
		createCustomEvent: function(params){
			return new Promise(
				function(resolve, reject) {
					params = params ? params : {};
					services.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);
					validateRequiredEvent(params, reject);

					var url = getRealmResourceURL(services.eventURL, account, realm,
						'events', token, params.ssl);

					b.$.post(url, params.event).then(function(response){
						services.auth.updateLastActiveTimestamp();
						resolve();
					})['catch'](function(error){
						reject(error);
					});
				}
			);
		},

/**
     * Store an array of custom events in the event service.
     *
     * @alias createCustomEvents.
     * @param {Object} params params
     * @param {String} params.account BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used.
     * @param {String} params.realm The BridgeIt Services realm. If not provided, the last known BridgeIt Realm name will be used.
     * @param {String} params.accessToken The BridgeIt authentication token. If not provided, the stored token from bridgeit.io.auth.connect() will be used
     * @param {String} params.host The BridgeIt Services host url. If not supplied, the last used BridgeIT host, or the default will be used. (optional)
     * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
     * @param {Object} params.eventArray An array of events that you want to fire. Events should include a 'delay' property, with the number of milliseconds to wait since the last event before firing.
     */

    createCustomEvents: function(params){
      return new Promise(
        function(resolve, reject) {
          params = params ? params : {};
          services.checkHost(params);

          //validate
          var account = validateAndReturnRequiredAccount(params, reject);
          var realm = validateAndReturnRequiredRealm(params, reject);
          var token = validateAndReturnRequiredAccessToken(params, reject);
          //validateRequiredEvent(params, reject);
          //validateEventArray(params, reject);
          var url = getRealmResourceURL(services.eventURL, account, realm,
            'events', token, params.ssl);

          eventArray = params.eventArray;
          eventsRunning = true;
          runningIndex += 1;
          eventIndex=0;
          services.event._eventRecursion(resolve,reject,url,params.ssl,runningIndex);
        }
      );
    },
    /**
     * Convenience method to reduce code-reuse.
     */
    _eventRecursion: function(resolve,reject,url,ssl,index){
		//if no url is provided then generate the URL using the latest account/realm/token
		if (!url) {
			url = getRealmResourceURL(services.eventURL, services.auth.getLastKnownAccount(), services.auth.getLastKnownRealm(),
				'events', services.auth.getLastAccessToken(), !!ssl);
		}
       if(index === runningIndex) {
          setTimeout(function () {
            if(index === runningIndex) {
              var date = new Date();
              b.$.post(url, eventArray[eventIndex]).then(function (response) {
                services.auth.updateLastActiveTimestamp();
                if (eventIndex === eventArray.length - 1) {
                  resolve();
                }
                else {
                  eventIndex += 1;
                  services.event._eventRecursion(resolve, reject, null, ssl, index);
                }
              })['catch'](function (error) {
                reject(error);
              });
            }
          }, eventArray[eventIndex].delay)
        }
    },

    /**
     * Convenience method for stopping multiple events midway through
     *
     * @alias stopEvents.
     */
    stopEvents: function(){
      eventsRunning = false;
      runningIndex += 1;
    },


    /**
     * Restart a previously paused event array
     *
     * @alias restartEvents.
     * @param {Object} params params
     * @param {String} params.account BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used.
     * @param {String} params.realm The BridgeIt Services realm. If not provided, the last known BridgeIt Realm name will be used.
     * @param {String} params.accessToken The BridgeIt authentication token. If not provided, the stored token from bridgeit.io.auth.connect() will be used
     * @param {String} params.host The BridgeIt Services host url. If not supplied, the last used BridgeIT host, or the default will be used. (optional)
     * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
     */
    restartEvents:function(params){
      eventsRunning = true;
      return new Promise(
        function(resolve, reject) {
          params = params ? params : {};
          services.checkHost(params);

          //validate
          var account = validateAndReturnRequiredAccount(params, reject);
          var realm = validateAndReturnRequiredRealm(params, reject);
          var token = validateAndReturnRequiredAccessToken(params, reject);
          //validateRequiredEvent(params, reject);
          //validateEventArray(params, reject);
          var url = getRealmResourceURL(services.eventURL, account, realm,
            'events', token, params.ssl);
          services.event._eventRecursion(resolve,reject,url,params.ssl,runningIndex);
        }
      );
    },

    /**
     * Convenience method for getting the total number of events being process
     *
     * @alias getEventsSize.
     */
    getEventsSize: function(){
      return eventArray.length;
    },

    /**
     * Convenience method for getting the currenty running event
     *
     * @alias getCurrentEvent.
     */
    getCurrentEvent: function(){
      return eventIndex + 1;
    },
		/**
		 * Retrieve the time difference in milliseconds between the provided time and the event server time.
		 *
		 * Useful for displaying accurate live event views. The time difference is returned as client time - server time.
		 *
		 * @alias getClientServerTimeGap
		 * @param {Object} params params
		 * @param {String} params.account BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used.
		 * @param {String} params.realm The BridgeIt Services realm. If not provided, the last known BridgeIt Realm name will be used.
		 * @param {String} params.accessToken The BridgeIt authentication token. If not provided, the stored token from bridgeit.io.auth.connect() will be used
		 * @param {String} params.host The BridgeIt Services host url. If not supplied, the last used BridgeIT host, or the default will be used. (optional)
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 * @returns {Number} The time difference in milliseconds
		 */
		getClientServerTimeGap: function(params){
			return new Promise(
				function(resolve, reject) {
					params = params ? params : {};
					services.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);

					var url = getRealmResourceURL(services.eventURL, account, realm,
						'time', token, params.ssl, {
							clientTime: encodeURIComponent(new Date().toISOString())
						});

					b.$.getJSON(url).then(function(response){
						if( response.timeOffset){
							services.auth.updateLastActiveTimestamp();
							resolve(response.timeOffset);
						}
						else{
							reject(new Error('getClientServerTimeGap() could not parse response: ' +
								JSON.stringify(response)));
						}
					})['catch'](function(error){
						reject(error);
					});
				}
			);
		}


	};

	/* PUSH SERVICE */
	services.push = {

		/**
		 * Connect to the BridgeIt Push Service
		 *
		 * @alias startPushService
		 * @param {Object} params params
		 * @param {String} params.account BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used.
		 * @param {String} params.realm The BridgeIt Services realm. If not provided, the last known BridgeIt Realm name will be used.
		 */
		startPushService: function(params){
			return new Promise(
				function(resolve, reject) {

					/*
					function setupCloudPush()  {
						var cloudPushId = getCloudPushId();
						if (!!cloudPushId)  {
							if (ice.push)  {
								console.log("Cloud Push registered: " + cloudPushId);
								ice.push.parkInactivePushIds(cloudPushId);
							}
						}
					}

					function getCloudPushId()  {
						return b.getLocalStorageItem(CLOUD_PUSH_KEY);
					}*/
					params = params ? params : {};
					services.checkHost(params);


					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);

					var pushURL = (params.ssl ? 'https://' : 'http://') + services.pushURL + '/';

					b.usePushService(pushURL, null, {
						auth:{
							access_token: token
						},
						account: account,
						realm: realm
					});
					console.log('bridgeit.io.push.connect() connected');
					resolve();

					/*
					b.$.get(pushURL + 'code.icepush').then(function(response){
						try{
							eval(response);
							ice.push.configuration.contextPath = pushURL;
							ice.push.configuration.account = bridgeit.io.auth.getLastKnownAccount();
							ice.push.configuration.realm = bridgeit.io.auth.getLastKnownRealm();
							ice.push.configuration.access_token = bridgeit.io.auth.getLastAccessToken();
							ice.push.connection.startConnection();
							setupCloudPush();
							console.log('bridgeit.io.push.connect() connected');
							resolve();
						}
						catch(e){
							console.log('bridgeit.io.push.connect() failed: ' + e);
							reject(e);
						}
					})['catch'](function(error){
						reject(error);
					});*/
				}
			);
		},


		/**
		 * Add listener for notifications belonging to the specified group.
		 * Callbacks must be passed by name to receive cloud push notifications.
		 *
		 * @alias addPushListener
		 * @param {Object} params params
		 * @param {String} params.account BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used.
		 * @param {String} params.realm The BridgeIt Services realm. If not provided, the last known BridgeIt Realm name will be used.
		 * @param {String} params.group The push group name
		 * @param {String} params.callback The callback function to be called on the push event
		 * @param {Boolean} params.useCloudPush Use BridgeIt Cloud Push to call the callback through native cloud notification channels when necessary (default true)
		 */
		addPushListener: function(params){
			return new Promise(function(resolve, reject) {

				function storePushListener(pushId, group, cb){
					var pushListeners = {};
					var pushListenersStr = b.getSessionStorageItem(PUSH_CALLBACKS);
					if( pushListenersStr ){
						try{
							pushListeners = JSON.parse(pushListenersStr);
						}
						catch(e){}
					}
					if( !pushListeners[group] ){
						pushListeners[group] = [];
					}
					pushListeners[group].push({pushId: pushId, callback: cb});
					b.setSessionStorageItem(PUSH_CALLBACKS, JSON.stringify(pushListeners));
				}

				function addCloudPushListener(){
					var callback = findFunctionInGlobalScope(params.callback);
					if( !callback ){
						reject('BridgeIt Cloud Push callbacks must be in window scope. Please pass either a reference to or a name of a global function.');
					}
					else{
						var callbacks = b.getLocalStorageItem(CLOUD_CALLBACKS_KEY);
						var callbackName = getFunctionName(callback);
						if (!callbacks)  {
							callbacks = " ";
						}
						if (callbacks.indexOf(" " + callbackName + " ") < 0)  {
							callbacks += callbackName + " ";
						}
						b.setLocalStorageItem(CLOUD_CALLBACKS_KEY, callbacks);
					}
				}

				function addPushGroupMember(){
					ice.push.connection.resumeConnection();
					var pushId = ice.push.createPushId();
					ice.push.addGroupMember(params.group, pushId);
					var fn = findFunctionInGlobalScope(params.callback);
					if( !fn ){
						reject('could not find function in global scope: ' + params.callback);
					}
					else{
						ice.push.register([ pushId ], fn);
						storePushListener(pushId, params.group, params.callback);
						if( params.useCloudPush ){
							addCloudPushListener();
						}
					}

				}

				params = params ? params : {};
				services.checkHost(params);

				validateRequiredGroup(params, reject);
				validateRequiredCallback(params, reject);

				if( !('useCloudPush' in params )){
					params.useCloudPush = true;
				}

				//validate
				var account = validateAndReturnRequiredAccount(params, reject);
				var realm = validateAndReturnRequiredRealm(params, reject);
				var token = validateAndReturnRequiredAccessToken(params, reject);

				var pushURL = (params.ssl ? 'https://' : 'http://') + services.pushURL + '/';

				if (ice && ice.push && ice.push.configuration.contextPath) {
					addPushGroupMember();
					console.log('bridgeit.io.push.addPushListener() added listener ' +
						params.callback + ' to group ' + params.group);
					resolve();
				} else {
					reject('Push service is not active');
				}
			});
		},

		/**
		 * Remove listener for notifications belonging to the specified group.
		 * Callbacks must be passed by name to receive cloud push notifications.
		 *
		 * @alias addPushListener
		 * @param {Object} params params
		 * @param {String} params.account BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used.
		 * @param {String} params.realm The BridgeIt Services realm. If not provided, the last known BridgeIt Realm name will be used.
		 * @param {String} params.group The push group name
		 */
		removePushListener: function(params){
			return new Promise(function(resolve, reject) {
				console.log('bridgeit.io.push.removePushListener() group: ' + params.group);
				params = params ? params : {};
				services.checkHost(params);
				validateRequiredGroup(params, reject);
				var pushListenersStr = b.getSessionStorageItem(PUSH_CALLBACKS);
				if( !pushListenersStr ){
					console.error('Cannot remove push listener ' + params.group + ', missing push listener storage.');
				}
				else{
					try{
						var pushListenerStorage = JSON.parse(pushListenersStr);
						var listeners = pushListenerStorage[params.group];
						console.log('found push listeners in storage: ' + ( listeners ? JSON.stringify(listeners) : null ) );
						if( !listeners ){
							console.error('could not find listeners for group ' + params.group);
							return;
						}
						ice.push.connection.resumeConnection();
						var pushIds = [];
						for( var i = 0 ; i < listeners.length ; i++ ){
							ice.push.removeGroupMember(params.group, listeners[i].pushId);
							console.log('removed push id ' + listeners[i].pushId);
						}
						delete pushListenerStorage[params.group];
						b.setSessionStorageItem(PUSH_CALLBACKS, JSON.stringify(pushListenerStorage));

					}
					catch(e){
						console.error(e);
					}
				}

			});
		},

		/**
		 * Push notification to a push group.
		 *
		 * This will result in an Ajax Push (and associated callback)
		 * to any web pages that have added a push listener to the
		 * specified group.  If Cloud Push options are provided
		 * (params.subject and params.detail) a Cloud Push will
		 * be dispatched as a home screen notification to any devices
		 * unable to recieve the Ajax Push via the web page.
		 *
		 * @alias sendPushEvent
		 * @param {Object} params params
		 * @param {String} params.account BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used.
		 * @param {String} params.realm The BridgeIt Services realm. If not provided, the last known BridgeIt Realm name will be used.
		 * @param {String} params.group The push group name
		 * @param {String} params.subject The subject heading for the notification
		 * @param {String} params.detail The message text to be sent in the notification body
		 */
		sendPushEvent: function(params) {
			return new Promise(
				function(resolve, reject) {
					params = params ? params : {};
					services.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);

					validateRequiredGroup(params, reject);

					var pushURL = (params.ssl ? 'https://' : 'http://') + services.pushURL + '/';

					/* TODO
					if (!absoluteGoBridgeItURL)  {
						if (!!bridgeit.goBridgeItURL)  {
							absoluteGoBridgeItURL = getAbsoluteURL(bridgeit.goBridgeItURL);
						}
					}
					if (!!absoluteGoBridgeItURL)  {
						if (options && !options.url)  {
							options.url = absoluteGoBridgeItURL;
						}
					}
					*/
					if (ice && ice.push && ice.push.configuration.contextPath) {
						var post = {};
						if( params.subject ){
							post.subject = params.subject;
						}
						if( params.detail ){
							post.detail = params.detail;
						}
						ice.push.notify(params.group, post);
						resolve();
					} else {
						reject('Push service is not active');
					}
				}
			);
		}
	};

	/* CONTEXT SERVICE */
	services.context = {

		getUser: function(params){
			return new Promise(
				function(resolve, reject) {
					params = params ? params : {};
					services.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);
					var username = validateAndReturnRequiredUsername(params, reject);

					var url = getRealmResourceURL(services.contextURL, account, realm,
						'users/' + username, token, params.ssl);

					b.$.getJSON(url).then(function(response){
						services.auth.updateLastActiveTimestamp();
						resolve(response);
					})['catch'](function(error){
						reject(error);
					});
				}
			);
		},

		getUserState: function(params){
			return new Promise(
				function(resolve, reject) {
					params = params ? params : {};
					services.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);
					var username = validateAndReturnRequiredUsername(params, reject);

					var url = getRealmResourceURL(services.contextURL, account, realm,
						'users/' + username + '/state', token, params.ssl);

					b.$.getJSON(url).then(function(response){
						services.auth.updateLastActiveTimestamp();
						resolve(response);
					})['catch'](function(error){
						reject(error);
					});
				}
			);
		},

		setUserState: function(params){
			return new Promise(
				function(resolve, reject) {
					params = params ? params : {};
					validateRequiredState(params, reject);

					services.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);
					var username = validateAndReturnRequiredUsername(params, reject);

					var url = getRealmResourceURL(services.contextURL, account, realm,
						'users/' + username + '/state', token, params.ssl);

					b.$.post(url, params.state).then(function(response){
						services.auth.updateLastActiveTimestamp();
						resolve(response);
					})['catch'](function(error){
						reject(error);
					});
				}
			);
		},

		getUserInfo: function(params){
			return new Promise(
				function(resolve, reject) {
					params = params ? params : {};
					services.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);
					var username = validateAndReturnRequiredUsername(params, reject);

					var url = getRealmResourceURL(services.contextURL, account, realm,
						'users/' + username + '/info', token, params.ssl);

					b.$.getJSON(url).then(function(response){
						services.auth.updateLastActiveTimestamp();
						resolve(response);
					})['catch'](function(error){
						reject(error);
					});
				}
			);
		},

		getUpdates: function(params){
			return new Promise(
				function(resolve, reject) {
					params = params ? params : {};
					services.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);
					var username = validateAndReturnRequiredUsername(params, reject);

					var url = getRealmResourceURL(services.contextURL, account, realm,
						'users/' + username + '/updates', token, params.ssl);

					b.$.getJSON(url).then(function(response){
						services.auth.updateLastActiveTimestamp();
						resolve(response);
					})['catch'](function(error){
						reject(error);
					});
				}
			);
		},

		getUnreadUpdates: function(params){
			return new Promise(
				function(resolve, reject) {
					params = params ? params : {};
					services.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);
					var username = validateAndReturnRequiredUsername(params, reject);

					var url = getRealmResourceURL(services.contextURL, account, realm,
						'users/' + username + '/updates/unread', token, params.ssl);

					b.$.getJSON(url).then(function(response){
						services.auth.updateLastActiveTimestamp();
						resolve(response);
					})['catch'](function(error){
						reject(error);
					});
				}
			);
		},

		executeContext: function(params){
			return new Promise(
				function(resolve, reject) {
					params = params ? params : {};
					validateRequiredData(params, reject);

					services.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);

					var url = getRealmResourceURL(services.contextURL, account, realm,
						'contexts/' + params.name, token, params.ssl, {
							op: 'exec'
						});

					b.$.post(url, params.data).then(function(response){
						services.auth.updateLastActiveTimestamp();
						resolve(response);
					})['catch'](function(error){
						reject(error);
					});
				}
			);
		}

	};

	/* STORAGE SERVICE */
	services.storage = {

		/**
		 * Retrieve the storage meta info for the realm
		 *
		 * @alias getMetaInfo
		 * @param {Object} params params
		 * @param {String} params.account BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used.
		 * @param {String} params.realm The BridgeIt Services realm. If not provided, the last known BridgeIt Realm name will be used.
		 * @param {String} params.accessToken The BridgeIt authentication token. If not provided, the stored token from bridgeit.io.auth.connect() will be used
		 * @param {String} params.host The BridgeIt Services host url. If not supplied, the last used BridgeIT host, or the default will be used. (optional)
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 * @param {String} params.scope (default 'self') 'all' or 'self', return meta information for blobs belonging to all users, or only those belonging to the current user
		 * @returns {Object} The results
		 */
		getMetaInfo: function(params){
			return new Promise(function(resolve, reject) {
				params = params ? params : {};
				services.checkHost(params);

				//validate
				var account = validateAndReturnRequiredAccount(params, reject);
				var realm = validateAndReturnRequiredRealm(params, reject);
				var token = validateAndReturnRequiredAccessToken(params, reject);

				var url = getRealmResourceURL(services.storageURL, account, realm,
					'meta', token, params.ssl, params.scope ? {scope: params.scope} : null);


				b.$.getJSON(url).then(function(response){
					services.auth.updateLastActiveTimestamp();
					resolve(response.directory);
				})['catch'](function(error){
					reject(error);
				});
			});
		},

		/**
		 * Stores a blob
		 *
		 * @alias uploadBlob
		 * @param {Object} params params
		 * @param {String} params.account BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used.
		 * @param {String} params.realm The BridgeIt Services realm. If not provided, the last known BridgeIt Realm name will be used.
		 * @param {String} params.id The blob id. If not provided, the service will return a new id
		 * @param {String} params.accessToken The BridgeIt authentication token. If not provided, the stored token from bridgeit.io.auth.connect() will be used
		 * @param {String} params.host The BridgeIt Services host url. If not supplied, the last used BridgeIT host, or the default will be used. (optional)
		 * @param {Object} params.blob The Blob to store
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 * @param {Function} params.progressCallback The callback function to call on progress events. eg. function progressCallback(percentComplete, xhr){..}
		 * @returns {Object} The results
		 */
		uploadBlob: function(params){
			return new Promise(function(resolve, reject) {
				params = params ? params : {};
				services.checkHost(params);

				//validate
				var account = validateAndReturnRequiredAccount(params, reject);
				var realm = validateAndReturnRequiredRealm(params, reject);
				var token = validateAndReturnRequiredAccessToken(params, reject);
				validateRequiredBlob(params, reject);

				var formData = new FormData();
				formData.append('file', params.blob);

				var url = getRealmResourceURL(services.storageURL, account, realm,
					'blobs' + (params.id ? '/' + params.id : ''), token, params.ssl);

				b.$.post(url, formData, null, true, null, params.progressCallback).then(function(response){
					services.auth.updateLastActiveTimestamp();
					resolve(response.location || response.uri);
				})['catch'](function(error){
					reject(error);
				});
			});
		},

		/**
		 * Stores a file
		 *
		 * @alias uploadBlob
		 * @param {Object} params params
		 * @param {String} params.account BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used.
		 * @param {String} params.realm The BridgeIt Services realm. If not provided, the last known BridgeIt Realm name will be used.
		 * @param {String} params.id The blob id. If not provided, the service will return a new id
		 * @param {String} params.accessToken The BridgeIt authentication token. If not provided, the stored token from bridgeit.io.auth.connect() will be used
		 * @param {String} params.host The BridgeIt Services host url. If not supplied, the last used BridgeIT host, or the default will be used. (optional)
		 * @param {Object} params.file The Blob to store
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 * @param {Function} params.progressCallback The callback function to call on progress events. eg. function progressCallback(percentComplete, xhr){..}
		 * @param {Function} params.onabort The callback for the XMLHttpRequest onabort event
		 * @param {Function} params.onerror The callback for the XMLHttpRequest onerror event
		 * @returns {Object} The results
		 */
		uploadFile: function(params){
			return new Promise(function(resolve, reject) {
				params = params ? params : {};
				services.checkHost(params);

				//validate
				var account = validateAndReturnRequiredAccount(params, reject);
				var realm = validateAndReturnRequiredRealm(params, reject);
				var token = validateAndReturnRequiredAccessToken(params, reject);
				validateRequiredFile(params, reject);

				var url = getRealmResourceURL(services.storageURL, account, realm,
					'blobs' + (params.id ? '/' + params.id : ''), token, params.ssl);
				var formData = new FormData();
				formData.append('file', params.file);

				b.$.post(url, formData, null, true, null, params.progressCallback, params.onabort, params.onerror).then(function(response){
					services.auth.updateLastActiveTimestamp();
					resolve(response.location || response.uri);
				})['catch'](function(error){
					reject(error);
				});
			});
		},

		/**
		 * Retrieves a blob file from the storage service
		 *
		 * @alias getBlob
		 * @param {Object} params params
		 * @param {String} params.account BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used.
		 * @param {String} params.realm The BridgeIt Services realm. If not provided, the last known BridgeIt Realm name will be used.
		 * @param {String} params.id The blob id.
		 * @param {String} params.accessToken The BridgeIt authentication token. If not provided, the stored token from bridgeit.io.auth.connect() will be used
		 * @param {String} params.host The BridgeIt Services host url. If not supplied, the last used BridgeIT host, or the default will be used. (optional)
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 * @returns {Object} The blob arraybuffer
		 */
		getBlob: function(params){
			return new Promise(function(resolve, reject) {
				params = params ? params : {};
				services.checkHost(params);

				//validate
				var account = validateAndReturnRequiredAccount(params, reject);
				var realm = validateAndReturnRequiredRealm(params, reject);
				var token = validateAndReturnRequiredAccessToken(params, reject);
				validateRequiredId(params, reject);

				var url = getRealmResourceURL(services.storageURL, account, realm,
					'blobs/' + params.id, token, params.ssl);

				b.$.getBlob(url).then(function(response){
					services.auth.updateLastActiveTimestamp();
					resolve(response);
				})['catch'](function(error){
					reject(error);
				});
			});
		},

		/**
		 * Deletes a blob file from the storage service
		 *
		 * @alias deleteBlob
		 * @param {Object} params params
		 * @param {String} params.account BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used.
		 * @param {String} params.realm The BridgeIt Services realm. If not provided, the last known BridgeIt Realm name will be used.
		 * @param {String} params.id The blob id.
		 * @param {String} params.accessToken The BridgeIt authentication token. If not provided, the stored token from bridgeit.io.auth.connect() will be used
		 * @param {String} params.host The BridgeIt Services host url. If not supplied, the last used BridgeIT host, or the default will be used. (optional)
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 */
		deleteBlob: function(params){
			return new Promise(function(resolve, reject) {
				params = params ? params : {};
				services.checkHost(params);

				//validate
				var account = validateAndReturnRequiredAccount(params, reject);
				var realm = validateAndReturnRequiredRealm(params, reject);
				var token = validateAndReturnRequiredAccessToken(params, reject);
				validateRequiredId(params, reject);

				var url = getRealmResourceURL(services.storageURL, account, realm,
					'blobs/' + params.id, token, params.ssl);

				b.$.doDelete(url).then(function(response){
					services.auth.updateLastActiveTimestamp();
					resolve();
				})['catch'](function(error){
					reject(error);
				});
			});
		},

		getBlobResourcePermissions: function(params){
			params.path = 'blobs';
			return services.storage.getResourcePermissions(params);
		},

		updateBlobResourcePermissions: function(params){
			params.path = 'blobs';
			return services.storage.getResourcePermissions(params);
		},

		getResourcePermissions: function(params){
			params.service = 'storage';
			return services.getResourcePermissions(params);
		},

		updateResourcePermissions: function(params){
			params.service = 'storage';
			return services.updateResourcePermissions(params);
		},
	};

	/* QUERY SERVICE */
	services.query = {

		/**
		 * Create a new query
		 *
		 * @alias createQuery
		 * @param {Object} params params
		 * @param {String} params.id The query id. If not provided, the service will return a new id
		 * @param {Object} params.query The query to be created
		 * @param {String} params.account BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used.
		 * @param {String} params.realm The BridgeIt Services realm. If not provided, the last known BridgeIt Realm name will be used.
		 * @param {String} params.accessToken The BridgeIt authentication token. If not provided, the stored token from bridgeit.io.auth.connect() will be used
		 * @param {String} params.host The BridgeIt Services host url. If not supplied, the last used BridgeIt host, or the default will be used. (optional)
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 * @returns {String} The resource URI
		 */
		createQuery: function(params){
			return new Promise(
				function(resolve, reject) {
					params = params ? params : {};
					services.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);
					validateRequiredQuery(params, reject);

					var url = getRealmResourceURL(services.queryURL, account, realm,
						'queries/' + (params.id ? params.id : ''), token, params.ssl);

					b.$.post(url, params.query).then(function(response){
						services.auth.updateLastActiveTimestamp();
						resolve(response.uri);
					})['catch'](function(error){
						reject(error);
					});

				}
			);
		},

		/**
		 * Update a query
		 *
		 * @alias updateQuery
		 * @param {Object} params params
		 * @param {String} params.id The query id, the query to be updated
		 * @param {Object} params.query The query
		 * @param {String} params.account BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used.
		 * @param {String} params.realm The BridgeIt Services realm. If not provided, the last known BridgeIt Realm name will be used.
		 * @param {String} params.accessToken The BridgeIt authentication token. If not provided, the stored token from bridgeit.io.auth.connect() will be used
		 * @param {String} params.host The BridgeIt Services host url. If not supplied, the last used BridgeIT host, or the default will be used. (optional)
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 * @returns {String} The resource URI
		 */
		updateQuery: function(params){
			return new Promise(
				function(resolve, reject) {
					params = params ? params : {};
					services.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);
					validateRequiredQuery(params, reject);
					validateRequiredId(params, reject);

					var url = getRealmResourceURL(services.queryURL, account, realm,
						'queries/' + params.id, token, params.ssl);

					b.$.put(url, params.query).then(function(response){
						services.auth.updateLastActiveTimestamp();
						resolve();
					})['catch'](function(error){
						reject(error);
					});
				}
			);
		},

		/**
		 * Fetch a query
		 *
		 * @alias getQuery
		 * @param {Object} params params
		 * @param {String} params.id The query id, the query to fetch
		 * @param {String} params.account BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used.
		 * @param {String} params.realm The BridgeIt Services realm. If not provided, the last known BridgeIt Realm name will be used.
		 * @param {String} params.accessToken The BridgeIt authentication token. If not provided, the stored token from bridgeit.io.auth.connect() will be used
		 * @param {String} params.host The BridgeIt Services host url. If not supplied, the last used BridgeIT host, or the default will be used. (optional)
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 * @returns {Object} The query
		 */
		getQuery: function(params){
			return new Promise(
				function(resolve, reject) {
					params = params ? params : {};
					services.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);
					validateRequiredId(params, reject);

					var url = getRealmResourceURL(services.queryURL, account, realm,
						'queries/' + params.id, token, params.ssl);

					b.$.getJSON(url).then(function(query){
						services.auth.updateLastActiveTimestamp();
						resolve(query);
					})['catch'](function(error){
						reject(error);
					});
				}
			);
		},

		/**
		 * Searches for queries in a realm based on a query
		 *
		 * @alias findQueries
		 * @param {Object} params params
		 * @param {String} params.account BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used.
		 * @param {String} params.realm The BridgeIt Services realm. If not provided, the last known BridgeIt Realm name will be used.
		 * @param {String} params.accessToken The BridgeIt authentication token. If not provided, the stored token from bridgeit.io.auth.connect() will be used
		 * @param {String} params.host The BridgeIt Services host url. If not supplied, the last used BridgeIT host, or the default will be used. (optional)
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 * @param {Object} params.query A mongo query for the queries
		 * @param {Object} params.fields Specify the inclusion or exclusion of fields to return in the result set
		 * @param {Object} params.options Additional query options such as limit and sort
		 * @returns {Object} The results
		 */
		findQueries: function(params){
			return new Promise(
				function(resolve, reject) {

					params = params ? params : {};
					services.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);

					var url = getRealmResourceURL(services.queryURL, account, realm,
						'queries/', token, params.ssl, {
							'query': params.query ? encodeURIComponent(JSON.stringify(params.query)) : {},
							'fields': params.fields ? encodeURIComponent(JSON.stringify(params.fields)) : {},
							'options': params.options ? encodeURIComponent(JSON.stringify(params.options)) : {}
						});

					b.$.getJSON(url).then(function(doc){
						services.auth.updateLastActiveTimestamp();
						resolve(doc);
					})['catch'](function(response){
						reject(response);
					});

				}
			);
		},

		/**
		 * Delete a query
		 *
		 * @alias deleteQuery
		 * @param {Object} params params
		 * @param {String} params.id The query id, the query to be deleted
		 * @param {String} params.account BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used.
		 * @param {String} params.realm The BridgeIt Services realm. If not provided, the last known BridgeIt Realm name will be used.
		 * @param {String} params.accessToken The BridgeIt authentication token. If not provided, the stored token from bridgeit.io.auth.connect() will be used
		 * @param {String} params.host The BridgeIt Services host url. If not supplied, the last used BridgeIT host, or the default will be used. (optional)
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 */
		deleteQuery: function(params){
			return new Promise(
				function(resolve, reject) {
					params = params ? params : {};
					services.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);
					validateRequiredId(params, reject);

					var url = getRealmResourceURL(services.queryURL, account, realm,
						'queries/' + params.id, token, params.ssl);

					b.$.doDelete(url).then(function(response){
						services.auth.updateLastActiveTimestamp();
						resolve();
					})['catch'](function(error){
						reject(error);
					});
				}
			);
		},

		/**
		 * Create a new transformer
		 *
		 * @alias createTransformer
		 * @param {Object} params params
		 * @param {String} params.id The transformer id. If not provided, the service will return a new id
		 * @param {Object} params.transformer The transformer to be created
		 * @param {String} params.account BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used.
		 * @param {String} params.realm The BridgeIt Services realm. If not provided, the last known BridgeIt Realm name will be used.
		 * @param {String} params.accessToken The BridgeIt authentication token. If not provided, the stored token from bridgeit.io.auth.connect() will be used
		 * @param {String} params.host The BridgeIt Services host url. If not supplied, the last used BridgeIt host, or the default will be used. (optional)
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 * @returns {String} The resource URI
		 */
		createTransformer: function(params){
			return new Promise(
				function(resolve, reject) {
					params = params ? params : {};
					services.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);
					validateRequiredTransformer(params, reject);

					var url = getRealmResourceURL(services.queryURL, account, realm,
						'transformers/' + (params.id ? params.id : ''), token, params.ssl);

					b.$.post(url, params.transformer).then(function(response){
						services.auth.updateLastActiveTimestamp();
						resolve(response.uri);
					})['catch'](function(error){
						reject(error);
					});

				}
			);
		},

		/**
		 * Update a transformer
		 *
		 * @alias updateTransformer
		 * @param {Object} params params
		 * @param {String} params.id The transformer id, the transformer to be updated
		 * @param {Object} params.transformer The transformer
		 * @param {String} params.account BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used.
		 * @param {String} params.realm The BridgeIt Services realm. If not provided, the last known BridgeIt Realm name will be used.
		 * @param {String} params.accessToken The BridgeIt authentication token. If not provided, the stored token from bridgeit.io.auth.connect() will be used
		 * @param {String} params.host The BridgeIt Services host url. If not supplied, the last used BridgeIT host, or the default will be used. (optional)
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 * @returns {String} The resource URI
		 */
		updateTransformer: function(params){
			return new Promise(
				function(resolve, reject) {
					params = params ? params : {};
					services.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);
					validateRequiredTransformer(params, reject);
					validateRequiredId(params, reject);

					var url = getRealmResourceURL(services.queryURL, account, realm,
						'transformers/' + params.id, token, params.ssl);

					b.$.put(url, params.transformer).then(function(response){
						services.auth.updateLastActiveTimestamp();
						resolve();
					})['catch'](function(error){
						reject(error);
					});
				}
			);
		},

		/**
		 * Fetch a transformer
		 *
		 * @alias getTransformer
		 * @param {Object} params params
		 * @param {String} params.id The transformer id, the transformer to fetch
		 * @param {String} params.account BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used.
		 * @param {String} params.realm The BridgeIt Services realm. If not provided, the last known BridgeIt Realm name will be used.
		 * @param {String} params.accessToken The BridgeIt authentication token. If not provided, the stored token from bridgeit.io.auth.connect() will be used
		 * @param {String} params.host The BridgeIt Services host url. If not supplied, the last used BridgeIT host, or the default will be used. (optional)
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 * @returns {Object} The transformer
		 */
		getTransformer: function(params){
			return new Promise(
				function(resolve, reject) {
					params = params ? params : {};
					services.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);
					validateRequiredId(params, reject);

					var url = getRealmResourceURL(services.queryURL, account, realm,
						'transformers/' + params.id, token, params.ssl);

					b.$.getJSON(url).then(function(transformer){
						services.auth.updateLastActiveTimestamp();
						resolve(transformer);
					})['catch'](function(error){
						reject(error);
					});
				}
			);
		},

		/**
		 * Searches for transformers in a realm based on a transformer
		 *
		 * @alias findTransformers
		 * @param {Object} params params
		 * @param {String} params.account BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used.
		 * @param {String} params.realm The BridgeIt Services realm. If not provided, the last known BridgeIt Realm name will be used.
		 * @param {String} params.accessToken The BridgeIt authentication token. If not provided, the stored token from bridgeit.io.auth.connect() will be used
		 * @param {String} params.host The BridgeIt Services host url. If not supplied, the last used BridgeIT host, or the default will be used. (optional)
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 * @param {Object} params.transformer A mongo transformer for the transformers
		 * @param {Object} params.fields Specify the inclusion or exclusion of fields to return in the result set
		 * @param {Object} params.options Additional transformer options such as limit and sort
		 * @returns {Object} The results
		 */
		findTransformers: function(params){
			return new Promise(
				function(resolve, reject) {

					params = params ? params : {};
					services.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);

					var url = getRealmResourceURL(services.queryURL, account, realm,
						'transformers/', token, params.ssl, {
							'query': params.query ? encodeURIComponent(JSON.stringify(params.query)) : {},
							'fields': params.fields ? encodeURIComponent(JSON.stringify(params.fields)) : {},
							'options': params.options ? encodeURIComponent(JSON.stringify(params.options)) : {}
						});

					b.$.getJSON(url).then(function(transformers){
						services.auth.updateLastActiveTimestamp();
						resolve(transformers);
					})['catch'](function(response){
						reject(response);
					});

				}
			);
		},

		/**
		 * Delete a transformer
		 *
		 * @alias deleteTransformer
		 * @param {Object} params params
		 * @param {String} params.id The transformer id, the transformer to be deleted
		 * @param {String} params.account BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used.
		 * @param {String} params.realm The BridgeIt Services realm. If not provided, the last known BridgeIt Realm name will be used.
		 * @param {String} params.accessToken The BridgeIt authentication token. If not provided, the stored token from bridgeit.io.auth.connect() will be used
		 * @param {String} params.host The BridgeIt Services host url. If not supplied, the last used BridgeIT host, or the default will be used. (optional)
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 */
		deleteTransformer: function(params){
			return new Promise(
				function(resolve, reject) {
					params = params ? params : {};
					services.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);
					validateRequiredId(params, reject);

					var url = getRealmResourceURL(services.queryURL, account, realm,
						'transformers/' + params.id, token, params.ssl);

					b.$.doDelete(url).then(function(response){
						services.auth.updateLastActiveTimestamp();
						resolve();
					})['catch'](function(error){
						reject(error);
					});
				}
			);
		},

		/**
		 * Execute a query or query chain
		 *
		 * @alias executeQuery
		 * @param {Object} params params
		 * @param {String} params.id The query/chain id, the query or query chain to be executed
		 * @param {Object} params.execParams Execution parameters that will be passed into parameterized query fields
		 * @param {String} params.mode Specify "debug" to return step-by-step query execution data
		 * @param {String} params.account BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used.
		 * @param {String} params.realm The BridgeIt Services realm. If not provided, the last known BridgeIt Realm name will be used.
		 * @param {String} params.accessToken The BridgeIt authentication token. If not provided, the stored token from bridgeit.io.auth.connect() will be used
		 * @param {String} params.host The BridgeIt Services host url. If not supplied, the last used BridgeIt host, or the default will be used. (optional)
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 * @returns {Object} The results
		 */
		executeQuery: function(params){
			return new Promise(
				function(resolve, reject) {
					params = params ? params : {};
					services.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);
					validateRequiredId(params, reject);

					var queryParams = {'exec': 'true'};
					queryParams.execParams = (params.execParams ? params.execParams : {});
					if (params.mode) {
						queryParams.mode = params.mode;
					}

					var url = getRealmResourceURL(services.queryURL, account, realm,
						'queries/' + params.id, token, params.ssl, queryParams);

					b.$.getJSON(url).then(function(results){
						services.auth.updateLastActiveTimestamp();
						resolve(results);
					})['catch'](function(error){
						reject(error);
					});
				}
			);
		},

		getQueryResourcePermissions: function(params){
			params.path = 'queries';
			return services.query.getResourcePermissions(params);
		},

		updateQueryResourcePermissions: function(params){
			params.path = 'queries';
			return services.query.getResourcePermissions(params);
		},

		getTransformerResourcePermissions: function(params){
			params.path = 'transformers';
			return services.query.getResourcePermissions(params);
		},

		updateTransformerResourcePermissions: function(params){
			params.path = 'transformers';
			return services.query.getResourcePermissions(params);
		},

		getResourcePermissions: function(params){
			params.service = 'query';
			return services.getResourcePermissions(params);
		},

		updateResourcePermissions: function(params){
			params.service = 'query';
			return services.updateResourcePermissions(params);
		}
	};

	/* DEVICE SERVICE */
	services.device = {
		/**
		 * Start live reporting of a device
		 *
		 * @alias startDevice
		 * @param {Object} params params
		 * @param {String} params.account BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used.
		 * @param {String} params.realm The BridgeIt Services realm. If not provided, the last known BridgeIt Realm name will be used.
		 * @param {String} params.macAddress The address of the device to start.
		 * @param {String} params.host The BridgeIt Services host url. If not supplied, the last used BridgeIT host, or the default will be used. (optional)
		 * @param {String} params.accessToken The BridgeIt authentication token. If not provided, the stored token from bridgeit.io.auth.connect() will be used
		 */
		startDevice: function (params) {
			return new Promise(function (resolve, reject) {
				params = params ? params : {};
				services.checkHost(params);

				//validate
				var account = validateAndReturnRequiredAccount(params, reject);
				var realm = validateAndReturnRequiredRealm(params, reject);
				var token = validateAndReturnRequiredAccessToken(params, reject);
				validateRequiredId(params, reject);

				var url = getRealmResourceURL(services.deviceURL, account, realm,
					params.macAddress + '/start', token, params.ssl);

				b.$.put(url, {}).then(function () {
					services.auth.updateLastActiveTimestamp();
					resolve();
				})['catch'](function (error) {
					reject(error);
				});
			});
		},

		/**
		 * Stop live reporting of a device
		 *
		 * @alias stopDevice
		 * @param {Object} params params
		 * @param {String} params.account BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used.
		 * @param {String} params.realm The BridgeIt Services realm. If not provided, the last known BridgeIt Realm name will be used.
		 * @param {String} params.macAddress The address of the device to stop.
		 * @param {String} params.host The BridgeIt Services host url. If not supplied, the last used BridgeIT host, or the default will be used. (optional)
		 * @param {String} params.accessToken The BridgeIt authentication token. If not provided, the stored token from bridgeit.io.auth.connect() will be used
		 */
		stopDevice: function (params) {
			return new Promise(function (resolve, reject) {
				params = params ? params : {};
				services.checkHost(params);

				//validate
				var account = validateAndReturnRequiredAccount(params, reject);
				var realm = validateAndReturnRequiredRealm(params, reject);
				var token = validateAndReturnRequiredAccessToken(params, reject);
				validateRequiredId(params, reject);

				var url = getRealmResourceURL(services.deviceURL, account, realm,
					params.macAddress + '/stop', token, params.ssl);

				b.$.put(url, {}).then(function () {
					services.auth.updateLastActiveTimestamp();
					resolve();
				})['catch'](function (error) {
					reject(error);
				});
			});
		},

		/**
		 * Stop all device reporting
		 *
		 * @alias stopDevices
		 * @param {Object} params params
		 * @param {String} params.account BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used.
		 * @param {String} params.realm The BridgeIt Services realm. If not provided, the last known BridgeIt Realm name will be used.
		 * @param {String} params.host The BridgeIt Services host url. If not supplied, the last used BridgeIT host, or the default will be used. (optional)
		 * @param {String} params.accessToken The BridgeIt authentication token. If not provided, the stored token from bridgeit.io.auth.connect() will be used
		 */
		stopDevices: function (params) {
			return new Promise(function (resolve, reject) {
				params = params ? params : {};
				services.checkHost(params);

				//validate
				var account = validateAndReturnRequiredAccount(params, reject);
				var realm = validateAndReturnRequiredRealm(params, reject);
				var token = validateAndReturnRequiredAccessToken(params, reject);
				validateRequiredId(params, reject);

				var url = getRealmResourceURL(services.deviceURL, account, realm,
					'/stop', token, params.ssl);

				b.$.put(url, {}).then(function () {
					services.auth.updateLastActiveTimestamp();
					resolve();
				})['catch'](function (error) {
					reject(error);
				});
			});
		},

		/**
		 * Get all devices reporting on realm/account
		 *
		 * @alias getRunningDevices
		 * @param {Object} params params
		 * @param {String} params.account BridgeIt Services account name. If not provided, the last known BridgeIt Account will be used.
		 * @param {String} params.realm The BridgeIt Services realm. If not provided, the last known BridgeIt Realm name will be used.
		 * @param {String} params.host The BridgeIt Services host url. If not supplied, the last used BridgeIT host, or the default will be used. (optional)
		 * @param {String} params.accessToken The BridgeIt authentication token. If not provided, the stored token from bridgeit.io.auth.connect() will be used
		 */
		getRunningDevices: function (params) {
			return new Promise(function (resolve, reject) {
				params = params ? params : {};
				services.checkHost(params);

				//validate
				var account = validateAndReturnRequiredAccount(params, reject);
				var realm = validateAndReturnRequiredRealm(params, reject);
				var token = validateAndReturnRequiredAccessToken(params, reject);
				var url = getRealmResourceURL(services.deviceURL, account, realm, 'running', token, params.ssl);

				b.$.getJSON(url).then(function (devices) {
					services.auth.updateLastActiveTimestamp();
					resolve(devices);
				})['catch'](function (error) {
					reject(error);
				});
			});
		}
	};

	/* Initialization */
	services.configureHosts();

	/* check connect settings */
	if( services.auth.isLoggedIn()){
		var connectSettings = services.auth.getConnectSettings();
		if( connectSettings ){
			//user is logged in and has connect settings, so reconnect
			services.auth.connect(connectSettings);
		}
	}




})(bridgeit);


