import axios from 'axios'


// if(process.env.NODE_ENV ==='development'){
//     const baseurl=
// }

export default axios.create({
    baseURL: 'code-editor-for-you.eastus.cloudapp.azure.com:3000/api' // 'http://localhost:3000/api' //'https://code-editor-web-app.herokuapp.com/api' //
})
