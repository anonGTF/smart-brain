<template>
  <v-app>
    <v-main :class="isMobile ? 'main-mobile' : 'main'">
      <transition name="fade" mode="out-in">
          <router-view></router-view>
      </transition>
    </v-main>
  </v-app>
</template>

<script>
import { utilsComponent } from '@/mixins';

export default {
  name: 'App',
  mixins: [ utilsComponent ],
};
</script>

<style>
.main{
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: url( './assets/bg.png') no-repeat center center;
  background-size: cover;
}

.main-mobile{
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: url( './assets/bg-mobile.png') no-repeat center center;
  background-size: cover;
}

.my-grey{
  background-color: #F1EBF2 !important;
}

.my-grey-text{
  color: #F1EBF2 !important;
}

.my-purple{
  background-color: #A3236D !important;
  color: white !important;
}

.my-purple-text{
  color: #A3236D !important;
  text-decoration: none;
}

.my-pink-text{
  color: #E84782 !important;
}

.btn-bold{
  font-weight: 500 !important;
}

.maximize-height{
  height: 100vh;
}
</style>