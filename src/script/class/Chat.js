import { route_endpoint } from "../config/endpoint.js";
import { onFetch } from "../function/fetch.js";
import { Form } from "./Form.js";
import { Message } from "./Message.js";
import { Messenger } from "./Messenger.js";

class Chat {

    #message_form;
    #message_list;


    constructor(token,user,connection){

        this.hasConnection = !!(connection !== null && connection !== undefined);

        this.#message_list  = this.hasConnection ? document.querySelector("#message-list-container") : null;

        this.hasConnection && connection.onStreamEvent("message",(stream)=>{
                this.onLoadMessage((
                    !!(stream.username !== user.username)
                    ? 'external'
                    : 'internal'
                ),{
                    content:stream.content,
                    creation_date:stream.creation_date,
                    username:stream.username
                })
                return
        });

        this.#message_form = this.hasConnection ? new Form("#message-form",[
            {
                identifier:"#message-input",
                title:"Mensagem",
                name:"message"
            }
        ],(data)=>{
            const message = new Messenger(data.get("message"),"text",token)

            message.onSend({
                onThen(){
                    connection.onEmitMessage(data.get("message"),()=>{
                        // onSendMessage()
                    });
                }
            });
        })
        : null;

    }

    onLoadMessage(type,message){
        const stream_message = new Message(type,message);
        this.#message_list.append(stream_message.message_element);
        return 
    }

    onLoadMessageList(token,user){

        const onLoadMessageOfConnection = (message_list)=>{
            
            for(const message of message_list){
                this.onLoadMessage((
                    message.username === user.username
                    ? 'internal'
                    : 'external'
                ),message)
            }

        }

        if(this.hasConnection){
            onFetch({
                url:route_endpoint.message.get+"?token="+token,
                method:"GET"
              },{
                onThen(res){
                    const current_message_list = res.data.message_list;
                    onLoadMessageOfConnection(current_message_list)
                }
              })
        }
    }

}

export {
    Chat
}