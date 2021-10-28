<template>
    <div class="container col-11 mt-4 PageNotFound-404">
        <h1>Page not found 404 error</h1>
        <hr>
        <div>
            Oops we couldn't find the page you are looking for.
            
        </div>
        <div>
            <span>Click here to go back to home page -> <router-link to="/">Home</router-link></span>
        </div>
    </div>

</template>
<script>
export default {
    name:'PageNotFound',
}
</script>