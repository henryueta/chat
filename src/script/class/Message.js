
class Message {

    #type;
    #content;

    constructor(type,content){

        this.#type = type;
        this.#content = content;
        this.message_element = document.createElement("span");
        this.message_element.textContent = content;
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