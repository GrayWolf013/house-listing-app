<template>
  <div class="header1">Favorite Houses</div>
  <div>
  <div v-for="house in houses" :key="house">
    {{ house }}
  </div>
  </div>
</template>

<script>
import { reactive, toRefs, computed } from "vue";
import { useStore } from "vuex";

export default {
  name: "FavoriteListView",
  setup() {
    const store = useStore();

    const state = reactive({});

    const houses = computed(() => {
      return store.getters["favoriteStore/getAll"];
    });
    return {
      ...toRefs(state),
      houses,
    };
  },
};
</script>

<style lang="scss" scoped></style>
