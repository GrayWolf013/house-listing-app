<template>
  <div class="home">
    <HouseContent
      v-if="houses"
      :housesprop="houses"
      @search="search"
      @sortBy="sortBy"
    />
  </div>
</template>

<script>
import { reactive, toRefs, onMounted, computed } from "vue";
import { useStore } from "vuex";
import HouseContent from "@/components/HouseContentComponent.vue";

export default {
  name: "HouseListView",
  setup() {
    const state = reactive({
      searchText: "",
      sortByPrice: true,
    });

    const store = useStore();

    function search(searchText) {
      state.searchText = searchText;
    }

    function sortBy(price) {
      state.sortByPrice = price;
    }

    const houses = computed(() => {
      if (state.searchText) {
        return store.getters.search(state.searchText);
      }
      return store.getters.sortBy(state.sortByPrice);
    });

    onMounted(async () => {
      store
        .dispatch("getHouses")
        .then(() => {
          // API success
          console.log("data fetched");
        })
        .catch(() => {
          // API fail
          console.log("error in request");
        });
    });

    return {
      ...toRefs(state),
      houses,
      search,
      sortBy,
    };
  },
  components: {
    HouseContent,
  },
};
</script>
