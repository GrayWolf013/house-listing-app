<template>
  <div class="center">
    <router-link to="/" style="text-decoration: none; color: inherit">
      <div class="back-button">
        <img
          src="@/assets/ic_back_grey@3x.png"
          alt="ic_back"
          width="20"
          height="20"
        />
        <div class="back-button-label">Back to overview</div>
      </div>
    </router-link>
    <br />
    <br />
    <div class="details-body">
      <HouseDetailsCard class="details-card" :house="house" />
      <div class="recomendations">
      <div class="header2">Recommended for you</div>
      <br>
        <HouseCard
          v-for="recomendedHouse in recomendedHouses"
          :key="recomendedHouse.id"
          :houseprop="recomendedHouse"
          :isRecommandation="true"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import HouseDetailsCard from "@/components/HouseDetailsCardComponent.vue";
import HouseCard from "@/components/HouseCardComponent.vue";

export default {
  setup() {
    const route = useRoute();
    const store = useStore();

    const house = computed(() => {
      return store.getters.getById(route.params.houseId);
    });

    const recomendedHouses = computed(() => {
      return store.getters.getHouseRecommendations(route.params.houseId);
    });

    return {
      house,
      recomendedHouses,
    };
  },
  components: {
    HouseDetailsCard,
    HouseCard,
  },
};
</script>

<style lang="scss" scoped>
.back-button {
  display: flex;
  img {
    margin-right: 10px;
  }
}
.center {
  margin: 40px 200px;

  .details-body {
    display: flex;
    width: 100%;
  }
  .details-card {
    flex: 1;
    flex-basis: 70%;
  }
  .recomendations {
    flex: 1;
    margin-left: 40px;
    flex-basis: 30%;
  }
}
</style>
