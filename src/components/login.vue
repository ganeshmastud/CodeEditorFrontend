<template>
    <div class="container my-4">
        <div class="row">
            <div class="login-form col-11 col-sm-8 col-md-6 col-lg-4 mx-auto"> 
                <!-- offset-0 offset-md-3 -->
                <h1 class="form-title" style="text-align:center">Login</h1>
               
                <form name="form" @submit.prevent="login">
                    <div class="form-group pb-2">
                        <label for="email">Email</label>
                        <input
                            type="email"
                            class="form-control"
                            name="email"
                            id="email"
                            placeholder="ganesh.mastud@gmail.com"
                            v-model="form.email"
                        />
                    </div>
                    <div class="form-group pb-2">
                        <label for="password">Password</label>
                        <input
                            type="password"
                            autocomplete="off"
                            class="form-control"
                            name="password"
                            id="password"
                            v-model="form.password"
                        />
                    </div>
                    <div class="form-group pb-2">
                        <button class="btn btn-primary mt-4 col-12" type="submit"
                        :disabled='processing'>
                        
                        <b-spinner small v-if='processing'></b-spinner>
                        
                        <span class="sr-only" v-if='!processing'>Login</span>
                        <span class="sr-only" v-if='processing'>&ThickSpace;loading</span>
                        </button>
                        <!-- <app-spinner v-if="processing" /> -->
                    </div>
                </form>
                <div class="text-muted">
                    
                    <div class="create-acc">
                        <small>Don't have an account? <router-link to="/signup">SignUp</router-link></small>
                    </div>
                </div>
                <div class="errors" v-if="error">
                    <span>{{error}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    
    export default {
        name: 'login',
        data() {
            return {
                processing: false,
                error:'',
                form: {
                    email: '',
                    password: ''
                }
            };
        },
        methods: {
            login() {
                
                if(this.form.email.length >0 && this.form.password.length > 0){
                    this.processing=true;
                    this.$store.dispatch( 'login', this.form )
                    .then( () =>{
                        this.processing=false;
                        alert("Login Successfully");
                        this.error=''
                        this.form.email ='';    
                        this.form.password= '';
                        this.$router.push(  '/'  );
                    })
                    .catch( err => {
                        // alert(err);
                        console.log("login error :",err);
                        this.form.email ='';    
                        this.form.password= '';
                        this.processing=false;
                        this.error="Please enter correct username and password."
                    });
                }else{
                    this.error="please fill all the form fields."
                }
                
                    // .then(()=>alert("Login successfull"))
            }
        }
    }
</script>

<style scoped>
    .login-form{
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
    .create-acc{
        text-align: center;
    }
    .errors{
        text-align: center;
        color:red;
    }
    label{
        color:black
    }
</style>