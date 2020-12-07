<template>
  <v-container fluid class="pa-0">
      <Navbar/>
      <v-row no-gutters class="d-flex align-center maximize-height">
        <v-col cols="12" md="4">
          <h1 class="my-purple-text text-center text-h3 font-weight-bold">Detech ur Face</h1>
          <p class="my-purple-text text-center text-h5">As easy as upload ur image</p>
          <div class="d-flex justify-center">
            <v-btn rounded large depressed to="/home" class="my-purple text-none text-h5 btn-bold px-6">Let's Go!</v-btn>
          </div>
        </v-col>
        <v-col cols="12" md="8" class="d-flex justify-center">
          <v-img src="../assets/landing.png" alt="landing" width="90%"></v-img>
        </v-col>
      </v-row>
      <Notification 
      :show="showNotif" 
      :message="notifMessage" 
      :isError="notifError" />
  </v-container>
</template>

<script>
import Navbar from '@/components/Navbar'
import Notification from '@/components/Notification';
import { utilsComponent } from '@/mixins';

export default {
    name: 'Landing',
    components:{
      Navbar,
      Notification
    },
    mixins: [ utilsComponent ],
}
</script>

<style scoped>
</style>