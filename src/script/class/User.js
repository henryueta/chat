
class User{

    constructor(username){

        let local_username = localStorage.getItem("username");

        if(!local_username && !!username){
            localStorage.setItem("username",username)
            local_username = localStorage.getItem("username")
        }

        this.username = local_username

    }

}

export {
    User
}