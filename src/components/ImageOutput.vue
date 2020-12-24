<template>
    <v-card class="mb-3" v-show="show">
        <div class="d-flex justify-center align-center fill-height">
        <div style="position: relative;">
            <img 
            v-if="isMobile" 
            ref="output" 
            alt="selected file" 
            width="300" 
            max-height="350"
            @load="imageLoaded">
            <img 
            v-else 
            ref="output" 
            alt="selected file" 
            height="350"
            @load="imageLoaded">
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
</template>

<script>
export default {
    name:"ImageOutput",
    props:{
        show: {
            type: Boolean,
            default: false
        },
        isMobile: {
            type: Boolean,
            default: false
        },
        boxes: {
            type: Array,
            default: function () {
                return []
            }
        }
    },
    methods:{
        imageLoaded(e){
            this.$emit('on-image-loaded', e);
        }
    }
}
</script>

<style>
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