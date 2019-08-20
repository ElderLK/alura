// Module Pattern

var ConnectionFactory = 
(function (){
    const stores = ['negociacoes'];
    const version = 4;
    const dbName = 'aluraframe';

    var connection = null;
    var close = null;

    return class ConnectionFactory {
        
        constructor(){
            throw new Error('Não é permitido criar instâncias dessa classe');
        }

        static getConnection(){
            return new Promise((resolve, reject) => {
                let openRequest = window.indexedDB.open(dbName, version);

                openRequest.onupgradeneeded = e => {
                    ConnectionFactory._createStore( e.target.result);
                };

                openRequest.onsuccess = e => {
                    if(!connection){
                        connection = e.target.result;
                        // Monkey Patch
                        close = connection.close.bind(connection);;
                        connection.close = () => {
                            throw new Error('Not allowed');
                        };
                    }
                    resolve(connection);
                };

                openRequest.onerror = e => {
                    console.log(e.target.error);
                    reject(e.target.error.name);
                };
            });
        }

        static _createStore(connection){
            stores.forEach( store => {
                if( connection.objectStoreNames.contains(store)){
                    connection.deleteObjectStore(store);
                }
                connection.createObjectStore(store, { autoIncrement: true });
            })
        }

        static closeConnection(connection){
            close();
            // Reflect.apply(close, connection, []);
            connection = null;
        }
    }
})();

