import { route_endpoint } from "../config/endpoint.js";
import { onFetch } from "../function/fetch.js";

class Messenger{

    #content;
    #type;
    #token;
    #connection;

    constructor(content,type,token,connection){

        if(!token){
            throw new Error("Token inválido")
        }

        if(!(connection !== null && connection !== undefined)){
            throw new Error("Conexão de envio inválida")
        }

        this.#content = content;
        this.#type = type;
        this.#token = token;
        this.#connection = connection;
    }

    onSend(treatment){
 
        this.#connection.onEmitMessage(this.#content,(data)=>{
            
            if(!!treatment){
                if(treatment.onThen){
                    treatment.onThen(data)
                }
            }

        });

    }

}

export {
    Messenger
}