import { route_endpoint } from "../config/endpoint.js";
import { onFetch } from "../function/fetch.js";
import { Connection } from "./Connection.js";
import { User } from "./User.js";

class Auth {

    constructor(){

        const local_token = localStorage.getItem("token")
        if(!local_token){
            localStorage.removeItem("username")
        }
        this.user = (
            !!local_token
            ? new User()
            : null
        );
        if(this.user && !this.user.username){
            localStorage.removeItem("token")
        }
        this.token = (
            (!!this.user && !!this.user.username)
            ? local_token
            : null
        );

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
                this.connection = new Connection(this.token);
                this.user = new User(res.data.username)
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