import mysql =require('mysql');


export default class Mysql{
    private static _instance:Mysql;
    connection:mysql.Connection;
    conectado:boolean=false;
    constructor(){
        console.log("inicializada");
        this.connection=mysql.createConnection({
            host:'localhost',
            user:'root',
            password:'pass',
            database:'nodeDB',
        })
        this.ConectarDB();
    }
    public static get instance(){
        return this._instance||(this._instance=new this());
    }
    static  runQuery(query:string,callback:Function){
        this.instance.connection.query(query,(err,results:Object[],fields)=>{
            if(err){
                console.log("se creo un error");
                console.log(err);
                return callback(err);
            }
            if(results.length===0){
                callback('el registro solicitado es incorrecto')
            }else{
                callback(null,results)
            }

        })
    }
    private ConectarDB(){
        this.connection.connect((err:mysql.MysqlError)=>{
            if(err){
                console.log(err.message);
                return;
            }
            this.conectado=true;
            console.log("Conectado");
        })
    }

    
}