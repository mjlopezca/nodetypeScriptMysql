"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require("mysql");
class Mysql {
    constructor() {
        this.conectado = false;
        console.log("inicializada");
        this.connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'pass',
            database: 'nodeDB',
        });
        this.ConectarDB();
    }
    static get instance() {
        return this._instance || (this._instance = new this());
    }
    static runQuery(query, callback) {
        this.instance.connection.query(query, (err, results, fields) => {
            if (err) {
                console.log("se creo un error");
                console.log(err);
                return callback(err);
            }
            if (results.length === 0) {
                callback('el registro solicitado es incorrecto');
            }
            else {
                callback(null, results);
            }
        });
    }
    ConectarDB() {
        this.connection.connect((err) => {
            if (err) {
                console.log(err.message);
                return;
            }
            this.conectado = true;
            console.log("Conectado");
        });
    }
}
exports.default = Mysql;
