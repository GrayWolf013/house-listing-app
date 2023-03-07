<template>
  <div class="card-details">
    <img
      class="house-details-image"
      v-if="house.image"
      :src="house.image"
      alt="HouseImg"
    />
    <img
      class="house-details-image"
      v-else
      src="@/assets/img_placeholder_house@3x.png"
      alt="HouseImg"
    />
    <div class="container">
      <div class="card-header">
        <div class="tab-button element">{{ house.location.street }}</div>
        <div class="card-header-manage">
          <router-link
            v-if="house.id"
            style="text-decoration: none; color: inherit"
            :to="{ name: 'updateHouse', params: { houseId: house.id } }"
          >
            <img
              v-if="house.madeByMe"
              src="@/assets/ic_edit@3x.png"
              alt="delete-icon"
              width="15"
              height="15"
            />
          </router-link>

          <img
            v-if="house.madeByMe"
            src="@/assets/ic_delete@3x.png"
            alt="delete-icon"
            width="15"
            height="15"
            @click.prevent="toggleAlert(true)"
          />
        </div>
      </div>
      <br />
      <div class="icon-container listing-information">
        <img
          src="@/assets/ic_location@3x.png"
          alt="ic_bed"
          width="20"
          height="20"
        />
        {{ house.location.zip }} {{ house.location.city }}
      </div>
      <br />
      <div class="icon-container listing-information">
        <img
          src="@/assets/ic_price@3x.png"
          alt="ic_price"
          width="20"
          height="20"
        />
        {{ house.price.toLocaleString("en-US") }}
        <div class="spacer"></div>
        <img
          src="@/assets/ic_size@3x.png"
          alt="ic_size"
          width="20"
          height="20"
        />
        {{ house.size }} m²
        <div class="spacer"></div>
        <img
          src="@/assets/ic_construction_date@3x.png"
          alt="ic_build"
          width="20"
          height="20"
        />
        Built in {{ house.constructionYear }}
      </div>
      <br />
      <div class="icon-container listing-information">
        <img src="@/assets/ic_bed@3x.png" alt="ic_bed" width="20" height="20" />
        {{ house.rooms.bedrooms }}
        <div class="spacer"></div>
        <img
          src="@/assets/ic_bath@3x.png"
          alt="ic_bath"
          width="20"
          height="20"
        />
        {{ house.rooms.bathrooms }}
        <div class="spacer"></div>
        <img
          src="@/assets/ic_garage@3x.png"
          alt="ic_garage"
          width="20"
          height="20"
        />
        {{ hasGarageToHumain(house.hasGarage) }}
      </div>
      <br /><br />
      <div class="desc-container listing-information">
        {{ house.description }}
      </div>
    </div>
  </div>
  <DeleteConfirmationAlert :houseId="house.id" v-if="showAlert" @hideAlert="toggleAlert(false)" />
</template>

<script>
import { reactive, toRefs } from "vue";
import DeleteConfirmationAlert from "./Alerts/DeleteConfirmationAlert.vue";

export default {
  name: "HouseDetailsCard",
  props: {
    house: {
      type: null,
      required: true,
    },
  },
  setup(props, context) {
    const state = reactive({
      showAlert: false,
    });

    function hasGarageToHumain(hasGarage) {
      if (hasGarage) return "yes";
      return "no";
    }

    function toggleAlert(showAlert) {
      state.showAlert = showAlert;
      context.emit("toggleAlert", showAlert);
    }

    return {
      ...toRefs(state),
      hasGarageToHumain,
      toggleAlert
    };
  },
  emits: ["toggleAlert"],
  components: {
    DeleteConfirmationAlert,
  },
};
</script>

<style lang="scss" scoped>
.card-details {
  color: map-get($colors, SECONDARY);
  padding-bottom: 50px;
  background-color: white;
  .container {
    margin: 40px 40px 0 40px;
  }
  .house-details-image {
    width: 100%;
  }
  .card-header {
    display: flex;
    justify-content: space-between;
    .card-header-manage {
      display: flex;
      justify-content: left;
      * {
        margin-left: 10px;
      }
    }
  }
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
