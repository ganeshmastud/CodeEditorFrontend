<template>
    <div class="container col-11 col-lg-12 my-4">
        <div class="row">
            <div class="col-11 col-sm-8 col-md-6 col-lg-4 mx-auto alert alert-success " v-if="success">
                <div class="title d-flex justify-content-between " style="border-bottom:1px solid green ">
                    <span style="display:inline-block"><strong>{{toast_obj.title}}</strong></span>    
                    <span class="close" style="display:inline-block" @click="CloseToast()"><strong>X</strong>  </span>
                    
                </div>
                <div class="message">
                    {{toast_obj.message}}
                </div>
            </div>
        
            <div class="signup-form col-11 col-sm-8 col-md-6 col-lg-4 mx-auto">
                <!-- offset-0 offset-md-3 -->
                <h1 class="form-title" style="text-align:center">Sign Up</h1>
                <!-- <hr /> -->
                <form name="form" @submit.prevent="signup">
                    <div class="form-group pb-2">
                        <label for="username">Name</label>
                        <input
                            type="text"
                            class="form-control"
                            name="username"
                            id="username"
                            placeholder="Ganesh Mastud"
                            v-model="form.name"
                            required
                        />
                    <div v-if="username_err"> <span class="error">{{username_err}}</span></div>    
                    </div>
                    <div class="form-group pb-2">
                        <label for="email">Email</label>
                        <input
                            type="email"
                            class="form-control"
                            name="email"
                            id="email"
                            placeholder="ganesh.mastud@gmail.com"
                            v-model="form.email"
                            required
                        />
                        <div v-if="email_err"><span class="error">{{email_err}}</span></div>
                    </div>
                    <div class="form-group pb-2">
                        <label for="password">Password</label>
                        <input
                            type="password"
                            autocomplete="off"
                            class="form-control"
                            placeholder="ex. Password@123"
                            name="password"
                            id="password"
                            v-model="form.password"
                            required
                        />
                        <div v-if="password_errs"><span class="error" v-for="err,idx in password_errs" :key="idx">{{err}}</span></div>
                    </div>
                    <div class="form-group">
                        <label for="retype_password">Retype Password</label>
                        <input
                            type="password"
                            autocomplete="off"
                            class="form-control"
                            name="retype_password"
                            id="retype_password"
                            v-model="form.retype_password"
                            required
                        />
                        <div v-if="retype_password_err"><span class="error">{{retype_password_err}}</span></div>
                    </div>
                    <div class="form-group">
                        <button class="btn btn-primary mt-4 col-12" 
                        @click="checkAllFieldPresent()" type="submit"
                        :disabled='processing'>
                        <b-spinner small v-if='processing'></b-spinner>
                        <span class="sr-only" v-if='!processing'>Sign Up</span>
                        <span class="sr-only" v-if='processing'>&ThickSpace;loading</span></button> 
                        
                        <!-- <app-spinner v-if="processing" /> -->
                    </div>
                </form>
                <div class="text-muted">
                    <div>
                    </div>
                    <div class="signin-acc">
                        <small>Already have an account? <router-link to="/login">SignIn</router-link></small>
                    </div>
                    <div v-if="blank_field_err"><span class="error err">{{blank_field_err}}</span></div>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script>
    import axios from 'axios';
    import AppConfig from '@/config';
    // import toast_notification from './common_utlis/toast_notification.vue'
    const { apiBaseUrl } = AppConfig;
    export default {
        name: 'Register',
        data() {
            return {
                success:false,
                processing: false,
                form: {
                    name:'',
                    email: '',
                    password: '',
                    retype_password:''
                },
                username_err:'',
                email_err:'',
                password_errs:[],
                retype_password_err:'',
                blank_field_err:'',
                flag:true,
                toast_obj:{
                    variant:"success",
                    message : "Congratulations! you have register successfully",
                    title :"Success"
                }
            };
        },
        components:{
            // toastnotification: () => import (/*webpackChunkName: "toast_notification"*/  "./common_utlis/toast_notification.vue")
        },
        methods: {
            CloseToast(){
                this.success=!this.success
                this.$router.push(  '/login' );
            },
            clearForm(){
                this.form.name='';
                this.form.email='';
                this.password ='';
                this.retype_password='';
            },
            validateForm(password){
                
                let hasNumber = /\d/ //new RegExp('d'); 
                let uppercase =/[A-Z]+/g //new RegExp('+[A-Z]','g');
                let lowecase = /[a-z]+/g
                let specialSymbol = /[!@#$%^&*()?:";{'`~/,.<>}]+/g
                let email_regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

                if(this.form.name.length < 9){
                    this.username_err="please enter the Full name atleast 9 characters long";
                    this.flag=false;
                }else{
                    this.username_err="";
                }
                if(!email_regex.test(this.form.email)){
                    this.email_err = "please enter the right email"
                    this.flag=false
                }
                if(password.length <8){
                    this.password_errs.push("Password should be 8 character long")
                    this.flag=false;
                }
                if(!hasNumber.test(password)){
                    this.password_errs.push('Password should contains atleast 1 number')
                    this.flag=false;
                }
                if(!uppercase.test(password)){
                    this.password_errs.push('Password should contains atleast 1 uppercase letter')
                    this.flag=false;
                }
                if(!lowecase.test(password)){
                    this.password_errs.push('Password should contains atleast 1 lowercase letter')
                    this.flag=false;
                }
                if(!specialSymbol.test(password)){
                    this.password_errs.push('Password should contains atleast 1 Special letter')
                    this.flag=false;
                }
                if(this.form.password !== this.form.retype_password){
                    this.retype_password_err ="Password doesn't match, please enter the same password again"
                    this.flag=false;
                }              
            },
            checkAllFieldPresent(){
                
                if(this.form.name ==='' || this.form.email ===''|| this.form.password==='' || this.form.retype_password ===''){
                    this.blank_field_err ="Please fill all the form fields."
                } else{
                    this.blank_field_err="";
                }
            },
             signup (){
                // console.log("in Signup");
                this.processing=true;
                this.username_err='';
                this.email_err='';
                this.password_errs=[]
                this.retype_password_err='';
                // this.flag=true
                const credentials = { };
                // let promise = new Promise( function(){
                this.validateForm(this.form.password);
                    
                // })
                // promise.then(async function(){
                    credentials.name = this.form.name;
                    credentials.email = this.form.email;
                    credentials.password = this.form.password;
                    if(this.flag){
                        
                         axios.post(
                            `${apiBaseUrl}/auth/register`,
                            credentials,
                            {
                                headers: {
                                    'Content-Type': 'application/json'
                                }
                            }
                        )
                        .then((res)=>{
                            this.processing=false;
                            console.log(res);
                            this.clearForm();
                            this.toast_obj.variant="success";
                            this.toast_obj.title = "Success"
                            this.toast_obj.message = "Congratulations! you have register successfully."
                            // this.success=true;
                            alert("Congratulations! you have register successfully.");
                            this.flag=false;
                            this.$router.push(  '/login' );
                        }  )
                        .catch( (error)=>{
                            this.clearForm();
                            console.log(error.message);
                            alert(error.message);
                            this.flag=true;
                            this.processing=false;
                        }  );
                    } else{
                        this.processing=false;
                        this.flag=true;
                    }
                // })
                    
                   
               
                 
                // console.log("register data: ",this.form)
                // https://mymeetingsapp.herokuapp.com/api/auth/register
                // this.$router.push(  '/'  )
                
               
            },
            
        }
    }
</script>

<style scoped>
    .signup-form{
        border:2px solid #0d6efd;
        border-radius: .5em;
        padding-bottom:1em;
    }
    .form-group input:hover{
       border:2px solid #7aa2dd;
       border-radius: .2em;
    }
    .form-title{
        color:#0d6efd;
        padding-bottom: .5em;
    }
    label{
        color:black
    }
    .signin-acc{
        text-align: center;
    }
    .error{
        display: block;
        color:red;
        font-size:12px ;
    }
    .err{
        text-align: center;
    }
    .close{
        padding:3px;
        margin-top:-3px;

    }
    .close:hover{
        
        background-color:  lightgreen;

    }
</style>