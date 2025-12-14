import { onFetch } from "../function/fetch.js";

class Form {
    #field_list;
    #form_element;
    #method;
    #url;
    #treatment;

    constructor(form_identifier,field_list,defaultOnSubmit,method,url,treatment){
        this.#field_list = [];

        if(!document.querySelector(form_identifier)){   
            throw new Error("Elemento de forms não identificado")
        }
        this.#form_element = document.querySelector(form_identifier);

        for(const field of field_list){
            if(field.identifier && field.name){
                this.#field_list.push({
                    element:document.querySelector(field.identifier),
                    title:field.title,
                    name:field.name
                })
            }
        }
        this.defaultOnSubmit = defaultOnSubmit ;
        this.#method = method;
        this.#url = url;
        this.#treatment = treatment || null;
        this.#form_element.onsubmit = (e)=>this.#onSubmit(e);
    }

    #onSubmit(e){
        e.preventDefault();
        const form_data = new FormData();
        for(const field of this.#field_list){

            if(!field.element.value){
                console.log(field)
                throw new Error("Campo "+field.title+ " inválido")
            }
            console.log(field)
            form_data.append(field.name,field.element.value)
            field.element.value = "";
        }

        if(this.defaultOnSubmit){
            this.defaultOnSubmit(form_data);
            return
        }

        onFetch({
            url:this.#url,
            method:this.#method,
            body:form_data
        },this.#treatment)

    }

}

export {
    Form
}