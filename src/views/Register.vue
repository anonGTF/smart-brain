<template>
  <v-container fluid class="pa-0">
    <v-row no-gutters class="d-flex align-center justify-center maximize-height">
      <v-card elevation="3" :class="isMobile ? 'card-mobile' : '' + ' py-5 px-10 rounded-xl'">
        <v-card-text>
          <h1 class="text-h4 text-center font-weight-bold pb-5 my-purple-text"><span class="my-pink-text">Face</span> U!</h1>
          <v-form v-model="valid" ref="form">
                 <v-text-field
                  v-model="name"
                  :rules="nameRules"
                  type="text"
                  class="rounded-lg"
                  required
                  name="name"
                  label="Full name"
                  outlined
                 ></v-text-field>
                 <v-text-field
                  v-model="email"
                  :rules="emailRules"
                  type="email"
                  class="rounded-lg"
                  required
                  name="email"
                  label="Email"
                  outlined
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
                  ></v-text-field>
                  <v-card-actions class="d-flex justify-center">
                    <v-btn rounded :loading="isLoading" large depressed @click="register" class="my-purple text-none text-h6 btn-bold px-6">Register</v-btn>
                  </v-card-actions>
                  <p class="text-muted text-center mt-5">Already have an account? <router-link to="/login" class="my-purple-text">Login!</router-link></p>
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
    name: 'Register',
    components: {
      Notification
    },
    mixins: [ authFormRules, utilsComponent ],
    data: () => ({
        valid: false,
        show: false,
    }),
    methods:{
      async register(){
        if (this.$refs.form.validate()) {
          await this.$store.dispatch('user/register', {
            userEmail: this.email,
            userName: this.name,
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