import axios from '@/axios';
// import AppConfig from '@/config';
// import {store} from '@/stores';


// const AppConfig = {
//   apiBaseUrl: 'http://localhost:3000',
// //   apiToken: store.state.auth.token
// };

// const { apiToken } = AppConfig;
// console.log("Token rec frm cofig:",apiToken);

// @todo Logic can be bettered to prevent hard-coding authenticated requests
export async function setRequestHeader(apiToken){
    console.log(apiToken);
    await axios.interceptors.request.use(
        request => {
                console.log("in axios interceptors");
                // if( request.url.includes( 'codes' ) || request.url.includes( 'user' )){
                    request.headers['Authorization'] = apiToken
                // }

            return request;
        },
        error => Promise.reject( error )
    );
}



