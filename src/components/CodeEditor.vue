<template>
  <div class="col-12 mx-auto p-0  position-relative"  :style="[load_code?disablecntr:'',load_code?body:'']"> 
    <!-- :style="[load_code?disablecntr:'']" -->
                
      <div class=" col-11 mx-auto p-0 mt-5 "  :style="[load_code?disabledbutton:'']">
      <h4 class="heading font-weight-normal text-primary">Code Editor for  <b>{{post.select_language}}</b> language is open.</h4>  
      <form action="" @submit.prevent="postData()" method="post">
        <div class="sub-menu d-flex flex-row flex-wrap  mb-3">
            <div class="select">
              <div class="select-language">
                <label for="language">Select Language:</label>
              </div>
              <div class="select-box">
                <select class="p-1"  name="language" title="select language you prefer to write code."
                @click="changeLang()" v-model="post.select_language" id="language">
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
                    <select class="p-1" name="editor_theme" title="Select theme for code editor"  
                    @click="changeTheme()" v-model="editor_theme" id="editor-theme">
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
              <button class="btn btn-primary " title="Run/Execute the code" type="submit"  :disabled='processing'>
                <b-spinner small v-if='processing'></b-spinner>
                              
                <span class="sr-only" v-if='!processing'>Run</span>
                
              </button>
            
            </div>

            <span class="sr-only mt-4 p-1 text-primary" v-if='processing'><pre> Executing ...</pre></span>
            <div class="downloadcode mt-4 mx-2">
              <button class="btn btn-primary " @click="downloadCode()" title="downloads the code" type="submit"  
              :disabled='downloading'>
                <b-spinner small v-if='downloading'></b-spinner>
                              
                <span class="sr-only" v-if='!downloading'>Download</span>
                
            </button>
            </div>
            <span class="sr-only mt-4 p-1 text-primary" v-if='downloading'><pre> Downloading ...</pre></span>

        </div>
        
        
        <div class="code-section d-flex flex-row flex-wrap flex-sm-wrap flex-md-nowrap
        flex-lg-nowrap justify-content-between">
          
          <div class="code-box col-12 col-xs-12   col-sm-12 col-md-6 mb-2">
            <div class="code-input-label"> <span class="info">Write code here:</span></div>
            <div class="code-write" >
            
            <editor v-model="post.codearea" @init="editorInit" :lang="language" :theme="editor_theme" width="100%" height="100%"></editor>

          <!-- <textarea name="codearea" v-model="post.codearea"  id="codeinput"    cols="120"  rows="20"  ></textarea> -->
          </div>
          </div>
          <div class="code-output-innerbx-box col-xs-12 col-12 col-sm-12 col-md-6">
              
              <div class="code-output-innerbx ">
                  <div class="code-output-label"><span class="info"> &ThinSpace; Output:</span></div>
                  <div class="code-output-container" title="Contains ouput after execuing code.">
                      <pre class="code-output" v-if="!program_error">{{programOutput}}</pre>
                      <div class="code-output" v-if="program_error">{{programOutput}}</div>  
                  </div>  
                            
              </div>
          </div>
          

        </div>
        
        
      </form>
    
    
    
    
      </div>
      <div class=" col-11 mx-auto p-0 mt-5 position-relative d-flex" :style="[load_code?disable_bg:'']">
          <div class="fetch-code col-8 position-fixed" v-if="load_code">
        
            <b-card border-variant="primary"  class="col-12 mt-4"
              header="Do you like to continue where you leftOff"
              header-bg-variant="primary"  header-text-variant="white">
              <b-card-text>
                <b-row>
                  <b-col v-if="load_code_from_codeFiles">
                      <div class="mb-4 mt-4"> By clicking on <b>Load Code</b> last executed code will be loaded.</div>
                          <b-button @click="loadCodeFromCodeFiles()"  variant="primary">Load Code</b-button>
                      </b-col>
                    <!-- <b-col v-if="load_code_from_store">
                        <div class="mb-4 mt-4">By clicking on <b>Get Code</b> last unsaved/unexecuted code will be loaded.</div>
                        <b-button  @click="lastUnsavedCode()"  variant="primary">Get Code</b-button>
                    </b-col> -->

                </b-row>
              
              
              </b-card-text>
          

            </b-card>
          </div>
         <!-- <div  class="fetch-code-close"><span>+</span></div>  -->
      </div>
      
  </div>
  
  
</template>

<script>
import axios from "@/axios";
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
      program_error:false,
      change_lang:false,
      load_code:false,
      downloading:false,
      load_code_from_store:false,
      load_code_from_codeFiles: false,
      prev_selected_lang:'',
      codeFilePath:'',
      disablecntr:{
        'background-color': 'rgba(0, 0, 0, 0.7)',
        'overflow':'hidden'
      },
      disable_bg:{
        'width':'100%',
        'height':'100%',
        'background-color': 'rgba(0, 0, 0, 0.7)',
        'overflow':'hidden'
      },
      body:{
        'overflow':'hidden'
      },
      disabledbutton: {
         'pointer-events':'none',
          'opacity':'0.4',
      }
    }
  },
  computed:{
    getCodeFiles(){
      return this.$store.getters.getCodeFiles;
    },
    getCode(){
      return this.$store.getters.getCode;
    },
    getTheme(){
      return this.$store.getters.getTheme;
    },
    getLanguage(){
      return this.$store.getters.getLanguage
    }

  },
  methods: {
    async downloadCode(){
      this.downloading = true;
     if( this.checkCodeFilePath()) {// fn returns boolean val 
        let codeFilePath = {codeFilePath:this.codeFilePath,language:this.post.select_language}
        let extension = this.codeFilePath.split(".")[1];
         if(this.post.select_language === 'java'){
          extension='java'
        }
        let filename= this.post.select_language+'.'+extension;
       
        console.log(filename);
         await axios.post(`/downloadcode/`,codeFilePath,{ responseType: "blob" })
        .then(res =>{
          console.log(res);
          const blob =new Blob([res.data]);
          const link = document.createElement("a");
          link.href = URL.createObjectURL(blob);
          link.download =filename;
          link.click();
          URL.revokeObjectURL(link.href);
          this.downloading = false;
        })
        .catch(err=>{
          alert(err);
          this.downloading = false;
        })
     }
    },
    changeTheme(){
      const userId =this.post.userId;
      const theme = this.editor_theme
      const themeDetails = {userId, theme};

      this.$store.dispatch('updateTheme', themeDetails)
    },
    async changeLang(){ // based on selected language the code is highlighted
      // this.change_lang=true;

      this.fetchCodeFiles()
      const userId =this.post.userId;
      const language = this.post.select_language;
      const languageDetails = {userId, language};
      this.prev_selected_lang = this.getLanguage;
      const prev_written_code = this.post.codearea;
      const addCodeObj = {};
      addCodeObj.prev_selected_lang = this.prev_selected_lang;
      addCodeObj.prev_written_code = prev_written_code;
      await this.$store.dispatch('addCode',addCodeObj)
      // const codeSaveDone =
      // console.log("codeSaveDone ",codeSaveDone);
      // if(codeSaveDone){
      //   this.post.codearea='';
      // }
      // console.log("prev written code",addCodeObj.prev_written_code)
      await this.$store.dispatch('updateLanguage', languageDetails)
      if(this.post.select_language === 'python'){
          this.language = 'python';
      } else if(this.post.select_language === 'java'){
        this.language = 'java';
      } else if(this.post.select_language === 'c_cpp'){
        this.language = 'c_cpp';
      }
      //  console.log("change lang in changeLangfile")
      this.intializeLangAndTheme()
      // console.log("In change filethis.getCode[this.post.select_language] ",this.getCode[this.post.select_language])
      
    }, 
    intializeLangAndTheme(){
      // console.log("in intializeLangAndTheme",this.post.select_language,"this.getLanguage", this.getLanguage)
      this.editor_theme = this.getTheme;
      this.post.select_language = this.getLanguage;
      this.checkCodeFilePath()
    },
    async fetchCodeFiles(){
      await this.$store.dispatch('fetchCodeFiles',this.$store.state.auth.userId);
      if(!this.checkCodeFilePath() && !this.getCode[this.post.select_language]) {
        this.load_code = false;
      } 
      if(this.checkCodeFilePath()) {
        this.load_code_from_codeFiles = true;
        this.load_code = true;
      } else {
        this.load_code_from_codeFiles = false;
      }
      // if(this.getCode[this.post.select_language]) {
      //   this.load_code_from_store =true;
      //   this.load_code =true;
      // } else {
      //   this.load_code_from_store =false;
      // }
      // console.log(this.getCode.length); now get code is obj not array
      // console.log("change lang in fetchCodeFiles")
      
    },
    checkCodeFilePath(){
      let flag =false;
      this.getCodeFiles.forEach(codefile =>{
        // console.log("codefile.language ",codefile.language);
        if(codefile.language === this.post.select_language){
            // console.log("codefile.language ",codefile.language);
            flag = true;
            this.codeFilePath = codefile.filepath;
        } 
      })
      if(!flag){
        this.codeFilePath = '';
      }
      return flag;
    },
    async loadCodeFromCodeFiles(){
      // const codeFilePath = ''
      // console.log("in loadCodeFromCodeFiles",this.codeFilePath);
      // const codeFilePath = this.codeFilePath
      
      // console.log("in loadCodeFromCodeFiles this.post.select_language ",this.post.select_language )
      let codeFilePath = {codeFilePath:this.codeFilePath,language:this.post.select_language}
      //  console.log("in loadCodeFromCodeFiles",typeof codeFilePath);
      await axios.post('/loadcode/',codeFilePath)
      .then(res =>{
        // console.log(res.data)
        this.post.codearea = res.data
      })
      this.load_code = false;
      this.load_code_from_codeFiles = false;
    },
    async lastUnsavedCode(){
     
      // this.post.codearea ='';
      
      this.post.codarea = await this.getCode[this.post.select_language];
      // console.log("lastunsaved code:",this.post.codarea)
      this.load_code = false;
      this.load_code_from_store =false;
      
    },
    async postData() { //making post request to store the users code in file storage and url to the file storage in database
      this.processing=true;
      // console.log(this.post.userId,"type ", typeof this.post.userId)
      // console.log("data sending data :", this.post);
      await axios
        .post(`/codes/${this.post.select_language}`, this.post)
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
          
          // console.log("error ",err);
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
 async created() {
     await this.fetchCodeFiles()
     this.intializeLangAndTheme();

    // console.log("getCodeFiles().length ",this.getCodeFiles.length);
    

    
  },
  
};
</script>

<style scoped>
  .fetch-code-close{
    color:white;
    font-weight:700;
    transform: rotate(45deg);
    position: absolute;
    top:0;
    right:0;
  }
  .fetch-code-close span{
    font-size:70px;
  }
  .disable{
    background-color: rgba(0, 0, 0, 0.6);
    /* z-index:0; */
  }
.select label{
  /* color:#0d6efd; */
  font-weight: 600;
}
.info{
  font-weight: 600;
}
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
  outline:3px solid #7aa2dd;
  border-radius: 2px;
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
.fetch-code, .change-lang{
  top:25%;
  left:15%;
  z-index:2;
}
@media only screen and (min-width:760px){
  .code-output-container{
    margin-left: .5em;
    
  }

}
 
</style>
