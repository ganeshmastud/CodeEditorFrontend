<template>
  <div>
    <b-button @click="$bvToast.show('my-toast')">Show toast</b-button>

    <b-toast id="my-toast" :variant="variant" solid>
      <template #toast-title>
        <div class="d-flex flex-grow-1 align-items-baseline">
         
          <strong class="mr-auto">{{title}}</strong>
          
        </div>
      </template>
     {{message}}
    </b-toast>
  </div>
</template>
<script>
export default {
    name:'Toast_Msg',
    props:{
        toast_obj:Object
    },
    methods: {
        makeToast(){
            
        }
    },

}
</script>