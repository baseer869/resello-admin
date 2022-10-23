
import axios from "axios";

export default async function Api(path, params, method, token) {

console.log("path==>", path, token)
    let options;
   
    options = {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            // lang:"en"
            'Access-Control-Allow-Origin' : '*',
        },
       
        method: method,
        ...(params && { body: JSON.stringify(params) })
    };
    if(token){
        options.headers.Authorization = `${token}`
    }
    try {
        const resp = await fetch(path, options);
        const json = await resp.json();
        // console.log('-->', path, ' ', json?.Success,
        //     '\nparam:', JSON.stringify(params),
        //     '\nres:', JSON.stringify(json), '\n------------------\n');

        if (json.error === 'Quota exceeded') {
            return 500
        } else {
            return json;
        }
    } catch (error) {
        if (error.message === 'Network request failed') {

            // Navigationse.goBack()
            alert('Network error. Please make sure you are connected to internet.'); //prodiuction

        }
        console.log(error);
        // alert(error.message)  // for developemenet
        console.log('-->', path, ' false',
            '\nparam:', JSON.stringify(params), '\n------------------\n');
        return false;
    }
}


