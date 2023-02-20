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
      <input v-model="searchText" type="text" placeholder="search for a house" name="search" @keyup="search(searchText)"/>
    </div>
    <br>
    <div>
      <HouseCard v-for="house of housesprop" :key="house.id" :houseprop="house"/>
      </div>
    </div>
</template>

<script>
import { reactive, toRefs } from "vue"
import HouseCard from './HouseCard.vue'

export default {
  name: "HomeContent",
  props: {
    housesprop: {
      type: Array,
      required: true
    },
  },
  setup(props, context) { 
    const state = reactive({
      searchText: ""
    })

    function search(searchText) {
      context.emit('search', searchText)
    }
    
    return {
      ...toRefs(state),
      search,
    };
  },
  components: {
    HouseCard
  }
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
</style>
