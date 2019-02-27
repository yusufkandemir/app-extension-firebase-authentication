<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  created () {
    if (window.Cypress) {
      window.app = this
    }
  }
}
</script>

<style>
</style>
