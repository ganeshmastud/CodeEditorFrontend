<template>
  <div class=" col-11 mx-auto p-0 mt-5">
    
    <form action="" @submit.prevent="postData()" method="post">
      <div class="sub-menu d-flex flex-row flex-wrap  mb-3">
        <div class="select">
          <div class="select-language">
            <label for="language">Select Language:</label>
          </div>
          <div class="select-box">
             <select class="p-1"  name="language" @click="changeLang()" v-model="post.select_language" id="language">
              <option  value ="" disabled>Select language </option>
              <option value="c">C</option>
              <option value="cpp">C++</option>
              <option value="java">Java</option>
              <option value="python">Python</option>
            </select>
          </div>
       
      </div>
       <div class="select">
          <div class="theme">
            <label for="editor-theme">Select Theme:</label>
          </div>
          <div class="select-themes">
               <select class="p-1" name="editor_theme"  v-model="editor_theme" id="editor-theme">
                  <option  value ="" disabled>Select Theme </option>
                  <option value="eclipse">eclipse</option>
                  <option value="solarized_dark">solarized_dark</option>
                  <option value="solarized_light">solarized_light</option>
                  <option value="terminal">terminal</option>
                  <option value="twilight">twilight</option>
                  <option value="textmate">textmate</option>
                  <option value="dracula">dracula</option>
                  <option value="tomorrow_night_eighties">tomorrow_night_eighties</option>
                  <option value="tomorrow_night_blue">tomorrow_night_blue</option>

              </select>
          </div>
         
      </div>
       
       <div class="run-code mt-4">
        <button class="btn btn-primary " type="submit"  :disabled='processing'>
           <b-spinner small v-if='processing'></b-spinner>
                        
          <span class="sr-only" v-if='!processing'>Run</span>
          
       </button>
       
      </div>
      <span class="sr-only mt-4 p-1 text-primary" v-if='processing'><pre> Executing ...</pre></span>
      </div>
      
      <div class="code-section d-flex flex-row flex-wrap flex-sm-wrap flex-md-nowrap
       flex-lg-nowrap justify-content-between">
        
        <div class="code-box col-12 col-xs-12   col-sm-12 col-md-6 mb-2">
          <div class="code-input-label"> <span>Write code here:</span></div>
          <div class="code-write" >
          
          <editor v-model="post.codearea" @init="editorInit" :lang="language" :theme="editor_theme" width="100%" height="100%"></editor>

        <!-- <textarea name="codearea" v-model="post.codearea"  id="codeinput"    cols="120"  rows="20"  ></textarea> -->
        </div>
        </div>
        <div class="code-output-innerbx-box col-xs-12 col-12 col-sm-12 col-md-6">
            
            <div class="code-output-innerbx ">
                <div class="code-output-label"><span> &ThinSpace; Output:</span></div>
                <div class="code-output-container">
                    <pre class="code-output" v-if="!program_error">{{programOutput}}</pre>
                    <div class="code-output" v-if="program_error">{{programOutput}}</div>  
                </div>  
                          
            </div>
        </div>
        

      </div>
      
      
      
    </form>
  </div>
  
</template>

<script>
import axios from "axios";
// import AppConfig from '@/config';
// const { apiBaseUrl } = AppConfig;
export default {
  name: "CodeCompiler",
  
  data() {
    return {
      processing:false,
      language:'c_cpp',  //language specific syntax highlighting is a value set into vue2-ace-editor
      editor_theme:'',
      post: {
        userId: this.$store.state.auth.userId,
        select_language: 'c',
        codearea: '',
      },
      programOutput:'',
      program_error:false
    }
  },
  computed:{
    
  },
  methods: {
    changeLang(){ // based on selected language the code is highlighted
      if(this.post.select_language === 'python'){
          this.language = 'python';
      } else if(this.post.select_language === 'java'){
        this.language = 'java';
      } else if(this.post.select_language === 'c_cpp'){
        this.language = 'c_cpp';
      }

    },
    async postData() { //making post request to store the users code in file storage and url to the file storage in database
      this.processing=true;
      // console.log(this.post.userId,"type ", typeof this.post.userId)
      console.log("data sending data :", this.post);
      await axios
        .post(`http://localhost:3000/codes/${this.post.select_language}`, this.post)
        .then((res) => {
          this.processing =false;
          this.program_error =false;
          if(res.data.err) {
            this.programOutput = res.data.msg;
            this.program_error = true;
          } else {
              this.programOutput = res.data;
              this.program_error = false;
          }
          // console.log(typeof res.data, res.data.msg)
          
          

        }).catch( (err) => {
          this.processing =false;
          
          console.log("error ",err);
          // alert(err.message);
          alert(err);
          this.programOutput = err;
          
        })
    },
    editorInit: function () {
            require('brace/ext/language_tools') //language extension prerequsite...
            require('brace/mode/html')                
            require('brace/mode/python')    //language
            require('brace/mode/c_cpp')  
            require('brace/mode/java')  
            require('brace/mode/less')
            require('brace/theme/chrome')
            require('brace/theme/tomorrow_night_eighties')
            require('brace/theme/tomorrow_night_blue')
            require('brace/theme/eclipse')
            require('brace/theme/solarized_dark')
            require('brace/theme/solarized_light')
            require('brace/theme/terminal')
            require('brace/theme/twilight')
            require('brace/theme/textmate')
            require('brace/theme/dracula')

            require('brace/snippets/javascript') //snippet
            require('brace/snippets/python') 
        }
  },
  components: {
        editor: require('vue2-ace-editor'),
  },
  
};
</script>

<style scoped>
.select{
  margin-right:1em;
  margin-bottom:1em;
  outline:none;
  border:none;
}
.select select:hover{
  border:2px solid #7aa2dd;
  border-radius: 2px;
}
.select select:focus{
  border:2px solid #0d6efd;
}
.btn{
  padding: .22em 2em;
  margin-top:-.1em;
}
.code-write {
  /* width: 90%; */
  height:450px;
  border:1px solid grey;
}
.code-output-container{
  background-color:black;
  /* margin-left:.5em; */
  height:450px;
  /* width:100%; */
  /* height:100%; */
}
.code-output{
  color:white;
  /* overflow:hidden; */
  /* text-overflow: ellipsis; */
}
@media only screen and (min-width:760px){
  .code-output-container{
    margin-left: .5em;
    
  }

}
 
</style>
