<template>
  <div class="card-details">
    <img class="house-details-image" :src="house.image" alt="house imag" />
    <div class="container">
      <div class="tab-button element">{{ house.location.street }}</div>
      <br />
      <div class="icon-container listing-information">
        <img src="@/assets/ic_location@3x.png" alt="ic_bed" width="20" height="20" />
        {{ house.location.zip }} {{ house.location.city }}
      </div>
      <br />
      <div class="icon-container listing-information">
        <img src="@/assets/ic_price@3x.png" alt="ic_price" width="20" height="20" />
        {{ house.price.toLocaleString("en-US") }}
        <div class="spacer"></div>
        <img src="@/assets/ic_size@3x.png" alt="ic_size" width="20" height="20" />
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
        <!-- <div class="spacer"></div> -->
        {{ house.rooms.bedrooms }}
        <div class="spacer"></div>
        <img src="@/assets/ic_bath@3x.png" alt="ic_bath" width="20" height="20" />
        {{ house.rooms.bathrooms }}
        <div class="spacer"></div>
        <img src="@/assets/ic_garage@3x.png" alt="ic_garage" width="20" height="20" />
        {{ hasGarageToHumain(house.hasGarage) }}
      </div>
      <br /><br />
      <div class="desc-container listing-information">
        {{ house.description }}
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";

export default {
  name: "HouseDetailsCard",
  props: {
    house: {
      type: null,
      required: true,
    },
  },
  setup() {
    const state = reactive({
      count: 0,
    });

    function hasGarageToHumain(hasGarage) {
      if (hasGarage) return "yes";
      return "no";
    }

    return {
      ...toRefs(state),
      hasGarageToHumain
    };
  },
};
</script>

<style lang="scss" scoped>
.back-button {
  display: flex;
  flex-direction: column;
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
