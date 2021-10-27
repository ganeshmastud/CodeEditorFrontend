import Router from 'vue-router';

// import CodeEditor from '@/components/code_editor.vue';
import Home from '@/components/Home';
// import Register from '@/components/signup'; 
// import Login  from '@/components/login';

//router lazy loading added
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
            component:() => import(/* webpackChunkName: "Code Editor" */ "@/components/code_editor.vue") 

        },
        {
            name:'login',
            path:'/login',
            component: () => import(/* webpackChunkName: "Login"*/ "@/components/login")
        },
        {
            name:'register',
            path:'/signup',
            component:() => import (/*webpackChunkName: "Register"*/ "@/components/signup")
        }
       

    ]


});

export default router;