<template>
  <nav class="topnav tab-button header-menu">
    <img src="@/assets/img_logo_dtt@3x.png" alt="Italian Trulli" />
    <router-link to="/">Houses</router-link>
    <router-link to="/about">About</router-link>
  </nav>
  <router-view />
</template>

<style lang="scss">
#app {
}

.topnav {
  overflow: hidden;
  background-color: map-get($colors, BACKGROUND2);

  a {
    float: left;
    color: map-get($colors, TERTIARY2);
    text-align: center;
    padding: 20px;
    text-decoration: none;
    margin-right: 2%;

    &:hover {
      background-color: map-get($textColors, TERTIARY2);
      color: map-get($textColors, PRIMARY);
    }
  }

  img {
    float: left;
    padding-top: 14px;
    padding-bottom: 14px;
    height: auto;
    width: 8%;
    margin-left: 15%;
    margin-right: 2%;
  }

  .active {
    color: map-get($textColors, PRIMARY);
  }
}
</style>
