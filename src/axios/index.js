import axios from 'axios'

export default axios.create({
    baseURL: 'https://code-editor-web-app.herokuapp.com/api' //'http://localhost:3000/api' //
})