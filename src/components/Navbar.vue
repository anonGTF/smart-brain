<template>
    <v-app-bar flat color="transparent pt-3">
        <h1 :class="((isMobile) ? 'text-h5' : 'text-h3') + ' font-weight-bold pl-3 my-purple-text'"><span class="my-pink-text">Face</span> U!</h1>
        <v-spacer></v-spacer>
        <div v-if="!isLoggedIn" :class="isMobile ? 'd-none':''">
          <v-btn rounded large depressed to="/login" class="my-purple btn-bold text-none text-h6 px-6">Login</v-btn>
          <v-btn text rounded large to="/register" class="my-purple-text btn-bold text-none text-h6">Register</v-btn>
        </div>
        <div v-else>
          <v-btn v-if="!isMobile" text rounded large @click="logout" class="my-purple-text btn-bold text-none text-h6">Log out</v-btn>
          <v-btn v-else icon large @click="logout">
              <v-icon class="my-purple-text">mdi-logout</v-icon>
          </v-btn>
        </div>
    </v-app-bar>
</template>

<script>
import { utilsComponent } from '@/mixins';

export default {
    name:'Navbar',
    mixins: [ utilsComponent ],
    methods:{
        logout(){
            this.$store.dispatch('user/logout');
            if (!this.isLoggedIn && this.$router.currentRoute.fullPath != '/') this.$router.push("/");
        }
    }
}
</script>

<style>

</style>