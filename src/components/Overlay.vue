<template>
    <v-fade-transition>
        <v-overlay
        v-if="show"
        absolute
        color="#000"
        opacity=".75"
        >
        <div class="d-flex justify-center flex-column">
            <img src="upload.svg" alt="upload icon">
            <p class="my-grey-text">Drop like a hot potato</p>
        </div>
        </v-overlay>
    </v-fade-transition>
</template>

<script>
export default {
    name: "Overlay",
    props: {
        show: {
            type: Boolean,
            default: false
        }
    },
}
</script>

<style>

</style>