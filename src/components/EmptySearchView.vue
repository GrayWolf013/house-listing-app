<template>
  <div class="empty-container empty-state-message">
    <img src="@/assets/img_empty_houses@3x.png" height="100" />
    <br />
    <br />
    <div>No results found.</div>
    <div>Please try another keyword.</div>
  </div>
</template>

<script>
export default {
  name: "EmptySearchView",
};
</script>

<style lang="scss" scoped>
.empty-container {
  margin: 100px auto;
  width: 60%;
  text-align: center;
}
</style>
