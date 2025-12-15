
class Message {

    #type;

    constructor(type,data){
        this.#type = type;
        this.message_element = document.createElement("article");
        this.message_element.setAttribute("class","message-article")
        const message_header = document.createElement("header");
        message_header.setAttribute("class","message-header")

        const message_username = document.createElement("span");
        message_username.setAttribute("class","message-username-span");
        message_username.textContent = data.username;

        const message_creation_hour = document.createElement("time");
        message_creation_hour.setAttribute("class","message-creation-date");
        message_creation_hour.setAttribute("datetime",data.creation_hour)
        message_creation_hour.textContent = data.creation_hour;
        
        message_header.append(message_username);
        message_header.append(message_creation_hour);

        const message_content = document.createElement("p");
        message_content.setAttribute("class","message-content");

        message_content.innerHTML = data.content;
        this.message_element.append(message_header);
        this.message_element.append(message_content);

        this.message_element.setAttribute("class",(
            type === 'external'
            ? "external-message"
            : "internal-message"
        ))
    }



}

export {
    Message
}