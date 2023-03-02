<template>
  <div class="center">
    <router-link to="/" style="text-decoration: none; color: inherit">
      <div class="back-button">
        <img src="@/assets/ic_back_grey@3x.png" alt="ic_back" width="20" height="20" />
        <div class="back-button-label">Back to overview</div>
      </div>
    </router-link>
    <br />
    <br />
    <HouseDetailsCard :house="house" />
  </div>
</template>

<script>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import HouseDetailsCard from "@/components/HouseDetailsCard.vue";

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
    HouseDetailsCard,
  },
};
</script>

<style lang="scss" scope>
.back-button {
  display: flex;
  img {
    margin-right: 10px;
  }
}

.center {
  margin: 100px auto;
  width: 60%;
}
</style>
