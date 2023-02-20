<template>
  <div class="home">
    <HouseContent v-if="houses" :housesprop="houses" @search="search"/>
  </div>
</template>

<script>
import { reactive, toRefs, onMounted, computed } from "vue"
import { useStore } from "vuex"
import HouseContent from "@/components/HouseContent.vue"

export default {
  name: "HomeView",
  setup() {
    const state = reactive({
      searchText: ""
    })

    const store = useStore()

    function search(searchText) {
      state.searchText = searchText
    }

    const houses = computed(() => {
      if (state.searchText) {
        return store.getters.search(state.searchText) 
      }
      return store.state.houses;
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
    };
  },
  components: {
    HouseContent,
  },
};
</script>
