<template>
    <v-form>
        <input 
            ref="file" 
            type="file" 
            name="file" 
            id="file" 
            accept="image/*"
            class="d-none">
        <hr v-show="isDisabled">
        <p v-show="isDisabled" class="text-muted text-center">or</p>
        <v-text-field
            :value="link"
            type="text"
            class="rounded-lg"
            required
            dense
            :disabled="!(files.length == 0)"
            single-line
            name="link"
            label="Paste ur image link here"
            outlined
            clearable
            @keydown.enter.prevent="verify"
            @input="onValueChange"
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
            class="red--text text-none text-h6 btn-bold px-6 ml-2 mb-10">
            Reset
        </v-btn>
        </div>
    </v-form>
</template>

<script>
export default {
    name: "FormDetect",
    props: {
        isDisabled: {
            type: Boolean,
            default: false
        },
        isLoading: {
            type: Boolean,
            default: false
        },
        link: {
            type: String,
            default: null
        },
        files: {
            type: Array,
            default: function () {
                return []
            }
        }
    },
    methods:{
        verify(){
            this.$emit('on-verify');
        },
        resetForm(){
            this.$emit('on-reset-form');
        },
        onValueChange(e){
            this.$emit('update:link', e)
        }
    }
}
</script>

<style>

</style>