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
                    creation_hour:stream.creation_hour,
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
            const messenger = new Messenger(data.get("message"),"text",token,connection)

            messenger.onSend();
        })
        : null;

    }

    onLoadMessage(type,message){
        const stream_message = new Message(type,message);
        this.#message_list.append(stream_message.message_element);
        return 
    }

    onLoadMessageListPeriod(date,is_today){

        const message_list_period = document.createElement("div");
        message_list_period.setAttribute("class","message-list-period");
        if(!date){
            throw new Error("Período de registro de mensagens inválido")
        }
        message_list_period.textContent = (
            !!is_today
            ? "Hoje"
            : date
        );
        this.#message_list.append(message_list_period);

    }

    onLoadMessageList(token,user){

        const onLoadMessageOfConnection = (message_list)=>{
            
            for(const message of message_list){
                if(!!message.is_first_of_day){
                    this.onLoadMessageListPeriod(message.creation_date,message.is_today)
                }
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