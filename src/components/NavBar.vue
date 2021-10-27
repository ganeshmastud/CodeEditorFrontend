<template>
        <div class=" col-12 bg-primary">
            <div class="col-12 col-lg-11  bg-primary mx-auto">
                <b-navbar class="col-11  col-lg-12 pt-2  pt-lg-0 pb-lg-0 mx-auto" toggleable="lg" type="dark" variant="primary">
                    <!-- <b-navbar-brand to="/">Code Editor</b-navbar-brand> -->
                    
                    <router-link class="navbar-brand" to="/">Code Editor</router-link>
                    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

                    <b-collapse id="nav-collapse" is-nav>
                    <b-navbar-nav class="d-flex justify-content-start col-12 mt-3 mt-lg-0  col-sm-12 col-lg-6">
                        <li class="nav-item" >
                            <router-link class="nav-link px-2 " to="/">Home</router-link>
                        </li>
                        <li class="nav-item " >
                            <router-link class="nav-link px-2" to="/codeeditor" >Start Coding</router-link>
                        </li>

                        
                    </b-navbar-nav>

                    <!-- Right aligned nav items -->
                    <b-navbar-nav class=" col-6 justify-content-end col-12 col-sm-12 col-lg-6">
                        <li class="nav-item " >
                            <router-link  class="nav-link px-2" to="#">Hello email@exapmle.com</router-link>
                        </li>
                        <li class="nav-item ">
                            <router-link  class="nav-link px-2" to="/login" >Login</router-link>
                        </li>
                        
                    
                    </b-navbar-nav>
                    </b-collapse>
                </b-navbar>
            </div>
            
        </div>

</template>

<script>
    export default{
        name:'NavBar'
    }
</script>

<style scoped>
.nav-item{
    cursor: pointer;
    
   
}
.nav-item:hover{
     background-color: #0b54c2;
}
.nav-item a.router-link-exact-active{
    background-color: #0b54c2; 
    color:white;
}
.nav-link{
    padding:1em 1em;
}
/* @media only screen and (max-width:1000px) {    
} */
    
</style>