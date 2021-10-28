<template>
  <div id="app">
    <Navbar></Navbar>
    <router-view></router-view>

  </div>
</template>

<script>

import Navbar from './components/NavBar'
// import PageNotFound from './components/PageNotFound'
export default {
  name: 'App',
  components: {
    // HelloWorld,
    Navbar
    // PageNotFound
  }
}
</script>

<style>

</style>
