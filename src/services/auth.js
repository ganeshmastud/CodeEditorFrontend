import axios from '@/axios';
import { successHandler, errorHandler } from './helper';
// import AppConfig from '@/config';

// const  apiBaseUrl  = AppConfig;
// console.log("apiBaseUrl ",apiBaseUrl)
// alert(process.env.VUE_APP_API_BASE_URL);
export const login = async( credentials ) => {
    return await axios.post(
                 `/auth/login`,
                credentials,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    } 
                }
            )
                .then( successHandler )
                .catch( errorHandler );
}; 