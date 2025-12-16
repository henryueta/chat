import { route_endpoint } from "../config/endpoint.js";
import { onFetch } from "../function/fetch.js";
import { Form } from "./Form.js";
import { Message } from "./Message.js";
import { Messenger } from "./Messenger.js";

class Chat {

    #message_form;
    #message_list;
    #list_view_page = 1;

    constructor(token,user,connection){

        this.hasConnection = !!(connection !== null && connection !== undefined);

        this.#message_list  = this.hasConnection ? document.querySelector("#message-list-container") : null;

        this.hasConnection && connection.onStreamEvent("message",(stream)=>{
            if(!!stream.is_first_of_day){
                this.onLoadMessageListPeriod(stream.creation_date,stream.is_today)
            }

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

        this.#message_list.addEventListener('scroll',()=>{
            console.log(this.#message_list.scrollTop)
            if(this.#message_list.scrollTop === 0){
                // this.#message_list.innerHTML = '';
                this.onLoadMessageList(token,user,true);
            }


        })

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

    onLoadMessage(type,message,was_ordered_manually){
        const stream_message = new Message(type,message);
        if(was_ordered_manually){
            this.#message_list.insertBefore(stream_message.message_element,this.#message_list.firstChild)
            return
        }
        this.#message_list.append(stream_message.message_element);
            // this.#message_list.scrollTop = this.#message_list.scrollHeight;
        return 
    }

    onLoadMessageListPeriod(date,is_today,was_ordered_manually){

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

        if(was_ordered_manually){
            this.#message_list.insertBefore(message_list_period,this.#message_list.firstChild)
            return
        }

        this.#message_list.append(message_list_period);
        return
    }

    onLoadMessageList(token,user,was_ordered_manually){

        const onLoadMessageOfConnection = (page,message_list)=>{
            
            this.#list_view_page = page;

            const previous_height = this.#message_list.scrollHeight;

            for(const message of message_list){
                if(!!message.is_first_of_day){
                    this.onLoadMessageListPeriod(message.creation_date,message.is_today,was_ordered_manually)
                }
                this.onLoadMessage((
                    message.username === user.username
                    ? 'internal'
                    : 'external'
                ),message,was_ordered_manually)
                
            }
            this.#message_list.scrollTop = (
                !!was_ordered_manually
                ? (()=>{
                    const current_height = this.#message_list.scrollHeight;
                    return current_height - previous_height;
                })()
                : previous_height
            );
        }

        if(this.hasConnection){
            onFetch({
                url:route_endpoint.message.get+"?token="+token+"&page="+this.#list_view_page,
                method:"GET"
              },{
                onThen(res){
                    const current_message_list = res.data.message_list;
                    const current_page = res.data.current_page;
                    onLoadMessageOfConnection(current_page,current_message_list);
                }
              })
        }
    }

}

export {
    Chat
}