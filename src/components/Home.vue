<template>
    <div class="col-12 col-lg-11 mx-auto">
        
        <div class="website-intro d-flex flex-wrap flex-sm-wrap flex-lg-nowrap">
            <div class="content mt-4 mx-auto">
                <div class="heading col-12 col-sm-12 col-md-10 mt-4 col-lg-10 mt-lg-5 d-flex">
                    <img class="logo " src="/assets/code_64.png" alt="codeeditor logo">
                    <h3> <span>Code Editor</span> </h3>
                </div>
                <div class="features rounded col-11 col-sm-11 mt-4 px-2 px-md-3 pb-4 mb-4 mx-auto">
                    <h4 class="h4 feature-list-heading pt-4">Features of the website</h4>
                    <ul class="feature-list">
                        <li class="feature"> Users can write code in available languages.</li>
                        <li class="feature"> After the user login, his last worked language and 
                            theme are made available to him.</li>
                        <li class="feature"> For each language, only one file can be stored and its 
                            path is stored into the Users document in DB.</li>
                        <li class="feature"> When the user changes language without executing the code. His written code is stored into vuex store.</li>
                        <li class="feature"> After the user changes language. The popup form opens with the option to get the last executed code.</li>
                        <li class="feature">Code Download option is available.</li>
                     </ul>
                </div>
                <div class="start-coding-container col-11 mx-auto">
                    <div class="start-coding">
                        <button @click="startCoding()" class="btn btn-primary float-right"
                        title="take you in the code editor">Start Coding</button>
                    </div>
                     
                </div>
                
            </div>
            
            <div class="image-illustrator col-12 col-sm-12 col-md-10 col-lg-8 mx-auto">
                 <img class="coding-image" src="/assets/coding.jpg" alt="person coding in image">
                 <!-- <b-skeleton-img>
                 </b-skeleton-img> -->
            </div>
        </div>
        
    </div>
</template>   

<script>
export default {
    name:'Home',
    computed:{
        isAuthenticated() {
            return this.$store.getters.isAuthenticated;
        }
    },
    methods:{
        startCoding(){
            if(this.isAuthenticated){
                this.$router.push(  '/codeeditor' );
            }
            else{
                this.$router.push(  '/login' );
            }
        }
    }
}
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Paytone+One&display=swap');
</style>
<style scoped>
    .logo{
        margin:35px 20px;
        height:50px;
        width:50px;
    }

    h3 {
    /* margin: 20px; */
    font-family: 'Paytone One', sans-serif;
    color: #202020;
    text-transform: uppercase;
    letter-spacing: -2px;
    }

    h3 span {
    display: block;
    margin: 11px 0 17px 0;
    font-size: 80px;
    line-height: 80px;
    color: #3e83e9;
    text-shadow: 0 13.36px 8.896px #c4b59d,0 -2px 1px #fff;
    letter-spacing: -4px;
    }
    .feature-list{
        margin-top: 2em;
        margin-left: 0px;
        margin-right:0px;
        /* padding-left:.8em; */
        list-style-type: " > ";
    }
    .feature-list-heading{
        padding-left:.8em;
    }
    .coding-image{
        width:100%;
        height:100%;
    }
    .features{
        background-color:#3e83e9;
        color:white;
    }
    .feature{
        padding-left:0;
        line-height:1.5em;
        
    }
    .start-coding .btn{
        float:right;        
    }
    
     @media only  screen and (max-width:480px){
        .heading h3 span{
            font-size: 70px;
            line-height: 70px;
        }
    }
    @media only  screen and (max-width:360px){
        .heading h3 span{
            font-size: 60px;
            line-height: 50px;
        }
    }
    @media only  screen and (max-width:300px){
        .heading h3 span{
            font-size: 50px;
            line-height: 40px;
        }
    }
    
</style>