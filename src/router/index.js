import Router from 'vue-router';
import {store} from '@/stores';

// import CodeEditor from '@/components/code_editor.vue';
import Home from '@/components/Home';
// import PageNotFound  from '@/components/pageNotFound'
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
        ,{   
            name:'PageNotFound',
            path: "*",
            component: () => import(/*webpackChunkName: "PageNotFound"*/ "@/components/PageNotFound")
         }
       

    ]


});



let flag=true
router.beforeEach(( to, from, next ) => {
    console.log(from.name," from page to :",to.name);
     
      if( flag === true && to.name !== 'register' && to.name !== 'login'  && !store.getters.isAuthenticated ) {  //checks for the name of the router rather than path to the router *
        console.log("In APP login");
        flag = false;
        return next({ 
            name: 'login'
        });
    } else if( !flag && to.name === 'register' ){
        flag=true;
        return next('/signup');
        
    }

    next();
});

export default router;