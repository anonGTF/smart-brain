<template>
  <div>
      <!-- desktop -->
      <v-sheet
          v-if="!isMobile"
          v-show="isDisabled"
          width="500" 
          height="200" 
          tabindex="0"
          title="Click to grap a file from your PC"
          class="my-grey rounded-xl my-5 dnd-sheet"
          @click="uploadFile"
          style="cursor:pointer;">
          <div class="d-flex fill-height justify-center align-center flex-column">
            <v-icon style="font-size:5em;" class="my-purple-text pb-2">mdi-folder</v-icon>
            <p class="text-center grey--text font-weight-black">Drag'n drop or Click to upload ur image file</p>
          </div>
        </v-sheet>

        <!-- mobile -->
        <v-sheet
          v-else 
          v-show="isDisabled"
          width="300" 
          height="200" 
          tabindex="0"
          title="Click to grap a file from your device"
          class="my-grey rounded-xl my-5 dnd-sheet"
          @click="uploadFile"
          style="cursor:pointer;">
          <div class="d-flex fill-height justify-center align-center flex-column">
            <v-icon x-large class="my-purple-text pb-2">mdi-folder</v-icon>
            <p class="text-center grey--text font-weight-black">Click to upload ur image file</p>
          </div>
        </v-sheet>
  </div>
</template>

<script>
export default {
    name: "Sheet",
    props:{
        isDisabled: {
            type: Boolean,
            default: false
        },
        isMobile: {
            type: Boolean,
            default: false
        },
    },
    methods:{
        uploadFile(){
            this.$emit('on-upload-file')
        }
    }
}
</script>

<style>
.dnd-sheet{
  background-image: url('../assets/border.svg');
}
</style>