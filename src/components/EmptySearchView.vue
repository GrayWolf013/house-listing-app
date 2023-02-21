<template>
      <div class="empty-container empty-state-message center">
      <img src="@/assets/img_empty_houses@3x.png" height="100" />
      <div>No results found.</div>
      <div>Please try another keyword.</div>
    </div>
</template>

<script>
  export default {
    name: 'EmptySearchView',
    data() {
      return {}
    },
    computed: {},
    mounted() {},
    methods: {}
  }
</script>

<style lang="scss">

.center {
  margin: auto;
  width: 60%;
  padding: 10px;
  text-align: center;
}

</style>