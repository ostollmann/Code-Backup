var db_name = "test_db";
var db_vers = "0.1";
var db_desc = "test database for lpass";
var db_size = 2*1024*1024;


var createTableSQL = "CREATE TABLE IF NOT EXISTS foo (id unique, text)";
var insertRowSQL = "INSERT INTO foo (id, text) VALUES (1, 'synergies')";
var selectAllSQL = "SELECT * FROM FOO";

function connectToDB(db_name, db_vers, db_desc, db_size) {
    return openDatabase(db_name, db_vers, db_desc, db_size);
}

function createTestTable(db, sqlq) {
    db.executeSql(sqlq);
}

function getAll(db, sqlq, cb) {
    db.executeSql(sqlq, [], cb);
}

