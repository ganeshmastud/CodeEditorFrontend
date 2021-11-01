import axios from 'axios';
// import AppConfig from '@/config';
// import {store} from '@/stores';


// const AppConfig = {
//   apiBaseUrl: 'http://localhost:3000',
// //   apiToken: store.state.auth.token
// };

// const { apiToken } = AppConfig;
// console.log("Token rec frm cofig:",apiToken);

// @todo Logic can be bettered to prevent hard-coding authenticated requests
export function setRequestHeader(apiToken){
    axios.interceptors.request.use(
        request => {
            // if( request.url.includes( 'meetings' ) || request.url.includes( 'sessions' ) ) {
                // 'Bearer <token>' is just the requirement for workshops app
                // In meetings app only token is sent (no 'Bearer ' prefix should be passed)
                if( request.url.includes( 'codes' )){
                    request.headers['Authorization'] = apiToken
                }
            // }

            return request;
        },
        error => Promise.reject( error )
    );
}



