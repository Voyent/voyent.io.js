describe('bridgeit.io', function () {
	describe('#startTransaction()', function(){
		it('should start a transaction, login, create, then delete a document, then end the transaction ', function(done){
			var newDoc = {test: true};
			bridgeit.io.startTransaction();
			console.log('started transaction: ' + bridgeit.io.getLastTransactionId());
			bridgeit.io.auth.login({
				account: accountId,
				username: adminId,
				password: adminPassword,
				host: host
			}).then(function(authResponse){
				return bridgeit.io.documents.createDocument({
					document: newDoc,
					realm: realmId
				});
			}).then(function(docURI){
				newDocURI = docURI;
				var uriParts = docURI.split('/');
				var docId = uriParts[uriParts.length-1];
				return bridgeit.io.documents.deleteDocument({
					account: accountId,
					realm: realmId,
					host: host,
					id: docId
				})
			}).then(function(){
				console.log('startTransaction() test finished');
				bridgeit.io.endTransaction();
				done();
			}).catch(function(error){
				bridgeit.io.endTransaction();
				console.log('startTransaction failed ' + error);
			});
		});
	});
});