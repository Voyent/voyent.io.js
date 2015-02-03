describe('bridgeit.services', function () {
	describe('#startTransaction()', function(){
		it('should start a transaction, login, create, then delete a document, then end the transaction ', function(done){
			var newDoc = {test: true};
			bridgeit.services.startTransaction();
			console.log('started transaction: ' + bridgeit.services.getLastTransactionId());
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
				console.log('startTransaction() test finished');
				bridgeit.services.endTransaction();
				done();
			}).catch(function(error){
				bridgeit.services.endTransaction();
				console.log('startTransaction failed ' + error);
			});
		});
	});
});