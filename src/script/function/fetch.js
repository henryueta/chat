
const onFetch = (data,treatment)=>{
    
    fetch(data.url,{
        method:data.method,
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        },
        body:JSON.stringify(data.body),
        
    })
    .then((res)=>res.json())
    .then((res)=>{
        console.log(res)
        if(res.status === 201 || res.status === 200){
           if(treatment.onThen){
                return treatment.onThen(res)
           }
           return
        }
        return treatment.onCatch(res)
    })
    .catch((error)=>{

        if(treatment.onCatch){

            return treatment.onCatch(error)

        }

        throw new Error(error)
        
    })

}

export {
    onFetch
}