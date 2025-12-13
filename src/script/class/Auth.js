import { route_endpoint } from "../config/endpoint.js";
import { onFetch } from "../function/fetch.js";
import { Connection } from "./Connection.js";

class Auth {

    constructor(){
        
        this.token = localStorage.getItem("token");
        this.connection = (
            !!this.token 
            ? new Connection(this.token)
            : null
        );
    }

    onLogin(password,treatment){

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
                localStorage.setItem("token",res.data.token);
                this.token = localStorage.getItem("token");
                this.connection = new Connection(token);
                if(treatment){
                    if(treatment.onThen){
                        treatment.onThen(res);
                    }
                }
            },
        })
    }

    onLogout(){

    }

}

export {
    Auth
}