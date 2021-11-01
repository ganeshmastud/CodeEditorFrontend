import axios from 'axios';
import { successHandler, errorHandler } from './helper';
import AppConfig from '@/config';

const  apiBaseUrl  = AppConfig;
console.log("apiBaseUrl ",apiBaseUrl)
export const login = async( credentials ) => {
    return await axios.post(
                 `http://localhost:3000/auth/login`,
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