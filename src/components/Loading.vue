<template>
    <div class="mb-3 my-n10" v-show="show">
        <iframe height="350" frameborder="0" title="loading" src="loading.svg"></iframe>
    </div>
</template>

<script>
export default {
    name: "Loading",
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