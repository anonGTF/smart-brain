<template>
  <div>
    <!-- notification success -->
    <v-snackbar
      v-model="show"
      v-if="!isError"
      light
      top
      rounded="pill"
      content-class="px-10 text-body-2"
    >
      <span class="my-pink-text font-weight-black">Face</span> 
      <span class="my-purple-text font-weight-black"> U! : </span>
      <span>{{ message }}</span>

      <template v-slot:action="{ attrs }">
        <v-btn
          color="black"
          text
          v-bind="attrs"
          @click="close"
        >
          X
        </v-btn>
      </template>
    </v-snackbar>
    <!-- notification error -->
    <v-snackbar
      v-model="show"
      v-else
      top
      color="red"
      rounded="pill"
      content-class="white--text px-10"
    >
      <span class="font-weight-black">Face</span> 
      <span class="font-weight-black"> U! : </span>
      <span>{{ message }}</span>

      <template v-slot:action="{ attrs }">
        <v-btn
          color="white"
          text
          v-bind="attrs"
          @click="close"
        >
          close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
export default {
    name: 'Notification',
    props: {
        show: {
            type: Boolean,
            default: false
        },
        message: {
            type: String,
            default: "Notification"
        },
        isError: {
            type: Boolean,
            default: false
        }
    },
    methods:{
      close(){
        this.$emit('on-close');
      }
    }
}
</script>

<style>

</style>