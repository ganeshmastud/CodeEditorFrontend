import axios from 'axios';
import { successHandler, errorHandler } from './helper';

export const login = async( credentials ) => {
    return await axios.post(
                 'http://localhost:3000/auth/login',
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