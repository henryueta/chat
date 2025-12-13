
const main_endpoint = "http://localhost:2010/";

const route_endpoint = {

    auth:{
        post:main_endpoint+"auth/post?teste=1"
    },
    message:{
        post:main_endpoint+"message/post"
    }

}

export {
    main_endpoint,
    route_endpoint
}