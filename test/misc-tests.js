describe('voyent.io', function () {
	this.timeout(10000);
	describe('#startTransaction()', function(){
		it('should start a transaction, login, create, then delete a document, then end the transaction ', function(done){
			var newDoc = {test: true};
			voyent.io.startTransaction();
			console.log('started transaction: ' + voyent.io.getLastTransactionId());
			voyent.io.auth.login({
				account: accountId,
				username: adminId,
				password: adminPassword,
				host: host
			}).then(function(authResponse){
				return voyent.io.documents.createDocument({
					document: newDoc,
					realm: realmId
				});
			}).then(function(docURI){
				newDocURI = docURI;
				var uriParts = docURI.split('/');
				var docId = uriParts[uriParts.length-1];
				return voyent.io.documents.deleteDocument({
					account: accountId,
					realm: realmId,
					host: host,
					id: docId
				})
			}).then(function(){
				console.log('startTransaction() test finished');
				voyent.io.endTransaction();
				done();
			}).catch(function(error){
				voyent.io.endTransaction();
				console.log('startTransaction failed ' + error);
			});
		});
	});
});