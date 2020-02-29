const { MongoClient } = require("mongodb")
let db, client

module.exports = {
    connect(url) {
        return MongoClient.connect(url, { useUnifiedTopology: true })
            .then(_client => {
                client = _client
                db = client.db
            })
    },
    collection(name) {
        return db.collection(name)
    },
    disconnect() {
        return client.close()
    }

}