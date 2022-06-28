<template>
<div class="goWhith"></div>
</template>

<script>
    export default {
        name: "whith",
        created() {
          this.$router.replace({name:this.$route.params.name})
        }
    }
</script>

<style scoped>

</style>
