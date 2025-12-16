import { Auth } from "./class/Auth.js";
import { Chat } from "./class/Chat.js";
import { Dialog } from "./class/Dialog.js";
import { Form } from "./class/Form.js";

const auth = new Auth();

let chat = new Chat(auth.token,auth.user,auth.connection);
chat.onLoadMessageList(auth.token,auth.user,false);

const auth_dialog = new Dialog("#auth-dialog","Verificação",null,!auth.token);

const auth_form = new Form("#auth-form",[
    {
        identifier:"#password-input",
        title:"Senha",
        name:"password"
    }
],(data)=>{
    auth.onLogin(data.get("password"),{
        onThen(){
            const current_auth = new Auth();
            console.log("current",current_auth);
            chat = new Chat(current_auth.token,current_auth.user,current_auth.connection);
            chat.onLoadMessageList(current_auth.token,current_auth.user,false);
            auth_dialog.onSwitch(false);
        }
    })
})




