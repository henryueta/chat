import { Auth } from "./class/Auth.js";
import { Form } from "./class/Form.js";
import { main_endpoint} from "./config/endpoint.js";

// const connection = new Connection("Cell#1994")

const auth = new Auth();




const auth_form = new Form("#auth-form",[
    {
        identifier:"#password-input",
        title:"Senha",
        name:"password"
    }
],(data)=>{
    auth.onLogin(data.get("password"))
})

