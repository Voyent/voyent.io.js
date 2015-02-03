describe('bridgeit.services.documents', function () {

	describe('#createDocument()', function(){
		it('should create a new unnamed document', function (done) {

			var newDoc = {test: true};

			bridgeit.services.auth.login({
				account: accountId,
				username: adminId,
				password: adminPassword,
				host: host
			}).then(function(authResponse){
				return bridgeit.services.documents.createDocument({
					document: newDoc,
					realm: realmId
				});
			}).then(function(docURI){
				console.log('new doc URI: ' + docURI);
				done();
			}).catch(function(error){
				console.log('createDocument failed ' + error);
			});

		});
	});

	describe('#deleteDocument()', function(){
		this.timeout(deleteTimeout);
		it('should create a new unnamed document and delete it', function (done) {
			var newDoc = {test: true};
			
			bridgeit.services.auth.login({
				account: accountId,
				username: adminId,
				password: adminPassword,
				host: host
			}).then(function(authResponse){
				return bridgeit.services.documents.createDocument({
					document: newDoc,
					realm: realmId
				});
			}).then(function(docURI){
				newDocURI = docURI;
				var uriParts = docURI.split('/');
				var docId = uriParts[uriParts.length-1];
				return bridgeit.services.documents.deleteDocument({
					account: accountId,
					realm: realmId,
					host: host,
					id: docId
				})
			}).then(function(){
				console.log('deleted doc');
				done();
			}).catch(function(error){
				console.log('deleteDocument failed ' + error);
			});

		});
	});

	describe('#updateDocument()', function(){
		it('should create a new unnamed document and update it', function (done) {

			var newDoc = {test: true};
			
			bridgeit.services.auth.login({
				account: accountId,
				username: adminId,
				password: adminPassword,
				host: host
			}).then(function(authResponse){
				return bridgeit.services.documents.createDocument({
					document: newDoc,
					realm: realmId
				});
			}).then(function(docURI){
				newDocURI = docURI;
				var uriParts = docURI.split('/');
				var docId = uriParts[uriParts.length-1];
				newDoc.test = false;
				return bridgeit.services.documents.updateDocument({
					id: docId,
					document: newDoc
				})
			}).then(function(){
				console.log('updated doc');
				done();
			}).catch(function(error){
				console.log('delete failed ' + error);
			});

		});
	});

	describe('#getDocument()', function(){
		it('should create a new unnamed document and re-fetch it', function (done) {

			var newDoc = {test: true};
			
			bridgeit.services.auth.login({
				account: accountId,
				realm: realmId,
				username: userId,
				password: userPassword,
				host: host
			}).then(function(authResponse){
				return bridgeit.services.documents.createDocument({
					document: newDoc
				});
			}).then(function(docURI){
				newDocURI = docURI;
				var uriParts = docURI.split('/');
				var docId = uriParts[uriParts.length-1];
				return bridgeit.services.documents.getDocument({
					id: docId
				})
			}).then(function(doc){
				if( doc.test )
					done();
				else{
					console.log('did not receive expected doc: ' + JSON.stringify(doc));
				}
			}).catch(function(error){
				console.log('getDocument failed ' + error);
			});

		});
	});

	describe('#findDocuments()', function(){
		it('should create a new unnamed document and re-search for it', function (done) {

			var key = new Date().getTime();
			var newDoc = {key: key, value: true};
			
			bridgeit.services.auth.login({
				account: accountId,
				username: userId,
				realm: realmId,
				password: userPassword,
				host: host
			}).then(function(authResponse){
				return bridgeit.services.documents.createDocument({
					document: newDoc,
					realm: realmId
				});
			}).then(function(docURI){
				newDocURI = docURI;
				var uriParts = docURI.split('/');
				var docId = uriParts[uriParts.length-1];
				return bridgeit.services.documents.findDocuments({
					query: {key: key}
				})
			}).then(function(results){
				if( results && results.length === 1 && results[0].value )
					done();
				else{
					console.log('did not receive expected doc: ' + JSON.stringify(doc));
				}
			}).catch(function(error){
				console.log('findDocuments failed ' + error);
			});

		});

		it('should search for a non-existant doc and receive null', function (done) {

			var key = 'null';
			
			bridgeit.services.auth.login({
				account: accountId,
				realm: realmId,
				username: userId,
				password: userPassword,
				host: host
			}).then(function(){
				return bridgeit.services.documents.findDocuments({
					query: {key: key}
				})
			}).then(function(results){
				if( !results )
					done();
				else{
					console.log('did not receive expected null response for missing doc: ' + JSON.stringify(results));
				}
			}).catch(function(error){
				console.log('findDocuments failed ' + error);
			});

		});
	});
});
