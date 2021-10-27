<template>
  <div id="app">
    <Navbar></Navbar>
    <router-view></router-view>
  </div>
</template>

<script>

import Navbar from './components/NavBar'
export default {
  name: 'App',
  components: {
    // HelloWorld,
    Navbar
  }
}
</script>

<style>

</style>
