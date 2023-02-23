<template>
  <div class="center">
    <router-link to="/" class="back-button" style="text-decoration: none; color: inherit">
      <img src="@/assets/ic_back_grey@3x.png" alt="ic_back" width="20" height="20" />
      <div class="back-button-label">Back to overview</div>
    </router-link>
    <br />
    <br />
    <HouseDetailsCard :house="house"/>
  </div>
</template>

<script>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import HouseDetailsCard from "@/components/HouseDetailsCard.vue"

export default {
  setup() {
    const route = useRoute();
    const store = useStore();

    const house = computed(() => {
      return store.getters.getById(route.params.houseId);
    });

    return {
      house,
    };
  },
  components: {
    HouseDetailsCard
  }
};
</script>

<style lang="scss">
.back-button {
  display: flex;
  img {
    margin-right: 10px;
  }
}
.card-details {
  color: map-get($colors, SECONDARY);
  padding-bottom: 50px;
  .container {
    margin: 40px 40px 0 40px;
  }
  .house-details-image {
    width: 100%;
  }
  background-color: white;
  .icon-container {
    display: flex;
  }
  .desc-container {
    display: grid;
    text-align: left;
  }
  .container {
    img {
      margin: 0px 5px 0px 0px;
    }
  }
  .spacer {
    width: 40px;
  }
}
</style>
