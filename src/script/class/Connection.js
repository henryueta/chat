import { route_endpoint,main_endpoint } from "../config/endpoint.js";

class Connection {

    constructor(){
        this.socket = io(main_endpoint);
    }



}

//     const socket = io("http://localhost:2010/")

//       document.querySelector("#submit-message")
//       .addEventListener("click",()=>{

//         const message = document.querySelector("#message-input")

//         if(!!message.value){
//           console.log(message)
//           socket.emit('message',message.value);
//         }

//       })

//   socket.on("connect", () => {
//     console.log("Conectado!", socket.id);
//   });

//   socket.on("message", (msg) => {
//     console.log("Mensagem:", msg);
//   });
  
//   socket.on("disconnect", () => {
//     console.log("Desconectado do servidor");
//   });

export {
    Connection
}