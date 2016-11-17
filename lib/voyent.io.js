if( ! ('voyent' in window)){
	throw new Error('voyent.io.js requires voyent.js, please include voyent.js before voyent.io.js');
}

/**
 * @namespace voyent
 */

/**
 * @namespace io
 * @memberOf voyent
 */

(function(v) {

	"use strict";

	/************************* Private ********************/

	function fireEvent(el, eventName, detail){
		console.log('voyent.io firing event ' + eventName + ' on element ' + el, detail);
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
	function validateRequiredPassword(params, reject){
		validateParameter('password', 'The password parameter is required', params, reject);
	}

	function validateAndReturnRequiredAccessToken(params, reject){
		var token = params.accessToken || v.io.auth.getLastAccessToken();
		if( token ){
			return token;
		}
		else{
			return reject(Error('A Voyent access token is required'));
		}
	}

	function validateAndReturnRequiredRealmName(params, reject){
		var realm = params.realmName;
		if( realm ){
			realm = encodeURI(realm);
		}
		else{
			realm = v.io.auth.getLastKnownRealm();
		}
		if( realm ){
			v.io.setCurrentRealm(realm);
			return realm;
		}
		else{
			return reject(Error('The Voyent realm is required'));
		}
	}

	function validateAndReturnRequiredOriginRealmName(params, reject){
		var realm = params.originRealmName;
		if( realm ){
			realm = encodeURI(realm);
		}
		else{
			realm = v.io.auth.getLastKnownRealm();
		}
		if( realm ){
			return realm;
		}
		else{
			return reject(Error('The Voyent originRealmName is required'));
		}
	}

	function validateAndReturnRequiredDestRealmName(params, reject){
		var realm = params.destRealmName;
		if( realm ){
			realm = encodeURI(realm);
			return realm;
		}
		else{
			return reject(Error('The Voyent destRealmName is required'));
		}
	}

	function validateAndReturnRequiredRealm(params, reject){
		var realm = params.realm;
		if( realm ){
			realm = encodeURI(realm);
		}
		else{
			realm = v.io.auth.getLastKnownRealm();
		}
		if( realm ){
			v.setSessionStorageItem(btoa(REALM_KEY), btoa(realm));
			return realm;
		}
		else{
			return reject(Error('The Voyent realm is required'));
		}
	}

	function validateAndReturnRequiredAccount(params, reject){
		var account = params.account;
		if( account ){
			account = encodeURI(account);
		}
		else{
			account = v.io.auth.getLastKnownAccount();
		}
		if( account ){
			v.setSessionStorageItem(btoa(ACCOUNT_KEY), btoa(account));
			return account;
		}
		else{
			return reject(Error('The Voyent account is required'));
		}
	}

	function validateAndReturnRequiredUsername(params, reject){
		var username = params.username;
		if( !username ){
			username = v.io.auth.getLastKnownUsername();
		}
		if( username ){
			v.setSessionStorageItem(btoa(USERNAME_KEY), btoa(username));
			return username;
		}
		else{
			return reject(Error('The Voyent username is required'));
		}
	}

	function validateAndReturnRequiredRole(params, reject){
		var role = params.role;
		if( role ){
			return role;
		}
		else{
			return reject(Error('The Voyent role parameter is required'));
		}
	}

	function validateAndReturnRequiredRoles(params, reject){
		var roles = params.roles;
		if( roles ){
			return roles;
		}
		else{
			return reject(Error('The Voyent roles parameter is required'));
		}
	}

	function validateAndReturnRequiredEmail(params, reject){
		var email = params.email;
		if( email ){
			return email;
		}
		else{
			return reject(Error('The Voyent email parameter is required'));
		}
	}

	function validateAndReturnRequiredFirstname(params, reject){
		var firstname = params.firstname;
		if( firstname ){
			return firstname;
		}
		else{
			return reject(Error('The Voyent firstname parameter is required'));
		}
	}

	function validateAndReturnRequiredLastname(params, reject){
		var lastname = params.lastname;
		if( lastname ){
			return lastname;
		}
		else{
			return reject(Error('The Voyent lastname parameter is required'));
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

	function validateRequiredTracker(params, reject){
		validateParameter('tracker', 'The tracker parameter is required', params, reject);
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

	function validateRequiredProperties(params, reject){
		if (!params.location.location.properties ||
			!params.location.location.properties.trackerId ||
			!params.location.location.properties.zoneNamespace) {
			reject(Error('The properties trackerId and zoneNamespace are required'));
		}
	}

	function validateRequiredLat(params, reject){
		validateParameter('lat', 'The lat parameter is required', params, reject);
	}

	function validateRequiredLon(params, reject){
		validateParameter('lon', 'The lon parameter is required', params, reject);
	}

	function validateRequiredZoneNamespace(params, reject){
		validateParameter('zoneNamespace', 'The zoneNamespace is required', params, reject);
	}

	/* Event */
	function validateRequiredEvent(params, reject){
		validateParameter('event', 'The event parameter is required', params, reject);
	}

    /* Mailbox */
    function validateRequiredMessages(params, reject){
        validateParameter('mailbox', 'The messages parameter is required', params, reject);
    }

    function validateRequiredConfig(params, reject){
        validateParameter('config', 'The config parameter is required', params, reject);
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

	/* Scope */
	function validateRequiredProperty(params, reject){
		validateParameter('property', 'The property parameter is required', params, reject);
	}

	function validateRequiredData(params, reject){
		validateParameter('data', 'The data parameter is required', params, reject);
	}

	/* Misc */
	function validateRequiredId(params, reject){
		validateParameter('id', 'The id is required', params, reject);
	}

	function validateParameter(name, msg, params, reject){
		if( !params[name] ){
			reject(Error(msg));
			return;
		}
	}

	function getTransactionURLParam(){
		var txId = v.io.getLastTransactionId();
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

	if (!v['io']) {
		v.io = {};
	}

	//internal keys
	var TOKEN_KEY = 'voyentToken';
	var TOKEN_EXPIRES_KEY = 'voyentTokenExpires';
	var TOKEN_SET_KEY = 'voyentTokenSet';
	var CONNECT_SETTINGS_KEY = 'voyentConnectSettings';
	var LAST_ACTIVE_TS_KEY = 'voyentLastActiveTimestamp';
	var ACCOUNT_KEY = 'voyentAccount';
	var REALM_KEY = 'voyentRealm';
	var ADMIN_KEY = 'voyentAdmin';
	var USERNAME_KEY = 'voyentUsername';
	var PASSWORD_KEY = 'voyentPassword';
	var RELOGIN_CB_KEY = 'voyentReloginCallback';
	var TRANSACTION_KEY = 'voyentTransaction';
	var CLOUD_CALLBACKS_KEY = "voyent.cloudcallbacks";
	var CLOUD_PUSH_KEY = "ice.notifyBack";
	var USER_STORE_KEY = "voyentUserStore";
	var USER_STORE_SETTING_KEY = "voyentUserStoreSetting";
	var LAST_UPDATED = "last_updated";
	var PUSH_CALLBACKS = 'pushCallbacks';
	var SCOPE_TO_PATH_KEY = "voyentScopeToPath";

	v.$ = {

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
						v.io.auth.updateLastActiveTimestamp();
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
							v.io.auth.updateLastActiveTimestamp();
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

	v.io.configureHosts = function(url) {
		if (!url) {
			v.io.baseURL = window.location.hostname || 'dev.voyent.cloud';
		}
		else {
			v.io.baseURL = url;
		}
		//remove any trailing '/'
		if (v.io.baseURL.substr(v.io.baseURL.length - 1) === '/') {
			v.io.baseURL = v.io.baseURL.slice(0,-1);
		}
		var baseURL = v.io.baseURL;
		v.io.authURL = baseURL + '/auth';
		v.io.authAdminURL = baseURL + '/authadmin';
		v.io.locateURL = baseURL + '/locate';
		v.io.docsURL = baseURL + '/docs';
		v.io.storageURL = baseURL + '/storage';
		v.io.eventURL = baseURL + '/event';
		v.io.pushURL = baseURL + '/push';
		v.io.pushRESTURL = v.io.pushURL + '/rest';
		v.io.queryURL = baseURL + '/query';
		v.io.actionURL = baseURL + '/action';
		v.io.eventhubURL = baseURL + '/eventhub';
		v.io.mailboxURL = baseURL + '/mailbox';
		v.io.deviceURL = baseURL + '/device';
		v.io.scopeURL = baseURL + '/scope';
	};

	v.io.checkHost = function(params) {
		if (params.host) {
			v.io.configureHosts(params.host);
		}
	};

    /**
     * Start a Voyent transaction.
     *
     * This function will create a new transaction id, and automatially append the id to all voyent network calls.
     * A Voyent transaction is not a ACID transaction, but simply a useful method to aid in auditing and diagnosing
     * distributed network calls, especially among different services.
     *
     * @alias startTransaction
     * @private
     * @global
     * @example
     *   voyent.io.startTransaction();
     *   console.log('started transaction: ' + voyent.io.getLastTransactionId());
     *
     *   voyent.io.auth.login({
     *       account: accountId,
     *       username: adminId,
     *       password: adminPassword,
     *       host: host
     *   }).then(function (authResponse) {
     *       return voyent.io.docs.createDocument({
     *           document: newDoc,
     *           realm: realmId
     *       });
     *   }).then(function (docURI) {
     *       newDocURI = docURI;
     *       var uriParts = docURI.split('/');
     *       var docId = uriParts[uriParts.length - 1];
     *       return voyent.io.docs.deleteDocument({
     *           account: accountId,
     *           realm: realmId,
     *           host: host,
     *           id: docId
     *       })
     *   }).then(function () {
     *       console.log('completed transaction: ' + voyent.io.getLastTransactionId());
     *       voyent.io.endTransaction();
     *   }).catch(function (error) {
     *       console.log('something went wrong with transaction: ' + voyent.io.getLastTransactionId());
     *       voyent.io.endTransaction();
     *   });
     */
	v.io.startTransaction = function(){
		v.setSessionStorageItem(btoa(TRANSACTION_KEY), v.$.newUUID());
		console.log('voyent: started transaction ' + v.io.getLastTransactionId());
	};


    /**
     * End a Voyent transaction.
     *
     * This function will remove the current Voyent transaction id, if one exists.
     *
     * @alias endTransaction
     * @private
     * @global
     */
	v.io.endTransaction = function(){
		v.removeSessionStorageItem(btoa(TRANSACTION_KEY));
		console.log('voyent: ended transaction ' + v.io.getLastTransactionId());
	};

    /**
     * Get last transaction.
     *
     * Return the last stored Voyent transaction id.
     *
     * @alias getLastTransactionId
     * @private
     * @global
     */
	v.io.getLastTransactionId = function(){
		return v.getSessionStorageItem(btoa(TRANSACTION_KEY));
	};

    /**
     * Sets the current realm for all subsequent operations. This is useful when logging in as an admin, who is not
     * in any realm, but needing to ensure that all other operations are done with a particular realm.
     *
     * @example
     *    voyent.io.auth.login({
     *      account: accountId,
     *    	username: adminId,
     *    	password: adminPassword,
     *    	host: host
     *    }).then(function(authResponse){
     *    	voyent.io.setCurrentRealm('myRealm');
     *    	//realm is no longer required for all subsequent operations
     *    	return voyent.io.docs.createDocument({
     *    		document: newDoc
     *    	});
     *    }).then(function(docURI){
     *    	newDocURI = docURI;
     *    	var uriParts = docURI.split('/');
     *    	var docId = uriParts[uriParts.length-1];
     *    	return voyent.io.docs.deleteDocument({
     *    		account: accountId,
     *    		host: host,
     *    		id: docId
     *    	})
     *    });
     *
     *
     * @alias setCurrentRealm
     * @global
     * @param {String} realm The name of thre realm to use for future operations.
     */
	v.io.setCurrentRealm = function(realm){
		v.setSessionStorageItem(btoa(REALM_KEY), btoa(realm));
	};

    /**
     * Return the permissions block for a resource. A permissions block has the following structure:
     *
     * @example
     *    {
     *        "_id": "de6959d0-a885-425c-847a-3289d07321ae",
     *        "owner": "jo.smith",
     *        "rights": {
     *            "owner": ["r","u","d","x","pr","pu"],
     *            "realm": ["r","x"],
     *            "roles": {
     *                "demoAdmin": ["r","u","d","x","pu"]
     *            }
     *        }
     *    }
     *
     *
     * The permissions codes:
     *
     *     r: Read
     *     u: Update
     *     d: Delete
     *     x: Execute
     *    pr: Permissions Read
     *    pu: Permissions Update
     *    mu: Client Metadata Update
     *
     *
     * @example
     *    voyent.io.getResourcePermissions({
     *    	account: accountId,
     *    	username: adminId,
     *    	password: adminPassword,
     *    	host: host,
     *    	service: 'docs',
     *    	path: 'documents',
     *    	id: 'resourceId'
     *    }).then(function(permissions){
     *    	console.log('permissions', permissions);
     *    });
     *
     * @alias getResourcePermissions
     * @global
     *
     * @param {Object} params params
     * @param {String} params.account Voyent Services account name. If not provided, the last known Voyent Account
     *     will be used.
     * @param {String} params.realm The Voyent Services realm. If not provided, the last known Voyent Realm name
     *     will be used.
     * @param {String} params.accessToken The Voyent authentication token. If not provided, the stored token from
     *     voyent.io.auth.connect() will be used
     * @param {String} params.id The id of the resource to get permissions for.
     * @param {String} params.service The service that manages the resource.
     * @param {String} params.path The path to the resource.
     * @returns {Object} The permissions block for the resource.
     */
	v.io.getResourcePermissions = function(params){
		return new Promise(
			function(resolve, reject) {
				params = params ? params : {};
				v.io.checkHost(params);

				//validate
				var account = validateAndReturnRequiredAccount(params, reject);
				var realm = validateAndReturnRequiredRealm(params, reject);
				var token = validateAndReturnRequiredAccessToken(params, reject);
				validateRequiredId(params, reject);
				validateParameter('service', 'The service parameter is required', params, reject);
				validateParameter('path', 'The path parameter is required', params, reject);

				var serviceURL;
				switch(params.service){
					case 'docs': serviceURL = v.io.docsURL; break;
					case 'action': serviceURL = v.io.actionURL; break;
					case 'eventhub': serviceURL = v.io.eventhubURL; break;
					case 'query': serviceURL = v.io.queryURL; break;
					case 'storage': serviceURL = v.io.storageURL; break;
					case 'mailbox': serviceURL = v.io.mailboxURL; break;
					case 'locate': serviceURL = v.io.locateURL; break;
				}

				var url = getRealmResourceURL(serviceURL, account, realm, params.path + '/' + params.id + '/permissions', token, params.ssl);

				v.$.getJSON(url).then(function(json){
					v.io.auth.updateLastActiveTimestamp();
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

    /**
     * Modify the permissions block for a resource. See {@link getResourcePermissions} for additional details.
     *
     * @example
     *    var permissionsBlock == {
     *        "_id": "de6959d0-a885-425c-847a-3289d07321ae",
     *        "owner": "jo.smith",
     *        "rights": {
     *            "owner": ["r","u","d","x","pr","pu"],
     *            "realm": ["r","x"],
     *            "roles": {
     *                "demoAdmin": ["r","u","d","x","pu"]
     *            }
     *        }
     *    };
     *
     * @example
     *    voyent.io.updateResourcePermissions({
     *    	account: accountId,
     *    	username: adminId,
     *    	password: adminPassword,
     *    	host: host,
     *    	service: 'docs',
     *    	path: 'documents',
     *    	id: 'resourceId',
     *    	permissions: permissionsBlock
     *    }).then(function(permissions){
     *    	console.log('permissions', permissions);
     *    });
     *
     *
     * @alias updateResourcePermissions
     * @global
     *
     * @param {Object} params params
     * @param {String} params.account Voyent Services account name. If not provided, the last known Voyent Account
     *     will be used.
     * @param {String} params.realm The Voyent Services realm. If not provided, the last known Voyent Realm name
     *     will be used.
     * @param {String} params.accessToken The Voyent authentication token. If not provided, the stored token from
     *     voyent.io.auth.connect() will be used
     * @param {String} params.id The id of the resource to get permissions for.
     * @param {String} params.service The service that manages the resource.
     * @param {String} params.path The path to the resource.
     * @returns {Object} The permissions block for the resource.
     */
	v.io.updateResourcePermissions = function(params){
		return new Promise(
			function(resolve, reject) {
				params = params ? params : {};
				v.io.checkHost(params);

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
					case 'docs': serviceURL = v.io.docsURL; break;
					case 'action': serviceURL = v.io.actionURL; break;
				}

				var url = getRealmResourceURL(serviceURL, account, realm, params.path + '/' + params.id + '/permissions', token, params.ssl);

				v.$.put(url, params.permissions).then(function(json){
					v.io.auth.updateLastActiveTimestamp();
					resolve(json);
				})['catch'](function(error){
					reject(error);
				});
			}
		);
	},

    /**
     * @namespace action
     * @memberOf voyent.io
     */
	v.io.action = {
		/**
		 * Execute an action
		 *
         * @memberOf voyent.io.action
		 * @alias executeAction
		 * @param {Object} params params
		 * @param {String} params.id The action id, the action to be executed
		 * @param {String} params.account Voyent Services account name. If not provided, the last known Voyent Account
		 *     will be used.
		 * @param {String} params.realm The Voyent Services realm. If not provided, the last known Voyent Realm name
		 *     will be used.
		 * @param {String} params.accessToken The Voyent authentication token. If not provided, the stored token from
		 *     voyent.io.auth.connect() will be used
		 * @param {String} params.host The Voyent Services host url. If not supplied, the last used Voyent host, or the
		 *     default will be used. (optional)
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 * @returns {String} The resource URI
		 */
		executeAction: function(params){
			return new Promise(
				function(resolve, reject) {
					params = params ? params : {};
					v.io.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);
					validateRequiredId(params, reject);

					var url = getRealmResourceURL(v.io.actionURL, account, realm,
						'actions/' + params.id, token, params.ssl, {'op': 'exec'});

					v.$.post(url).then(function(response){
						v.io.auth.updateLastActiveTimestamp();
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
         * @memberOf voyent.io.action
		 * @alias createAction
		 * @param {Object} params params
		 * @param {String} params.id The action id
		 * @param {Object} params.action The action to be created
		 * @param {String} params.account Voyent Services account name. If not provided, the last known Voyent Account
		 *     will be used.
		 * @param {String} params.realm The Voyent Services realm. If not provided, the last known Voyent Realm name
		 *     will be used.
		 * @param {String} params.accessToken The Voyent authentication token. If not provided, the stored token from
		 *     voyent.io.auth.connect() will be used
		 * @param {String} params.host The Voyent Services host url. If not supplied, the last used Voyent host, or the
		 *     default will be used. (optional)
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 * @returns {String} The resource URI
		 */
		createAction: function(params){
			return new Promise(
				function(resolve, reject) {
					params = params ? params : {};
					v.io.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);
					validateRequiredId(params, reject);
					validateRequiredAction(params, reject);

					var url = getRealmResourceURL(v.io.actionURL, account, realm,
						'actions/' + params.id, token, params.ssl);

					v.$.post(url, params.action).then(function(response){
						v.io.auth.updateLastActiveTimestamp();
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
         * @memberOf voyent.io.action
		 * @alias updateAction
		 * @param {Object} params params
		 * @param {String} params.id The action id, the action to be updated
		 * @param {Object} params.action The new action
		 * @param {String} params.account Voyent Services account name. If not provided, the last known Voyent Account
		 *     will be used.
		 * @param {String} params.realm The Voyent Services realm. If not provided, the last known Voyent Realm name
		 *     will be used.
		 * @param {String} params.accessToken The Voyent authentication token. If not provided, the stored token from
		 *     voyent.io.auth.connect() will be used
		 * @param {String} params.host The Voyent Services host url. If not supplied, the last used Voyent host, or the
		 *     default will be used. (optional)
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 */
		updateAction: function(params){
			return new Promise(
				function(resolve, reject) {
					params = params ? params : {};
					v.io.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);
					validateRequiredId(params, reject);
					validateRequiredAction(params, reject);

					var url = getRealmResourceURL(v.io.actionURL, account, realm,
						'actions/' + params.id, token, params.ssl);

					v.$.put(url, params.action).then(function(){
						v.io.auth.updateLastActiveTimestamp();
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
         * @memberOf voyent.io.action
		 * @alias getAction
		 * @param {Object} params params
		 * @param {String} params.id The action id, the action to fetch
		 * @param {String} params.account Voyent Services account name. If not provided, the last known Voyent Account
		 *     will be used.
		 * @param {String} params.realm The Voyent Services realm. If not provided, the last known Voyent Realm name
		 *     will be used.
		 * @param {String} params.accessToken The Voyent authentication token. If not provided, the stored token from
		 *     voyent.io.auth.connect() will be used
		 * @param {String} params.host The Voyent Services host url. If not supplied, the last used Voyent host, or the
		 *     default will be used. (optional)
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 * @returns {Object} The action
		 */
		getAction: function(params){
			return new Promise(
				function(resolve, reject) {
					params = params ? params : {};
					v.io.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);
					validateRequiredId(params, reject);

					var url = getRealmResourceURL(v.io.actionURL, account, realm,
						'actions/' + params.id, token, params.ssl);

					v.$.getJSON(url).then(function(action){
						v.io.auth.updateLastActiveTimestamp();
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
         * @memberOf voyent.io.action
		 * @alias findActions
		 * @param {Object} params params
		 * @param {String} params.account Voyent Services account name. If not provided, the last known Voyent Account
		 *     will be used.
		 * @param {String} params.realm The Voyent Services realm. If not provided, the last known Voyent Realm name
		 *     will be used.
		 * @param {String} params.accessToken The Voyent authentication token. If not provided, the stored token from
		 *     voyent.io.auth.connect() will be used
		 * @param {String} params.host The Voyent Services host url. If not supplied, the last used Voyent host, or the
		 *     default will be used. (optional)
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
					v.io.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);

					var url = getRealmResourceURL(v.io.actionURL, account, realm,
						'actions/', token, params.ssl, {
							'query': params.query ? encodeURIComponent(JSON.stringify(params.query)) : {},
							'fields': params.fields ? encodeURIComponent(JSON.stringify(params.fields)) : {},
							'options': params.options ? encodeURIComponent(JSON.stringify(params.options)) : {}
						});

					v.$.getJSON(url).then(function(actions){
						v.io.auth.updateLastActiveTimestamp();
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
         * @memberOf voyent.io.action
		 * @alias deleteAction
		 * @param {Object} params params
		 * @param {String} params.id The action id, the action to be deleted
		 * @param {String} params.account Voyent Services account name. If not provided, the last known Voyent Account
		 *     will be used.
		 * @param {String} params.realm The Voyent Services realm. If not provided, the last known Voyent Realm name
		 *     will be used.
		 * @param {String} params.accessToken The Voyent authentication token. If not provided, the stored token from
		 *     voyent.io.auth.connect() will be used
		 * @param {String} params.host The Voyent Services host url. If not supplied, the last used Voyent host, or the
		 *     default will be used. (optional)
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 */
		deleteAction: function(params){
			return new Promise(
				function(resolve, reject) {
					params = params ? params : {};
					v.io.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);
					validateRequiredId(params, reject);

					var url = getRealmResourceURL(v.io.actionURL, account, realm,
						'actions/' + params.id, token, params.ssl);

					v.$.doDelete(url).then(function(){
						v.io.auth.updateLastActiveTimestamp();
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
         * @memberOf voyent.io.action
		 * @alias getTaskGroups
		 * @param {Object} params params
		 * @param {String} params.account Voyent Services account name. If not provided, the last known Voyent Account
		 *     will be used.
		 * @param {String} params.realm The Voyent Services realm. If not provided, the last known Voyent Realm name
		 *     will be used.
		 * @param {String} params.accessToken The Voyent authentication token. If not provided, the stored token from
		 *     voyent.io.auth.connect() will be used
		 * @param {String} params.host The Voyent Services host url. If not supplied, the last used Voyent host, or the
		 *     default will be used. (optional)
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 * @returns {Object} The task group schemas
		 */
		getTaskGroups: function(params){
			return new Promise(
					function(resolve, reject) {
						params = params ? params : {};
						v.io.checkHost(params);

						//validate
						var account = validateAndReturnRequiredAccount(params, reject);
						var realm = validateAndReturnRequiredRealm(params, reject);
						var token = validateAndReturnRequiredAccessToken(params, reject);

						var url = getRealmResourceURL(v.io.actionURL, account, realm,
								'taskGroups/', token, params.ssl);

						v.$.getJSON(url).then(function(tasksGroups){
							v.io.auth.updateLastActiveTimestamp();
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
         * @memberOf voyent.io.action
		 * @alias getTasks
		 * @param {Object} params params
		 * @param {String} params.account Voyent Services account name. If not provided, the last known Voyent Account
		 *     will be used.
		 * @param {String} params.realm The Voyent Services realm. If not provided, the last known Voyent Realm name
		 *     will be used.
		 * @param {String} params.accessToken The Voyent authentication token. If not provided, the stored token from
		 *     voyent.io.auth.connect() will be used
		 * @param {String} params.host The Voyent Services host url. If not supplied, the last used Voyent host, or the
		 *     default will be used. (optional)
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 * @returns {Object} The task schemas
		 */
		getTasks: function(params){
			return new Promise(
				function(resolve, reject) {
					params = params ? params : {};
					v.io.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);

					var url = getRealmResourceURL(v.io.actionURL, account, realm,
						'tasks/', token, params.ssl);

					v.$.getJSON(url).then(function(tasks){
						v.io.auth.updateLastActiveTimestamp();
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
			return v.io.getResourcePermissions(params);
		},

		updateResourcePermissions: function(params){
			params.service = 'action';
			params.path = 'actions';
			return v.io.updateResourcePermissions(params);
		}
	};

    /**
     * @namespace admin
     * @memberOf voyent.io
     */
	v.io.admin = {

		/**
		 * Get the Voyent Service definitions.
		 *
         * @memberOf voyent.io.admin
		 * @alias getServiceDefinitions
		 * @param {Object} params params
		 * @param {String} params.host The Voyent Services host url. If not supplied, the last used Voyent host, or the
		 *     default will be used. (optional)
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 * @returns Promise with a json object of the service definitions
		 *
		 */
		getServiceDefinitions: function(params){
			return new Promise(
				function(resolve, reject) {
					params = params ? params : {};

					v.io.checkHost(params);

					//validate
					var token = validateAndReturnRequiredAccessToken(params, reject);
					var protocol = params.ssl ? 'https://' : 'http://';
					var txParam = getTransactionURLParam();
					var url = protocol + v.io.authAdminURL + '/system/services/?access_token=' + token +
						(txParam ? '&' + txParam : '');

					v.$.getJSON(url).then(function(json){
						v.io.auth.updateLastActiveTimestamp();
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
				v.io.checkHost(params);

				//validate
				var account = validateAndReturnRequiredAccount(params, reject);
				var token = validateAndReturnRequiredAccessToken(params, reject);

				var protocol = params.ssl ? 'https://' : 'http://';
				var txParam = getTransactionURLParam();
				var url = protocol + v.io.authAdminURL + '/' + account + '?access_token=' + token +
					(txParam ? '&' + txParam : '');

				v.$.getJSON(url).then(function(json){
					v.io.auth.updateLastActiveTimestamp();
					resolve(json.account);
				})['catch'](function(error){
					reject(error);
				});

			});
		},

		/**
		 * Create a new Voyent Account. After successfully creating the account, the new administrator will
		 * be automatically logged in.
		 *
         * @memberOf voyent.io.admin
		 * @alias createAccount
		 * @param {Object} params params
		 * @param {String} params.host The Voyent Services host url. If not supplied, the last used Voyent host, or the
		 *     default will be used. (optional)
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
				v.io.checkHost(params);

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
				account.admins.push(admin);

				var protocol = params.ssl ? 'https://' : 'http://';
				var txParam = getTransactionURLParam();
				var url = protocol + v.io.authAdminURL + '/' + (txParam ? '&' + txParam : '');
				var loggedInAt = new Date().getTime();
				v.$.post(url, {account: account}).then(function(json){
					v.io.auth.updateLastActiveTimestamp();

					v.setSessionStorageItem(btoa(TOKEN_KEY), json.token.access_token);
					v.setSessionStorageItem(btoa(TOKEN_EXPIRES_KEY), json.token.expires_in);
					v.setSessionStorageItem(btoa(TOKEN_SET_KEY), loggedInAt);
					v.setSessionStorageItem(btoa(ACCOUNT_KEY), btoa(accountname));
					v.setSessionStorageItem(btoa(USERNAME_KEY), btoa(username));
					v.setSessionStorageItem(btoa(ADMIN_KEY), btoa('true'));
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
				v.io.checkHost(params);

				//validate
				var account = validateAndReturnRequiredAccount(params, reject);
				var token = validateAndReturnRequiredAccessToken(params, reject);

				var protocol = params.ssl ? 'https://' : 'http://';
				var txparam = getTransactionURLParam();
				var url = protocol + v.io.authAdminURL + '/' + account + '/realms/'
						+ '?access_token=' + token + '&' + getTransactionURLParam();

				v.$.getJSON(url).then(function(json){
					v.io.auth.updateLastActiveTimestamp();
					resolve(json.realms);
				})['catch'](function(error){
					reject(error);
				});

			});
		},

		getRealm: function(params){
			return new Promise(function(resolve, reject) {
				params = params ? params : {};
				v.io.checkHost(params);

				var account = validateAndReturnRequiredAccount(params, reject);
				var token = validateAndReturnRequiredAccessToken(params, reject);
				var realm = validateAndReturnRequiredRealmName(params, reject);

				var url = getRealmResourceURL(v.io.authAdminURL, account, realm,
					'', token, params.ssl);

				v.$.getJSON(url).then(function(json){
					v.io.auth.updateLastActiveTimestamp();
					resolve(json.realm);
				})['catch'](function(error){
					reject(error);
				});

			});
		},

		updateRealm: function(params){
			return new Promise(function(resolve, reject) {
				params = params ? params : {};
				v.io.checkHost(params);

				var account = validateAndReturnRequiredAccount(params, reject);
				var token = validateAndReturnRequiredAccessToken(params, reject);
				validateRequiredRealm(params, reject);

				var url = getRealmResourceURL(v.io.authAdminURL, account, params.realm.name,
					'', token, params.ssl);

				v.$.put(url, {realm: params.realm}).then(function(){
					v.io.auth.updateLastActiveTimestamp();
					resolve();
				})['catch'](function(error){
					reject(error);
				});

			});
		},

		createRealm: function(params){
			return new Promise(function(resolve, reject) {
				params = params ? params : {};
				v.io.checkHost(params);

				var account = validateAndReturnRequiredAccount(params, reject);
				var token = validateAndReturnRequiredAccessToken(params, reject);
				var realmName = validateAndReturnRequiredRealmName(params, reject);
				validateRequiredRealm(params, reject);

				var protocol = params.ssl ? 'https://' : 'http://';
				var txParam = getTransactionURLParam();
				var url = protocol + v.io.authAdminURL + '/' + account + '/realms?access_token=' + token +
					(txParam ? '&' + txParam : '');

				v.$.post(url, {realm: params.realm}).then(function(json){
					v.io.auth.updateLastActiveTimestamp();
					resolve(json.resourceLocation);
				})['catch'](function(error){
					reject(error);
				});

			});
		},

		cloneRealm: function(params){
			return new Promise(function(resolve, reject) {
				params = params ? params : {};
				v.io.checkHost(params);

				var account = validateAndReturnRequiredAccount(params, reject);
				var token = validateAndReturnRequiredAccessToken(params, reject);
				var originRealmName = validateAndReturnRequiredOriginRealmName(params, reject);
				var destRealmName = validateAndReturnRequiredDestRealmName(params, reject);

				var protocol = params.ssl ? 'https://' : 'http://';
				var txParam = getTransactionURLParam();
				var url = protocol + v.io.authAdminURL + '/' + account + '/realms/' + originRealmName + '/clone/' +
					destRealmName + '?access_token=' + token + (txParam ? '&' + txParam : '');

				v.$.post(url, {realm: params.realm}).then(function(json){
					v.io.auth.updateLastActiveTimestamp();
					resolve(json.resourceLocation);
				})['catch'](function(error){
					reject(error);
				});

			});
		},

		deleteRealm: function(params){
			return new Promise(function(resolve, reject) {
				params = params ? params : {};
				v.io.checkHost(params);

				var account = validateAndReturnRequiredAccount(params, reject);
				var token = validateAndReturnRequiredAccessToken(params, reject);
				var realmName = validateAndReturnRequiredRealmName(params, reject);

				var url = getRealmResourceURL(v.io.authAdminURL, account, realmName,
					'', token, params.ssl);

				console.log('voyent.io.admin.deleteRealm() ' + url);

				v.$.doDelete(url).then(function(){
					v.io.auth.updateLastActiveTimestamp();
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
				v.io.checkHost(params);

				//validate
				var account = validateAndReturnRequiredAccount(params, reject);
				var realm = validateAndReturnRequiredRealmName(params, reject);
				var token = validateAndReturnRequiredAccessToken(params, reject);

				var url = getRealmResourceURL(v.io.authAdminURL, account, realm,
					'users/', token, params.ssl, {
						'query': params.query ? encodeURIComponent(JSON.stringify(params.query)) : {},
						'fields': params.fields ? encodeURIComponent(JSON.stringify(params.fields)) : {},
						'options': params.options ? encodeURIComponent(JSON.stringify(params.options)) : {}
					}
				);

				v.$.getJSON(url).then(function(json){
					v.io.auth.updateLastActiveTimestamp();
					resolve(json.users);
				})['catch'](function(error){
					reject(error);
				});
			});
		},

		createRealmUser: function(params){
			return new Promise(function(resolve, reject) {
				params = params ? params : {};
				v.io.checkHost(params);

				var account = validateAndReturnRequiredAccount(params, reject);
				var realm = validateAndReturnRequiredRealmName(params, reject);
				var token = validateAndReturnRequiredAccessToken(params, reject);

				validateRequiredUser(params, reject);

				var url = getRealmResourceURL(v.io.authAdminURL, account, realm,
					'users', token, params.ssl);

				v.$.post(url, {user: params.user}).then(function(response){
					v.io.auth.updateLastActiveTimestamp();
					resolve(response.resourceLocation);
				})['catch'](function(error){
					reject(error);
				});
			});
		},

		getRealmUser: function(params){
			return new Promise(function(resolve, reject) {
				params = params ? params : {};
				v.io.checkHost(params);

				//validate
				var account = validateAndReturnRequiredAccount(params, reject);
				var realm = validateAndReturnRequiredRealmName(params, reject);
				var token = validateAndReturnRequiredAccessToken(params, reject);
				var username = validateAndReturnRequiredUsername(params, reject);

				var url = getRealmResourceURL(v.io.authAdminURL, account, realm,
					'users/' + username, token, params.ssl);

				v.$.getJSON(url).then(function(json){
					v.io.auth.updateLastActiveTimestamp();
					resolve(json.user);
				})['catch'](function(error){
					reject(error);
				});

			});
		},

		updateRealmUser: function(params){
			return new Promise(function(resolve, reject) {
				params = params ? params : {};
				v.io.checkHost(params);

				var account = validateAndReturnRequiredAccount(params, reject);
				var realm = validateAndReturnRequiredRealmName(params, reject);
				var token = validateAndReturnRequiredAccessToken(params, reject);

				validateRequiredUser(params, reject);

				var url = getRealmResourceURL(v.io.authAdminURL, account, realm,
					'users/' + params.user.username, token, params.ssl);

				v.$.put(url, {user: params.user}).then(function(response){
					v.io.auth.updateLastActiveTimestamp();
					resolve();
				})['catch'](function(error){
					reject(error);
				});
			});
		},

		deleteRealmUser: function(params){
			return new Promise(function(resolve, reject) {
				params = params ? params : {};
				v.io.checkHost(params);

				var account = validateAndReturnRequiredAccount(params, reject);
				var realm = validateAndReturnRequiredRealmName(params, reject);
				var token = validateAndReturnRequiredAccessToken(params, reject);
				var username = validateAndReturnRequiredUsername(params, reject);

				var url = getRealmResourceURL(v.io.authAdminURL, account, realm,
					'users/' + params.username, token, params.ssl);

				v.$.doDelete(url).then(function(){
					v.io.auth.updateLastActiveTimestamp();
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
				v.io.checkHost(params);

				//validate
				var account = validateAndReturnRequiredAccount(params, reject);
				var realm = validateAndReturnRequiredRealmName(params, reject);
				var token = validateAndReturnRequiredAccessToken(params, reject);

				var url = getRealmResourceURL(v.io.authAdminURL, account, realm,
					'roles', token, params.ssl);

				v.$.getJSON(url).then(function(json){
					v.io.auth.updateLastActiveTimestamp();
					resolve(json.roles);
				})['catch'](function(error){
					reject(error);
				});
			});
		},

		createRealmRole: function(params){
			return new Promise(function(resolve, reject) {
				params = params ? params : {};
				v.io.checkHost(params);

				validateRequiredRole(params, reject);

				//validate
				var account = validateAndReturnRequiredAccount(params, reject);
				var realm = validateAndReturnRequiredRealmName(params, reject);
				var token = validateAndReturnRequiredAccessToken(params, reject);

				var url = getRealmResourceURL(v.io.authAdminURL, account, realm,
					'roles', token, params.ssl);

				v.$.post(url, {role: params.role}).then(function(response){
					v.io.auth.updateLastActiveTimestamp();
					resolve(response.resourceLocation);
				})['catch'](function(error){
					reject(error);
				});
			});
		},

		updateRealmRole: function(params){
			return new Promise(function(resolve, reject) {
				params = params ? params : {};
				v.io.checkHost(params);

				validateRequiredRole(params, reject);

				//validate
				var account = validateAndReturnRequiredAccount(params, reject);
				var realm = validateAndReturnRequiredRealmName(params, reject);
				var token = validateAndReturnRequiredAccessToken(params, reject);

				var url = getRealmResourceURL(v.io.authAdminURL, account, realm,
					'roles/' + params.role.name, token, params.ssl);

				v.$.put(url, {role: params.role}).then(function(response){
					v.io.auth.updateLastActiveTimestamp();
					resolve();
				})['catch'](function(error){
					reject(error);
				});
			});
		},

		deleteRealmRole: function(params){
			return new Promise(function(resolve, reject) {
				params = params ? params : {};
				v.io.checkHost(params);

				validateRequiredId(params, reject);

				var account = validateAndReturnRequiredAccount(params, reject);
				var realm = validateAndReturnRequiredRealmName(params, reject);
				var token = validateAndReturnRequiredAccessToken(params, reject);

				var url = getRealmResourceURL(v.io.authAdminURL, account, realm,
					'roles/' + params.id, token, params.ssl);

				v.$.doDelete(url).then(function(response){
					v.io.auth.updateLastActiveTimestamp();
					resolve();
				})['catch'](function(error){
					reject(error);
				});
			});
		},

		getLogs: function(params) {
			return new Promise(function(resolve, reject) {
				params = params ? params : {};
				v.io.checkHost(params);

				var protocol = params.ssl ? 'https://' : 'http://';
				var account = validateAndReturnRequiredAccount(params, reject);
				var token = validateAndReturnRequiredAccessToken(params, reject);

				var query = params.query ? encodeURIComponent(JSON.stringify(params.query)) : '{}';
				var fields = params.fields ? encodeURIComponent(JSON.stringify(params.fields)) : '{}';
				var options = params.options ? encodeURIComponent(JSON.stringify(params.options)) : '{}';

				var url = protocol + v.io.authAdminURL + '/' + account + '/logging/?access_token=' +
						token + '&query=' + query + '&fields=' + fields + '&options=' + options;

				v.$.getJSON(url).then(function(logs){
					v.io.auth.updateLastActiveTimestamp();
					resolve(logs);
				})['catch'](function(error){
					reject(error);
				});

			});
		},

		getDebugLogs: function(params) {
			return new Promise(function(resolve, reject) {
				params = params ? params : {};
				v.io.checkHost(params);

				var protocol = params.ssl ? 'https://' : 'http://';
				var account = validateAndReturnRequiredAccount(params, reject);
				var realm = validateAndReturnRequiredRealm(params, reject);
				var token = validateAndReturnRequiredAccessToken(params, reject);

				var query = params.query ? encodeURIComponent(JSON.stringify(params.query)) : '{}';
				var fields = params.fields ? encodeURIComponent(JSON.stringify(params.fields)) : '{}';
				var options = params.options ? encodeURIComponent(JSON.stringify(params.options)) : '{}';

				var url = protocol + v.io.authAdminURL + '/' + account + '/realms/' + realm +
					'/debugLogging/?access_token=' + token + '&query=' + query + '&fields=' + fields + '&options=' + options;

				v.$.getJSON(url).then(function(logs){
					v.io.auth.updateLastActiveTimestamp();
					resolve(logs);
				})['catch'](function(error){
					reject(error);
				});

			});
		},

		createAdministrator: function(params){
			return new Promise(function(resolve, reject) {
				params = params ? params : {};
				v.io.checkHost(params);

				var account = validateAndReturnRequiredAccount(params, reject);
				var token = validateAndReturnRequiredAccessToken(params, reject);
				var admin = validateAndReturnRequiredAdmin(params, reject);

				var protocol = params.ssl ? 'https://' : 'http://';
				var txParam = getTransactionURLParam();
				var url = protocol + v.io.authAdminURL + '/' + account + '/admins/?access_token=' + token +
					(txParam ? '&' + txParam : '');

				v.$.post(url, {admin: admin}).then(function(response){
					v.io.auth.updateLastActiveTimestamp();
					resolve();
				})['catch'](function(error){
					reject(error);
				});
			});
		},

		updateAdministrator: function(params){
			return new Promise(function(resolve, reject) {
				params = params ? params : {};
				v.io.checkHost(params);

				var account = validateAndReturnRequiredAccount(params, reject);
				var token = validateAndReturnRequiredAccessToken(params, reject);
				var admin = validateAndReturnRequiredAdmin(params, reject);

				var protocol = params.ssl ? 'https://' : 'http://';
				var txParam = getTransactionURLParam();
				var url = protocol + v.io.authAdminURL + '/' + account + '/admins/' + admin.username +
					'/?access_token=' + token + (txParam ? '&' + txParam : '');

				v.$.put(url, {admin: admin}).then(function(response){
					v.io.auth.updateLastActiveTimestamp();
					resolve();
				})['catch'](function(error){
					reject(error);
				});
			});
		},

		deleteAdministrator: function(params){
			return new Promise(function(resolve, reject) {
				params = params ? params : {};
				v.io.checkHost(params);

				validateRequiredUsername(params, reject);

				var account = validateAndReturnRequiredAccount(params, reject);
				var token = validateAndReturnRequiredAccessToken(params, reject);
				var username = validateAndReturnRequiredUsername(params, reject);

				var protocol = params.ssl ? 'https://' : 'http://';
				var txParam = getTransactionURLParam();
				var url = protocol + v.io.authAdminURL + '/' + account + '/admins/' + username + '/?access_token=' + token +
					(txParam ? '&' + txParam : '');

				v.$.doDelete(url).then(function(response){
					v.io.auth.updateLastActiveTimestamp();
					resolve();
				})['catch'](function(error){
					reject(error);
				});
			});
		},



	};

	/* AUTH SERVICE */
    /**
     * @namespace auth
     * @memberOf voyent.io
     */
	v.io.auth = {

		/**
		 * Retrieve a new access token from the Voyent auth service.
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
         * @memberOf voyent.io.auth
		 * @alias getNewAccessToken
		 * @param {Object} params params
		 * @param {String} params.account Voyent Services account name (required)
		 * @param {String} params.realm Voyent Services realm (required only for non-admin logins)
		 * @param {String} params.username User name (required)
		 * @param {String} params.password User password (required)
		 * @param {String} params.host The Voyent Services host url. If not supplied, the last used Voyent host, or the
		 *     default will be used. (optional)
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 * @returns {Promise} with the following argument:
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
					v.io.checkHost(params);

					if( !params.realm ){
						params.realm = 'admin';
					}

					//validation
					if( !params.account ){
						reject(Error('Voyent account required for new access token'));
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
					var url = protocol + v.io.authURL + '/' + encodeURI(params.account) +
						'/realms/' + encodeURI(params.realm) + '/token/?' + getTransactionURLParam();

					v.$.post(url, {
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
		 * Login into voyent.
		 *
		 * This function will login into the Voyent auth service and return a user token and expiry timestamp upon
		 * successful authentication. This function does not need to be called if v.io.connect has already been
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
         * @memberOf voyent.io.auth
		 * @alias login
		 * @param {Object} params params
		 * @param {String} params.account Voyent Services account name (required)
		 * @param {String} params.realm Voyent Services realm (required only for non-admin logins)
		 * @param {Boolean} params.admin The client should or should not log in as an account administrator
		 * @param {String} params.username User name (required)
		 * @param {String} params.password User password (required)
		 * @param {String} params.host The Voyent Services host url. If not supplied, the last used Voyent host, or the
		 *     default will be used. (optional)
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 * @param {String} params.scopeToPath (default '/') If set, the authentication token will be restricted to the
		 *     given path, unless on localhost.
		 * @returns {Promise} with the following argument:
		 *      {
		 *          access_token: 'xxx',
		 *          expires_in: 99999
		 *      }
		 *
		 */
		login: function(params) {
			return new Promise(function(resolve, reject) {
				params = params ? params : {};
				v.io.checkHost(params);

				if( !params.realm ){
					params.realm = 'admin';
				}

				//validation
				if( !params.account ){
					reject(Error('Voyent account required for login'));
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
				var url = protocol + v.io.authURL + '/' + encodeURI(params.account) +
					'/realms/' + (params.admin === 'true' ? 'admin' : encodeURI(params.realm)) + '/token/' + ( txParam ? ('?' + txParam) : '');

        //var url = protocol + v.io.authURL + '/' + encodeURI(params.account) +
        //  '/realms/' + encodeURI(params.realm) + '/token/' + ( txParam ? ('?' + txParam) : '');


				var loggedInAt = new Date().getTime();
				v.$.post(url, {
					strategy: 'query',
					username: params.username,
					password: params.password
				}).then(function(authResponse){
					if( !params.suppressUpdateTimestamp ){
						v.io.auth.updateLastActiveTimestamp();
					}
					v.setSessionStorageItem(btoa(TOKEN_KEY), authResponse.access_token);
						v.setSessionStorageItem(btoa(TOKEN_EXPIRES_KEY), authResponse.expires_in);
						v.setSessionStorageItem(btoa(TOKEN_SET_KEY), loggedInAt);
						v.setSessionStorageItem(btoa(ACCOUNT_KEY), btoa(params.account));
						v.setSessionStorageItem(btoa(REALM_KEY), btoa(params.realm));
						v.setSessionStorageItem(btoa(USERNAME_KEY), btoa(params.username));
						v.setSessionStorageItem(btoa(ADMIN_KEY), btoa(params.admin));
					if( params.scopeToPath ){
						v.setSessionStorageItem(btoa(SCOPE_TO_PATH_KEY), btoa(params.scopeToPath));
					}
					fireEvent(window, 'voyent-login-succeeded', {});
					resolve(authResponse);
				})['catch'](function(error){
					reject(error);
				});
			});
		},

		/**
		 * Connect to voyent.
		 *
		 * This function will connect to the Voyent voyent, and maintain the connection for the specified
		 * timeout period (default 20 minutes). By default, the Voyent push service is also activated, so the client
		 * may send and receive push notifications after connecting.
		 *
		 * After connecting to Voyent Services, any Voyent service API may be used without needing to re-authenticate.
		 * After successfully connecting an authentication will be stored in session storage and available through
		 * sessionStorage.voyentToken. This authentication information will automatically be used by other Voyent API
		 * calls, so the token does not be included in subsequent calls, but is available if desired.
		 *
		 * A simple example of connecting to the Voyent Services and then making a service call is the following:
		 * @example
		 * v.io.connect({
		 *           account: 'my_account',
		 *           realm: 'realmA',
		 *           user: 'user',
		 *           password: 'secret'})
		 *   .then( function(){
		 *      console.log("successfully connnected to Voyent Services");
		 *   })
		 *   .then( function(docs){
		 *      for( var d in docs ){ ... };
		 *   })
		 *   .catch( function(error){
		 *      console.log("error connecting to Voyent Services: " + error);
		 *   });
		 *
         * @memberOf voyent.io.auth
		 * @alias connect
		 * @param {Object} params params
		 * @param {String} params.account Voyent Services account name
		 * @param {Boolean} params.admin The client should or should not log in as an account administrator
		 * @param {String} params.realm Voyent Services realm
		 * @param {String} params.username User name
		 * @param {String} params.password User password
		 * @param {String} params.host The Voyent Services host url, defaults to api.voyent.cloud
		 * @param {Boolean} params.usePushService Open and connect to the Voyent push service, default true
		 * @param {Boolean} params.connectionTimeout The timeout duration, in minutes, that the Voyent login will last
		 *     during inactivity. Default 20 minutes.
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 * @param {Boolean} params.storeCredentials (default true) Whether to store encrypted credentials in session
		 *     storage. If set to false, voyent will not attempt to relogin before the session expires.
		 * @param {Function} params.onSessionExpiry Function callback to be called on session expiry. If you wish to
		 *     ensure that disconnect is not called until after your onSessionExpiry callback has completed, please
		 *     return a Promise from your function.
		 * @param {String} params.scopeToPath (default '/') If set, the authentication token will be restricted to the
		 *     given path, unless on localhost.
		 * @returns Promise with service definitions
		 *
		 */
		connect: function(params){
			return new Promise(function(resolve, reject) {

				/* The function callback set to run before the next timeout,
				   will automatically reset the next setTimeout call if necessary */
				function connectCallback(){
					console.log(new Date().toISOString() + ' voyent.io.auth.connect: callback running');
					var connectSettings = v.io.auth.getConnectSettings();
					if( !connectSettings ){
						console.log(new Date().toISOString() + ' voyent.io.auth.connect: error, could not retrieve settings');
						return;
					}

					var timeoutMillis = connectSettings.connectionTimeout * 60 * 1000;

					//first check if connectionTimeout has expired
					var now = new Date().getTime();
					var inactiveMillis = now - v.io.auth.getLastActiveTimestamp();
					var millisUntilTimeoutExpires = timeoutMillis - inactiveMillis;
					console.log('voyent.io.auth.connect: getLastActiveTimestamp: ' + v.io.auth.getLastActiveTimestamp());
					console.log('voyent.io.auth.connect: connection timeout ms: ' + timeoutMillis);
					console.log('voyent.io.auth.connect: current timestamp: ' + now);
					console.log('voyent.io.auth.connect: inactive ms: ' + inactiveMillis + '(' + (inactiveMillis/1000/60) + ' mins)');
					console.log('voyent.io.auth.connect: ms until timeout: ' + millisUntilTimeoutExpires + '(' + (millisUntilTimeoutExpires/1000/60) + ' mins)');

					//if we haven't exceeded the connection timeout, reconnect
					if( millisUntilTimeoutExpires > 0 ){
						console.log(new Date().toISOString() + ' voyent.io.auth.connect: timeout has not been exceeded, ' +
							v.io.auth.getTimeRemainingBeforeExpiry()/1000/60 + ' mins remaining before token expires, ' +
							millisUntilTimeoutExpires/1000/60 + ' mins remaining before timeout expires');

						//if we the time remaining before expiry is less than the session timeout
						//refresh the access token and set the timeout
						if( timeoutMillis > millisUntilTimeoutExpires ){
							v.io.auth.refreshAccessToken().then(function(){
								var cbId = setTimeout(connectCallback, v.io.auth.getExpiresIn() - timeoutPadding);
								v.setSessionStorageItem(btoa(RELOGIN_CB_KEY), cbId);
								console.log( new Date().toISOString() + ' voyent.io.auth.connect: setting next connection check to ' + v.io.auth.getExpiresIn() / 1000 / 60 + ' mins, expiresIn: ' +
									(v.io.auth.getExpiresIn()/1000/60) + ' mins, remaining: '  +
									(v.io.auth.getTimeRemainingBeforeExpiry()/1000/60) + ' mins');

							});
						}
					}
					else{
						console.log( new Date().toISOString() + ' voyent.io.auth.connect: timeout has expired, disconnecting..');

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
									expiredCallbackPromise.then(v.io.auth.disconnect)
									['catch'](v.io.auth.disconnect);
								}
								else{
									setTimeout(v.io.auth.disconnect, 500);
								}
							}
							else{
								console.log( new Date().toISOString() + ' voyent.io.auth.connect: error calling onSessionExpiry callback, ' +
									'could not find function: ' + expiredCallback);
								v.io.auth.disconnect();
							}

						}
						else{
							v.io.auth.disconnect();
						}

					}
				}

				/* initialize the timing for the callback check */
				function initConnectCallback(){

					//if the desired connection timeout is greater the token expiry
					//set the callback check for just before the token expires
					var callbackTimeout;
					if( connectionTimeoutMillis > v.io.auth.getTimeRemainingBeforeExpiry()){
						callbackTimeout = v.io.auth.getTimeRemainingBeforeExpiry() - timeoutPadding;
					}
					//otherwise the disired timeout is less then the token expiry
					//so set the callback to happen just at specified timeout
					else{
						callbackTimeout = connectionTimeoutMillis;
					}

					var tokenSetAt = new Date();
					tokenSetAt.setTime(v.io.auth.getTokenSetAtTime());
					console.log( new Date().toISOString() + ' voyent.io.auth.connect: setting next connection check to ' + callbackTimeout / 1000 / 60 + ' mins, expiresIn: ' +
						(v.io.auth.getExpiresIn()/1000/60) + ' mins, remaining: '  +
						(v.io.auth.getTimeRemainingBeforeExpiry()/1000/60) + ' mins, token set at ' + tokenSetAt);
					var cbId = setTimeout(connectCallback, callbackTimeout);
					v.setSessionStorageItem(btoa(RELOGIN_CB_KEY), cbId);

					if( settings.usePushService ){
						v.io.push.startPushService(settings);
					}
				}

				/* initialize basic settings */
				function initSettings(){

					params = params ? params : {};
					v.io.checkHost(params);
					if( !params.storeCredentials){
						params.storeCredentials = true;
					}

					//store connect settings
					settings = {
						host: v.io.baseURL,
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

					v.setSessionStorageItem(btoa(CONNECT_SETTINGS_KEY), btoa(JSON.stringify(settings)));

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
					v.setSessionStorageItem(btoa(ACCOUNT_KEY), btoa(v.io.auth.getLastKnownAccount()));
					v.setSessionStorageItem(btoa(REALM_KEY), btoa(v.io.auth.getLastKnownRealm()));
					v.setSessionStorageItem(btoa(USERNAME_KEY), btoa(params.username));
					v.setSessionStorageItem(btoa(PASSWORD_KEY), btoa(params.password));
				}

				var timeoutPadding = 60000;
				var settings;
				var connectionTimeoutMillis;
				initSettings();

				if( v.io.auth.isLoggedIn()){
					initConnectCallback();
					resolve();
				}
				else{
					v.io.auth.login(params).then(function(authResponse){
						console.log(new Date().toISOString() + ' voyent.io.auth.connect: received auth response');
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
				if( !v.io.auth.isLoggedIn()){
					reject('voyent.io.auth.refreshAccessToken() not logged in, cant refresh token');
				}
				else{
					var loginParams = v.io.auth.getConnectSettings();
					if( !loginParams ){
						reject('voyent.io.auth.refreshAccessToken() no connect settings, cant refresh token');
					}
					else{
						loginParams.account = atob(v.getSessionStorageItem(btoa(ACCOUNT_KEY)));
						loginParams.realm = atob(v.getSessionStorageItem(btoa(REALM_KEY)));
						loginParams.username = atob(v.getSessionStorageItem(btoa(USERNAME_KEY)));
						loginParams.password = atob(v.getSessionStorageItem(btoa(PASSWORD_KEY)));
						loginParams.suppressUpdateTimestamp = true;
						loginParams.admin = atob(v.getSessionStorageItem(btoa(ADMIN_KEY)));
						console.log('voyent.io.auth.refreshAccessToken()');
						v.io.auth.login(loginParams).then(function(authResponse){
							fireEvent(window, 'voyent-access-token-refreshed', v.io.auth.getLastAccessToken());
							if( loginParams.usePushService ){
								v.io.push.startPushService(loginParams);
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
		 * Disconnect from Voyent Services.
		 *
		 * This function will logout from Voyent Services and remove all session information from the client.
		 *
		 * TODO
		 *
         * @memberOf voyent.io.auth
		 * @alias disconnect
		 * @param {Object} params params
		 * @param {String} params.account Voyent Services account name. If not provided, the last known Voyent Account
		 *     will be used.
		 * @param {String} params.realm The Voyent Services realm. If not provided, the last known Voyent Realm name
		 *     will be used.
		 * @param {String} params.username User name (required)
		 * @param {String} params.password User password (required)
		 * @param {String} params.host The Voyent Services host url. If not supplied, the last used Voyent host, or the
		 *     default will be used. (optional)
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 * @returns {Promise} with the following argument:
		 *      {
		 *          access_token: 'xxx',
		 *          expires_in: 99999
		 *      }
		 *
		 */
		disconnect: function(){
			v.removeSessionStorageItem(btoa(TOKEN_KEY));
			v.removeSessionStorageItem(btoa(TOKEN_EXPIRES_KEY));
			v.removeSessionStorageItem(btoa(CONNECT_SETTINGS_KEY));
			v.removeSessionStorageItem(btoa(TOKEN_SET_KEY));
			v.removeSessionStorageItem(btoa(ACCOUNT_KEY));
			v.removeSessionStorageItem(btoa(REALM_KEY));
			v.removeSessionStorageItem(btoa(USERNAME_KEY));
			v.removeSessionStorageItem(btoa(PASSWORD_KEY));
			v.removeSessionStorageItem(btoa(LAST_ACTIVE_TS_KEY));
			var cbId = v.getSessionStorageItem(btoa(RELOGIN_CB_KEY));
			if( cbId ){
				clearTimeout(cbId);
			}
			v.removeSessionStorageItem(btoa(RELOGIN_CB_KEY));
			console.log(new Date().toISOString() + ' voyent has disconnected')
		},

		getLastAccessToken: function(){
			return v.getSessionStorageItem(btoa(TOKEN_KEY));
		},

		getExpiresIn: function(){
			var expiresInStr = v.getSessionStorageItem(btoa(TOKEN_EXPIRES_KEY));
			if( expiresInStr ){
				return parseInt(expiresInStr,10);
			}
		},

		getTokenSetAtTime: function(){
			var tokenSetAtStr = v.getSessionStorageItem(btoa(TOKEN_SET_KEY));
			if( tokenSetAtStr ){
				return parseInt(tokenSetAtStr,10);
			}
		},

		getTimeRemainingBeforeExpiry: function(){
			var expiresIn = v.io.auth.getExpiresIn();
			var token = v.io.auth.getExpiresIn();
			if( expiresIn && token ){
				var now = new Date().getTime();
				return (v.io.auth.getTokenSetAtTime() + expiresIn) - now;
			}
		},

		getConnectSettings: function(){
			var settingsStr = v.getSessionStorageItem(btoa(CONNECT_SETTINGS_KEY));
			if( settingsStr ){
				return JSON.parse(atob(settingsStr));
			}
		},

		isLoggedIn: function(){
			var token = v.getSessionStorageItem(btoa(TOKEN_KEY)),
				tokenExpiresInStr = v.getSessionStorageItem(btoa(TOKEN_EXPIRES_KEY)),
				tokenExpiresIn = tokenExpiresInStr ? parseInt(tokenExpiresInStr,10) : null,
				tokenSetAtStr = v.getSessionStorageItem(btoa(TOKEN_SET_KEY)),
				tokenSetAt = tokenSetAtStr ? parseInt(tokenSetAtStr,10) : null,
				scopeToPathCipher = v.getSessionStorageItem(btoa(SCOPE_TO_PATH_KEY)),
				scopeToPath = scopeToPathCipher ? atob(scopeToPathCipher) : '/',
				isDev = window.location.port !== '',
				currentPath = window.location.pathname;
			//console.log('v.io.auth.isLoggedIn: token=' + token + ' tokenExpiresIn=' + tokenExpiresIn + 'tokenSetAt=' + tokenSetAt + ' (new Date().getTime() < (tokenExpiresIn + tokenSetAt))=' + (new Date().getTime() < (tokenExpiresIn + tokenSetAt)) + ' (currentPath.indexOf(scopeToPath) === 0)=' + (currentPath.indexOf(scopeToPath) === 0));
			var result = token && tokenExpiresIn && tokenSetAt && (new Date().getTime() < (tokenExpiresIn + tokenSetAt) ) && (isDev || currentPath.indexOf(scopeToPath) === 0);
			return !!result;
		},

		getLastKnownAccount: function(){
			var accountCipher = v.getSessionStorageItem(btoa(ACCOUNT_KEY));
			if( accountCipher ){
				return atob(accountCipher);
			}
		},

		getLastKnownRealm: function(){
			var realmCipher = v.getSessionStorageItem(btoa(REALM_KEY));
			if( realmCipher ){
				return atob(realmCipher);
			}
		},

		getLastKnownUsername: function () {
			var usernameCipher = v.getSessionStorageItem(btoa(USERNAME_KEY));
			if (usernameCipher) {
				return atob(usernameCipher);
			}
		},


		/**
		 * Register a new user for a realm that supports open user registrations.
		 *
         * @memberOf voyent.io.auth
		 * @alias registerAsNewUser
		 * @param {Object} params params
		 * @param {String} params.account Voyent Services account name. If not provided, the last known Voyent Account
		 *     will be used.
		 * @param {String} params.realm The Voyent Services realm. If not provided, the last known Voyent Realm name
		 *     will be used.
		 * @param {String} params.username User name (required)
		 * @param {String} params.password User password (required)
		 * @param {String} params.host The Voyent Services host url. If not supplied, the last used Voyent host, or the
		 *     default will be used. (optional)
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
					v.io.checkHost(params);

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

					var url = getRealmResourceURL(v.io.authAdminURL, account, realm,
						'quickuser', token, params.ssl);

					v.$.post(url, {user: user}).then(function(response){
						v.io.auth.updateLastActiveTimestamp();
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
         * @memberOf voyent.io.auth
		 * @alias checkUserRole
		 * @param {Object} params params
		 * @param {String} params.account Voyent Services account name. If not provided, the last known Voyent Account
		 *     will be used.
		 * @param {String} params.realm The Voyent Services realm. If not provided, the last known Voyent Realm name
		 *     will be used.
		 * @param {String} params.host The Voyent Services host url. If not supplied, the last used Voyent host, or the
		 *     default will be used. (optional)
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 * @param {String} params.role The single role to check for
		 * @returns Promise
		 */
		 checkUserRole: function(params){
			return new Promise(function(resolve, reject) {
				params = params ? params : {};
				v.io.checkHost(params);

				var account = validateAndReturnRequiredAccount(params, reject);
				var realm = validateAndReturnRequiredRealm(params, reject);
				var token = validateAndReturnRequiredAccessToken(params, reject);
				var role = validateAndReturnRequiredRole(params, reject);

				var url = getRealmResourceURL(v.io.authAdminURL, account, realm,
					'rolecheck/', token, params.ssl, {roleName: role});

				v.$.getJSON(url).then(function(response){
					if( response.results ){
						v.io.auth.updateLastActiveTimestamp();
						resolve(true);
					}
					else{
						reject(response);
					}
				})['catch'](function(response){
					if( response.status == 403){
						v.io.auth.updateLastActiveTimestamp();
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
         * @memberOf voyent.io.auth
		 * @alias checkUserRole
		 * @param {Object} params params
		 * @param {String} params.account Voyent Services account name. If not provided, the last known Voyent Account
		 *     will be used.
		 * @param {String} params.realm The Voyent Services realm. If not provided, the last known Voyent Realm name
		 *     will be used.
		 * @param {String} params.host The Voyent Services host url. If not supplied, the last used Voyent host, or the
		 *     default will be used. (optional)
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 * @param {Array} params.roles The array of roles to check for
		 * @param {Array} params.roles The array of roles to check for
		 * @param {String} params.op The operator 'and' or 'or' ??? TODO
		 * @param {String} params.username The username parameter TODO may be later removed
		 *     http://jira.icesoft.org/browse/NTFY-216
		 * @returns Promise
		 */
		 checkUserRoles: function(params){
			return new Promise(function(resolve, reject) {
				params = params ? params : {};
				v.io.checkHost(params);

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

				var url = getRealmResourceURL(v.io.authAdminURL, account, realm,
					'users/' + username + '/rolecheck', token, params.ssl);

				v.$.post(url, payload).then(function(response){
					v.io.auth.updateLastActiveTimestamp();
					resolve(true);
				})['catch'](function(response){
					if( response.status == 403){
						v.io.auth.updateLastActiveTimestamp();
						resolve(false);
					}
					else{
						reject(response);
					}
				});
			});
		},


		/**
		 * Update the last active timestamp for Voyent auth. This value is used
		 * when checking for clients-side session timeouts.
         * @memberOf voyent.io.auth
		 * @alias updateLastActiveTimestamp
		 */
		updateLastActiveTimestamp: function(){
			v.setSessionStorageItem(btoa(LAST_ACTIVE_TS_KEY), new Date().getTime());
		},

		/**
		 * Return the timestamp of the last voyent op or when voyent.io.auth.updateLastActiveTimestamp()
		 * was called.
         * @memberOf voyent.io.auth
		 * @alias getLastActiveTimestamp
		 */
		getLastActiveTimestamp: function(){
			return v.getSessionStorageItem(btoa(LAST_ACTIVE_TS_KEY));
		},

		forgotPassword: function(params){
			return new Promise(function(resolve, reject) {
				params = params ? params : {};
				v.io.checkHost(params);

				var account = validateAndReturnRequiredAccount(params, reject);
				var username = validateAndReturnRequiredUsername(params, reject);

				var protocol = params.ssl ? 'https://' : 'http://';
				var txParam = getTransactionURLParam();
				var url = protocol + v.io.authAdminURL + '/' + account + '/';

				if( params.realm ){
					url += 'realms/' + params.realm + '/users/' + username + '/emailpassword';
				}
				else{ //admin
					url += 'admins/' + username + '/emailpassword';
				}
				url += (txParam ? '?' + txParam : '');

				v.$.post(url).then(function(response){
					v.io.auth.updateLastActiveTimestamp();
					resolve(true);
				})['catch'](function(response){
					reject(response);
				});
			});
		}
	};

	/* DOC SERVICE */
    /**
     * @namespace docs
     * @memberOf voyent.io
     */
	v.io.docs = {

		/**
		 * Create a new document
		 *
         * @memberOf voyent.io.docs
		 * @alias createDocument
		 * @param {Object} params params
		 * @param {String} params.collection The name of the document collection.  Defaults to 'documents'.
		 * @param {String} params.id The document id. If not provided, the service will return a new id
		 * @param {Object} params.document The document to be created
		 * @param {String} params.account Voyent Services account name. If not provided, the last known Voyent Account
		 *     will be used.
		 * @param {String} params.realm The Voyent Services realm. If not provided, the last known Voyent Realm name
		 *     will be used.
		 * @param {String} params.accessToken The Voyent authentication token. If not provided, the stored token from
		 *     voyent.io.auth.connect() will be used
		 * @param {String} params.host The Voyent Services host url. If not supplied, the last used Voyent host, or the
		 *     default will be used. (optional)
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 * @returns {String} The resource URI
		 */
		createDocument: function(params){
			return new Promise(
				function(resolve, reject) {
					params = params ? params : {};
					v.io.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var collection = validateCollection(params);
					var token = validateAndReturnRequiredAccessToken(params, reject);

					var url = getRealmResourceURL(v.io.docsURL, account, realm,
						collection + '/' + (params.id ? params.id : ''), token, params.ssl);

					v.$.post(url, params.document).then(function(response){
						v.io.auth.updateLastActiveTimestamp();
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
         * @memberOf voyent.io.docs
		 * @alias updateDocument
		 * @param {Object} params params
		 * @param {String} params.collection The name of the document collection.  Defaults to 'documents'.
		 * @param {String} params.id The document id.
		 * @param {Object} params.document The document to be created
		 * @param {String} params.account Voyent Services account name. If not provided, the last known Voyent Account
		 *     will be used.
		 * @param {String} params.realm The Voyent Services realm. If not provided, the last known Voyent Realm name
		 *     will be used.
		 * @param {String} params.accessToken The Voyent authentication token. If not provided, the stored token from
		 *     voyent.io.auth.connect() will be used
		 * @param {String} params.host The Voyent Services host url. If not supplied, the last used Voyent host, or the
		 *     default will be used. (optional)
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 * @returns {String} The resource URI
		 */
		updateDocument: function(params){
			return new Promise(
				function(resolve, reject) {
					params = params ? params : {};
					v.io.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var collection = validateCollection(params);
					var token = validateAndReturnRequiredAccessToken(params, reject);
					validateRequiredId(params, reject);

					var url = getRealmResourceURL(v.io.docsURL, account, realm,
						collection + '/' + params.id, token, params.ssl);

					v.$.put(url, params.document).then(function(){
						v.io.auth.updateLastActiveTimestamp();
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
         * @memberOf voyent.io.docs
		 * @alias getDocument
		 * @param {Object} params params
		 * @param {String} params.collection The name of the document collection.  Defaults to 'documents'.
		 * @param {String} params.id The document id. If not provided, the service will return a new id
		 * @param {String} params.account Voyent Services account name. If not provided, the last known Voyent Account
		 *     will be used.
		 * @param {String} params.realm The Voyent Services realm. If not provided, the last known Voyent Realm name
		 *     will be used.
		 * @param {String} params.accessToken The Voyent authentication token. If not provided, the stored token from
		 *     voyent.io.auth.connect() will be used
		 * @param {String} params.host The Voyent Services host url. If not supplied, the last used Voyent host, or the
		 *     default will be used. (optional)
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 * @returns {Object} The document
		 */
		 getDocument: function(params){
			return new Promise(
				function(resolve, reject) {
					params = params ? params : {};
					v.io.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var collection = validateCollection(params);
					var token = validateAndReturnRequiredAccessToken(params, reject);
					validateRequiredId(params, reject);

					var url = getRealmResourceURL(v.io.docsURL, account, realm,
						collection + '/' + params.id, token, params.ssl);

					v.$.getJSON(url).then(function(doc){
						v.io.auth.updateLastActiveTimestamp();
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
         * @memberOf voyent.io.docs
		 * @alias findDocuments
		 * @param {Object} params params
		 * @param {String} params.collection The name of the document collection.  Defaults to 'documents'.
		 * @param {String} params.account Voyent Services account name. If not provided, the last known Voyent Account
		 *     will be used.
		 * @param {String} params.realm The Voyent Services realm. If not provided, the last known Voyent Realm name
		 *     will be used.
		 * @param {String} params.accessToken The Voyent authentication token. If not provided, the stored token from
		 *     voyent.io.auth.connect() will be used
		 * @param {String} params.host The Voyent Services host url. If not supplied, the last used Voyent host, or the
		 *     default will be used. (optional)
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
					v.io.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var collection = validateCollection(params);
					var token = validateAndReturnRequiredAccessToken(params, reject);

					var url = getRealmResourceURL(v.io.docsURL, account, realm,
						collection, token, params.ssl, {
							'query': params.query ? encodeURIComponent(JSON.stringify(params.query)) : {},
							'fields': params.fields ? encodeURIComponent(JSON.stringify(params.fields)) : {},
							'options': params.options ? encodeURIComponent(JSON.stringify(params.options)) : {}
					});

					v.$.getJSON(url).then(function(doc){
						v.io.auth.updateLastActiveTimestamp();
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
     * Get all document collections
     *
     * @memberOf voyent.io.docs
     * @alias deleteDocument
     * @param {Object} params params
     * @param {String} params.account Voyent Services account name. If not provided, the last known Voyent Account will
     *     be used.
     * @param {String} params.realm The Voyent Services realm. If not provided, the last known Voyent Realm name will
     *     be used.
     * @param {String} params.accessToken The Voyent authentication token. If not provided, the stored token from
     *     voyent.io.auth.connect() will be used
     * @param {String} params.host The Voyent Services host url. If not supplied, the last used Voyent host, or the
     *     default will be used. (optional)
     * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
     */

    getCollections:function(params){
      return new Promise(
        function(resolve, reject) {
          params = params ? params : {};
          v.io.checkHost(params);

          //validate
          var account = validateAndReturnRequiredAccount(params, reject);
          var realm = validateAndReturnRequiredRealm(params, reject);
          var token = validateAndReturnRequiredAccessToken(params, reject);

          var url = getRealmResourceURL(v.io.docsURL, account, realm,
            "collections", token, params.ssl, {

            });

          v.$.getJSON(url).then(function(collections){
            v.io.auth.updateLastActiveTimestamp();
            resolve(collections);
          })['catch'](function(response){
            //service currently returns a 404 when no collections are found
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
         * @memberOf voyent.io.docs
		 * @alias deleteDocument
		 * @param {Object} params params
		 * @param {String} params.collection The name of the document collection.  Defaults to 'documents'.
		 * @param {String} params.id The document id. If not provided, the service will return a new id
		 * @param {String} params.account Voyent Services account name. If not provided, the last known Voyent Account
		 *     will be used.
		 * @param {String} params.realm The Voyent Services realm. If not provided, the last known Voyent Realm name
		 *     will be used.
		 * @param {String} params.accessToken The Voyent authentication token. If not provided, the stored token from
		 *     voyent.io.auth.connect() will be used
		 * @param {String} params.host The Voyent Services host url. If not supplied, the last used Voyent host, or the
		 *     default will be used. (optional)
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 */
		deleteDocument: function(params){
			return new Promise(
				function(resolve, reject) {
					params = params ? params : {};
					v.io.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var collection = validateCollection(params);
					var token = validateAndReturnRequiredAccessToken(params, reject);
					validateRequiredId(params, reject);

					var url = getRealmResourceURL(v.io.docsURL, account, realm,
						collection + '/' + params.id, token, params.ssl);

					v.$.doDelete(url).then(function(response){
						v.io.auth.updateLastActiveTimestamp();
						resolve();
					})['catch'](function(error){
						reject(error);
					});
				}
			);
		},

		getResourcePermissions: function(params){
			params.service = 'docs';
			params.path = 'documents';
			return v.io.getResourcePermissions(params);
		},

		updateResourcePermissions: function(params){
			params.service = 'docs';
			params.path = 'documents';
			return v.io.updateResourcePermissions(params);
		}
	};

	//allow using "documents" for backward compatibility
	v.io.documents = v.io.docs;

    /**
     * @namespace eventhub
     * @memberOf voyent.io
     */
	v.io.eventhub = {
		/**
		 * Create a new event handler
		 *
         * @memberOf voyent.io.eventhub
		 * @alias createHandler
		 * @param {Object} params params
		 * @param {String} params.id The handler id
		 * @param {Object} params.handler The event handler to be created
		 * @param {String} params.account Voyent Services account name. If not provided, the last known Voyent Account
		 *     will be used.
		 * @param {String} params.realm The Voyent Services realm. If not provided, the last known Voyent Realm name
		 *     will be used.
		 * @param {String} params.accessToken The Voyent authentication token. If not provided, the stored token from
		 *     voyent.io.auth.connect() will be used
		 * @param {String} params.host The Voyent Services host url. If not supplied, the last used Voyent host, or the
		 *     default will be used. (optional)
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 * @returns {String} The resource URI
		 */
		createHandler: function(params){
			return new Promise(
				function(resolve, reject) {
					params = params ? params : {};
					v.io.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);
					validateRequiredHandler(params, reject);

					var url = getRealmResourceURL(v.io.eventhubURL, account, realm,
						'handlers/' + (params.id ? params.id : ''), token, params.ssl);

					v.$.post(url, params.handler).then(function(response){
						v.io.auth.updateLastActiveTimestamp();
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
         * @memberOf voyent.io.eventhub
		 * @alias updateHandler
		 * @param {Object} params params
		 * @param {String} params.id The handler id, the event handler to be updated
		 * @param {Object} params.handler The new event handler
		 * @param {String} params.account Voyent Services account name. If not provided, the last known Voyent Account
		 *     will be used.
		 * @param {String} params.realm The Voyent Services realm. If not provided, the last known Voyent Realm name
		 *     will be used.
		 * @param {String} params.accessToken The Voyent authentication token. If not provided, the stored token from
		 *     voyent.io.auth.connect() will be used
		 * @param {String} params.host The Voyent Services host url. If not supplied, the last used Voyent host, or the
		 *     default will be used. (optional)
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 */
		updateHandler: function(params){
			return new Promise(
				function(resolve, reject) {
					params = params ? params : {};
					v.io.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);
					validateRequiredId(params, reject);
					validateRequiredHandler(params, reject);

					var url = getRealmResourceURL(v.io.eventhubURL, account, realm,
						'handlers/' + params.id, token, params.ssl);

					v.$.put(url, params.handler).then(function(){
						v.io.auth.updateLastActiveTimestamp();
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
         * @memberOf voyent.io.eventhub
		 * @alias getHandler
		 * @param {Object} params params
		 * @param {String} params.id The handler id, the event handler to fetch
		 * @param {String} params.account Voyent Services account name. If not provided, the last known Voyent Account
		 *     will be used.
		 * @param {String} params.realm The Voyent Services realm. If not provided, the last known Voyent Realm name
		 *     will be used.
		 * @param {String} params.accessToken The Voyent authentication token. If not provided, the stored token from
		 *     voyent.io.auth.connect() will be used
		 * @param {String} params.host The Voyent Services host url. If not supplied, the last used Voyent host, or the
		 *     default will be used. (optional)
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 * @returns {Object} The event handler
		 */
		getHandler: function(params){
			return new Promise(
				function(resolve, reject) {
					params = params ? params : {};
					v.io.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);
					validateRequiredId(params, reject);

					var url = getRealmResourceURL(v.io.eventhubURL, account, realm,
						'handlers/' + params.id, token, params.ssl);

					v.$.getJSON(url).then(function(handler){
						v.io.auth.updateLastActiveTimestamp();
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
         * @memberOf voyent.io.eventhub
		 * @alias findHandlers
		 * @param {Object} params params
		 * @param {String} params.account Voyent Services account name. If not provided, the last known Voyent Account
		 *     will be used.
		 * @param {String} params.realm The Voyent Services realm. If not provided, the last known Voyent Realm name
		 *     will be used.
		 * @param {String} params.accessToken The Voyent authentication token. If not provided, the stored token from
		 *     voyent.io.auth.connect() will be used
		 * @param {String} params.host The Voyent Services host url. If not supplied, the last used Voyent host, or the
		 *     default will be used. (optional)
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
					v.io.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);

					var url = getRealmResourceURL(v.io.eventhubURL, account, realm,
						'handlers/', token, params.ssl, {
							'query': params.query ? encodeURIComponent(JSON.stringify(params.query)) : {},
							'fields': params.fields ? encodeURIComponent(JSON.stringify(params.fields)) : {},
							'options': params.options ? encodeURIComponent(JSON.stringify(params.options)) : {}
						});

					v.$.getJSON(url).then(function(handlers){
						v.io.auth.updateLastActiveTimestamp();
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
         * @memberOf voyent.io.eventhub
		 * @alias deleteHandler
		 * @param {Object} params params
		 * @param {String} params.id The handler id, the event handler to be deleted
		 * @param {String} params.account Voyent Services account name. If not provided, the last known Voyent Account
		 *     will be used.
		 * @param {String} params.realm The Voyent Services realm. If not provided, the last known Voyent Realm name
		 *     will be used.
		 * @param {String} params.accessToken The Voyent authentication token. If not provided, the stored token from
		 *     voyent.io.auth.connect() will be used
		 * @param {String} params.host The Voyent Services host url. If not supplied, the last used Voyent host, or the
		 *     default will be used. (optional)
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 */
		deleteHandler: function(params){
			return new Promise(
				function(resolve, reject) {
					params = params ? params : {};
					v.io.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);
					validateRequiredId(params, reject);

					var url = getRealmResourceURL(v.io.eventhubURL, account, realm,
						'handlers/' + params.id, token, params.ssl);

					v.$.doDelete(url).then(function(){
						v.io.auth.updateLastActiveTimestamp();
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
         * @memberOf voyent.io.eventhub
		 * @alias deleteHandlers
		 * @param {Object} params params
		 * @param {String} params.account Voyent Services account name. If not provided, the last known Voyent Account
		 *     will be used.
		 * @param {String} params.realm The Voyent Services realm. If not provided, the last known Voyent Realm name
		 *     will be used.
		 * @param {String} params.accessToken The Voyent authentication token. If not provided, the stored token from
		 *     voyent.io.auth.connect() will be used
		 * @param {String} params.host The Voyent Services host url. If not supplied, the last used Voyent host, or the
		 *     default will be used. (optional)
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 * @param {Object} params.query A mongo query for the event handlers
		 * @param {Object} params.fields Specify the inclusion or exclusion of fields to return in the result set
		 * @param {Object} params.options Additional query options such as limit and sort
		 */
		deleteHandlers: function(params){
			return new Promise(
				function(resolve, reject) {
					params = params ? params : {};
					v.io.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);

					var url = getRealmResourceURL(v.io.eventhubURL, account, realm,
						'handlers/', token, params.ssl, {
							'query': params.query ? encodeURIComponent(JSON.stringify(params.query)) : {},
							'fields': params.fields ? encodeURIComponent(JSON.stringify(params.fields)) : {},
							'options': params.options ? encodeURIComponent(JSON.stringify(params.options)) : {}
						});

					v.$.doDelete(url).then(function(){
						v.io.auth.updateLastActiveTimestamp();
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
         * @memberOf voyent.io.eventhub
		 * @alias createRecognizer
		 * @param {Object} params params
		 * @param {String} params.id The recognizer id
		 * @param {Object} params.recognizer The event recognizer to be created
		 * @param {String} params.account Voyent Services account name. If not provided, the last known Voyent Account
		 *     will be used.
		 * @param {String} params.realm The Voyent Services realm. If not provided, the last known Voyent Realm name
		 *     will be used.
		 * @param {String} params.accessToken The Voyent authentication token. If not provided, the stored token from
		 *     voyent.io.auth.connect() will be used
		 * @param {String} params.host The Voyent Services host url. If not supplied, the last used Voyent host, or the
		 *     default will be used. (optional)
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 * @returns {String} The resource URI
		 */
		createRecognizer: function(params) {
			return new Promise(
				function(resolve, reject) {
					params = params ? params : {};
					v.io.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);
					validateRequiredRecognizer(params, reject);

					var url = getRealmResourceURL(v.io.eventhubURL, account, realm,
						'recognizers/' + (params.id ? params.id : ''), token, params.ssl);

					v.$.post(url, params.recognizer).then(function(response) {
						v.io.auth.updateLastActiveTimestamp();
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
         * @memberOf voyent.io.eventhub
		 * @alias updateRecognizer
		 * @param {Object} params params
		 * @param {String} params.id The recognizer id, the event recognizer to be updated
		 * @param {Object} params.recognizer The new event recognizer
		 * @param {String} params.account Voyent Services account name. If not provided, the last known Voyent Account
		 *     will be used.
		 * @param {String} params.realm The Voyent Services realm. If not provided, the last known Voyent Realm name
		 *     will be used.
		 * @param {String} params.accessToken The Voyent authentication token. If not provided, the stored token from
		 *     voyent.io.auth.connect() will be used
		 * @param {String} params.host The Voyent Services host url. If not supplied, the last used Voyent host, or the
		 *     default will be used. (optional)
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 */
		updateRecognizer: function(params) {
			return new Promise(
				function(resolve, reject) {
					params = params ? params : {};
					v.io.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);
					validateRequiredId(params, reject);
					validateRequiredRecognizer(params, reject);

					var url = getRealmResourceURL(v.io.eventhubURL, account, realm,
						'recognizers/' + params.id, token, params.ssl);

					v.$.put(url, params.recognizer).then(function() {
						v.io.auth.updateLastActiveTimestamp();
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
         * @memberOf voyent.io.eventhub
		 * @alias getRecognizer
		 * @param {Object} params params
		 * @param {String} params.id The recognizer id, the event recognizer to fetch
		 * @param {String} params.account Voyent Services account name. If not provided, the last known Voyent Account
		 *     will be used.
		 * @param {String} params.realm The Voyent Services realm. If not provided, the last known Voyent Realm name
		 *     will be used.
		 * @param {String} params.accessToken The Voyent authentication token. If not provided, the stored token from
		 *     voyent.io.auth.connect() will be used
		 * @param {String} params.host The Voyent Services host url. If not supplied, the last used Voyent host, or the
		 *     default will be used. (optional)
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 * @returns {Object} The event recognizer
		 */
		getRecognizer: function(params) {
			return new Promise(
				function(resolve, reject) {
					params = params ? params : {};
					v.io.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);
					validateRequiredId(params, reject);

					var url = getRealmResourceURL(v.io.eventhubURL, account, realm,
						'recognizers/' + params.id, token, params.ssl);

					v.$.getJSON(url).then(function(recognizer) {
						v.io.auth.updateLastActiveTimestamp();
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
         * @memberOf voyent.io.eventhub
		 * @alias findRecognizers
		 * @param {Object} params params
		 * @param {String} params.account Voyent Services account name. If not provided, the last known Voyent Account
		 *     will be used.
		 * @param {String} params.realm The Voyent Services realm. If not provided, the last known Voyent Realm name
		 *     will be used.
		 * @param {String} params.accessToken The Voyent authentication token. If not provided, the stored token from
		 *     voyent.io.auth.connect() will be used
		 * @param {String} params.host The Voyent Services host url. If not supplied, the last used Voyent host, or the
		 *     default will be used. (optional)
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
					v.io.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);

					var url = getRealmResourceURL(v.io.eventhubURL, account, realm,
						'recognizers/', token, params.ssl, {
							'query': params.query ? encodeURIComponent(JSON.stringify(params.query)) : {},
							'fields': params.fields ? encodeURIComponent(JSON.stringify(params.fields)) : {},
							'options': params.options ? encodeURIComponent(JSON.stringify(params.options)) : {}
						});

					v.$.getJSON(url).then(function(recognizers) {
						v.io.auth.updateLastActiveTimestamp();
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
         * @memberOf voyent.io.eventhub
		 * @alias deleteRecognizer
		 * @param {Object} params params
		 * @param {String} params.id The recognizer id, the event recognizer to be deleted
		 * @param {String} params.account Voyent Services account name. If not provided, the last known Voyent Account
		 *     will be used.
		 * @param {String} params.realm The Voyent Services realm. If not provided, the last known Voyent Realm name
		 *     will be used.
		 * @param {String} params.accessToken The Voyent authentication token. If not provided, the stored token from
		 *     voyent.io.auth.connect() will be used
		 * @param {String} params.host The Voyent Services host url. If not supplied, the last used Voyent host, or the
		 *     default will be used. (optional)
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 */
		deleteRecognizer: function(params) {
			return new Promise(
				function(resolve, reject) {
					params = params ? params : {};
					v.io.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);
					validateRequiredId(params, reject);

					var url = getRealmResourceURL(v.io.eventhubURL, account, realm,
						'recognizers/' + params.id, token, params.ssl);

					v.$.doDelete(url).then(function() {
						v.io.auth.updateLastActiveTimestamp();
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
         * @memberOf voyent.io.eventhub
		 * @alias deleteRecognizers
		 * @param {Object} params params
		 * @param {String} params.account Voyent Services account name. If not provided, the last known Voyent Account
		 *     will be used.
		 * @param {String} params.realm The Voyent Services realm. If not provided, the last known Voyent Realm name
		 *     will be used.
		 * @param {String} params.accessToken The Voyent authentication token. If not provided, the stored token from
		 *     voyent.io.auth.connect() will be used
		 * @param {String} params.host The Voyent Services host url. If not supplied, the last used Voyent host, or the
		 *     default will be used. (optional)
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 * @param {Object} params.query A mongo query for the event recognizers
		 * @param {Object} params.fields Specify the inclusion or exclusion of fields to return in the result set
		 * @param {Object} params.options Additional query options such as limit and sort
		 */
		deleteRecognizers: function(params) {
			return new Promise(
				function(resolve, reject) {
					params = params ? params : {};
					v.io.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);

					var url = getRealmResourceURL(v.io.eventhubURL, account, realm,
						'recognizers/', token, params.ssl, {
							'query': params.query ? encodeURIComponent(JSON.stringify(params.query)) : {},
							'fields': params.fields ? encodeURIComponent(JSON.stringify(params.fields)) : {},
							'options': params.options ? encodeURIComponent(JSON.stringify(params.options)) : {}
						});

					v.$.doDelete(url).then(function() {
						v.io.auth.updateLastActiveTimestamp();
						resolve();
					})['catch'](function(error) {
						reject(error);
					});
				}
			);
		},

		getRecognizerResourcePermissions: function(params){
			params.path = 'recognizers';
			return v.io.eventhub.getResourcePermissions(params);
		},

		updateRecognizerResourcePermissions: function(params){
			params.path = 'recognizers';
			return v.io.eventhub.getResourcePermissions(params);
		},

		getHandlerResourcePermissions: function(params){
			params.path = 'handlers';
			return v.io.eventhub.getResourcePermissions(params);
		},

		updateHandlerResourcePermissions: function(params){
			params.path = 'handlers';
			return v.io.eventhub.updateResourcePermissions(params);
		},

		getResourcePermissions: function(params){
			params.service = 'eventhub';
			return v.io.getResourcePermissions(params);
		},

		updateResourcePermissions: function(params){
			params.service = 'eventhub';
			return v.io.updateResourcePermissions(params);
		},
	};

	/* LOCATE SERVICE */
    /**
     * @namespace locate
     * @memberOf voyent.io
     */
	v.io.locate = {

		/**
		 * Create a new region
		 *
         * @memberOf voyent.io.locate
		 * @alias createRegion
		 * @param {Object} params params
		 * @param {String} params.id The region id. If not provided, the service will return a new id
		 * @param {Object} params.region The region geoJSON document that describes the region to be created
		 * @param {String} params.account Voyent Services account name. If not provided, the last known Voyent Account
		 *     will be used.
		 * @param {String} params.realm The Voyent Services realm. If not provided, the last known Voyent Realm name
		 *     will be used.
		 * @param {String} params.accessToken The Voyent authentication token. If not provided, the stored token from
		 *     voyent.io.auth.connect() will be used
		 * @param {String} params.host The Voyent Services host url. If not supplied, the last used Voyent host, or the
		 *     default will be used. (optional)
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 * @returns {String} The resource URI
		 */
		 createRegion: function(params){
			return new Promise(
				function(resolve, reject) {
					params = params ? params : {};
					v.io.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);
					validateRequiredRegion(params, reject);

					var url = getRealmResourceURL(v.io.locateURL, account, realm,
						'regions/' + (params.id ? params.id : ''), token, params.ssl);

					v.$.post(url, params.region).then(function(response){
						v.io.auth.updateLastActiveTimestamp();
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
         * @memberOf voyent.io.locate
		 * @alias updateRegion
		 * @param {Object} params params
		 * @param {String} params.id The region id, the region to be updated
		 * @param {Object} params.region The new region
		 * @param {String} params.account Voyent Services account name. If not provided, the last known Voyent Account
		 *     will be used.
		 * @param {String} params.realm The Voyent Services realm. If not provided, the last known Voyent Realm name
		 *     will be used.
		 * @param {String} params.accessToken The Voyent authentication token. If not provided, the stored token from
		 *     voyent.io.auth.connect() will be used
		 * @param {String} params.host The Voyent Services host url. If not supplied, the last used Voyent host, or the
		 *     default will be used. (optional)
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 */
		updateRegion: function(params){
			return new Promise(
				function(resolve, reject) {
					params = params ? params : {};
					v.io.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);
					validateRequiredId(params, reject);
					validateRequiredRegion(params, reject);

					var url = getRealmResourceURL(v.io.locateURL, account, realm,
							'regions/' + params.id, token, params.ssl);

					v.$.put(url, params.region).then(function(){
						v.io.auth.updateLastActiveTimestamp();
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
         * @memberOf voyent.io.locate
		 * @alias deleteRegion
		 * @param {Object} params params
		 * @param {String} params.id The region id.
		 * @param {String} params.account Voyent Services account name. If not provided, the last known Voyent Account
		 *     will be used.
		 * @param {String} params.realm The Voyent Services realm. If not provided, the last known Voyent Realm name
		 *     will be used.
		 * @param {String} params.accessToken The Voyent authentication token. If not provided, the stored token from
		 *     voyent.io.auth.connect() will be used
		 * @param {String} params.host The Voyent Services host url. If not supplied, the last used Voyent host, or the
		 *     default will be used. (optional)
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 */
		 deleteRegion: function(params){
			return new Promise(
				function(resolve, reject) {
					params = params ? params : {};
					v.io.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);
					validateRequiredId(params, reject);

					var url = getRealmResourceURL(v.io.locateURL, account, realm,
						'regions/' + params.id, token, params.ssl);

					v.$.doDelete(url).then(function(response){
						v.io.auth.updateLastActiveTimestamp();
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
         * @memberOf voyent.io.locate
		 * @alias getAllRegions
		 * @param {Object} params params
		 * @param {String} params.account Voyent Services account name. If not provided, the last known Voyent Account
		 *     will be used.
		 * @param {String} params.realm The Voyent Services realm. If not provided, the last known Voyent Realm name
		 *     will be used.
		 * @param {String} params.accessToken The Voyent authentication token. If not provided, the stored token from
		 *     voyent.io.auth.connect() will be used
		 * @param {String} params.host The Voyent Services host url. If not supplied, the last used Voyent host, or the
		 *     default will be used. (optional)
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 * @returns {Object} The results
		 */
		 getAllRegions: function(params){
			return new Promise(
				function(resolve, reject) {

					params = params ? params : {};
					v.io.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);

					var url = getRealmResourceURL(v.io.locateURL, account, realm,
						'regions', token, params.ssl);

					v.$.getJSON(url).then(function(response){
						v.io.auth.updateLastActiveTimestamp();
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
         * @memberOf voyent.io.locate
		 * @alias findRegions
		 * @param {Object} params params
		 * @param {String} params.account Voyent Services account name. If not provided, the last known Voyent Account
		 *     will be used.
		 * @param {String} params.realm The Voyent Services realm. If not provided, the last known Voyent Realm name
		 *     will be used.
		 * @param {String} params.accessToken The Voyent authentication token. If not provided, the stored token from
		 *     voyent.io.auth.connect() will be used
		 * @param {String} params.host The Voyent Services host url. If not supplied, the last used Voyent host, or the
		 *     default will be used. (optional)
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
					v.io.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);

					var url = getRealmResourceURL(v.io.locateURL, account, realm,
						'regions', token, params.ssl, {
							'query': params.query ? encodeURIComponent(JSON.stringify(params.query)) : {},
							'fields': params.fields ? encodeURIComponent(JSON.stringify(params.fields)) : {},
							'options': params.options ? encodeURIComponent(JSON.stringify(params.options)) : {}
						});

					v.$.getJSON(url).then(function(response){
						v.io.auth.updateLastActiveTimestamp();
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
         * @memberOf voyent.io.locate
		 * @alias findMonitors
		 * @param {Object} params params
		 * @param {String} params.account Voyent Services account name. If not provided, the last known Voyent Account
		 *     will be used.
		 * @param {String} params.realm The Voyent Services realm. If not provided, the last known Voyent Realm name
		 *     will be used.
		 * @param {String} params.accessToken The Voyent authentication token. If not provided, the stored token from
		 *     voyent.io.auth.connect() will be used
		 * @param {String} params.host The Voyent Services host url. If not supplied, the last used Voyent host, or the
		 *     default will be used. (optional)
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
					v.io.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);

					var url = getRealmResourceURL(v.io.locateURL, account, realm,
						'monitors', token, params.ssl, {
							'query': params.query ? encodeURIComponent(JSON.stringify(params.query)) : {},
							'fields': params.fields ? encodeURIComponent(JSON.stringify(params.fields)) : {},
							'options': params.options ? encodeURIComponent(JSON.stringify(params.options)) : {}
						});

					v.$.getJSON(url).then(function(response){
						v.io.auth.updateLastActiveTimestamp();
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
         * @memberOf voyent.io.locate
		 * @alias createMonitor
		 * @param {Object} params params
		 * @param {String} params.id The monitor id. If not provided, the service will return a new id
		 * @param {Object} params.monitor The monitor document that describes the monitor to be created
		 * @param {String} params.account Voyent Services account name. If not provided, the last known Voyent Account
		 *     will be used.
		 * @param {String} params.realm The Voyent Services realm. If not provided, the last known Voyent Realm name
		 *     will be used.
		 * @param {String} params.accessToken The Voyent authentication token. If not provided, the stored token from
		 *     voyent.io.auth.connect() will be used
		 * @param {String} params.host The Voyent Services host url. If not supplied, the last used Voyent host, or the
		 *     default will be used. (optional)
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 * @returns {String} The resource URI
		 */
		 createMonitor: function(params){
			return new Promise(
				function(resolve, reject) {
					params = params ? params : {};
					v.io.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);
					validateRequiredMonitor(params, reject);

					var url = getRealmResourceURL(v.io.locateURL, account, realm,
						'monitors' + (params.id ? '/' + params.id : ''), token, params.ssl);

					v.$.post(url, params.monitor).then(function(response){
						v.io.auth.updateLastActiveTimestamp();
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
         * @memberOf voyent.io.locate
		 * @alias deleteMonitor
		 * @param {Object} params params
		 * @param {String} params.id The region id.
		 * @param {String} params.account Voyent Services account name. If not provided, the last known Voyent Account
		 *     will be used.
		 * @param {String} params.realm The Voyent Services realm. If not provided, the last known Voyent Realm name
		 *     will be used.
		 * @param {String} params.accessToken The Voyent authentication token. If not provided, the stored token from
		 *     voyent.io.auth.connect() will be used
		 * @param {String} params.host The Voyent Services host url. If not supplied, the last used Voyent host, or the
		 *     default will be used. (optional)
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 */
		 deleteMonitor: function(params){
			return new Promise(
				function(resolve, reject) {
					params = params ? params : {};
					v.io.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);
					validateRequiredId(params, reject);

					var url = getRealmResourceURL(v.io.locateURL, account, realm,
						'monitors/' + params.id, token, params.ssl);

					v.$.doDelete(url).then(function(response){
						v.io.auth.updateLastActiveTimestamp();
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
         * @memberOf voyent.io.locate
		 * @alias getAllMonitors
		 * @param {Object} params params
		 * @param {String} params.account Voyent Services account name. If not provided, the last known Voyent Account
		 *     will be used.
		 * @param {String} params.realm The Voyent Services realm. If not provided, the last known Voyent Realm name
		 *     will be used.
		 * @param {String} params.accessToken The Voyent authentication token. If not provided, the stored token from
		 *     voyent.io.auth.connect() will be used
		 * @param {String} params.host The Voyent Services host url. If not supplied, the last used Voyent host, or the
		 *     default will be used. (optional)
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 * @returns {Object} The results
		 */
		 getAllMonitors: function(params){
			return new Promise(
				function(resolve, reject) {
					params = params ? params : {};
					v.io.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);

					var url = getRealmResourceURL(v.io.locateURL, account, realm,
						'monitors', token, params.ssl);

					v.$.getJSON(url).then(function(response){
						v.io.auth.updateLastActiveTimestamp();
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
         * @memberOf voyent.io.locate
		 * @alias createPOI
		 * @param {Object} params params
		 * @param {String} params.id The POI id. If not provided, the service will return a new id
		 * @param {Object} params.poi The POI document that describes the POI to be created
		 * @param {String} params.account Voyent Services account name. If not provided, the last known Voyent Account
		 *     will be used.
		 * @param {String} params.realm The Voyent Services realm. If not provided, the last known Voyent Realm name
		 *     will be used.
		 * @param {String} params.accessToken The Voyent authentication token. If not provided, the stored token from
		 *     voyent.io.auth.connect() will be used
		 * @param {String} params.host The Voyent Services host url. If not supplied, the last used Voyent host, or the
		 *     default will be used. (optional)
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 * @returns {String} The resource URI
		 */
		 createPOI: function(params){
			return new Promise(
				function(resolve, reject) {
					params = params ? params : {};
					v.io.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);
					validateRequiredPOI(params, reject);

					var url = getRealmResourceURL(v.io.locateURL, account, realm,
						'poi' + (params.id ? '/' + params.id : ''), token, params.ssl);

					v.$.post(url, params.poi).then(function(response){
						v.io.auth.updateLastActiveTimestamp();
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
         * @memberOf voyent.io.locate
		 * @alias updatePOI
		 * @param {Object} params params
		 * @param {String} params.id The poi id, the poi to be updated
		 * @param {Object} params.poi The new poi
		 * @param {String} params.account Voyent Services account name. If not provided, the last known Voyent Account
		 *     will be used.
		 * @param {String} params.realm The Voyent Services realm. If not provided, the last known Voyent Realm name
		 *     will be used.
		 * @param {String} params.accessToken The Voyent authentication token. If not provided, the stored token from
		 *     voyent.io.auth.connect() will be used
		 * @param {String} params.host The Voyent Services host url. If not supplied, the last used Voyent host, or the
		 *     default will be used. (optional)
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 */
		updatePOI: function(params){
			return new Promise(
				function(resolve, reject) {
					params = params ? params : {};
					v.io.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);
					validateRequiredId(params, reject);
					validateRequiredPOI(params, reject);

					var url = getRealmResourceURL(v.io.locateURL, account, realm,
							'poi/' + params.id, token, params.ssl);

					v.$.put(url, params.poi).then(function(){
						v.io.auth.updateLastActiveTimestamp();
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
         * @memberOf voyent.io.locate
		 * @alias findPOIs
		 * @param {Object} params params
		 * @param {String} params.account Voyent Services account name. If not provided, the last known Voyent Account
		 *     will be used.
		 * @param {String} params.realm The Voyent Services realm. If not provided, the last known Voyent Realm name
		 *     will be used.
		 * @param {String} params.accessToken The Voyent authentication token. If not provided, the stored token from
		 *     voyent.io.auth.connect() will be used
		 * @param {String} params.host The Voyent Services host url. If not supplied, the last used Voyent host, or the
		 *     default will be used. (optional)
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
					v.io.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);

					var url = getRealmResourceURL(v.io.locateURL, account, realm,
						'poi', token, params.ssl, {
							'query': params.query ? encodeURIComponent(JSON.stringify(params.query)) : {},
							'fields': params.fields ? encodeURIComponent(JSON.stringify(params.fields)) : {},
							'options': params.options ? encodeURIComponent(JSON.stringify(params.options)) : {}
						});

					v.$.getJSON(url).then(function(response){
						v.io.auth.updateLastActiveTimestamp();
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
         * @memberOf voyent.io.locate
		 * @alias deletePOI
		 * @param {Object} params params
		 * @param {String} params.id The POI id.
		 * @param {String} params.account Voyent Services account name. If not provided, the last known Voyent Account
		 *     will be used.
		 * @param {String} params.realm The Voyent Services realm. If not provided, the last known Voyent Realm name
		 *     will be used.
		 * @param {String} params.accessToken The Voyent authentication token. If not provided, the stored token from
		 *     voyent.io.auth.connect() will be used
		 * @param {String} params.host The Voyent Services host url. If not supplied, the last used Voyent host, or the
		 *     default will be used. (optional)
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 */
		 deletePOI: function(params){
			return new Promise(
				function(resolve, reject) {
					params = params ? params : {};
					v.io.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);
					validateRequiredId(params, reject);

					var url = getRealmResourceURL(v.io.locateURL, account, realm,
						'poi/' + params.id, token, params.ssl);

					v.$.doDelete(url).then(function(response){
						v.io.auth.updateLastActiveTimestamp();
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
         * @memberOf voyent.io.locate
		 * @alias getAllPOIs
		 * @param {Object} params params
		 * @param {String} params.account Voyent Services account name. If not provided, the last known Voyent Account
		 *     will be used.
		 * @param {String} params.realm The Voyent Services realm. If not provided, the last known Voyent Realm name
		 *     will be used.
		 * @param {String} params.accessToken The Voyent authentication token. If not provided, the stored token from
		 *     voyent.io.auth.connect() will be used
		 * @param {String} params.host The Voyent Services host url. If not supplied, the last used Voyent host, or the
		 *     default will be used. (optional)
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 * @returns {Object} The results
		 */
		 getAllPOIs: function(params){
			return new Promise(
				function(resolve, reject) {
					params = params ? params : {};
					v.io.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);

					var url = getRealmResourceURL(v.io.locateURL, account, realm,
						'poi', token, params.ssl);

					v.$.getJSON(url).then(function(response){
						v.io.auth.updateLastActiveTimestamp();
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
         * @memberOf voyent.io.locate
		 * @alias findLocations
		 * @param {Object} params params
		 * @param {String} params.account Voyent Services account name. If not provided, the last known Voyent Account
		 *     will be used.
		 * @param {String} params.realm The Voyent Services realm. If not provided, the last known Voyent Realm name
		 *     will be used.
		 * @param {String} params.accessToken The Voyent authentication token. If not provided, the stored token from
		 *     voyent.io.auth.connect() will be used
		 * @param {String} params.host The Voyent Services host url. If not supplied, the last used Voyent host, or the
		 *     default will be used. (optional)
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
					v.io.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);

					var url = getRealmResourceURL(v.io.locateURL, account, realm,
						'locations', token, params.ssl, {
							'query': params.query ? encodeURIComponent(JSON.stringify(params.query)) : {},
							'fields': params.fields ? encodeURIComponent(JSON.stringify(params.fields)) : {},
							'options': params.options ? encodeURIComponent(JSON.stringify(params.options)) : {}
						});

					v.$.getJSON(url).then(function(response){
						v.io.auth.updateLastActiveTimestamp();
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
         * @memberOf voyent.io.locate
		 * @alias updateLocation
		 * @param {Object} params params
		 * @param {String} params.account Voyent Services account name. If not provided, the last known Voyent Account
		 *     will be used.
		 * @param {String} params.realm The Voyent Services realm. If not provided, the last known Voyent Realm name
		 *     will be used.
		 * @param {String} params.accessToken The Voyent authentication token. If not provided, the stored token from
		 *     voyent.io.auth.connect() will be used
		 * @param {String} params.host The Voyent Services host url. If not supplied, the last used Voyent host, or the
		 *     default will be used. (optional)
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 * @param {Object} params.location The location
		 */
		 updateLocation: function(params){
			return new Promise(
				function(resolve, reject) {
					params = params ? params : {};
					v.io.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);
					validateRequiredLocation(params, reject);

					var url = getRealmResourceURL(v.io.locateURL, account, realm,
						'locations', token, params.ssl);

					v.$.post(url, params.location).then(function(response){
						v.io.auth.updateLastActiveTimestamp();
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
         * @memberOf voyent.io.locate
		 * @alias updateLocationCoordinates
		 * @param {Object} params params
		 * @param {String} params.account Voyent Services account name. If not provided, the last known Voyent Account
		 *     will be used.
		 * @param {String} params.realm The Voyent Services realm. If not provided, the last known Voyent Realm name
		 *     will be used.
		 * @param {String} params.accessToken The Voyent authentication token. If not provided, the stored token from
		 *     voyent.io.auth.connect() will be used
		 * @param {String} params.host The Voyent Services host url. If not supplied, the last used Voyent host, or the
		 *     default will be used. (optional)
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 * @param {Number} params.latitude The location latitude
		 * @param {Number} params.longitude The location longitude
		 * @param {String} params.label An optional label
		 */
		 updateLocationCoordinates: function(params){
			return new Promise(
				function(resolve, reject) {
					params = params ? params : {};
					v.io.checkHost(params);

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

					var url = getRealmResourceURL(v.io.locateURL, account, realm,
						'locations', token, params.ssl);

					v.$.post(url, location).then(function(response){
						v.io.auth.updateLastActiveTimestamp();
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
         * @memberOf voyent.io.locate
		 * @alias getLastUserLocation
		 * @param {Object} params params
		 * @param {String} params.account Voyent Services account name. If not provided, the last known Voyent Account
		 *     will be used.
		 * @param {String} params.realm The Voyent Services realm. If not provided, the last known Voyent Realm name
		 *     will be used.
		 * @param {String} params.accessToken The Voyent authentication token. If not provided, the stored token from
		 *     voyent.io.auth.connect() will be used
		 * @param {String} params.host The Voyent Services host url. If not supplied, the last used Voyent host, or the
		 *     default will be used. (optional)
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 * @param {String} params.username
		 * @returns {Object} The single result, if any, of the user location.
		 http://dev.voyent.cloud/locate/bsrtests/realms/test/locations
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
					v.io.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);
					validateRequiredUsername(params, reject);

					var url = getRealmResourceURL(v.io.locateURL, account, realm,
						'locations/', token, params.ssl, {
							"query":{"username":params.username},
							"options": {"sort":{"lastUpdated":-1},"limit":1}
						});

					v.$.getJSON(url).then(function(response){
						v.io.auth.updateLastActiveTimestamp();
						resolve(response[0] || null);
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

		/**
		 * Create a new tracker
		 *
         * @memberOf voyent.io.location
		 * @alias createTracker
		 * @param {Object} params params
		 * @param {String} params.id The tracker id. If not provided, the service will return a new id
		 * @param {Object} params.tracker The tracker geoJSON document that describes the tracker to be created
		 * @param {String} params.account Voyent Services account name. If not provided, the last known Voyent Account
		 *     will be used.
		 * @param {String} params.realm The Voyent Services realm. If not provided, the last known Voyent Realm name
		 *     will be used.
		 * @param {String} params.accessToken The Voyent authentication token. If not provided, the stored token from
		 *     voyent.io.auth.connect() will be used
		 * @param {String} params.host The Voyent Services host url. If not supplied, the last used Voyent host, or the
		 *     default will be used. (optional)
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 * @returns {String} The resource URI
		 */
		 createTracker: function(params){
			return new Promise(
				function(resolve, reject) {
					params = params ? params : {};
					v.io.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);
					validateRequiredTracker(params, reject);

					var url = getRealmResourceURL(v.io.locateURL, account, realm,
						'trackers/' + (params.id ? params.id : ''), token, params.ssl);

					v.$.post(url, params.tracker).then(function(response){
						v.io.auth.updateLastActiveTimestamp();
						resolve(response.uri);
					})['catch'](function(error){
						reject(error);
					});
				}
			);
		},

		/**
		 * Update a tracker
		 *
         * @memberOf voyent.io.location
		 * @alias updateTracker
		 * @param {Object} params params
		 * @param {String} params.id The tracker id, the tracker to be updated
		 * @param {Object} params.tracker The new tracker
		 * @param {String} params.account Voyent Services account name. If not provided, the last known Voyent Account
		 *     will be used.
		 * @param {String} params.realm The Voyent Services realm. If not provided, the last known Voyent Realm name
		 *     will be used.
		 * @param {String} params.accessToken The Voyent authentication token. If not provided, the stored token from
		 *     voyent.io.auth.connect() will be used
		 * @param {String} params.host The Voyent Services host url. If not supplied, the last used Voyent host, or the
		 *     default will be used. (optional)
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 */
		updateTracker: function(params){
			return new Promise(
				function(resolve, reject) {
					params = params ? params : {};
					v.io.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);
					validateRequiredId(params, reject);
					validateRequiredTracker(params, reject);

					var url = getRealmResourceURL(v.io.locateURL, account, realm,
							'trackers/' + params.id, token, params.ssl);

					v.$.put(url, params.tracker).then(function(){
						v.io.auth.updateLastActiveTimestamp();
						resolve();
					})['catch'](function(error){
						reject(error);
					});
				}
			);
		},

		/**
		 * Delete a tracker
		 *
         * @memberOf voyent.io.location
		 * @alias deleteTracker
		 * @param {Object} params params
		 * @param {String} params.id The tracker id.
		 * @param {String} params.account Voyent Services account name. If not provided, the last known Voyent Account
		 *     will be used.
		 * @param {String} params.realm The Voyent Services realm. If not provided, the last known Voyent Realm name
		 *     will be used.
		 * @param {String} params.accessToken The Voyent authentication token. If not provided, the stored token from
		 *     voyent.io.auth.connect() will be used
		 * @param {String} params.host The Voyent Services host url. If not supplied, the last used Voyent host, or the
		 *     default will be used. (optional)
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 */
		 deleteTracker: function(params){
			return new Promise(
				function(resolve, reject) {
					params = params ? params : {};
					v.io.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);
					validateRequiredId(params, reject);

					var url = getRealmResourceURL(v.io.locateURL, account, realm,
						'trackers/' + params.id, token, params.ssl);

					v.$.doDelete(url).then(function(response){
						v.io.auth.updateLastActiveTimestamp();
						resolve();
					})['catch'](function(error){
						reject(error);
					});
				}
			);
		},

		/**
		 * Delete a tracker instance
		 *
		 * @memberOf voyent.io.location
		 * @alias deleteTrackerInstance
		 * @param {Object} params params
         * @param {String} params.id The id of the tracker template that the instance was created from.
		 * @param {String} params.zoneNamespace The tracker instance name.
		 * @param {String} params.account Voyent Services account name. If not provided, the last known Voyent Account
		 *     will be used.
		 * @param {String} params.realm The Voyent Services realm. If not provided, the last known Voyent Realm name
		 *     will be used.
		 * @param {String} params.accessToken The Voyent authentication token. If not provided, the stored token from
		 *     voyent.io.auth.connect() will be used
		 * @param {String} params.host The Voyent Services host url. If not supplied, the last used Voyent host, or the
		 *     default will be used. (optional)
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 */
		deleteTrackerInstance: function(params){
			return new Promise(
				function(resolve, reject) {
					params = params ? params : {};
					v.io.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);
                    validateRequiredId(params, reject);
					validateRequiredZoneNamespace(params, reject);

					var url = getRealmResourceURL(v.io.locateURL, account, realm,
						'trackers/instances/' + params.id+'.'+params.zoneNamespace, token, params.ssl);

					v.$.doDelete(url).then(function(response){
						v.io.auth.updateLastActiveTimestamp();
						resolve();
					})['catch'](function(error){
						reject(error);
					});
				}
			);
		},

		/**
		 * Searches for Tracker in a realm based on a query
		 *
         * @memberOf voyent.io.location
		 * @alias findTracker
		 * @param {Object} params params
		 * @param {String} params.account Voyent Services account name. If not provided, the last known Voyent Account
		 *     will be used.
		 * @param {String} params.realm The Voyent Services realm. If not provided, the last known Voyent Realm name
		 *     will be used.
		 * @param {String} params.accessToken The Voyent authentication token. If not provided, the stored token from
		 *     voyent.io.auth.connect() will be used
		 * @param {String} params.host The Voyent Services host url. If not supplied, the last used Voyent host, or the
		 *     default will be used. (optional)
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 * @param {Object} params.query A mongo query for the points of interest
		 * @param {Object} params.fields Specify the inclusion or exclusion of fields to return in the result set
		 * @param {Object} params.options Additional query options such as limit and sort
		 * @returns {Object} The results
		 */
		 findTracker: function(params){
			return new Promise(
				function(resolve, reject) {
					params = params ? params : {};
					v.io.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);

					var url = getRealmResourceURL(v.io.locateURL, account, realm,
						'tracker', token, params.ssl, {
							'query': params.query ? encodeURIComponent(JSON.stringify(params.query)) : {},
							'fields': params.fields ? encodeURIComponent(JSON.stringify(params.fields)) : {},
							'options': params.options ? encodeURIComponent(JSON.stringify(params.options)) : {}
						});

					v.$.getJSON(url).then(function(response){
						v.io.auth.updateLastActiveTimestamp();
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
		 * Fetches all saved Trackers for the realm
		 *
         * @memberOf voyent.io.location
		 * @alias getAllTrackers
		 * @param {Object} params params
		 * @param {String} params.account Voyent Services account name. If not provided, the last known Voyent Account
		 *     will be used.
		 * @param {String} params.realm The Voyent Services realm. If not provided, the last known Voyent Realm name
		 *     will be used.
		 * @param {String} params.accessToken The Voyent authentication token. If not provided, the stored token from
		 *     voyent.io.auth.connect() will be used
		 * @param {String} params.host The Voyent Services host url. If not supplied, the last used Voyent host, or the
		 *     default will be used. (optional)
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 * @returns {Object} The results
		 */
		 getAllTrackers: function(params){
			return new Promise(
				function(resolve, reject) {
					params = params ? params : {};
					v.io.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);

					var url = getRealmResourceURL(v.io.locateURL, account, realm,
						'trackers/', token, params.ssl);

					v.$.getJSON(url).then(function(response){
						v.io.auth.updateLastActiveTimestamp();
						resolve(response);
					})['catch'](function(error){
						reject(error);
					});
				}
			);
		},

		/**
		 * Update the location of a tracker.
		 *
		 * @memberOf voyent.io.locate
		 * @alias updateTrackerLocation
		 * @param {Object} params params
		 * @param {String} params.id The tracker id
		 * @param {Object} params.location The location, must include location.properties.trackerId and location.properties.zoneNamespace.
		 * @param {String} params.account Voyent Services account name. If not provided, the last known Voyent Account
		 *     will be used.
		 * @param {String} params.realm The Voyent Services realm. If not provided, the last known Voyent Realm name
		 *     will be used.
		 * @param {String} params.accessToken The Voyent authentication token. If not provided, the stored token from
		 *     voyent.io.auth.connect() will be used
		 * @param {String} params.host The Voyent Services host url. If not supplied, the last used Voyent host, or the
		 *     default will be used. (optional)
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 */
		updateTrackerLocation: function(params){
			return new Promise(
				function(resolve, reject) {
					params = params ? params : {};
					v.io.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);
					validateRequiredLocation(params, reject);
					validateRequiredProperties(params, reject);
					params.location.location.type = "Feature"; //make sure we have the type set

					var url = getRealmResourceURL(v.io.locateURL, account, realm,
						'locations', token, params.ssl);

					v.$.post(url, params.location).then(function(response){
						v.io.auth.updateLastActiveTimestamp();
						resolve(response);
					})['catch'](function(error){
						reject(error);
					});
				}
			);
		},

		getRegionResourcePermissions: function(params){
			params.path = 'regions';
			return v.io.locate.getResourcePermissions(params);
		},

		updateRegionResourcePermissions: function(params){
			params.path = 'regions';
			return v.io.locate.getResourcePermissions(params);
		},

		getPOIResourcePermissions: function(params){
			params.path = 'poi';
			return v.io.locate.getResourcePermissions(params);
		},

		updatePOIResourcePermissions: function(params){
			params.path = 'poi';
			return v.io.locate.updateResourcePermissions(params);
		},

		getResourcePermissions: function(params){
			params.service = 'locate';
			return v.io.getResourcePermissions(params);
		},

		updateResourcePermissions: function(params){
			params.service = 'locate';
			return v.io.updateResourcePermissions(params);
		}
	};

	//allow using "location" for backward compatibility
	v.io.location = v.io.locate;

    /**
     * @namespace mailbox
     * @memberOf voyent.io
     */
    v.io.mailbox = {
        /**
         * Create one or more messages for one or more users.
         *
         * @memberOf voyent.io.mailbox
         * @alias createMultiUserMessages
         * @param {Object} params params
         * @param {Array} params.messages The message(s) to be created.
         * @param {String} params.account Voyent Services account name. If not provided, the last known Voyent Account
         * will be used.
         * @param {String} params.realm The Voyent Services realm. If not provided, the last known Voyent Realm name
         * will be used.
         * @param {String} params.accessToken The Voyent authentication token. If not provided, the stored token from
         * voyent.io.auth.connect() will be used.
         * @param {String} params.host The Voyent Services host url. If not provided, the last used Voyent host, or the
         * default will be used.
         * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
         * @returns {String} The resource URI(s).
         */
        createMultiUserMessages: function (params) {
            return new Promise(
                function (resolve, reject) {
                    params = params ? params : {};
                    v.io.checkHost(params);

                    //validate
                    var account = validateAndReturnRequiredAccount(params, reject);
                    var realm = validateAndReturnRequiredRealm(params, reject);
                    var token = validateAndReturnRequiredAccessToken(params, reject);
                    validateRequiredMessages(params, reject);

                    var url = getRealmResourceURL(v.io.mailboxURL, account, realm,
                        'mailboxes', token, params.ssl);

                    v.$.post(url, params.messages).then(function (response) {
                        v.io.auth.updateLastActiveTimestamp();
                        resolve(response.uris);
                    })['catch'](function (error) {
                        reject(error);
                    });

                }
            );
        },

        /**
         * Create one or more messages for a specific user.
         *
         * @memberOf voyent.io.mailbox
         * @alias createMessages
         * @param {Object} params params
         * @param {Array} params.messages The message(s) to be created.
         * @param {String} params.username The user to create the message(s) for.
         * @param {String} params.account Voyent Services account name. If not provided, the last known Voyent Account
         * will be used.
         * @param {String} params.realm The Voyent Services realm. If not provided, the last known Voyent Realm name
         * will be used.
         * @param {String} params.accessToken The Voyent authentication token. If not provided, the stored token from
         * voyent.io.auth.connect() will be used.
         * @param {String} params.host The Voyent Services host url. If not provided, the last used Voyent host, or the
         * default will be used.
         * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
         * @returns {String} The resource URI(s).
         */
        createMessages: function (params) {
            return new Promise(
                function (resolve, reject) {
                    params = params ? params : {};
                    v.io.checkHost(params);

                    //validate
                    var account = validateAndReturnRequiredAccount(params, reject);
                    var realm = validateAndReturnRequiredRealm(params, reject);
                    var token = validateAndReturnRequiredAccessToken(params, reject);
                    validateRequiredMessages(params, reject);
                    validateRequiredUsername(params, reject);

                    var url = getRealmResourceURL(v.io.mailboxURL, account, realm,
                        'mailboxes/' + params.username + '/messages', token, params.ssl);

                    v.$.post(url, params.messages).then(function (response) {
                        v.io.auth.updateLastActiveTimestamp();
                        resolve(response.uris);
                    })['catch'](function (error) {
                        reject(error);
                    });

                }
            );
        },

        /**
         * Retrieve a single specific message for a specific user.
         *
         * @memberOf voyent.io.mailbox
         * @alias getMessage
         * @param {Object} params params
         * @param {String} params.id The message id, the message to fetch.
         * @param {String} params.username The user to create the message(s) for.
         * @param {String} params.account Voyent Services account name. If not provided, the last known Voyent Account
         * will be used.
         * @param {String} params.realm The Voyent Services realm. If not provided, the last known Voyent Realm name
         * will be used.
         * @param {String} params.accessToken The Voyent authentication token. If not provided, the stored token from
         * voyent.io.auth.connect() will be used.
         * @param {String} params.host The Voyent Services host url. If not provided, the last used Voyent host, or the
         * default will be used.
         * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
         * @returns {Object} The message.
         */
        getMessage: function (params) {
            return new Promise(
                function (resolve, reject) {
                    params = params ? params : {};
                    v.io.checkHost(params);

                    //validate
                    var account = validateAndReturnRequiredAccount(params, reject);
                    var realm = validateAndReturnRequiredRealm(params, reject);
                    var token = validateAndReturnRequiredAccessToken(params, reject);
                    validateRequiredId(params, reject);
                    validateRequiredUsername(params, reject);

                    var url = getRealmResourceURL(v.io.mailboxURL, account, realm,
                        'mailboxes/'+params.username+'/messages/'+params.id, token, params.ssl);

                    v.$.getJSON(url).then(function (message) {
                        v.io.auth.updateLastActiveTimestamp();
                        resolve(message);
                    })['catch'](function (error) {
                        reject(error);
                    });
                }
            );
        },

        /**
         * Retrieve messages for a specific user based on the results returned from query parameters. Optionally include
         * a type property to further refine the search.
         *
         * @memberOf voyent.io.mailbox
         * @alias findMessages
         * @param {Object} params params
         * @param {String} params.username The user to find message(s) for.
         * @param {String} params.type The type of messages to get. Valid options are "read" or "unread". Not required.
         * @param {Object} params.query A mongo query for the messages.
         * @param {Object} params.fields Specify the inclusion or exclusion of fields to return in the result set.
         * @param {Object} params.options Additional query options such as limit and sort.
         * @param {String} params.account Voyent Services account name. If not provided, the last known Voyent Account
         * will be used.
         * @param {String} params.realm The Voyent Services realm. If not provided, the last known Voyent Realm name
         * will be used.
         * @param {String} params.accessToken The Voyent authentication token. If not provided, the stored token from
         * voyent.io.auth.connect() will be used.
         * @param {String} params.host The Voyent Services host url. If not provided, the last used Voyent host, or the
         * default will be used.
         * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
         * @returns {Object} The results.
         */
        findMessages: function (params) {
            return new Promise(
                function (resolve, reject) {

                    params = params ? params : {};
                    v.io.checkHost(params);

                    //validate
                    var account = validateAndReturnRequiredAccount(params, reject);
                    var realm = validateAndReturnRequiredRealm(params, reject);
                    var token = validateAndReturnRequiredAccessToken(params, reject);
                    validateRequiredUsername(params, reject);

                    var url = getRealmResourceURL(v.io.mailboxURL, account, realm,
                        'mailboxes/'+params.username+'/messages'+(params.type ? ('/type/'+params.type) : ''),
                        token, params.ssl, {
                            'query': params.query ? encodeURIComponent(JSON.stringify(params.query)) : {},
                            'fields': params.fields ? encodeURIComponent(JSON.stringify(params.fields)) : {},
                            'options': params.options ? encodeURIComponent(JSON.stringify(params.options)) : {}
                        });

                    v.$.getJSON(url).then(function (messages) {
                        v.io.auth.updateLastActiveTimestamp();
                        resolve(messages);
                    })['catch'](function (response) {
                        reject(response);
                    });

                }
            );
        },

        /**
         * Remove a single specific message for a specific user.
         *
         * @memberOf voyent.io.mailbox
         * @alias deleteMessage
         * @param {Object} params params
         * @param {String} params.id The message id, the message to delete.
         * @param {String} params.username The user to create the message(s) for.
         * @param {String} params.account Voyent Services account name. If not provided, the last known Voyent Account
         * will be used.
         * @param {String} params.realm The Voyent Services realm. If not provided, the last known Voyent Realm name
         * will be used.
         * @param {String} params.accessToken The Voyent authentication token. If not provided, the stored token from
         * voyent.io.auth.connect() will be used.
         * @param {String} params.host The Voyent Services host url. If not provided, the last used Voyent host, or the
         * default will be used.
         * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
         */
        deleteMessage: function (params) {
            return new Promise(
                function (resolve, reject) {
                    params = params ? params : {};
                    v.io.checkHost(params);

                    //validate
                    var account = validateAndReturnRequiredAccount(params, reject);
                    var realm = validateAndReturnRequiredRealm(params, reject);
                    var token = validateAndReturnRequiredAccessToken(params, reject);
                    validateRequiredId(params, reject);
                    validateRequiredUsername(params, reject);

                    var url = getRealmResourceURL(v.io.mailboxURL, account, realm,
                        'mailboxes/'+params.username+'/messages/'+params.id, token, params.ssl);

                    v.$.doDelete(url).then(function () {
                        v.io.auth.updateLastActiveTimestamp();
                        resolve();
                    })['catch'](function (error) {
                        reject(error);
                    });
                }
            );
        },

        /**
         * Remove messages for a specific user based on the results returned from query parameters. Optionally include a
         * type property to further refine the search.
         *
         * @memberOf voyent.io.mailbox
         * @alias deleteMessages
         * @param {Object} params params
         * @param {String} params.username The user to find message(s) for.
         * @param {String} params.type The type of messages to get. Valid options are "read" or "unread". Not required.
         * @param {Object} params.query A mongo query for the messages.
         * @param {Object} params.fields Specify the inclusion or exclusion of fields to return in the result set.
         * @param {Object} params.options Additional query options such as limit and sort.
         * @param {String} params.account Voyent Services account name. If not provided, the last known Voyent Account
         * will be used.
         * @param {String} params.realm The Voyent Services realm. If not provided, the last known Voyent Realm name
         * will be used.
         * @param {String} params.accessToken The Voyent authentication token. If not provided, the stored token from
         * voyent.io.auth.connect() will be used.
         * @param {String} params.host The Voyent Services host url. If not provided, the last used Voyent host, or the
         * default will be used.
         * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
         * @returns {Object} The results
         */
        deleteMessages: function (params) {
            return new Promise(
                function (resolve, reject) {

                    params = params ? params : {};
                    v.io.checkHost(params);

                    //validate
                    var account = validateAndReturnRequiredAccount(params, reject);
                    var realm = validateAndReturnRequiredRealm(params, reject);
                    var token = validateAndReturnRequiredAccessToken(params, reject);
                    validateRequiredUsername(params, reject);

                    var url = getRealmResourceURL(v.io.mailboxURL, account, realm,
                        'mailboxes/'+params.username+'/messages'+(params.type ? ('/type/'+params.type) : ''),
                        token, params.ssl, {
                            'query': params.query ? encodeURIComponent(JSON.stringify(params.query)) : {},
                            'fields': params.fields ? encodeURIComponent(JSON.stringify(params.fields)) : {},
                            'options': params.options ? encodeURIComponent(JSON.stringify(params.options)) : {}
                        });

                    v.$.doDelete(url).then(function () {
                        v.io.auth.updateLastActiveTimestamp();
                        resolve();
                    })['catch'](function (error) {
                        reject(error);
                    });
                }
            );
        },

        /**
         * Retrieve the configuration options for this service.
         *
         * @memberOf voyent.io.mailbox
         * @alias getConfig
         * @param {Object} params params
         * @param {String} params.account Voyent Services account name. If not provided, the last known Voyent Account
         * will be used.
         * @param {String} params.realm The Voyent Services realm. If not provided, the last known Voyent Realm name
         * will be used.
         * @param {String} params.accessToken The Voyent authentication token. If not provided, the stored token from
         * voyent.io.auth.connect() will be used.
         * @param {String} params.host The Voyent Services host url. If not provided, the last used Voyent host, or the
         * default will be used.
         * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
         * @returns {Object} The config
         */
        getConfig: function (params) {
            return new Promise(
                function (resolve, reject) {
                    params = params ? params : {};
                    v.io.checkHost(params);

                    //validate
                    var account = validateAndReturnRequiredAccount(params, reject);
                    var realm = validateAndReturnRequiredRealm(params, reject);
                    var token = validateAndReturnRequiredAccessToken(params, reject);

                    var url = getRealmResourceURL(v.io.mailboxURL, account, realm,
                        'config', token, params.ssl);

                    v.$.getJSON(url).then(function (config) {
                        v.io.auth.updateLastActiveTimestamp();
                        resolve(config);
                    })['catch'](function (error) {
                        reject(error);
                    });
                }
            );
        },

        /**
         * Update the configuration options for this service.
         *
         * @memberOf voyent.io.mailbox
         * @alias updateConfig
         * @param {Object} params params
         * @param {Object} params.config The new config.
         * @param {String} params.account Voyent Services account name. If not provided, the last known Voyent Account
         * will be used.
         * @param {String} params.realm The Voyent Services realm. If not provided, the last known Voyent Realm name
         * will be used.
         * @param {String} params.accessToken The Voyent authentication token. If not provided, the stored token from
         * voyent.io.auth.connect() will be used.
         * @param {String} params.host The Voyent Services host url. If not provided, the last used Voyent host, or the
         * default will be used.
         * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
         */
        updateConfig: function(params){
            return new Promise(
                function(resolve, reject) {
                    params = params ? params : {};
                    v.io.checkHost(params);

                    //validate
                    var account = validateAndReturnRequiredAccount(params, reject);
                    var realm = validateAndReturnRequiredRealm(params, reject);
                    var token = validateAndReturnRequiredAccessToken(params, reject);
                    validateRequiredConfig(params, reject);

                    var url = getRealmResourceURL(v.io.mailboxURL, account, realm,
                        'config', token, params.ssl);

                    v.$.put(url, params.config).then(function(){
                        v.io.auth.updateLastActiveTimestamp();
                        resolve();
                    })['catch'](function(error){
                        reject(error);
                    });
                }
            );
        },

        getMailboxResourcePermissions: function(params){
            if (!params.username || params.username.length === 0) {
                return;
            }
            params.path = 'mailboxes/'+params.username+'/messages';
            return v.io.mailbox.getResourcePermissions(params);
        },

        updateMailboxResourcePermissions: function(params){
            if (!params.username || params.username.length === 0) {
                return;
            }
            params.path = 'mailboxes/'+params.username+'/messages';
            return v.io.mailbox.getResourcePermissions(params);
        },

        getConfigResourcePermissions: function(params){
            params.path = 'config';
            return v.io.mailbox.getResourcePermissions(params);
        },

        updateConfigResourcePermissions: function(params){
            params.path = 'config';
            return v.io.mailbox.getResourcePermissions(params);
        },

        getResourcePermissions: function(params){
            params.service = 'mailbox';
            return v.io.getResourcePermissions(params);
        },

        updateResourcePermissions: function(params){
            params.service = 'mailbox';
            return v.io.updateResourcePermissions(params);
        }
    };

	/**
	 * @namespace scope
	 * @memberOf voyent.io
	 */
	v.io.scope = {
		/**
		 * Create or update data stored within a realm scope.
		 *
		 * @memberOf voyent.io.scope
		 * @alias createRealmData
		 * @param {Object} params params
		 * @param {Object} params.data The object containing one or more properties to be inserted into the realm scope.
		 * @param {String} params.account Voyent Services account name. If not provided, the last known Voyent Account
		 * will be used.
		 * @param {String} params.realm The Voyent Services realm. If not provided, the last known Voyent Realm name
		 * will be used.
		 * @param {String} params.accessToken The Voyent authentication token. If not provided, the stored token from
		 * voyent.io.auth.connect() will be used.
		 * @param {String} params.host The Voyent Services host url. If not provided, the last used Voyent host, or the
		 * default will be used.
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 * @returns {String} The resource URI.
		 */
		createRealmData: function(params) {
			return new Promise(
				function (resolve, reject) {
					params = params ? params : {};
					v.io.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);
					validateRequiredData(params, reject);

					var url = getRealmResourceURL(v.io.scopeURL, account, realm,
						'scopes/realm', token, params.ssl);

					v.$.post(url, params.data).then(function (response) {
						v.io.auth.updateLastActiveTimestamp();
						resolve(response.uri);
					})['catch'](function (error) {
						reject(error);
					});
				}
			);
		},

		/**
		 * Retrieve a single property stored in realm scope or the entire realm scope if no property is provided.
		 *
		 * @memberOf voyent.io.scope
		 * @alias getRealmData
		 * @param {Object} params params
		 * @param {String} params.property The name of the data property to retrieve from realm scope. If not provided,
		 * all data for the scope will be retrieved.
		 * @param {String} params.account Voyent Services account name. If not provided, the last known Voyent Account
		 * will be used.
		 * @param {String} params.realm The Voyent Services realm. If not provided, the last known Voyent Realm name
		 * will be used.
		 * @param {String} params.accessToken The Voyent authentication token. If not provided, the stored token from
		 * voyent.io.auth.connect() will be used.
		 * @param {String} params.host The Voyent Services host url. If not provided, the last used Voyent host, or the
		 * default will be used.
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 * @returns {Object} The scoped data.
		 */
		getRealmData: function(params) {
			return new Promise(
				function (resolve, reject) {
					params = params ? params : {};
					v.io.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);

					var queryParams = {};
					if (params.property) {
						queryParams[params.property] = '';
					}

					var url = getRealmResourceURL(v.io.scopeURL, account, realm,
						'scopes/realm', token, params.ssl, queryParams);

					v.$.getJSON(url).then(function (data) {
						v.io.auth.updateLastActiveTimestamp();
						resolve(data);
					})['catch'](function (error) {
						reject(error);
					});
				}
			);
		},

		/**
		 * Delete a single property stored in realm scope.
		 *
		 * @memberOf voyent.io.scope
		 * @alias deleteRealmData
		 * @param {Object} params params
		 * @param {String} params.property The name of the data property to delete from realm scope. Required.
		 * @param {String} params.account Voyent Services account name. If not provided, the last known Voyent Account
		 * will be used.
		 * @param {String} params.realm The Voyent Services realm. If not provided, the last known Voyent Realm name
		 * will be used.
		 * @param {String} params.accessToken The Voyent authentication token. If not provided, the stored token from
		 * voyent.io.auth.connect() will be used.
		 * @param {String} params.host The Voyent Services host url. If not provided, the last used Voyent host, or the
		 * default will be used.
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 */
		deleteRealmData: function(params) {
			return new Promise(
				function (resolve, reject) {
					params = params ? params : {};
					v.io.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);
					validateRequiredProperty(params, reject);

					var queryParams = {};
					queryParams[params.property] = '';

					var url = getRealmResourceURL(v.io.scopeURL, account, realm,
						'scopes/realm', token, params.ssl, queryParams);

					v.$.doDelete(url).then(function () {
						v.io.auth.updateLastActiveTimestamp();
						resolve();
					})['catch'](function (error) {
						reject(error);
					});
				}
			);
		},

		/**
		 * Delete an entire realm scope and all of it's data. Use with care, this action cannot be undone.
		 *
		 * @memberOf voyent.io.scope
		 * @alias deleteRealmScope
		 * @param {Object} params params
		 * @param {String} params.account Voyent Services account name. If not provided, the last known Voyent Account
		 * will be used.
		 * @param {String} params.realm The Voyent Services realm. If not provided, the last known Voyent Realm name
		 * will be used.
		 * @param {String} params.accessToken The Voyent authentication token. If not provided, the stored token from
		 * voyent.io.auth.connect() will be used.
		 * @param {String} params.host The Voyent Services host url. If not provided, the last used Voyent host, or the
		 * default will be used.
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 */
		deleteRealmScope: function(params) {
			return new Promise(
				function (resolve, reject) {
					params = params ? params : {};
					v.io.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);

					var queryParams = {"_invalidate":''};

					var url = getRealmResourceURL(v.io.scopeURL, account, realm,
						'scopes/realm', token, params.ssl, queryParams);

					v.$.doDelete(url).then(function () {
						v.io.auth.updateLastActiveTimestamp();
						resolve();
					})['catch'](function (error) {
						reject(error);
					});
				}
			);
		},

		/**
		 * Create or update data stored within a user scope.
		 *
		 * @memberOf voyent.io.scope
		 * @alias createUserData
		 * @param {Object} params params
		 * @param {Object} params.id The user id, the user scope to create data in.
		 * @param {Object} params.data The object containing one or more properties to be inserted into the user scope.
		 * @param {String} params.account Voyent Services account name. If not provided, the last known Voyent Account
		 * will be used.
		 * @param {String} params.realm The Voyent Services realm. If not provided, the last known Voyent Realm name
		 * will be used.
		 * @param {String} params.accessToken The Voyent authentication token. If not provided, the stored token from
		 * voyent.io.auth.connect() will be used.
		 * @param {String} params.host The Voyent Services host url. If not provided, the last used Voyent host, or the
		 * default will be used.
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 * @returns {String} The resource URI.
		 */
		createUserData: function(params) {
			return new Promise(
				function (resolve, reject) {
					params = params ? params : {};
					v.io.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);
					validateRequiredId(params, reject);
					validateRequiredData(params, reject);

					var url = getRealmResourceURL(v.io.scopeURL, account, realm,
						'scopes/user/' + params.id, token, params.ssl);

					v.$.post(url, params.data).then(function (response) {
						v.io.auth.updateLastActiveTimestamp();
						resolve(response.uri);
					})['catch'](function (error) {
						reject(error);
					});
				}
			);
		},

		/**
		 * Retrieve a single property stored in user scope or the entire user scope if no property is provided.
		 *
		 * @memberOf voyent.io.scope
		 * @alias getUserData
		 * @param {Object} params params
		 * @param {Object} params.id The user id, the user scope to get data from.
		 * @param {String} params.property The name of the data property to retrieve from user scope. If not provided,
		 * all data for the scope will be retrieved.
		 * @param {String} params.account Voyent Services account name. If not provided, the last known Voyent Account
		 * will be used.
		 * @param {String} params.realm The Voyent Services realm. If not provided, the last known Voyent Realm name
		 * will be used.
		 * @param {String} params.accessToken The Voyent authentication token. If not provided, the stored token from
		 * voyent.io.auth.connect() will be used.
		 * @param {String} params.host The Voyent Services host url. If not provided, the last used Voyent host, or the
		 * default will be used.
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 * @returns {Object} The scoped data.
		 */
		getUserData: function(params) {
			return new Promise(
				function (resolve, reject) {
					params = params ? params : {};
					v.io.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);
					validateRequiredId(params, reject);

					var queryParams = {};
					if (params.property) {
						queryParams[params.property] = '';
					}

					var url = getRealmResourceURL(v.io.scopeURL, account, realm,
						'scopes/user/' + params.id, token, params.ssl, queryParams);

					v.$.getJSON(url).then(function (data) {
						v.io.auth.updateLastActiveTimestamp();
						resolve(data);
					})['catch'](function (error) {
						reject(error);
					});
				}
			);
		},

		/**
		 * Delete a single property stored in user scope.
		 *
		 * @memberOf voyent.io.scope
		 * @alias deleteUserData
		 * @param {Object} params params
		 * @param {Object} params.id The user id, the user scope to delete data from.
		 * @param {String} params.property The name of the data property to delete from user scope. Required.
		 * @param {String} params.account Voyent Services account name. If not provided, the last known Voyent Account
		 * will be used.
		 * @param {String} params.realm The Voyent Services realm. If not provided, the last known Voyent Realm name
		 * will be used.
		 * @param {String} params.accessToken The Voyent authentication token. If not provided, the stored token from
		 * voyent.io.auth.connect() will be used.
		 * @param {String} params.host The Voyent Services host url. If not provided, the last used Voyent host, or the
		 * default will be used.
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 */
		deleteUserData: function(params) {
			return new Promise(
				function (resolve, reject) {
					params = params ? params : {};
					v.io.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);
					validateRequiredId(params, reject);
					validateRequiredProperty(params, reject);

					var queryParams = {};
					queryParams[params.property] = '';

					var url = getRealmResourceURL(v.io.scopeURL, account, realm,
						'scopes/user/' + params.id, token, params.ssl, queryParams);

					v.$.doDelete(url).then(function () {
						v.io.auth.updateLastActiveTimestamp();
						resolve();
					})['catch'](function (error) {
						reject(error);
					});
				}
			);
		},

		/**
		 * Delete an entire user scope and all of it's data. Use with care, this action cannot be undone.
		 *
		 * @memberOf voyent.io.scope
		 * @alias deleteUserScope
		 * @param {Object} params params
		 * @param {Object} params.id The user id, the user scope to delete.
		 * @param {String} params.account Voyent Services account name. If not provided, the last known Voyent Account
		 * will be used.
		 * @param {String} params.realm The Voyent Services realm. If not provided, the last known Voyent Realm name
		 * will be used.
		 * @param {String} params.accessToken The Voyent authentication token. If not provided, the stored token from
		 * voyent.io.auth.connect() will be used.
		 * @param {String} params.host The Voyent Services host url. If not provided, the last used Voyent host, or the
		 * default will be used.
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 */
		deleteUserScope: function(params) {
			return new Promise(
				function (resolve, reject) {
					params = params ? params : {};
					v.io.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);
					validateRequiredId(params, reject);

					var queryParams = {"_invalidate":''};

					var url = getRealmResourceURL(v.io.scopeURL, account, realm,
						'scopes/user/' + params.id, token, params.ssl, queryParams);

					v.$.doDelete(url).then(function () {
						v.io.auth.updateLastActiveTimestamp();
						resolve();
					})['catch'](function (error) {
						reject(error);
					});
				}
			);
		},

		/**
		 * Create or update data stored within a process scope.
		 *
		 * @memberOf voyent.io.scope
		 * @alias createProcessData
		 * @param {Object} params params
		 * @param {Object} params.id The process id, the process scope to create data in.
		 * @param {Object} params.data The object containing one or more properties to be inserted into the process
		 * scope.
		 * @param {String} params.account Voyent Services account name. If not provided, the last known Voyent Account
		 * will be used.
		 * @param {String} params.realm The Voyent Services realm. If not provided, the last known Voyent Realm name
		 * will be used.
		 * @param {String} params.accessToken The Voyent authentication token. If not provided, the stored token from
		 * voyent.io.auth.connect() will be used.
		 * @param {String} params.host The Voyent Services host url. If not provided, the last used Voyent host, or the
		 * default will be used.
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 * @returns {String} The resource URI.
		 */
		createProcessData: function(params) {
			return new Promise(
				function (resolve, reject) {
					params = params ? params : {};
					v.io.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);
					validateRequiredId(params, reject);
					validateRequiredData(params, reject);

					var url = getRealmResourceURL(v.io.scopeURL, account, realm,
						'scopes/process/' + params.id, token, params.ssl);

					v.$.post(url, params.data).then(function (response) {
						v.io.auth.updateLastActiveTimestamp();
						resolve(response.uri);
					})['catch'](function (error) {
						reject(error);
					});
				}
			);
		},

		/**
		 * Retrieve a single property stored in process scope or the entire process scope if no property is provided.
		 *
		 * @memberOf voyent.io.scope
		 * @alias getProcessData
		 * @param {Object} params params
		 * @param {Object} params.id The process id, the process scope to get data from.
		 * @param {String} params.property The name of the data property to retrieve from process scope. If not
		 * provided, all data for the scope will be retrieved.
		 * @param {String} params.account Voyent Services account name. If not provided, the last known Voyent Account
		 * will be used.
		 * @param {String} params.realm The Voyent Services realm. If not provided, the last known Voyent Realm name
		 * will be used.
		 * @param {String} params.accessToken The Voyent authentication token. If not provided, the stored token from
		 * voyent.io.auth.connect() will be used.
		 * @param {String} params.host The Voyent Services host url. If not provided, the last used Voyent host, or the
		 * default will be used.
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 * @returns {Object} The scoped data.
		 */
		getProcessData: function(params) {
			return new Promise(
				function (resolve, reject) {
					params = params ? params : {};
					v.io.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);
					validateRequiredId(params, reject);

					var queryParams = {};
					if (params.property) {
						queryParams[params.property] = '';
					}

					var url = getRealmResourceURL(v.io.scopeURL, account, realm,
						'scopes/process/' + params.id, token, params.ssl, queryParams);

					v.$.getJSON(url).then(function (data) {
						v.io.auth.updateLastActiveTimestamp();
						resolve(data);
					})['catch'](function (error) {
						reject(error);
					});
				}
			);
		},

		/**
		 * Delete a single property stored in process scope.
		 *
		 * @memberOf voyent.io.scope
		 * @alias deleteProcessData
		 * @param {Object} params params
		 * @param {Object} params.id The process id, the process scope to delete data from.
		 * @param {String} params.property The name of the data property to delete from process scope. Required.
		 * @param {String} params.account Voyent Services account name. If not provided, the last known Voyent Account
		 * will be used.
		 * @param {String} params.realm The Voyent Services realm. If not provided, the last known Voyent Realm name
		 * will be used.
		 * @param {String} params.accessToken The Voyent authentication token. If not provided, the stored token from
		 * voyent.io.auth.connect() will be used.
		 * @param {String} params.host The Voyent Services host url. If not provided, the last used Voyent host, or the
		 * default will be used.
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 */
		deleteProcessData: function(params) {
			return new Promise(
				function (resolve, reject) {
					params = params ? params : {};
					v.io.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);
					validateRequiredId(params, reject);
					validateRequiredProperty(params, reject);

					var queryParams = {};
					queryParams[params.property] = '';

					var url = getRealmResourceURL(v.io.scopeURL, account, realm,
						'scopes/process/' + params.id, token, params.ssl, queryParams);

					v.$.doDelete(url).then(function () {
						v.io.auth.updateLastActiveTimestamp();
						resolve();
					})['catch'](function (error) {
						reject(error);
					});
				}
			);
		},

		/**
		 * Delete an entire process scope and all of it's data. Use with care, this action cannot be undone.
		 *
		 * @memberOf voyent.io.scope
		 * @alias deleteProcessScope
		 * @param {Object} params params
		 * @param {Object} params.id The process id, the process scope to delete.
		 * @param {String} params.account Voyent Services account name. If not provided, the last known Voyent Account
		 * will be used.
		 * @param {String} params.realm The Voyent Services realm. If not provided, the last known Voyent Realm name
		 * will be used.
		 * @param {String} params.accessToken The Voyent authentication token. If not provided, the stored token from
		 * voyent.io.auth.connect() will be used.
		 * @param {String} params.host The Voyent Services host url. If not provided, the last used Voyent host, or the
		 * default will be used.
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 */
		deleteProcessScope: function(params) {
			return new Promise(
				function (resolve, reject) {
					params = params ? params : {};
					v.io.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);
					validateRequiredId(params, reject);

					var queryParams = {"_invalidate":''};

					var url = getRealmResourceURL(v.io.scopeURL, account, realm,
						'scopes/process/' + params.id, token, params.ssl, queryParams);

					v.$.doDelete(url).then(function () {
						v.io.auth.updateLastActiveTimestamp();
						resolve();
					})['catch'](function (error) {
						reject(error);
					});
				}
			);
		},

		/**
		 * Create or update data stored within a transaction scope.
		 *
		 * @memberOf voyent.io.scope
		 * @alias createTransactionData
		 * @param {Object} params params
		 * @param {Object} params.id The transaction id, the transaction scope to create data in.
		 * @param {Object} params.data The object containing one or more properties to be inserted into the transaction
		 * scope.
		 * @param {String} params.account Voyent Services account name. If not provided, the last known Voyent Account
		 * will be used.
		 * @param {String} params.realm The Voyent Services realm. If not provided, the last known Voyent Realm name
		 * will be used.
		 * @param {String} params.accessToken The Voyent authentication token. If not provided, the stored token from
		 * voyent.io.auth.connect() will be used.
		 * @param {String} params.host The Voyent Services host url. If not provided, the last used Voyent host, or the
		 * default will be used.
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 * @returns {String} The resource URI.
		 */
		createTransactionData: function(params) {
			return new Promise(
				function (resolve, reject) {
					params = params ? params : {};
					v.io.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);
					validateRequiredId(params, reject);
					validateRequiredData(params, reject);

					var url = getRealmResourceURL(v.io.scopeURL, account, realm,
						'scopes/transaction/' + params.id, token, params.ssl);

					v.$.post(url, params.data).then(function (response) {
						v.io.auth.updateLastActiveTimestamp();
						resolve(response.uri);
					})['catch'](function (error) {
						reject(error);
					});
				}
			);
		},

		/**
		 * Retrieve a single property stored in transaction scope or the entire transaction scope if no property is
		 * provided.
		 *
		 * @memberOf voyent.io.scope
		 * @alias getTransactionData
		 * @param {Object} params params
		 * @param {Object} params.id The transaction id, the transaction scope to get data from.
		 * @param {String} params.property The name of the data property to retrieve from transaction scope. If not
		 * provided, all data for the scope will be retrieved.
		 * @param {String} params.account Voyent Services account name. If not provided, the last known Voyent Account
		 * will be used.
		 * @param {String} params.realm The Voyent Services realm. If not provided, the last known Voyent Realm name
		 * will be used.
		 * @param {String} params.accessToken The Voyent authentication token. If not provided, the stored token from
		 * voyent.io.auth.connect() will be used.
		 * @param {String} params.host The Voyent Services host url. If not provided, the last used Voyent host, or the
		 * default will be used.
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 * @returns {Object} The scoped data.
		 */
		getTransactionData: function(params) {
			return new Promise(
				function (resolve, reject) {
					params = params ? params : {};
					v.io.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);
					validateRequiredId(params, reject);

					var queryParams = {};
					if (params.property) {
						queryParams[params.property] = '';
					}

					var url = getRealmResourceURL(v.io.scopeURL, account, realm,
						'scopes/transaction/' + params.id, token, params.ssl, queryParams);

					v.$.getJSON(url).then(function (data) {
						v.io.auth.updateLastActiveTimestamp();
						resolve(data);
					})['catch'](function (error) {
						reject(error);
					});
				}
			);
		},

		/**
		 * Delete a single property stored in transaction scope.
		 *
		 * @memberOf voyent.io.scope
		 * @alias deleteTransactionData
		 * @param {Object} params params
		 * @param {Object} params.id The transaction id, the transaction scope to delete data from.
		 * @param {String} params.property The name of the data property to delete from transaction scope. Required.
		 * @param {String} params.account Voyent Services account name. If not provided, the last known Voyent Account
		 * will be used.
		 * @param {String} params.realm The Voyent Services realm. If not provided, the last known Voyent Realm name
		 * will be used.
		 * @param {String} params.accessToken The Voyent authentication token. If not provided, the stored token from
		 * voyent.io.auth.connect() will be used.
		 * @param {String} params.host The Voyent Services host url. If not provided, the last used Voyent host, or the
		 * default will be used.
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 */
		deleteTransactionData: function(params) {
			return new Promise(
				function (resolve, reject) {
					params = params ? params : {};
					v.io.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);
					validateRequiredId(params, reject);
					validateRequiredProperty(params, reject);

					var queryParams = {};
					queryParams[params.property] = '';

					var url = getRealmResourceURL(v.io.scopeURL, account, realm,
						'scopes/transaction/' + params.id, token, params.ssl, queryParams);

					v.$.doDelete(url).then(function () {
						v.io.auth.updateLastActiveTimestamp();
						resolve();
					})['catch'](function (error) {
						reject(error);
					});
				}
			);
		},

		/**
		 * Delete an entire transaction scope and all of it's data. Use with care, this action cannot be undone.
		 *
		 * @memberOf voyent.io.scope
		 * @alias deleteTransactionScope
		 * @param {Object} params params
		 * @param {Object} params.id The transaction id, the transaction scope to delete.
		 * @param {String} params.account Voyent Services account name. If not provided, the last known Voyent Account
		 * will be used.
		 * @param {String} params.realm The Voyent Services realm. If not provided, the last known Voyent Realm name
		 * will be used.
		 * @param {String} params.accessToken The Voyent authentication token. If not provided, the stored token from
		 * voyent.io.auth.connect() will be used.
		 * @param {String} params.host The Voyent Services host url. If not provided, the last used Voyent host, or the
		 * default will be used.
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 */
		deleteTransactionScope: function(params) {
			return new Promise(
				function (resolve, reject) {
					params = params ? params : {};
					v.io.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);
					validateRequiredId(params, reject);

					var queryParams = {"_invalidate":''};

					var url = getRealmResourceURL(v.io.scopeURL, account, realm,
						'scopes/transaction/' + params.id, token, params.ssl, queryParams);

					v.$.doDelete(url).then(function () {
						v.io.auth.updateLastActiveTimestamp();
						resolve();
					})['catch'](function (error) {
						reject(error);
					});
				}
			);
		},

		/**
		 * Touch a transaction scope. Touching a scope updates the last accessed time without changing anything else.
		 *
		 * @memberOf voyent.io.scope
		 * @alias touchTransactionScope
		 * @param {Object} params params
		 * @param {String} params.id The transaction id, the transaction scope to touch.
		 * @param {String} params.account Voyent Services account name. If not provided, the last known Voyent Account
		 * will be used.
		 * @param {String} params.realm The Voyent Services realm. If not provided, the last known Voyent Realm name
		 * will be used.
		 * @param {String} params.accessToken The Voyent authentication token. If not provided, the stored token from
		 * voyent.io.auth.connect() will be used.
		 * @param {String} params.host The Voyent Services host url. If not provided, the last used Voyent host, or the
		 * default will be used.
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 */
		touchTransactionScope: function(params) {
			return new Promise(
				function (resolve, reject) {
					params = params ? params : {};
					v.io.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);
					validateRequiredId(params, reject);

					var url = getRealmResourceURL(v.io.scopeURL, account, realm,
						'scopes/transaction/' + params.id, token, params.ssl);

					v.$.put(url).then(function(){
						v.io.auth.updateLastActiveTimestamp();
						resolve();
					})['catch'](function(error){
						reject(error);
					});
				}
			);
		}
	};

	/* METRICS SERVICE. Left in for backwards-compatibility. */
    /**
     * @namespace metrics
     * @memberOf voyent.io
     */
	v.io.metrics = {

		/**
		 * Searches for events in a realm based on a query
		 *
         * @memberOf voyent.io.metrics
		 * @alias findEvents
		 * @param {Object} params params
		 * @param {String} params.account Voyent Services account name. If not provided, the last known Voyent Account
		 *     will be used.
		 * @param {String} params.realm The Voyent Services realm. If not provided, the last known Voyent Realm name
		 *     will be used.
		 * @param {String} params.accessToken The Voyent authentication token. If not provided, the stored token from
		 *     voyent.io.auth.connect() will be used
		 * @param {String} params.host The Voyent Services host url. If not supplied, the last used Voyent host, or the
		 *     default will be used. (optional)
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
					v.io.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);

					var url = getRealmResourceURL(v.io.eventURL, account, realm,
						'events', token, params.ssl, {
							'query': params.query ? encodeURIComponent(JSON.stringify(params.query)) : {},
							'fields': params.fields ? encodeURIComponent(JSON.stringify(params.fields)) : {},
							'options': params.options ? encodeURIComponent(JSON.stringify(params.options)) : {}
						});

					v.$.getJSON(url).then(function(events){
						v.io.auth.updateLastActiveTimestamp();
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
         * @memberOf voyent.io.metrics
		 * @alias createCustomEvent
		 * @param {Object} params params
		 * @param {String} params.account Voyent Services account name. If not provided, the last known Voyent Account
		 *     will be used.
		 * @param {String} params.realm The Voyent Services realm. If not provided, the last known Voyent Realm name
		 *     will be used.
		 * @param {String} params.accessToken The Voyent authentication token. If not provided, the stored token from
		 *     voyent.io.auth.connect() will be used
		 * @param {String} params.host The Voyent Services host url. If not supplied, the last used Voyent host, or the
		 *     default will be used. (optional)
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 * @param {Object} params.event The custom event that you would like to store, in JSON format.
		 * @returns {String} The resource URI
		 */
		createCustomEvent: function(params){
			return new Promise(
				function(resolve, reject) {
					params = params ? params : {};
					v.io.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);
					validateRequiredEvent(params, reject);

					var url = getRealmResourceURL(v.io.eventURL, account, realm,
						'events', token, params.ssl);

					v.$.post(url, params.event).then(function(response){
						v.io.auth.updateLastActiveTimestamp();
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
		 * Useful for displaying accurate live metrics views. The time difference is returned as client time - server
		 * time.
		 *
         * @memberOf voyent.io.metrics
		 * @alias getClientServerTimeGap
		 * @param {Object} params params
		 * @param {String} params.account Voyent Services account name. If not provided, the last known Voyent Account
		 *     will be used.
		 * @param {String} params.realm The Voyent Services realm. If not provided, the last known Voyent Realm name
		 *     will be used.
		 * @param {String} params.accessToken The Voyent authentication token. If not provided, the stored token from
		 *     voyent.io.auth.connect() will be used
		 * @param {String} params.host The Voyent Services host url. If not supplied, the last used Voyent host, or the
		 *     default will be used. (optional)
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 * @returns {Number} The time difference in milliseconds
		 */
		 getClientServerTimeGap: function(params){
			return new Promise(
				function(resolve, reject) {
					params = params ? params : {};
					v.io.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);

					var url = getRealmResourceURL(v.io.eventURL, account, realm,
						'time', token, params.ssl, {
							clientTime: encodeURIComponent(new Date().toISOString())
						});

					v.$.getJSON(url).then(function(response){
						if( response.timeOffset){
							v.io.auth.updateLastActiveTimestamp();
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
    /**
     * @namespace event
     * @memberOf voyent.io
     */
	v.io.event = {

		/**
		 * Searches for events in a realm based on a query
		 *
         * @memberOf voyent.io.event
		 * @alias findEvents
		 * @param {Object} params params
		 * @param {String} params.account Voyent Services account name. If not provided, the last known Voyent Account
		 *     will be used.
		 * @param {String} params.realm The Voyent Services realm. If not provided, the last known Voyent Realm name
		 *     will be used.
		 * @param {String} params.accessToken The Voyent authentication token. If not provided, the stored token from
		 *     voyent.io.auth.connect() will be used
		 * @param {String} params.host The Voyent Services host url. If not supplied, the last used Voyent host, or the
		 *     default will be used. (optional)
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
					v.io.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);

					var url = getRealmResourceURL(v.io.eventURL, account, realm,
						'events', token, params.ssl, {
							'query': params.query ? encodeURIComponent(JSON.stringify(params.query)) : {},
							'fields': params.fields ? encodeURIComponent(JSON.stringify(params.fields)) : {},
							'options': params.options ? encodeURIComponent(JSON.stringify(params.options)) : {}
						});

					v.$.getJSON(url).then(function(events){
						v.io.auth.updateLastActiveTimestamp();
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
         * @memberOf voyent.io.event
		 * @alias createCustomEvent
		 * @param {Object} params params
		 * @param {String} params.account Voyent Services account name. If not provided, the last known Voyent Account
		 *     will be used.
		 * @param {String} params.realm The Voyent Services realm. If not provided, the last known Voyent Realm name
		 *     will be used.
		 * @param {String} params.accessToken The Voyent authentication token. If not provided, the stored token from
		 *     voyent.io.auth.connect() will be used
		 * @param {String} params.host The Voyent Services host url. If not supplied, the last used Voyent host, or the
		 *     default will be used. (optional)
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 * @param {Object} params.event The custom event that you would like to store, in JSON format.
		 * @returns {String} The resource URI
		 */
		createCustomEvent: function(params){
			return new Promise(
				function(resolve, reject) {
					params = params ? params : {};
					v.io.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);
					validateRequiredEvent(params, reject);

					var url = getRealmResourceURL(v.io.eventURL, account, realm,
						'events', token, params.ssl);

					v.$.post(url, params.event).then(function(response){
						v.io.auth.updateLastActiveTimestamp();
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
     * @memberOf voyent.io.event
     * @alias createCustomEvents.
     * @param {Object} params params
     * @param {String} params.account Voyent Services account name. If not provided, the last known Voyent Account will
     *     be used.
     * @param {String} params.realm The Voyent Services realm. If not provided, the last known Voyent Realm name will
     *     be used.
     * @param {String} params.accessToken The Voyent authentication token. If not provided, the stored token from
     *     voyent.io.auth.connect() will be used
     * @param {String} params.host The Voyent Services host url. If not supplied, the last used Voyent host, or the
     *     default will be used. (optional)
     * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
     * @param {Object} params.eventArray An array of events that you want to fire. Events should include a 'delay'
     *     property, with the number of milliseconds to wait since the last event before firing.
     */

    createCustomEvents: function(params){
      return new Promise(
        function(resolve, reject) {
          params = params ? params : {};
          v.io.checkHost(params);

          //validate
          var account = validateAndReturnRequiredAccount(params, reject);
          var realm = validateAndReturnRequiredRealm(params, reject);
          var token = validateAndReturnRequiredAccessToken(params, reject);
          //validateRequiredEvent(params, reject);
          //validateEventArray(params, reject);
          var url = getRealmResourceURL(v.io.eventURL, account, realm,
            'events', token, params.ssl);

          eventArray = params.eventArray;
          eventsRunning = true;
          runningIndex += 1;
          eventIndex=0;
          v.io.event._eventRecursion(resolve,reject,url,params.ssl,runningIndex);
        }
      );
    },
    /**
     * Convenience method to reduce code-reuse.
     */
    _eventRecursion: function(resolve,reject,url,ssl,index){
		//if no url is provided then generate the URL using the latest account/realm/token
		if (!url) {
			url = getRealmResourceURL(v.io.eventURL, v.io.auth.getLastKnownAccount(), v.io.auth.getLastKnownRealm(),
				'events', v.io.auth.getLastAccessToken(), !!ssl);
		}
       if(index === runningIndex) {
          setTimeout(function () {
            if(index === runningIndex) {
              var date = new Date();
              v.$.post(url, eventArray[eventIndex]).then(function (response) {
                v.io.auth.updateLastActiveTimestamp();
                if (eventIndex === eventArray.length - 1) {
                  resolve();
                }
                else {
                  eventIndex += 1;
                  v.io.event._eventRecursion(resolve, reject, null, ssl, index);
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
     * @memberOf voyent.io.event
     * @alias stopEvents.
     */
    stopEvents: function(){
      eventsRunning = false;
      runningIndex += 1;
    },


    /**
     * Restart a previously paused event array
     *
     * @memberOf voyent.io.event
     * @alias restartEvents.
     * @param {Object} params params
     * @param {String} params.account Voyent Services account name. If not provided, the last known Voyent Account will
     *     be used.
     * @param {String} params.realm The Voyent Services realm. If not provided, the last known Voyent Realm name will
     *     be used.
     * @param {String} params.accessToken The Voyent authentication token. If not provided, the stored token from
     *     voyent.io.auth.connect() will be used
     * @param {String} params.host The Voyent Services host url. If not supplied, the last used Voyent host, or the
     *     default will be used. (optional)
     * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
     */
    restartEvents:function(params){
      eventsRunning = true;
      return new Promise(
        function(resolve, reject) {
          params = params ? params : {};
          v.io.checkHost(params);

          //validate
          var account = validateAndReturnRequiredAccount(params, reject);
          var realm = validateAndReturnRequiredRealm(params, reject);
          var token = validateAndReturnRequiredAccessToken(params, reject);
          //validateRequiredEvent(params, reject);
          //validateEventArray(params, reject);
          var url = getRealmResourceURL(v.io.eventURL, account, realm,
            'events', token, params.ssl);
          v.io.event._eventRecursion(resolve,reject,url,params.ssl,runningIndex);
        }
      );
    },

    /**
     * Convenience method for getting the total number of events being process
     *
     * @memberOf voyent.io.event
     * @alias getEventsSize.
     */
    getEventsSize: function(){
      return eventArray.length;
    },

    /**
     * Convenience method for getting the currenty running event
     *
     * @memberOf voyent.io.event
     * @alias getCurrentEvent.
     */
    getCurrentEvent: function(){
      return eventIndex + 1;
    },
		/**
		 * Retrieve the time difference in milliseconds between the provided time and the event server time.
		 *
		 * Useful for displaying accurate live event views. The time difference is returned as client time - server
		 * time.
		 *
         * @memberOf voyent.io.event
		 * @alias getClientServerTimeGap
		 * @param {Object} params params
		 * @param {String} params.account Voyent Services account name. If not provided, the last known Voyent Account
		 *     will be used.
		 * @param {String} params.realm The Voyent Services realm. If not provided, the last known Voyent Realm name
		 *     will be used.
		 * @param {String} params.accessToken The Voyent authentication token. If not provided, the stored token from
		 *     voyent.io.auth.connect() will be used
		 * @param {String} params.host The Voyent Services host url. If not supplied, the last used Voyent host, or the
		 *     default will be used. (optional)
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 * @returns {Number} The time difference in milliseconds
		 */
		getClientServerTimeGap: function(params){
			return new Promise(
				function(resolve, reject) {
					params = params ? params : {};
					v.io.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);

					var url = getRealmResourceURL(v.io.eventURL, account, realm,
						'time', token, params.ssl, {
							clientTime: encodeURIComponent(new Date().toISOString())
						});

					v.$.getJSON(url).then(function(response){
						if( response.timeOffset){
							v.io.auth.updateLastActiveTimestamp();
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
    /**
     * @namespace push
     * @memberOf voyent.io
     */
	v.io.push = {

		/**
		 * Connect to the Voyent Push Service
		 *
         * @memberOf voyent.io.push
		 * @alias startPushService
		 * @param {Object} params params
		 * @param {String} params.account Voyent Services account name. If not provided, the last known Voyent Account
		 *     will be used.
		 * @param {String} params.realm The Voyent Services realm. If not provided, the last known Voyent Realm name
		 *     will be used.
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
						return v.getLocalStorageItem(CLOUD_PUSH_KEY);
					}*/
					params = params ? params : {};
					v.io.checkHost(params);


					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);

					var pushURL = (params.ssl ? 'https://' : 'http://') + v.io.pushURL + '/';

					v.usePushService(pushURL, null, {
						auth:{
							access_token: token
						},
						account: account,
						realm: realm
					});
					console.log('voyent.io.push.connect() connected');
					resolve();

					/*
					v.$.get(pushURL + 'code.icepush').then(function(response){
						try{
							eval(response);
							ice.push.configuration.contextPath = pushURL;
							ice.push.configuration.account = v.io.auth.getLastKnownAccount();
							ice.push.configuration.realm = v.io.auth.getLastKnownRealm();
							ice.push.configuration.access_token = v.io.auth.getLastAccessToken();
							ice.push.connection.startConnection();
							setupCloudPush();
							console.log('v.io.push.connect() connected');
							resolve();
						}
						catch(e){
							console.log('v.io.push.connect() failed: ' + e);
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
         * @memberOf voyent.io.push
		 * @alias addPushListener
		 * @param {Object} params params
		 * @param {String} params.account Voyent Services account name. If not provided, the last known Voyent Account
		 *     will be used.
		 * @param {String} params.realm The Voyent Services realm. If not provided, the last known Voyent Realm name
		 *     will be used.
		 * @param {String} params.group The push group name
		 * @param {String} params.callback The callback function to be called on the push event
		 * @param {Boolean} params.useCloudPush Use Voyent Cloud Push to call the callback through native cloud
		 *     notification channels when necessary (default true)
		 */
		addPushListener: function(params){
			return new Promise(function(resolve, reject) {

				function storePushListener(pushId, group, cb){
					var pushListeners = {};
					var pushListenersStr = v.getSessionStorageItem(PUSH_CALLBACKS);
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
					v.setSessionStorageItem(PUSH_CALLBACKS, JSON.stringify(pushListeners));
				}

				function addCloudPushListener(){
					var callback = findFunctionInGlobalScope(params.callback);
					if( !callback ){
						reject('Voyent Cloud Push callbacks must be in window scope. Please pass either a reference to or a name of a global function.');
					}
					else{
						var callbacks = v.getLocalStorageItem(CLOUD_CALLBACKS_KEY);
						var callbackName = getFunctionName(callback);
						if (!callbacks)  {
							callbacks = " ";
						}
						if (callbacks.indexOf(" " + callbackName + " ") < 0)  {
							callbacks += callbackName + " ";
						}
						v.setLocalStorageItem(CLOUD_CALLBACKS_KEY, callbacks);
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
				v.io.checkHost(params);

				validateRequiredGroup(params, reject);
				validateRequiredCallback(params, reject);

				if( !('useCloudPush' in params )){
					params.useCloudPush = true;
				}

				//validate
				var account = validateAndReturnRequiredAccount(params, reject);
				var realm = validateAndReturnRequiredRealm(params, reject);
				var token = validateAndReturnRequiredAccessToken(params, reject);

				var pushURL = (params.ssl ? 'https://' : 'http://') + v.io.pushURL + '/';

				if (ice && ice.push && ice.push.configuration.contextPath) {
					addPushGroupMember();
					console.log('voyent.io.push.addPushListener() added listener ' +
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
         * @memberOf voyent.io.push
		 * @alias addPushListener
		 * @param {Object} params params
		 * @param {String} params.account Voyent Services account name. If not provided, the last known Voyent Account
		 *     will be used.
		 * @param {String} params.realm The Voyent Services realm. If not provided, the last known Voyent Realm name
		 *     will be used.
		 * @param {String} params.group The push group name
		 */
		removePushListener: function(params){
			return new Promise(function(resolve, reject) {
				console.log('voyent.io.push.removePushListener() group: ' + params.group);
				params = params ? params : {};
				v.io.checkHost(params);
				validateRequiredGroup(params, reject);
				var pushListenersStr = v.getSessionStorageItem(PUSH_CALLBACKS);
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
						v.setSessionStorageItem(PUSH_CALLBACKS, JSON.stringify(pushListenerStorage));

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
         * @memberOf voyent.io.push
		 * @alias sendPushEvent
		 * @param {Object} params params
		 * @param {String} params.account Voyent Services account name. If not provided, the last known Voyent Account
		 *     will be used.
		 * @param {String} params.realm The Voyent Services realm. If not provided, the last known Voyent Realm name
		 *     will be used.
		 * @param {String} params.group The push group name
		 * @param {String} params.subject The subject heading for the notification
		 * @param {String} params.detail The message text to be sent in the notification body
		 */
		sendPushEvent: function(params) {
			return new Promise(
				function(resolve, reject) {
					params = params ? params : {};
					v.io.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);

					validateRequiredGroup(params, reject);

					var pushURL = (params.ssl ? 'https://' : 'http://') + v.io.pushURL + '/';

					/* TODO
					if (!absoluteGoVoyentURL)  {
						if (!!v.goVoyentURL)  {
							absoluteGoVoyentURL = getAbsoluteURL(v.goVoyentURL);
						}
					}
					if (!!absoluteGoVoyentURL)  {
						if (options && !options.url)  {
							options.url = absoluteGoVoyentURL;
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
		},

		/**
		 * Searches for all cloud registrations in a realm
		 *
         * @memberOf voyent.io.push
		 * @alias findCloudRegistrations
		 * @param {Object} params params
		 * @param {String} params.account Voyent Services account name. If not provided, the last known Voyent Account
		 *     will be used.
		 * @param {String} params.realm The Voyent Services realm. If not provided, the last known Voyent Realm name
		 *     will be used.
		 * @param {String} params.accessToken The Voyent authentication token. If not provided, the stored token from
		 *     voyent.io.auth.connect() will be used
		 * @param {String} params.host The Voyent Services host url. If not supplied, the last used Voyent host, or the
		 *     default will be used. (optional)
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 * @returns {Object} The results
		 */
		findCloudRegistrations: function(params){
			return new Promise(
				function(resolve, reject) {
					params = params ? params : {};
					v.io.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);

					var url = getRealmResourceURL(v.io.pushURL, account, realm,
						'cloud/all', token, params.ssl, {
						});

					v.$.getJSON(url).then(function(registrations){
						v.io.auth.updateLastActiveTimestamp();
						resolve(registrations);
					})['catch'](function(error){
						reject(error);
					});
				}
			);
		},

		/**
		 * Deletes all cloud registrations in a realm
		 *
         * @memberOf voyent.io.push
		 * @alias deleteCloudRegistrations
		 * @param {Object} params params
		 * @param {String} params.account Voyent Services account name. If not provided, the last known Voyent Account
		 *     will be used.
		 * @param {String} params.realm The Voyent Services realm. If not provided, the last known Voyent Realm name
		 *     will be used.
		 * @param {String} params.accessToken The Voyent authentication token. If not provided, the stored token from
		 *     voyent.io.auth.connect() will be used
		 * @param {String} params.host The Voyent Services host url. If not supplied, the last used Voyent host, or the
		 *     default will be used. (optional)
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 * @returns {Object} The results
		 */
		deleteCloudRegistrations: function(params){
			return new Promise(
				function(resolve, reject) {
					params = params ? params : {};
					v.io.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);

					var url = getRealmResourceURL(v.io.pushURL, account, realm,
						'cloud/all', token, params.ssl, {
						});

					v.$.doDelete(url).then(function(response){
						v.io.auth.updateLastActiveTimestamp();
						resolve();
					})['catch'](function(error){
						reject(error);
					});
				}
			);
		},

    /**
     * Get a registration
     *
     * @memberOf voyent.io.push
     * @alias getCloudRegistration
     * @param {Object} params params
     * @param {String} params.id The registration id, the registration to be returned
     * @param {String} params.account Voyent Services account name. If not provided, the last known Voyent Account will
     *     be used.
     * @param {String} params.realm The Voyent Services realm. If not provided, the last known Voyent Realm name will
     *     be used.
     * @param {String} params.accessToken The Voyent authentication token. If not provided, the stored token from
     *     voyent.io.auth.connect() will be used
     * @param {String} params.host The Voyent Services host url. If not supplied, the last used Voyent host, or the
     *     default will be used. (optional)
     * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
     * @returns {String} The resource URI
     */


    getCloudRegistration: function(params){
      return new Promise(
        function(resolve, reject) {
          params = params ? params : {};
          v.io.checkHost(params);

          //validate
          var account = validateAndReturnRequiredAccount(params, reject);
          var realm = validateAndReturnRequiredRealm(params, reject);
          var token = validateAndReturnRequiredAccessToken(params, reject);

          var url = getRealmResourceURL(v.io.pushURL, account, realm,
            'cloud/' + params.id, token, params.ssl);

          v.$.getJSON(url).then(function(registration){
              v.io.auth.updateLastActiveTimestamp();
              resolve(registration);
          })['catch'](function(error){
            reject(error);
          });
        }
      );
    },

    /**
     * Delete a registration
     *
     * @memberOf voyent.io.push
     * @alias deleteCloudRegistration
     * @param {Object} params params
     * @param {String} params.id The registration id, the registration to be deleted
     * @param {String} params.account Voyent Services account name. If not provided, the last known Voyent Account will
     *     be used.
     * @param {String} params.realm The Voyent Services realm. If not provided, the last known Voyent Realm name will
     *     be used.
     * @param {String} params.accessToken The Voyent authentication token. If not provided, the stored token from
     *     voyent.io.auth.connect() will be used
     * @param {String} params.host The Voyent Services host url. If not supplied, the last used Voyent host, or the
     *     default will be used. (optional)
     * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
     * @returns {String} The resource URI
     */


    deleteCloudRegistration: function(params){
      return new Promise(
        function(resolve, reject) {
          params = params ? params : {};
          v.io.checkHost(params);

          //validate
          var account = validateAndReturnRequiredAccount(params, reject);
          var realm = validateAndReturnRequiredRealm(params, reject);
          var token = validateAndReturnRequiredAccessToken(params, reject);

          var url = getRealmResourceURL(v.io.pushURL, account, realm,
            'cloud/' + params.id, token, params.ssl);

          v.$.doDelete(url).then(function(registration){
            v.io.auth.updateLastActiveTimestamp();
            resolve();
          })['catch'](function(error){
            reject(error);
          });
        }
      );
    },

    /**
     * Update a registration
     *
     * @memberOf voyent.io.push
     * @alias updateCloudRegistration
     * @param {Object} params params
     * @param {String} params.id The registration id, the registration to be updated
     * @param {Object} params.registration The registration
     * @param {String} params.account Voyent Services account name. If not provided, the last known Voyent Account will
     *     be used.
     * @param {String} params.realm The Voyent Services realm. If not provided, the last known Voyent Realm name will
     *     be used.
     * @param {String} params.accessToken The Voyent authentication token. If not provided, the stored token from
     *     voyent.io.auth.connect() will be used
     * @param {String} params.host The Voyent Services host url. If not supplied, the last used Voyent host, or the
     *     default will be used. (optional)
     * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
     * @returns {String} The resource URI
     */

    updateCloudRegistration: function(params){
      return new Promise(
        function(resolve, reject) {
          params = params ? params : {};
          v.io.checkHost(params);

          //validate
          var account = validateAndReturnRequiredAccount(params, reject);
          var realm = validateAndReturnRequiredRealm(params, reject);
          var token = validateAndReturnRequiredAccessToken(params, reject);

          var url = getRealmResourceURL(v.io.pushURL, account, realm,
            'cloud/' + params.id, token, params.ssl);

          v.$.put(url,params.resource).then(function(registration){
            v.io.auth.updateLastActiveTimestamp();
            resolve();
          })['catch'](function(error){
            reject(error);
          });
        }
      );
    }
	};

	/* STORAGE SERVICE */
    /**
     * @namespace storage
     * @memberOf voyent.io
     */
	v.io.storage = {

		/**
		 * Retrieve the storage meta info for the realm
		 *
         * @memberOf voyent.io.storage
		 * @alias getMetaInfo
		 * @param {Object} params params
		 * @param {String} params.account Voyent Services account name. If not provided, the last known Voyent Account
		 *     will be used.
		 * @param {String} params.realm The Voyent Services realm. If not provided, the last known Voyent Realm name
		 *     will be used.
		 * @param {String} params.accessToken The Voyent authentication token. If not provided, the stored token from
		 *     voyent.io.auth.connect() will be used
		 * @param {String} params.host The Voyent Services host url. If not supplied, the last used Voyent host, or the
		 *     default will be used. (optional)
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 * @param {String} params.scope (default 'self') 'all' or 'self', return meta information for blobs belonging
		 *     to all users, or only those belonging to the current user
		 * @returns {Object} The results
		 */
		getMetaInfo: function(params){
			return new Promise(function(resolve, reject) {
				params = params ? params : {};
				v.io.checkHost(params);

				//validate
				var account = validateAndReturnRequiredAccount(params, reject);
				var realm = validateAndReturnRequiredRealm(params, reject);
				var token = validateAndReturnRequiredAccessToken(params, reject);

				var url = getRealmResourceURL(v.io.storageURL, account, realm,
					'meta', token, params.ssl, params.scope ? {scope: params.scope} : null);


				v.$.getJSON(url).then(function(response){
					v.io.auth.updateLastActiveTimestamp();
					resolve(response.directory);
				})['catch'](function(error){
					reject(error);
				});
			});
		},

		/**
		 * Stores a blob
		 *
         * @memberOf voyent.io.storage
		 * @alias uploadBlob
		 * @param {Object} params params
		 * @param {String} params.account Voyent Services account name. If not provided, the last known Voyent Account
		 *     will be used.
		 * @param {String} params.realm The Voyent Services realm. If not provided, the last known Voyent Realm name
		 *     will be used.
		 * @param {String} params.id The blob id. If not provided, the service will return a new id
		 * @param {String} params.accessToken The Voyent authentication token. If not provided, the stored token from
		 *     voyent.io.auth.connect() will be used
		 * @param {String} params.host The Voyent Services host url. If not supplied, the last used Voyent host, or the
		 *     default will be used. (optional)
		 * @param {Object} params.blob The Blob to store
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 * @param {Function} params.progressCallback The callback function to call on progress events. eg. function
		 *     progressCallback(percentComplete, xhr){..}
		 * @returns {Object} The results
		 */
		uploadBlob: function(params){
			return new Promise(function(resolve, reject) {
				params = params ? params : {};
				v.io.checkHost(params);

				//validate
				var account = validateAndReturnRequiredAccount(params, reject);
				var realm = validateAndReturnRequiredRealm(params, reject);
				var token = validateAndReturnRequiredAccessToken(params, reject);
				validateRequiredBlob(params, reject);

				var formData = new FormData();
				formData.append('file', params.blob);

				var url = getRealmResourceURL(v.io.storageURL, account, realm,
					'blobs' + (params.id ? '/' + params.id : ''), token, params.ssl);

				v.$.post(url, formData, null, true, null, params.progressCallback).then(function(response){
					v.io.auth.updateLastActiveTimestamp();
					resolve(response.location || response.uri);
				})['catch'](function(error){
					reject(error);
				});
			});
		},

		/**
		 * Stores a file
		 *
         * @memberOf voyent.io.storage
		 * @alias uploadBlob
		 * @param {Object} params params
		 * @param {String} params.account Voyent Services account name. If not provided, the last known Voyent Account
		 *     will be used.
		 * @param {String} params.realm The Voyent Services realm. If not provided, the last known Voyent Realm name
		 *     will be used.
		 * @param {String} params.id The blob id. If not provided, the service will return a new id
		 * @param {String} params.accessToken The Voyent authentication token. If not provided, the stored token from
		 *     voyent.io.auth.connect() will be used
		 * @param {String} params.host The Voyent Services host url. If not supplied, the last used Voyent host, or the
		 *     default will be used. (optional)
		 * @param {Object} params.file The Blob to store
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 * @param {Function} params.progressCallback The callback function to call on progress events. eg. function
		 *     progressCallback(percentComplete, xhr){..}
		 * @param {Function} params.onabort The callback for the XMLHttpRequest onabort event
		 * @param {Function} params.onerror The callback for the XMLHttpRequest onerror event
		 * @returns {Object} The results
		 */
		uploadFile: function(params){
			return new Promise(function(resolve, reject) {
				params = params ? params : {};
				v.io.checkHost(params);

				//validate
				var account = validateAndReturnRequiredAccount(params, reject);
				var realm = validateAndReturnRequiredRealm(params, reject);
				var token = validateAndReturnRequiredAccessToken(params, reject);
				validateRequiredFile(params, reject);

				var url = getRealmResourceURL(v.io.storageURL, account, realm,
					'blobs' + (params.id ? '/' + params.id : ''), token, params.ssl);
				var formData = new FormData();
				formData.append('file', params.file);

				v.$.post(url, formData, null, true, null, params.progressCallback, params.onabort, params.onerror).then(function(response){
					v.io.auth.updateLastActiveTimestamp();
					resolve(response.location || response.uri);
				})['catch'](function(error){
					reject(error);
				});
			});
		},

		/**
		 * Retrieves a blob file from the storage service
		 *
         * @memberOf voyent.io.storage
		 * @alias getBlob
		 * @param {Object} params params
		 * @param {String} params.account Voyent Services account name. If not provided, the last known Voyent Account
		 *     will be used.
		 * @param {String} params.realm The Voyent Services realm. If not provided, the last known Voyent Realm name
		 *     will be used.
		 * @param {String} params.id The blob id.
		 * @param {String} params.accessToken The Voyent authentication token. If not provided, the stored token from
		 *     voyent.io.auth.connect() will be used
		 * @param {String} params.host The Voyent Services host url. If not supplied, the last used Voyent host, or the
		 *     default will be used. (optional)
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 * @returns {Object} The blob arraybuffer
		 */
		getBlob: function(params){
			return new Promise(function(resolve, reject) {
				params = params ? params : {};
				v.io.checkHost(params);

				//validate
				var account = validateAndReturnRequiredAccount(params, reject);
				var realm = validateAndReturnRequiredRealm(params, reject);
				var token = validateAndReturnRequiredAccessToken(params, reject);
				validateRequiredId(params, reject);

				var url = getRealmResourceURL(v.io.storageURL, account, realm,
					'blobs/' + params.id, token, params.ssl);

				v.$.getBlob(url).then(function(response){
					v.io.auth.updateLastActiveTimestamp();
					resolve(response);
				})['catch'](function(error){
					reject(error);
				});
			});
		},

		/**
		 * Deletes a blob file from the storage service
		 *
         * @memberOf voyent.io.storage
		 * @alias deleteBlob
		 * @param {Object} params params
		 * @param {String} params.account Voyent Services account name. If not provided, the last known Voyent Account
		 *     will be used.
		 * @param {String} params.realm The Voyent Services realm. If not provided, the last known Voyent Realm name
		 *     will be used.
		 * @param {String} params.id The blob id.
		 * @param {String} params.accessToken The Voyent authentication token. If not provided, the stored token from
		 *     voyent.io.auth.connect() will be used
		 * @param {String} params.host The Voyent Services host url. If not supplied, the last used Voyent host, or the
		 *     default will be used. (optional)
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 */
		deleteBlob: function(params){
			return new Promise(function(resolve, reject) {
				params = params ? params : {};
				v.io.checkHost(params);

				//validate
				var account = validateAndReturnRequiredAccount(params, reject);
				var realm = validateAndReturnRequiredRealm(params, reject);
				var token = validateAndReturnRequiredAccessToken(params, reject);
				validateRequiredId(params, reject);

				var url = getRealmResourceURL(v.io.storageURL, account, realm,
					'blobs/' + params.id, token, params.ssl);

				v.$.doDelete(url).then(function(response){
					v.io.auth.updateLastActiveTimestamp();
					resolve();
				})['catch'](function(error){
					reject(error);
				});
			});
		},

		getBlobResourcePermissions: function(params){
			params.path = 'blobs';
			return v.io.storage.getResourcePermissions(params);
		},

		updateBlobResourcePermissions: function(params){
			params.path = 'blobs';
			return v.io.storage.getResourcePermissions(params);
		},

		getResourcePermissions: function(params){
			params.service = 'storage';
			return v.io.getResourcePermissions(params);
		},

		updateResourcePermissions: function(params){
			params.service = 'storage';
			return v.io.updateResourcePermissions(params);
		},
	};

	/* QUERY SERVICE */
    /**
     * @namespace query
     * @memberOf voyent.io
     */
	v.io.query = {

		/**
		 * Create a new query
		 *
         * @memberOf voyent.io.query
		 * @alias createQuery
		 * @param {Object} params params
		 * @param {String} params.id The query id. If not provided, the service will return a new id
		 * @param {Object} params.query The query to be created
		 * @param {String} params.account Voyent Services account name. If not provided, the last known Voyent Account
		 *     will be used.
		 * @param {String} params.realm The Voyent Services realm. If not provided, the last known Voyent Realm name
		 *     will be used.
		 * @param {String} params.accessToken The Voyent authentication token. If not provided, the stored token from
		 *     voyent.io.auth.connect() will be used
		 * @param {String} params.host The Voyent Services host url. If not supplied, the last used Voyent host, or the
		 *     default will be used. (optional)
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 * @returns {String} The resource URI
		 */
		createQuery: function(params){
			return new Promise(
				function(resolve, reject) {
					params = params ? params : {};
					v.io.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);
					validateRequiredQuery(params, reject);

					var url = getRealmResourceURL(v.io.queryURL, account, realm,
						'queries/' + (params.id ? params.id : ''), token, params.ssl);

					v.$.post(url, params.query).then(function(response){
						v.io.auth.updateLastActiveTimestamp();
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
         * @memberOf voyent.io.query
		 * @alias updateQuery
		 * @param {Object} params params
		 * @param {String} params.id The query id, the query to be updated
		 * @param {Object} params.query The query
		 * @param {String} params.account Voyent Services account name. If not provided, the last known Voyent Account
		 *     will be used.
		 * @param {String} params.realm The Voyent Services realm. If not provided, the last known Voyent Realm name
		 *     will be used.
		 * @param {String} params.accessToken The Voyent authentication token. If not provided, the stored token from
		 *     voyent.io.auth.connect() will be used
		 * @param {String} params.host The Voyent Services host url. If not supplied, the last used Voyent host, or the
		 *     default will be used. (optional)
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 * @returns {String} The resource URI
		 */
		updateQuery: function(params){
			return new Promise(
				function(resolve, reject) {
					params = params ? params : {};
					v.io.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);
					validateRequiredQuery(params, reject);
					validateRequiredId(params, reject);

					var url = getRealmResourceURL(v.io.queryURL, account, realm,
						'queries/' + params.id, token, params.ssl);

					v.$.put(url, params.query).then(function(response){
						v.io.auth.updateLastActiveTimestamp();
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
         * @memberOf voyent.io.query
		 * @alias getQuery
		 * @param {Object} params params
		 * @param {String} params.id The query id, the query to fetch
		 * @param {String} params.account Voyent Services account name. If not provided, the last known Voyent Account
		 *     will be used.
		 * @param {String} params.realm The Voyent Services realm. If not provided, the last known Voyent Realm name
		 *     will be used.
		 * @param {String} params.accessToken The Voyent authentication token. If not provided, the stored token from
		 *     voyent.io.auth.connect() will be used
		 * @param {String} params.host The Voyent Services host url. If not supplied, the last used Voyent host, or the
		 *     default will be used. (optional)
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 * @returns {Object} The query
		 */
		getQuery: function(params){
			return new Promise(
				function(resolve, reject) {
					params = params ? params : {};
					v.io.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);
					validateRequiredId(params, reject);

					var url = getRealmResourceURL(v.io.queryURL, account, realm,
						'queries/' + params.id, token, params.ssl);

					v.$.getJSON(url).then(function(query){
						v.io.auth.updateLastActiveTimestamp();
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
         * @memberOf voyent.io.query
		 * @alias findQueries
		 * @param {Object} params params
		 * @param {String} params.account Voyent Services account name. If not provided, the last known Voyent Account
		 *     will be used.
		 * @param {String} params.realm The Voyent Services realm. If not provided, the last known Voyent Realm name
		 *     will be used.
		 * @param {String} params.accessToken The Voyent authentication token. If not provided, the stored token from
		 *     voyent.io.auth.connect() will be used
		 * @param {String} params.host The Voyent Services host url. If not supplied, the last used Voyent host, or the
		 *     default will be used. (optional)
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
					v.io.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);

					var url = getRealmResourceURL(v.io.queryURL, account, realm,
						'queries/', token, params.ssl, {
							'query': params.query ? encodeURIComponent(JSON.stringify(params.query)) : {},
							'fields': params.fields ? encodeURIComponent(JSON.stringify(params.fields)) : {},
							'options': params.options ? encodeURIComponent(JSON.stringify(params.options)) : {}
						});

					v.$.getJSON(url).then(function(doc){
						v.io.auth.updateLastActiveTimestamp();
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
         * @memberOf voyent.io.query
		 * @alias deleteQuery
		 * @param {Object} params params
		 * @param {String} params.id The query id, the query to be deleted
		 * @param {String} params.account Voyent Services account name. If not provided, the last known Voyent Account
		 *     will be used.
		 * @param {String} params.realm The Voyent Services realm. If not provided, the last known Voyent Realm name
		 *     will be used.
		 * @param {String} params.accessToken The Voyent authentication token. If not provided, the stored token from
		 *     voyent.io.auth.connect() will be used
		 * @param {String} params.host The Voyent Services host url. If not supplied, the last used Voyent host, or the
		 *     default will be used. (optional)
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 */
		deleteQuery: function(params){
			return new Promise(
				function(resolve, reject) {
					params = params ? params : {};
					v.io.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);
					validateRequiredId(params, reject);

					var url = getRealmResourceURL(v.io.queryURL, account, realm,
						'queries/' + params.id, token, params.ssl);

					v.$.doDelete(url).then(function(response){
						v.io.auth.updateLastActiveTimestamp();
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
         * @memberOf voyent.io.query
		 * @alias createTransformer
		 * @param {Object} params params
		 * @param {String} params.id The transformer id. If not provided, the service will return a new id
		 * @param {Object} params.transformer The transformer to be created
		 * @param {String} params.account Voyent Services account name. If not provided, the last known Voyent Account
		 *     will be used.
		 * @param {String} params.realm The Voyent Services realm. If not provided, the last known Voyent Realm name
		 *     will be used.
		 * @param {String} params.accessToken The Voyent authentication token. If not provided, the stored token from
		 *     voyent.io.auth.connect() will be used
		 * @param {String} params.host The Voyent Services host url. If not supplied, the last used Voyent host, or the
		 *     default will be used. (optional)
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 * @returns {String} The resource URI
		 */
		createTransformer: function(params){
			return new Promise(
				function(resolve, reject) {
					params = params ? params : {};
					v.io.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);
					validateRequiredTransformer(params, reject);

					var url = getRealmResourceURL(v.io.queryURL, account, realm,
						'transformers/' + (params.id ? params.id : ''), token, params.ssl);

					v.$.post(url, params.transformer).then(function(response){
						v.io.auth.updateLastActiveTimestamp();
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
         * @memberOf voyent.io.query
		 * @alias updateTransformer
		 * @param {Object} params params
		 * @param {String} params.id The transformer id, the transformer to be updated
		 * @param {Object} params.transformer The transformer
		 * @param {String} params.account Voyent Services account name. If not provided, the last known Voyent Account
		 *     will be used.
		 * @param {String} params.realm The Voyent Services realm. If not provided, the last known Voyent Realm name
		 *     will be used.
		 * @param {String} params.accessToken The Voyent authentication token. If not provided, the stored token from
		 *     voyent.io.auth.connect() will be used
		 * @param {String} params.host The Voyent Services host url. If not supplied, the last used Voyent host, or the
		 *     default will be used. (optional)
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 * @returns {String} The resource URI
		 */
		updateTransformer: function(params){
			return new Promise(
				function(resolve, reject) {
					params = params ? params : {};
					v.io.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);
					validateRequiredTransformer(params, reject);
					validateRequiredId(params, reject);

					var url = getRealmResourceURL(v.io.queryURL, account, realm,
						'transformers/' + params.id, token, params.ssl);

					v.$.put(url, params.transformer).then(function(response){
						v.io.auth.updateLastActiveTimestamp();
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
         * @memberOf voyent.io.query
		 * @alias getTransformer
		 * @param {Object} params params
		 * @param {String} params.id The transformer id, the transformer to fetch
		 * @param {String} params.account Voyent Services account name. If not provided, the last known Voyent Account
		 *     will be used.
		 * @param {String} params.realm The Voyent Services realm. If not provided, the last known Voyent Realm name
		 *     will be used.
		 * @param {String} params.accessToken The Voyent authentication token. If not provided, the stored token from
		 *     voyent.io.auth.connect() will be used
		 * @param {String} params.host The Voyent Services host url. If not supplied, the last used Voyent host, or the
		 *     default will be used. (optional)
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 * @returns {Object} The transformer
		 */
		getTransformer: function(params){
			return new Promise(
				function(resolve, reject) {
					params = params ? params : {};
					v.io.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);
					validateRequiredId(params, reject);

					var url = getRealmResourceURL(v.io.queryURL, account, realm,
						'transformers/' + params.id, token, params.ssl);

					v.$.getJSON(url).then(function(transformer){
						v.io.auth.updateLastActiveTimestamp();
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
         * @memberOf voyent.io.query
		 * @alias findTransformers
		 * @param {Object} params params
		 * @param {String} params.account Voyent Services account name. If not provided, the last known Voyent Account
		 *     will be used.
		 * @param {String} params.realm The Voyent Services realm. If not provided, the last known Voyent Realm name
		 *     will be used.
		 * @param {String} params.accessToken The Voyent authentication token. If not provided, the stored token from
		 *     voyent.io.auth.connect() will be used
		 * @param {String} params.host The Voyent Services host url. If not supplied, the last used Voyent host, or the
		 *     default will be used. (optional)
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
					v.io.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);

					var url = getRealmResourceURL(v.io.queryURL, account, realm,
						'transformers/', token, params.ssl, {
							'query': params.query ? encodeURIComponent(JSON.stringify(params.query)) : {},
							'fields': params.fields ? encodeURIComponent(JSON.stringify(params.fields)) : {},
							'options': params.options ? encodeURIComponent(JSON.stringify(params.options)) : {}
						});

					v.$.getJSON(url).then(function(transformers){
						v.io.auth.updateLastActiveTimestamp();
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
         * @memberOf voyent.io.query
		 * @alias deleteTransformer
		 * @param {Object} params params
		 * @param {String} params.id The transformer id, the transformer to be deleted
		 * @param {String} params.account Voyent Services account name. If not provided, the last known Voyent Account
		 *     will be used.
		 * @param {String} params.realm The Voyent Services realm. If not provided, the last known Voyent Realm name
		 *     will be used.
		 * @param {String} params.accessToken The Voyent authentication token. If not provided, the stored token from
		 *     voyent.io.auth.connect() will be used
		 * @param {String} params.host The Voyent Services host url. If not supplied, the last used Voyent host, or the
		 *     default will be used. (optional)
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 */
		deleteTransformer: function(params){
			return new Promise(
				function(resolve, reject) {
					params = params ? params : {};
					v.io.checkHost(params);

					//validate
					var account = validateAndReturnRequiredAccount(params, reject);
					var realm = validateAndReturnRequiredRealm(params, reject);
					var token = validateAndReturnRequiredAccessToken(params, reject);
					validateRequiredId(params, reject);

					var url = getRealmResourceURL(v.io.queryURL, account, realm,
						'transformers/' + params.id, token, params.ssl);

					v.$.doDelete(url).then(function(response){
						v.io.auth.updateLastActiveTimestamp();
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
         * @memberOf voyent.io.query
		 * @alias executeQuery
		 * @param {Object} params params
		 * @param {String} params.id The query/chain id, the query or query chain to be executed
		 * @param {Object} params.execParams Execution parameters that will be passed into parameterized query fields
		 * @param {String} params.mode Specify "debug" to return step-by-step query execution data
		 * @param {String} params.account Voyent Services account name. If not provided, the last known Voyent Account
		 *     will be used.
		 * @param {String} params.realm The Voyent Services realm. If not provided, the last known Voyent Realm name
		 *     will be used.
		 * @param {String} params.accessToken The Voyent authentication token. If not provided, the stored token from
		 *     voyent.io.auth.connect() will be used
		 * @param {String} params.host The Voyent Services host url. If not supplied, the last used Voyent host, or the
		 *     default will be used. (optional)
		 * @param {Boolean} params.ssl (default false) Whether to use SSL for network traffic.
		 * @returns {Object} The results
		 */
		executeQuery: function(params){
			return new Promise(
				function(resolve, reject) {
					params = params ? params : {};
					v.io.checkHost(params);

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

					var url = getRealmResourceURL(v.io.queryURL, account, realm,
						'queries/' + params.id, token, params.ssl, queryParams);

					v.$.getJSON(url).then(function(results){
						v.io.auth.updateLastActiveTimestamp();
						resolve(results);
					})['catch'](function(error){
						reject(error);
					});
				}
			);
		},

		getQueryResourcePermissions: function(params){
			params.path = 'queries';
			return v.io.query.getResourcePermissions(params);
		},

		updateQueryResourcePermissions: function(params){
			params.path = 'queries';
			return v.io.query.getResourcePermissions(params);
		},

		getTransformerResourcePermissions: function(params){
			params.path = 'transformers';
			return v.io.query.getResourcePermissions(params);
		},

		updateTransformerResourcePermissions: function(params){
			params.path = 'transformers';
			return v.io.query.getResourcePermissions(params);
		},

		getResourcePermissions: function(params){
			params.service = 'query';
			return v.io.getResourcePermissions(params);
		},

		updateResourcePermissions: function(params){
			params.service = 'query';
			return v.io.updateResourcePermissions(params);
		}
	};

	/* DEVICE SERVICE */
    /**
     * @namespace device
     * @memberOf voyent.io
     */
	v.io.device = {
		/**
		 * Start live reporting of a device
		 *
         * @memberOf voyent.io.device
		 * @alias startDevice
		 * @param {Object} params params
		 * @param {String} params.account Voyent Services account name. If not provided, the last known Voyent Account
		 *     will be used.
		 * @param {String} params.realm The Voyent Services realm. If not provided, the last known Voyent Realm name
		 *     will be used.
		 * @param {String} params.macAddress The address of the device to start.
		 * @param {String} params.host The Voyent Services host url. If not supplied, the last used Voyent host, or the
		 *     default will be used. (optional)
		 * @param {String} params.accessToken The Voyent authentication token. If not provided, the stored token from
		 *     voyent.io.auth.connect() will be used
		 */
		startDevice: function (params) {
			return new Promise(function (resolve, reject) {
				params = params ? params : {};
				v.io.checkHost(params);

				//validate
				var account = validateAndReturnRequiredAccount(params, reject);
				var realm = validateAndReturnRequiredRealm(params, reject);
				var token = validateAndReturnRequiredAccessToken(params, reject);

				var url = getRealmResourceURL(v.io.deviceURL, account, realm,
					params.macAddress + '/start', token, params.ssl);

				v.$.put(url, {}).then(function () {
					v.io.auth.updateLastActiveTimestamp();
					resolve();
				})['catch'](function (error) {
					reject(error);
				});
			});
		},

		/**
		 * Stop live reporting of a device
		 *
         * @memberOf voyent.io.device
		 * @alias stopDevice
		 * @param {Object} params params
		 * @param {String} params.account Voyent Services account name. If not provided, the last known Voyent Account
		 *     will be used.
		 * @param {String} params.realm The Voyent Services realm. If not provided, the last known Voyent Realm name
		 *     will be used.
		 * @param {String} params.macAddress The address of the device to stop.
		 * @param {String} params.host The Voyent Services host url. If not supplied, the last used Voyent host, or the
		 *     default will be used. (optional)
		 * @param {String} params.accessToken The Voyent authentication token. If not provided, the stored token from
		 *     voyent.io.auth.connect() will be used
		 */
		stopDevice: function (params) {
			return new Promise(function (resolve, reject) {
				params = params ? params : {};
				v.io.checkHost(params);

				//validate
				var account = validateAndReturnRequiredAccount(params, reject);
				var realm = validateAndReturnRequiredRealm(params, reject);
				var token = validateAndReturnRequiredAccessToken(params, reject);

				var url = getRealmResourceURL(v.io.deviceURL, account, realm,
					params.macAddress + '/stop', token, params.ssl);

				v.$.put(url, {}).then(function () {
					v.io.auth.updateLastActiveTimestamp();
					resolve();
				})['catch'](function (error) {
					reject(error);
				});
			});
		},

		/**
		 * Stop all device reporting
		 *
         * @memberOf voyent.io.device
		 * @alias stopDevices
		 * @param {Object} params params
		 * @param {String} params.account Voyent Services account name. If not provided, the last known Voyent Account
		 *     will be used.
		 * @param {String} params.realm The Voyent Services realm. If not provided, the last known Voyent Realm name
		 *     will be used.
		 * @param {String} params.host The Voyent Services host url. If not supplied, the last used Voyent host, or the
		 *     default will be used. (optional)
		 * @param {String} params.accessToken The Voyent authentication token. If not provided, the stored token from
		 *     voyent.io.auth.connect() will be used
		 */
		stopDevices: function (params) {
			return new Promise(function (resolve, reject) {
				params = params ? params : {};
				v.io.checkHost(params);

				//validate
				var account = validateAndReturnRequiredAccount(params, reject);
				var realm = validateAndReturnRequiredRealm(params, reject);
				var token = validateAndReturnRequiredAccessToken(params, reject);


				var url = getRealmResourceURL(v.io.deviceURL, account, realm,
					'/stop', token, params.ssl);

				v.$.put(url, {}).then(function () {
					v.io.auth.updateLastActiveTimestamp();
					resolve();
				})['catch'](function (error) {
					reject(error);
				});
			});
		},

		/**
		 * Get all devices reporting on realm/account
		 *
         * @memberOf voyent.io.device
		 * @alias getRunningDevices
		 * @param {Object} params params
		 * @param {String} params.account Voyent Services account name. If not provided, the last known Voyent Account
		 *     will be used.
		 * @param {String} params.realm The Voyent Services realm. If not provided, the last known Voyent Realm name
		 *     will be used.
		 * @param {String} params.host The Voyent Services host url. If not supplied, the last used Voyent host, or the
		 *     default will be used. (optional)
		 * @param {String} params.accessToken The Voyent authentication token. If not provided, the stored token from
		 *     voyent.io.auth.connect() will be used
		 */
		getRunningDevices: function (params) {
			return new Promise(function (resolve, reject) {
				params = params ? params : {};
				v.io.checkHost(params);

				//validate
				var account = validateAndReturnRequiredAccount(params, reject);
				var realm = validateAndReturnRequiredRealm(params, reject);
				var token = validateAndReturnRequiredAccessToken(params, reject);
				var url = getRealmResourceURL(v.io.deviceURL, account, realm, '/running', token, params.ssl);

				v.$.getJSON(url).then(function (devices) {
					v.io.auth.updateLastActiveTimestamp();
					resolve(devices);
				})['catch'](function (error) {
					reject(error);
				});
			});
		}
	};

	/* Initialization */
	v.io.configureHosts();

	/* check connect settings */
	if( v.io.auth.isLoggedIn()){
		var connectSettings = v.io.auth.getConnectSettings();
		if( connectSettings ){
			//user is logged in and has connect settings, so reconnect
			v.io.auth.connect(connectSettings);
		}
	}

})(voyent);
