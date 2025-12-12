import { route_endpoint } from "../config/endpoint.js";
import { onFetch } from "../function/fetch.js";
import { Connection } from "./Connection.js";

class Auth {

    constructor(){
        // localStorage.setItem("token",token);
        this.token = localStorage.getItem("token");
        this.connection = null;
    }

    onLogin(password){

        if(!password){
            throw new Error("Campo senha inválido");
        }

        onFetch({
            url:route_endpoint.auth.post,
            method:"POST",
            body:{
                password:password
            }
        },{
            onThen(res){
                console.log(res.data)
                this.connection = new Connection(password);
            },
        })
    }

    onLogout(){

    }

}

export {
    Auth
}