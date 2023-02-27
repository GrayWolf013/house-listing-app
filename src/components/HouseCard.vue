<template>
  <div class="card">
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
        <img
          v-if="houseprop.madeByMe"
          src="@/assets/ic_delete@3x.png"
          alt="delete-icon"
          width="15"
          height="15"
        />
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
export default {
  name: "HouseCard",
  props: {
    houseprop: {
      type: null,
      required: true,
    },
  },
  setup() {
    function deleteHouse() {}
    return {
      deleteHouse,
    };
  },
};
</script>

<style lang="scss">
.card {
  transition: 0.3s;
  width: 100%;
  border-radius: 5px;
  display: flex;
  background: map-get($colors, BACKGROUND2);
  margin-bottom: 10px;

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
    width: 130px;
    height: 130px;
  }

  .container {
    margin: 20px 0 0 20px;
    width: 80%;
    .element {
      margin-bottom: 5px;
    }
  }
}
</style>
