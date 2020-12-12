<template>
  <v-container fluid class="pa-0">
    <v-row no-gutters class="d-flex align-center justify-center maximize-height">
      <v-card elevation="3" :class="isMobile ? 'card-mobile' : '' + ' py-5 px-10 rounded-xl'">
        <v-card-text>
          <h1 class="text-h4 text-center font-weight-bold pb-5 my-purple-text"><span class="my-pink-text">Face</span> U!</h1>
          <v-form v-model="valid" ref="form">
                 <v-text-field
                  v-model="email"
                  :rules="emailRules"
                  type="email"
                  class="rounded-lg"
                  required
                  :autofocus="!isMobile"
                  :autocomplete="isMobile ? 'off':''"
                  name="email"
                  label="Email"
                  outlined
                  @keyup.enter="login"
                 ></v-text-field>
                 <v-text-field
                    v-model="password"
                    :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="passwordRules"
                    :type="show ? 'text' : 'password'"
                    class="rounded-lg"
                    required
                    name="password"
                    label="Password"
                    outlined
                    @click:append="show = !show"
                    @keyup.enter="login"
                  ></v-text-field>
                  <v-card-actions class="d-flex justify-center">
                    <v-btn :loading="isLoading" rounded large depressed @click="login" class="my-purple text-none text-h6 btn-bold px-6">Login</v-btn>
                  </v-card-actions>
                  <p class="text-muted text-center mt-5">Don't have any account? <router-link to="/register" class="my-purple-text">Register!</router-link></p>
               </v-form>
        </v-card-text>
      </v-card>
    </v-row>
    <Notification 
      :show="showNotif" 
      :message="notifMessage" 
      :isError="notifError" />
  </v-container>
</template>

<script>
import { authFormRules, utilsComponent } from '@/mixins';
import Notification from '@/components/Notification';

export default {
    name: 'Login',
    components: {
      Notification
    },
    mixins: [ authFormRules, utilsComponent ],
    data: () => ({
        valid: false,
        show: false
    }),
    methods:{
      async login(){
        if (this.$refs.form.validate()) {
          await this.$store.dispatch('user/login', {
            userEmail: this.email,
            password: this.password
          })
          if (this.isLoggedIn) this.$router.push("/home");
        } 
      }
    }
}
</script>

<style scoped>
.card-mobile{
  background-color: transparent !important;
  border: none !important;
  box-shadow: none !important;
}
</style>