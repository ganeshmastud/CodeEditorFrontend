<template>
    <div class="container col-11 col-lg-12 my-4">
        <div class="row">
            <div class="signupform col-11 col-sm-8 col-md-6 col-lg-4 mx-auto">
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
                            placeholder="john doe"
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
                            placeholder="john.doe@example.com"
                            v-model="form.email"
                            required
                        />
                        <div v-if="email_err">{{email_err}}</div>
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
                        <button class="btn btn-primary mt-4 col-12" @click="checkAllFieldPresent()" type="submit">Sign Up</button>
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
    // import Vue from 'vue';
    // import config from '@/config';
    export default {
        name: 'Register',
        data() {
            return {
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
                flag:true
            };
        },
        methods: {
            validateForm(password){
                
                let hasNumber = /\d/ //new RegExp('d'); 
                let uppercase =/[A-Z]+/g //new RegExp('+[A-Z]','g');
                let lowecase = /[a-z]+/g
                let specialSymbol = /[!@#$%^&*()?:";{'`~/,.<>}]+/g
                if(this.form.name.length <=2){
                    this.username_err="please enter the username atleast 3 characters long";
                }else{
                    this.username_err="";
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
                this.username_err='';
                this.email_err='';
                this.password_errs=[]
                this.retype_password_err='';
                this.flag=true
                const credentials = { };
                
                credentials.name = this.form.name;
                
                credentials.email = this.form.email;
                credentials.password = this.form.password;
                this.validateForm(this.form.password);
                // console.log("register data: ",this.form)
                // https://mymeetingsapp.herokuapp.com/api/auth/register
                // this.$router.push(  '/'  )
                if(this.flag){
                     axios.post(
                        'https://mymeetingsapp.herokuapp.com/api/auth/register',
                        credentials,
                        {
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        }
                    )
                    .then(()=>{
                        alert("Congratulations! you have register successfully.")
                        this.$router.push(  '/login'  )
                    }  )
                    .catch( (error)=>console.log(error.message) );
                }
               
            }
        }
    }
</script>

<style scoped>
    .signupform{
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
</style>