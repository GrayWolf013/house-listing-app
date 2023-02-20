<template>
  <div class="home-body">
    <div class="home-body__TOP">
      <div class="header1">Houses</div>
      <button class="btn">
        <div id="btn_container">
          <img src="@/assets/ic_plus_white@3x.png" width="15" height="15" />
        </div>
        <span>CREATE NEW</span>
      </button>
    </div>
    <div class="home-body__TOP">
      <input type="text" placeholder="Search.." name="search" />
    </div>
    <br>
    <div>
      <div class="card" v-for="house of housesprop" :key="house.id">
        <img src="@/assets/img_placeholder_house@3x.png" alt="HouseImg" />
        <div class="container">
          <h4><b>{{ house.location.street }} {{ house.location.city }}</b></h4>
          <p>€{{ house.price }}</p>
        </div>
      </div>
      <div class="card">
        <img src="@/assets/img_placeholder_house@3x.png" alt="HouseImg" />
        <div class="container">
          <h4><b>Jane Doe</b></h4>
          <p>Interior Designer</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: "HelloWorld",
    props: {
      housesprop: {
            type: Array,
            required: true
        },
    },
    setup () {}
}
</script>

<style lang="scss">
.home-body {
  margin-left: 15%;
  margin-right: 15%;
  margin-top: 3%;

  .home-body__TOP {
    display: flex;
    justify-content: space-between;
  }

  .btn {
    width: 200px;
    height: 60px;
    padding: 0 10px;
    text-align: left;
    border: none;
    border-radius: 12px;
    height: 45px;
    justify-content: center;

    font-size: 16px;
    color: #333;
    background: map-get($colors, PRIMARY);
  }

  #btn_container {
    width: 40px;
    height: 30px;
    float: left;
  }

  .btn img {
    margin-top: 8px;
    margin-right: 8px;
    vertical-align: middle;
  }

  .btn span {
    color: map-get($colors, BACKGROUND2);
    display: inline-block;
    width: 120px;
    vertical-align: middle;
    margin-top: 6px;
  }
}

.card {
  transition: 0.3s;
  width: 100%;
  border-radius: 5px;
  display: flex;
  background: map-get($colors, BACKGROUND2);
  margin-bottom: 10px;

  &:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }

  img {
    border-radius: 5px 5px 0 0;
    padding: 20px;
    width: 100px;
    height: 100px;
  }

  .container {
    padding: 2px 16px;
  }
}
</style>
