<template>
  <div class="home">
    <HouseContent v-if="store.state.houses" :housesprop="store.state.houses" />
  </div>
</template>

<script>
import { reactive, toRefs, onMounted,  } from 'vue'
import { ref } from 'vue';
import HouseContent from '@/components/HouseContent.vue'
import { useStore } from 'vuex'

export default {
  name: 'HomeView',
  setup() {
    // const store = useStore()

    const state = reactive({
      houses: ref([]),
    })

    // const movies = ref([]);

    const store = useStore()

    // const homes = computed(() => store.state.homes | [])
    // const homes = ref([]);

    // const users = computed(() => store.state.users | [])

    onMounted(async () => {
      console.log("store")
      console.log(store)

      console.log("store")
      store.dispatch('getHouses').then(() => {
        // API success
        console.log("data fetched")
      })
      .catch(() => {
        // API fail
        console.log("error in request")
      })     
    });

    return {
      ...toRefs(state),
      store
    }
  },
  components: {
    HouseContent
  }
}

</script>
