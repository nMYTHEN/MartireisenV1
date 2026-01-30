

const config = useRuntimeConfig()

const auth = {
    username       : 'spa-marti', 
    password    : '123456Ab_', //'Spa2022_',
    token       : '',
}


export default defineEventHandler(async (event) => {

    const req = event.node.req;
    const res = event.node.res;

    if(auth.token == ''){
        await login();
    }
     
    let data = {};
    const cookies = parseCookies(event)
    
    let language = cookies['store-language'] || 'de';
    let currency = cookies.currency|| 'TRY';

    const headers = {
        "X-Request-Language" : language.toString(),
        "X-Request-Currency" : currency.toString(),
        "Authorization" : "Bearer "+auth.token
    };
    

    const requestParams = {
        headers : headers,
        method : req.method
    };

    if(req.method == 'POST'){
        requestParams['body'] =  await readBody(event)
    }

    data = await $fetch(`${config.BASE_URL}${req.url}`,requestParams);
    return data
})


const login = async () => {

    $fetch(`${config.BASE_URL}/api/auth/login`,{
        method : 'POST',
        body : auth
    }).then((r)=> {
      
        if(r.status){
            auth.token = r.data.token;
        }
    })

}