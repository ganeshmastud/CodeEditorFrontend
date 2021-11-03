import axios from "axios";
const userPreferance = {
    state: {
        code: [

        ],
        codeFiles: [

        ],
        lang: '',
        theme:''
    },
    getters: {
        getLanguage(state){
            return state.lang;
        },
        getTheme(state){
            return state.theme;
        },
        getCodeFiles(state){
            return state.codeFiles;
        },
        getCode(state){
            return state.code;
        }

    }, 
    mutations: {
        setLanguage(state, lang){
            state.lang = lang;
        },
        setTheme(state, theme){
            state.theme = theme;
        },
        addCode(state, code){
            state.code.push(code);
        },
        updateCodeFile(state, codeFiles){
            state.codeFiles = codeFiles
        }

    },
    actions: {
         async fetchCodeFiles({commit},userId){
             await axios.get(`http://localhost:3000/user/${userId}`)
              .then(res => {
                  console.log(res.data.codeFiles);
                  commit('updateCodeFile', res.data.codeFiles);
                  if(res.data.language){
                      commit('setLanguage',res.data.language);
                  }
                  if(res.data.theme){
                      commit('setTheme',res.data.theme);
                  }
              })
              .catch(err=>{
                  console.log("err in fetch theme",err);
              })
          },   
        async updateLanguage({commit}, languageDetails){
            // console.log("request in updatetheme");
            const {userId,language} = languageDetails;
            await axios.patch(`http://localhost:3000/user/${userId}/language`,
            {},
            {
                params: {
                    language
                }
            })
            .then(res =>{
                console.log(res.data);
                commit('setLanguage',res.data.language)
            })
            .catch(err=>{
                console.log("err in fetch language",err);
            })
        },
        async updateTheme({commit}, themeDetails){
            // console.log("request in updatetheme");
            const {userId,theme} = themeDetails
            await axios.patch(`http://localhost:3000/user/${userId}`,
            {},
            {
                params: {
                    theme
                }
            })
            .then(res =>{
                console.log(res.data);
                commit('setTheme',res.data.theme)
            })
            .catch(err=>{
                console.log("err in fetch",err);
            })
        }    

    }
}
export default userPreferance;