import { login } from '@/services/auth';
import {setRequestHeader} from '@/services/configureAxios';  
const KEY_TOKEN = 'token';
const KEY_EMAIL = 'email';
// const KEY_ROLE = 'role';
const KEY_USERID = 'userId';
const auth = {
    state: {
        token: localStorage.getItem( KEY_TOKEN ) || '',
        email: localStorage.getItem( KEY_EMAIL ) || '',
        userId:localStorage.getItem( KEY_USERID ) || '',
        // role: localStorage.getItem( KEY_ROLE ) || ''
    },
    getters: {
        isAuthenticated( state ) {
            return !!state.token;
        },
        getToken(state){
            return state.token;
        }
        // isAdmin( state ) {
        //     return state.role === 'admin';
        // }
    },
    mutations: {
        setToken( state, token ) {
            state.token = token;
        },
        setEmail( state, email ) {
            state.email = email;
        },
        setUserID(state, userId){
            state.userId = userId;
        }
        // setRole( state, role ) {
        //     state.role = role;
        // }
    },
    actions: {
        login( { commit }, credentials ) {
            return login( credentials )
                        .then( data => {
                            //
                            const { token, email,userId } = data
        
                            localStorage.setItem( KEY_TOKEN, token );
                            localStorage.setItem( KEY_EMAIL, email );
                            // localStorage.setItem( KEY_ROLE, role );
                            localStorage.setItem( KEY_USERID,userId  );
                            // console.log("in vuex store auth module login token recieved! ",token);
                            commit( 'setToken', token );
                            commit( 'setEmail', email );
                            commit('setUserID',userId)
                            // setRequestHeader(token);
                            // commit( 'setRole', role );
                            // Appconfig.apiToken=token;
                            return email;
                        });
        },
        logout( { commit } ) {
            localStorage.removeItem( KEY_TOKEN );
            localStorage.removeItem( KEY_EMAIL );
            localStorage.removeItem( KEY_USERID );
            // localStorage.removeItem( KEY_ROLE );
        
            commit( 'setToken', '' );
            commit( 'setEmail', '' );
            commit('setUserID', '');
            // commit( 'setRole', '' );

            return Promise.resolve();
        }
    },

};

setRequestHeader(auth.state.token)
export default auth;