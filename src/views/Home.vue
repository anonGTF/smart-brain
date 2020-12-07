<template>
  <div>
  <v-container fluid class="pa-0">
    <Navbar/>
    <v-row 
    no-gutters 
    v-cloak 
    @drop.prevent="addDropFile" 
    @dragover.prevent
    class="d-flex align-center justify-center maximize-height">
      <div>
        <h1 class="my-purple-text text-center">Hi {{ user.userName }}!</h1>
        <p class="text-muted text-center">your current entries is {{ user.userCurrent }}</p>
        
        <!-- desktop -->
        <v-sheet
          v-if="!isMobile" 
          width="500" 
          height="200" 
          tabindex="0"
          title="Click to grap a file from your PC"
          class="my-grey rounded-xl my-5 dnd-sheet"
          @click="uploadFile"
          style="cursor:pointer;">
          <div ref="before-upload" class="d-flex fill-height justify-center align-center">
            <div>
              <div class="d-flex justify-center">
                <v-icon style="font-size:5em;" class="my-purple-text pb-2">mdi-folder</v-icon>
              </div>
              <p class="text-center grey--text font-weight-black">Drag'n drop or Click to upload ur image file</p>
            </div>
          </div>
          <div class="d-flex justify-center align-center fill-height">
            <img ref="output" alt="selected file" height="190" class="d-none">
          </div>
        </v-sheet>

        <!-- mobile -->
        <v-sheet
          v-else 
          width="300" 
          height="200" 
          tabindex="0"
          title="Click to grap a file from your device"
          class="my-grey rounded-xl my-5 dnd-sheet"
          @click="uploadFile"
          style="cursor:pointer;">
          <div ref="before-upload" class="d-flex fill-height justify-center align-center">
            <div>
              <div class="d-flex justify-center">
                <v-icon x-large class="my-purple-text pb-2">mdi-folder</v-icon>
              </div>
              <p class="text-center grey--text font-weight-black">Click to upload ur image file</p>
            </div>
          </div>
          <div class="d-flex justify-center align-center fill-height">
            <img ref="output" alt="selected file" height="190" class="d-none">
          </div>
        </v-sheet>
        <v-form>
          <input ref="file" type="file" name="file" id="file" accept="image/png, image/jpg" class="d-none">
          <hr>
          <p class="text-muted text-center">or</p>
          <v-text-field
            v-model="link"
            type="text"
            class="rounded-lg"
            required
            dense
            name="link"
            label="Link"
            outlined
          ></v-text-field>
          <div class="d-flex justify-center">
            <v-btn 
              rounded 
              depressed 
              @click="submit" 
              class="my-purple text-none text-h6 btn-bold px-6">
              Submit
            </v-btn>
          </div>
        </v-form>
      </div>
    </v-row>
  </v-container>
  <Notification 
      :show="showNotif" 
      :message="notifMessage" 
      :isError="notifError" />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import Notification from '@/components/Notification';
import { utilsComponent } from '@/mixins';

export default {
  name: 'Home',
  components: {
    Navbar,
    Notification
  },
  mixins: [ utilsComponent ],
  data: () => ({
    link: null,
    files: []
  }),
  computed:{
    user(){
      return this.$store.getters['user/getUserData'];
    }
  },
  methods:{
    addDropFile(e){
      this.files.push(...Array.from(e.dataTransfer.files))
      this.createImage();
    },
    uploadFile(){   
      const uploadFileField = this.$refs['file'];
      uploadFileField.click();
      uploadFileField.addEventListener('change', (e) => {
        if (e.target.files) {
          this.files.push(...Array.from(e.target.files));
          this.createImage();
        }
      })
    },
    createImage(){
      const imgOutput = this.$refs['output'];
      const beforeUploadItems = this.$refs['before-upload'];

      beforeUploadItems.classList.remove('d-flex');
      beforeUploadItems.classList.add('d-none');
      
      imgOutput.classList.remove('d-none');
      imgOutput.src = URL.createObjectURL(this.files[0])
    },
    async submit(){
      await setInterval(() => {
        console.log('submited');
      }, 1000);
    },
  }
}
</script>

<style scoped>
.dnd-sheet{
  background-image: url('../assets/border.svg');
}
</style>
