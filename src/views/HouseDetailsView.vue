<template>
  <div class="center">
      <div class="back-button" @click="backButtonClicked">
        <img
          src="@/assets/ic_back_grey@3x.png"
          alt="ic_back"
          width="20"
          height="20"
        />
        <div class="back-button-label">Back to overview</div>
      </div>
    <br />
    <br />
    <div class="details-body">
      <div class="details-card">
        <HouseDetailsCard :house="house" @toggleAlert="toggleAlert" />
      </div>
      <div class="recomendations">
        <div class="header2">Recommended for you</div>
        <br />
        <div
          v-for="recomendedHouse in recomendedHouses"
          :key="recomendedHouse.id"
        >
          <router-link
            style="text-decoration: none; color: inherit"
            v-if="house.id"
            :to="{
              name: 'houseDetails',
              params: { houseId: recomendedHouse.id },
            }"
          >
            <HouseCard :houseprop="recomendedHouse" :isRecommandation="true" />
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import HouseDetailsCard from "@/components/HouseDetailsCardComponent.vue";
import HouseCard from "@/components/HouseCardComponent.vue";

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();

    const state = reactive({
      showAlert: false,
    });

    const house = computed(() => {
      return store.getters.getById(route.params.houseId);
    });

    const recomendedHouses = computed(() => {
      return store.getters.getHouseRecommendations(route.params.houseId);
    });

    function toggleAlert(showAlert) {
      state.showAlert = showAlert;
    }

    function backButtonClicked() {
      router.go(-1)
    }

    return {
      ...toRefs(state),
      house,
      recomendedHouses,
      toggleAlert,
      backButtonClicked
    };
  },
  components: {
    HouseDetailsCard,
    HouseCard,
  },
};
</script>

<style lang="scss" scoped>
.center {
  margin: 40px 200px;

  .details-body {
    display: flex;
    width: 100%;
  }
  .details-card {
    flex: 1;
    flex-basis: 60%;
  }
  .recomendations {
    flex: 1;
    margin-left: 40px;
    flex-basis: 40%;
  }
}
</style>
