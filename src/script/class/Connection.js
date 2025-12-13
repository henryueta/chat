import { main_endpoint } from "../config/endpoint.js";

class Connection {

    constructor(token){
        this.socket = io(main_endpoint,{
            autoConnect:true,
            reconnection:true,
            reconnectionAttempts:Infinity,
            reconnectionDelay:1000,
            auth:{
                token
            }
        });
        // this.socket.on("message", (stream) => {
            
        //     if(stream.id !== token){
        //         console.log("Mensagem:", stream);
        //     }

        // });
    }

    onEmitMessage(value,onResponse){
        if(!!value){
            onResponse(value)
            this.socket.emit('message',value);
        }
       
    }

    onStreamEvent(event,onEvent){
        this.socket.on(event,(stream)=>{
            onEvent(stream);
            return
        })
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