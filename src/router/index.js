import Router from 'vue-router';

import CodeEditor from '@/components/code_editor.vue';
import Home from '@/components/Home';
import Register from '@/components/signup'; 
import Login  from '@/components/login';
const router = new Router({
    mode:'history',
    routes:[
         {
            name:'Home',
            path:'/',
            component:Home
        },
        {
            name:'codeEditor',
            path:'/codeeditor',
            component:CodeEditor

        },
        {
            name:'login',
            path:'/login',
            component:Login
        },
        {
            name:'register',
            path:'/signup',
            component:Register
        }
       

    ]


});

export default router;