<template>
  <div>
  <v-container fluid class="pa-0">
    <Navbar/>
    <v-row 
    no-gutters 
    v-cloak 
    @drop.prevent="addDropFile" 
    @dragover.prevent="overlay = true"
    @dragenter.prevent="overlay = true"
    @dragleave.prevent="overlay = false"
    class="d-flex align-center justify-center">
      <div>
        <h1 class="my-purple-text text-center">Hi {{ slicedName }} !</h1>
        <p class="text-muted text-center">your current entries is {{ user.userCurrent }}</p>

        <Sheet
          :isDisabled="isDisabled"
          :isMobile="isMobile"
          @on-upload-file="uploadFile"/>

        <Overlay :show="overlay"/>
        <Loading :show="!isDisabled && !isFinished"/>

        <ImageOutput 
          ref="imageOutput"
          :show="!isDisabled && isFinished"
          :isMobile="isMobile"
          :boxes="boxes"
          @on-image-loaded="setImageSize"/>

        <FormDetect 
          ref="formDetect"
          :isDisabled="isDisabled"
          :isLoading="isLoading"
          :link.sync="link"
          :files="files"
          @on-verify="verify"
          @on-reset-form="resetForm"
          />
      </div>
    </v-row>
  </v-container>
  <Notification 
      :show="showNotif" 
      :message="notifMessage" 
      :isError="notifError"
      @on-close="closeNotification" />
  </div>
</template>

<script>
import { utilsComponent } from '@/mixins';
import { postData, putData, postFile, compressImage } from '@/utils';
import { URL_API } from '@/constants';

import Navbar from '@/components/Navbar'
import Notification from '@/components/Notification';
import Overlay from '@/components/Overlay';
import Loading from '@/components/Loading';
import FormDetect from '@/components/FormDetect';
import ImageOutput from '@/components/ImageOutput';
import Sheet from '@/components/Sheet';

export default {
  name: 'Home',
  components: {
    Navbar,
    Notification,
    Overlay,
    Loading,
    FormDetect,
    ImageOutput,
    Sheet
  },
  mixins: [ utilsComponent ],
  data: () => ({
    link: null,
    files: [],
    boxes: [{}],
    overlay: false,
    isFinished: true,
    imgWidth: 0,
    imgHeight: 0,
  }),
  computed:{
    user(){
      return this.$store.getters['user/getUserData'];
    },
    isDisabled(){
      return (this.files.length == 0 && !this.link);
    },
    slicedName(){
      let name = this.user.userName;
      return (name.length > 20) ? name.substr(0, 20) + '...' : name;
    }
  },
  watch:{
    link(){
      (!this.link) ? this.resetForm() : this.createImage();
    }
  },
  methods:{
    closeNotification(){
      this.$store.dispatch('notification/closeNotification');
    },
    addDropFile(e){
      this.overlay = false;
      this.files.push(...Array.from(e.dataTransfer.files))
      this.createImage();
    },
    uploadFile(){   
      const uploadFileField = this.$refs.formDetect.$refs.file;
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
      const imgOutput = this.$refs.imageOutput.$refs.output;
      if (this.files.length != 0) {
        imgOutput.src = URL.createObjectURL(this.files[0]);
      } else {
        imgOutput.src = this.link;
      }
    },
    setImageSize(e){
      if (this.imgWidth != 0 && this.imgHeight != 0) return;

      this.imgWidth = e.target.width;
      this.imgHeight = e.target.height;
    },
    resetForm(){
      this.imgWidth = 0;
      this.imgHeight = 0;
      this.link = null;
      this.files = [];
      this.boxes = [];
    },
    async verify(){
      this.isFinished = false;
      this.$store.dispatch('process/showProcess');
      try {
        if (this.files.length == 0 && this.link == null) {
          throw "You have to fill either via file upload or link";
        }
        if (this.files.length != 0 && this.link != null) {
          throw "You cannot submit file and link at the same time"
        }
        if(this.link && !this.link.match(/\.(jpeg|jpg|png)$/)){
          throw "Only detect images with jpeg/jpg/png extension!";
        }
        if (this.files.length && !this.files[0].type.match(/(jpeg|jpg|png)$/)) {
          throw "Only detect images with jpeg/jpg/png extension!";
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
        this.isFinished = true;
        this.$store.dispatch('process/removeProcess');
      }
    },
    async submit(){
      const url = URL_API + '/imageurl';
      try {
        const respon = await postData(url, {
          input: this.link
        });

        if (!respon.outputs[0].data.regions) {
          throw "no face detected!";
        }

        await this.updateCurrent();
        
        this.boxes = this.calculateFaceLocation(respon);
        const banyakWajah = respon.outputs[0].data.regions.length;
        const dataSuccess = {
            isShow: true,
            isError: false,
            message: `terdeteksi ${banyakWajah} wajah`
          };
          this.$store.dispatch('notification/showNotification', dataSuccess); 
      } catch (error) {
        const dataError = {
          isShow: true,
          isError: true,
          message: error
        };
        this.$store.dispatch('notification/showNotification', dataError)
      }
    },
    calculateFaceLocation(data){
       if (data === -1 || Object.keys(data.outputs[0].data).length === 0) { return []; }

      const a = data.outputs[0].data.regions;
      let faces = [];

      for (let i = 0; i < a.length; i++) {
        faces.push(a[i].region_info.bounding_box);
      }

      const width = this.imgWidth;
      const height = this.imgHeight

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
      const url = URL_API + '/image-upload';
      const compressedFile = await compressImage(this.files[0]);
      const formData = new FormData();
      compressedFile.forEach((file, i) => {
        formData.append(i, file)
      })
      const respon = await postFile(url, formData);
      this.files = [];
      this.link = respon[0].secure_url;
      await this.submit();
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
