import { Form } from "./Form.js";
import { Message } from "./Message.js";
import { Messenger } from "./Messenger.js";

class Chat {
    #message_form;
    #message_list;


    constructor(token,connection){
        
        this.#message_list  = document.querySelector("#message-list-container")
        this.teste= 1;
        connection.onStreamEvent("message",(stream)=>{
            if(stream.id !== token){
                const external_stream_message = new Message('external',stream.message)
                this.#message_list.append(external_stream_message.message_element)
                return
            }
            
        })

        this.#message_form =  new Form("#message-form",[
            {
                identifier:"#message-input",
                title:"Mensagem",
                name:"message"
            }
        ],(data)=>{
            console.log(token)
            const message = new Messenger(data.get("message"),"text",token)
            const onSendMessage = ()=>{
                const internal_stream_message = new Message('internal',data.get("message"))
                this.#message_list.append(internal_stream_message.message_element)
            }

            message.onSend({
                onThen(){
                    connection.onEmitMessage(data.get("message"),(value)=>{
                        onSendMessage()
                    })
                }
            });
        });
        
        // this.#message_list = document.querySelector(message_list_identifier);

    }

}

export {
    Chat
}