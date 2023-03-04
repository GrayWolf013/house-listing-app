<template>
  <div class="card" :class="{ recommandation: isRecommandation }">
    <img
      class="image"
      v-if="houseprop.image"
      :src="houseprop.image"
      alt="HouseImg"
    />
    <img
      class="image"
      v-else
      src="@/assets/img_placeholder_house@3x.png"
      alt="HouseImg"
    />
    <div class="container">
      <div class="card-header tab-button element">
        {{ houseprop.location.street }}
        <div class="card-header">
          <router-link
            v-if="houseprop.id"
            style="text-decoration: none; color: inherit"
            :to="{ name: 'updateHouse', params: { houseId: houseprop.id } }"
          >
            <img
              v-if="houseprop.madeByMe"
              src="@/assets/ic_edit@3x.png"
              alt="delete-icon"
              width="15"
              height="15"
            />
          </router-link>
          <div class="spacer" />

          <img
            v-if="houseprop.madeByMe"
            src="@/assets/ic_delete@3x.png"
            alt="delete-icon"
            width="15"
            height="15"
            @click.prevent="deleteHouse(houseprop.id)"
          />
        </div>
      </div>
      <div class="body-text element">
        € {{ houseprop.price.toLocaleString("en-US") }}
      </div>
      <div class="listing-information text-grey element">
        {{ houseprop.location.zip }} {{ houseprop.location.city }}
      </div>
      <div class="listing-information text-grey">
        <img src="@/assets/ic_bed@3x.png" alt="ic_bed" width="10" height="10" />
        {{ houseprop.rooms.bedrooms }}
        <img
          src="@/assets/ic_bath@3x.png"
          alt="ic_bath"
          width="10"
          height="10"
        />
        {{ houseprop.rooms.bathrooms }}
        <img
          src="@/assets/ic_size@3x.png"
          alt="ic_size"
          width="10"
          height="10"
        />
        {{ houseprop.size }} m²
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";

export default {
  name: "HouseCard",
  props: {
    houseprop: {
      type: null,
      required: true,
    },
    isRecommandation: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  setup() {
    const store = useStore();

    function deleteHouse(id) {
      store
        .dispatch("deleteHouse", id)
        .then(() => {
          // API success
          console.log("data deleted");
        })
        .catch(() => {
          // API fail
          console.log("error in request delete");
        });
    }

    return {
      deleteHouse,
    };
  },
};
</script>

<style lang="scss" scoped>
.card {
  transition: 0.3s;
  width: 100%;
  border-radius: 5px;
  display: flex;
  background: map-get($colors, BACKGROUND2);
  margin-bottom: 20px;

  &:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }
  .card-header {
    display: flex;
    justify-content: space-between;
  }
  .image {
    border-radius: 15px;
    padding: 10px;
    width: 15%;
  }

  .container {
    margin: 2%;
    width: 80%;
    .element {
      margin-bottom: 5px;
    }
  }
  .spacer {
    width: 10px;
  }
}

.recommandation {
  .image {
    border-radius: 15px;
    padding: 10px;
    width: 26%;
  }
  .tab-button {
    font-size: 16px;
  }
  .listing-information {
    font-size: 14px;
  }
  .body-text {
    @extend .openSans-Regular;
    font-size: 14px;
  }
}
</style>
