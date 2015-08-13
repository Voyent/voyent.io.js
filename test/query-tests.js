describe('bridgeit.io.query', function () {

    describe('#createQuery()', function(){
        it('should create a new unnamed query', function (done) {
            var newQuery = { "query": { "$or": [ {"color": "red"},{"color": "blue"} ] } };

            bridgeit.io.auth.login({
                account: accountId,
                username: adminId,
                password: adminPassword,
                host: host
            }).then(function(authResponse){
                return bridgeit.io.query.createQuery({
                    query: newQuery,
                    realm: realmId
                });
            }).then(function(queryURI){
                console.log('new query URI: ' + queryURI);
                done();
            }).catch(function(error){
                console.log('createQuery failed ' + JSON.stringify(error));
            });

        });
    });

    describe('#deleteQuery()', function(){
        this.timeout(deleteTimeout);
        it('should create a new unnamed query and delete it', function (done) {
            var newQuery = { "query": { "$or": [ {"color": "red"},{"color": "blue"} ] } };

            bridgeit.io.auth.login({
                account: accountId,
                username: adminId,
                password: adminPassword,
                host: host
            }).then(function(authResponse){
                return bridgeit.io.query.createQuery({
                    query: newQuery,
                    realm: realmId
                });
            }).then(function(queryURI){
                var uriParts = queryURI.split('/');
                var queryId = uriParts[uriParts.length-1];
                return bridgeit.io.query.deleteQuery({
                    account: accountId,
                    realm: realmId,
                    host: host,
                    id: queryId
                })
            }).then(function(){
                console.log('deleted query');
                done();
            }).catch(function(error){
                console.log('deleteQuery failed ' + JSON.stringify(error));
            });
        });
    });

    describe('#updateQuery()', function(){
        it('should create a new unnamed query and update it', function (done) {
            var newQuery = { "query": { "$or": [ {"color": "red"},{"color": "blue"} ] } };

            bridgeit.io.auth.login({
                account: accountId,
                username: adminId,
                password: adminPassword,
                host: host
            }).then(function(authResponse){
                return bridgeit.io.query.createQuery({
                    query: newQuery,
                    realm: realmId
                });
            }).then(function(queryURI){
                var uriParts = queryURI.split('/');
                var queryId = uriParts[uriParts.length-1];
                newQuery.query.$or[0].color = "green";
                return bridgeit.io.query.updateQuery({
                    id: queryId,
                    query: newQuery
                })
            }).then(function(){
                console.log('updated query');
                done();
            }).catch(function(error){
                console.log('delete failed ' + JSON.stringify(error));
            });
        });
    });

    describe('#getQuery()', function(){
        it('should create a new unnamed query and re-fetch it', function (done) {
            var newQuery = { "query": { "$or": [ {"color": "orange"},{"color": "yellow"} ] } };

            bridgeit.io.auth.login({
                account: accountId,
                username: userId,
                password: userPassword,
                host: host,
                realm: realmId
            }).then(function(authResponse){
                return bridgeit.io.query.createQuery({
                    query: newQuery
                });
            }).then(function(queryURI){
                var uriParts = queryURI.split('/');
                var queryId = uriParts[uriParts.length-1];
                return bridgeit.io.query.getQuery({
                    id: queryId
                })
            }).then(function(query){
                if( query.query.$or[0].color == "orange" && query.query.$or[1].color == "yellow")
                    done();
                else{
                    console.log('did not receive expected query: ' + JSON.stringify(query));
                }
            }).catch(function(error){
                console.log('getQuery failed ' + JSON.stringify(error));
            });
        });
    });

    describe('#findQueries()', function(){
        it('should create a new unnamed query and re-search for it', function (done) {
            var key = new Date().getTime();
            var newQuery = { "query": { "$or": [ {"color": "indigo"},{"color": "violet"} ] }, "properties": { "key": key } };

            bridgeit.io.auth.login({
                account: accountId,
                username: userId,
                realm: realmId,
                password: userPassword,
                host: host
            }).then(function(authResponse){
                return bridgeit.io.query.createQuery({
                    query: newQuery
                });
            }).then(function(queryURI){
                return bridgeit.io.query.findQueries({
                    query: {"properties.key": key}
                })
            }).then(function(results){
                if (results && results.length === 1 && results[0].query.$or[0].color == "indigo" && results[0].query.$or[1].color == "violet") {
                    done();
                }
                else{
                    console.log('did not receive expected query: ' + JSON.stringify(results));
                }
            }).catch(function(error){
                console.log('findQueries failed ' + JSON.stringify(error));
            });
        });

        it('should search for a non-existent query and receive an empty array', function (done) {

            var key = [];

            bridgeit.io.auth.login({
                account: accountId,
                realm: realmId,
                username: userId,
                password: userPassword,
                host: host
            }).then(function(){
                return bridgeit.io.query.findQueries({
                    query: {"properties.services": key}
                })
            }).then(function(results){
                if( results && results.length === 0 )
                    done();
                else{
                    console.log('did not receive expected empty array response for missing query: ' + JSON.stringify(results));
                }
            }).catch(function(error){
                console.log('findQueries failed ' + JSON.stringify(error));
            });
        });
    });
});