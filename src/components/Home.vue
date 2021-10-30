<template>
    <div class="col-12 col-lg-11 mx-auto">
        <div class="heading d-flex">
            <img class="logo " src="/assets/code_64.png" alt="codeeditor logo">
            <h3> <span>Code Editor</span> </h3>
        </div>
        <div class="features">
            <ul class="feature-list">
                <li>user can write code in provided language</li>
                <li>For each language only one file can be stored and its path is stored into user document in DB</li>
                <li>Code is stored so whenever user get access to website the code gets fetch</li>
            </ul>
        </div>
    </div>
</template>   

<script>
export default {
    name:'Home'
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
    body {
        background-color: #ece5da;
        text-align: center;
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
    color: #3e83e9;;
    text-shadow: 0 13.36px 8.896px #c4b59d,0 -2px 1px #fff;
    letter-spacing: -4px;
    }
    .feature-list{
        margin-top: 2em;
        margin-left: 0px;
        margin-right:0px;
        list-style-type: none;
    }
</style>