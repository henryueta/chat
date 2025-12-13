
class Dialog {

    #title;
    #content;
    #dialog_element;

    constructor(identifier,title,content,isOpen){
            this.#dialog_element = document.querySelector(identifier);
            this.#title = title;
            this.#content = content;    
            this.isOpen = isOpen;
            this.onDisplay();
    }

    onSwitch(isOpen){
        this.isOpen = isOpen;
        this.onDisplay();
    }

    onDisplay(){

        if(!!this.isOpen){
            this.#dialog_element.show();
            return
        }

        this.#dialog_element.close();
        return
    }   

}

export {
    Dialog
}
