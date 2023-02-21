<template>
  <div class="home-body">
    <div class="home-body__TOP">
      <div class="header1">Houses</div>
      <button class="btn">
        <div id="btn_container ">
          <img src="@/assets/ic_plus_white@3x.png" width="15" height="15" />
          <span>CREATE NEW</span>
        </div>
      </button>
    </div>
    <div class="home-body__BODY">
      <input
        v-model="searchText"
        type="search"
        placeholder="search for a house"
        name="search"
        @keyup="search(searchText)"
      />
    </div>
    <div>
      <br />
      <div v-if="searchText && housesprop.length > 0" class="header2">
        {{ housesprop.length }} result found
      </div>
    </div>
    <br />
    <div v-if="housesprop.length > 0">
      <HouseCard v-for="house of housesprop" :key="house.id" :houseprop="house" />
    </div>
    <EmptySearchView v-else class="empty-container empty-state-message center"/>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import HouseCard from "./HouseCard.vue";
import EmptySearchView from './EmptySearchView.vue'
export default {
  name: "HomeContent",
  props: {
    housesprop: {
      type: Array,
      required: true,
    },
  },
  setup(props, context) {
    const state = reactive({
      searchText: "",
    });

    function search(searchText) {
      context.emit("search", searchText);
    }

    return {
      ...toRefs(state),
      search,
    };
  },
  components: {
    HouseCard,
    EmptySearchView
  },
};
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
    width: 160px;
    height: 30px;
    padding: 0 10px;
    text-align: center;
    border: none;
    border-radius: 12px;
    height: 45px;
    justify-content: center;

    font-size: 16px;
    color: #333;
    background: map-get($colors, PRIMARY);
  }

  #btn_container {
    width: 20px;
    height: 20px;
    float: left;
  }

  .btn img {
    margin-right: 8px;
    vertical-align: middle;
  }

  .btn span {
    color: map-get($colors, BACKGROUND2);
    width: 120px;
    vertical-align: middle;
    margin-top: 0px;
  }
}
</style>
