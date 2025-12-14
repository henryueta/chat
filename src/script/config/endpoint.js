
const main_endpoint = "http://localhost:2010/";

const route_endpoint = {

    auth:{
        post:main_endpoint+"auth/post"
    },
    message:{
        post:main_endpoint+"message/post",
        get:main_endpoint+"message/get"
    },
    checkout:{
        get:main_endpoint+"checkout/get"
    }

}

export {
    main_endpoint,
    route_endpoint
}