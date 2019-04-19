<template>
  <div class='q-ma-lg'>A user dashboard maybe?</div>
</template>

<script>
export default {
  name: 'User',
  created () {
    console.log(this.$fb.auth().currentUser)
  },
  data () {
    return {}
  }
}
</script>

<style>
</style>
