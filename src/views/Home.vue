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
          v-show="isDisabled"
          ref="before-upload" 
          width="500" 
          height="200" 
          tabindex="0"
          title="Click to grap a file from your PC"
          class="my-grey rounded-xl my-5 dnd-sheet"
          @click="uploadFile"
          style="cursor:pointer;">
          <div class="d-flex fill-height justify-center align-center">
            <div>
              <div class="d-flex justify-center">
                <v-icon style="font-size:5em;" class="my-purple-text pb-2">mdi-folder</v-icon>
              </div>
              <p class="text-center grey--text font-weight-black">Drag'n drop or Click to upload ur image file</p>
            </div>
          </div>
        </v-sheet>

        <!-- mobile -->
        <v-sheet
          v-else 
          v-show="isDisabled"
          ref="before-upload"
          width="300" 
          height="200" 
          tabindex="0"
          title="Click to grap a file from your device"
          class="my-grey rounded-xl my-5 dnd-sheet"
          @click="uploadFile"
          style="cursor:pointer;">
          <div class="d-flex fill-height justify-center align-center">
            <div>
              <div class="d-flex justify-center">
                <v-icon x-large class="my-purple-text pb-2">mdi-folder</v-icon>
              </div>
              <p class="text-center grey--text font-weight-black">Click to upload ur image file</p>
            </div>
          </div>
        </v-sheet>

        <!-- end of mobile -->

        <!-- image output -->
        <v-card ref="output-wrapper" class="mb-3" v-show="!isDisabled">
          <div class="d-flex justify-center align-center fill-height">
            <div style="position: relative;">
              <img v-if="isMobile" ref="output" alt="selected file" width="300">
              <img v-else ref="output" alt="selected file" width="700">
              <div 
                v-for="(box, i) in boxes" 
                :key="i"
                class="bounding-box"
                :style="{ top: box.topRow + 'px', 
                          right: box.rightCol + 'px', 
                          bottom: box.bottomRow + 'px', 
                          left: box.leftCol + 'px'}"
                >
                </div>
            </div>
          </div>
        </v-card>
        <!-- end of image output -->

        <v-form>
          <input 
          ref="file" 
          type="file" 
          name="file" 
          id="file" 
          accept="image/png, image/jpg"
          class="d-none">
          <hr v-show="isDisabled">
          <p v-show="isDisabled" class="text-muted text-center">or</p>
          <v-text-field
            v-model="link"
            type="text"
            class="rounded-lg"
            required
            dense
            :disabled="!(this.files.length == 0)"
            single-line
            name="link"
            label="Paste ur image link here"
            outlined
            clearable
          ></v-text-field>
          <div class="d-flex justify-center">
            <v-btn 
              rounded 
              depressed
              :disabled="isDisabled"
              :loading="isLoading"
              @click="verify"
              class="my-purple text-none text-h6 btn-bold px-6">
              Detect!
            </v-btn>
            <v-btn 
              text
              depressed
              :disabled="isDisabled || isLoading"
              @click="resetForm"
              class="red--text text-none text-h6 btn-bold px-6 ml-2">
              Reset
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
import { postData, putData, postFile } from '@/utils';
import { URL_API } from '@/constants';

export default {
  name: 'Home',
  components: {
    Navbar,
    Notification
  },
  mixins: [ utilsComponent ],
  data: () => ({
    link: null,
    files: [],
    boxes: [{}]
  }),
  computed:{
    user(){
      return this.$store.getters['user/getUserData'];
    },
    isDisabled(){
      return (this.files.length == 0 && !this.link);
    }
  },
  watch:{
    link(){
      (!this.link) ? this.resetForm() : this.createImage();
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
        e.target.value = null;
      })
    },
    createImage(){
      const imgOutput = this.$refs['output'];
      if (this.files.length != 0) {
        imgOutput.src = URL.createObjectURL(this.files[0]);
      } else {
        imgOutput.src = this.link;
      }
    },
    resetForm(){
      this.link = null;
      this.files = [];
      this.boxes = [];
    },
    async verify(){
      this.$store.dispatch('process/showProcess');
      try {
        if (this.files.length == 0 && this.link == null) {
          throw "You have to fill either via file upload or link";
        }
        if (this.files.length != 0 && this.link != null) {
          throw "You cannot submit file and link at the same time"
        }
        (this.files.length) ? await this.detectViaFile() : await this.submit();
      } catch (error) {
        const dataError = {
          isShow: true,
          isError: true,
          message: error
        };
        this.$store.dispatch('notification/showNotification', dataError)
      } finally {
        this.$store.dispatch('process/removeProcess');
      }
    },
    async submit(){
      const url = URL_API + '/imageurl';

      const respon = await postData(url, {
        input: this.link
      });
      if (respon) {
        await this.updateCurrent();
      }
      this.boxes = this.calculateFaceLocation(respon);
    },
    calculateFaceLocation(data){
       if (data === -1 || Object.keys(data.outputs[0].data).length === 0) { return []; }

      const a = data.outputs[0].data.regions;
      let faces = [];

      for (let i = 0; i < a.length; i++) {
        faces.push(a[i].region_info.bounding_box);
      }

      const image = this.$refs['output'];
      const width = Number(image.width);
      const height = Number(image.height);

      const boxes = faces.map(s => {
        return {
          leftCol: s.left_col * width,
          topRow: s.top_row * height,
          rightCol: width - (s.right_col * width),
          bottomRow: height - (s.bottom_row * height)
        }
      });
      return boxes;
    },
    async detectViaFile(){
      // const imgOutput = this.$refs['output'];
      
      const url = URL_API + '/image-upload';
      const formData = new FormData();
      this.files.forEach((file, i) => {
        formData.append(i, file)
      })
      const respon = await postFile(url, formData);
      console.log(respon);
      
      // const detections = await faceapi.detectAllFaces(imgOutput);
      
      // if (detections) {
      //   await this.updateCurrent();
      // }

      // const width = Number(imgOutput.width);
      // const height = Number(imgOutput.height);

      // this.boxes = detections.map(s => {
      //   return {
      //     leftCol: s.relativeBox.left * width,
      //     topRow: s.relativeBox.top * height,
      //     rightCol: width - (s.relativeBox.right * width),
      //     bottomRow: height - (s.relativeBox.bottom * height)
      //   }
      // })
    },
    async updateCurrent(){
      const urlUpdate = URL_API + '/image';

      const responUpdate = await putData(urlUpdate, {
          id : this.user.userID 
        })
        if (responUpdate) {
          this.$store.dispatch('user/updateCurrent', {
            userCurrent: responUpdate
          });
        }
    }
  }
}
</script>

<style scoped>
.dnd-sheet{
  background-image: url('../assets/border.svg');
}

.bounding-box{
	position: absolute;
	box-shadow: 0 0 0 3px #fe4365 inset;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	cursor: pointer;
  z-index: 1;
}
</style>
