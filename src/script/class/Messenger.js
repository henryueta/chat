import { route_endpoint } from "../config/endpoint.js";
import { onFetch } from "../function/fetch.js";

class Messenger{

    constructor(content,type,token){

        if(!token){
            console.log(token)
            throw new Error("Token inválido")
        }

        this.content = content;
        this.type = type;
        this.token = token;
        console.log(this.type)
    }

    onSend(treatment){
 
        onFetch({
            url:route_endpoint.message.post+"?token="+this.token,
            method:"POST",
            body:{
                content:this.content,
                type:this.type
            }
        },{
            onThen(res){
                console.log(res)
                if(treatment){
                    if(treatment.onThen){
                        treatment.onThen(res);
                    }
                }
            },
            onCatch(){
                if(treatment){
                    if(treatment.onCatch){
                        treatment.onCatch();
                    }
                }
            }
        })

    }

}

export {
    Messenger
}