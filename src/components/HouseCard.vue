<template>
    <div class="card">
        <img class="image" v-if="houseprop.image" :src="houseprop.image" alt="HouseImg" />
        <img class="image" v-else src="@/assets/img_placeholder_house@3x.png" alt="HouseImg" />
        <div class="container">
            <h4><b>{{ houseprop.location.street }}</b></h4>
            <p>€{{ houseprop.price }}</p>
            <b>{{ houseprop.location.zip }} {{ houseprop.location.city }}</b>
            <br>
            <img src="@/assets/ic_bed@3x.png" alt="Italian Trulli" width="10" height="10">
            <b>{{ houseprop.rooms.bedrooms }}</b>
            <img src="@/assets/ic_bath@3x.png" alt="Italian Trulli" width="10" height="10">
            <b>{{ houseprop.rooms.bathrooms }}</b>
            <img src="@/assets/ic_size@3x.png" alt="Italian Trulli" width="10" height="10">
            <b>{{ houseprop.size }} m²</b>
        </div>
    </div>
</template>

<script>
export default {
    name: "HouseCard",
    props: {
        houseprop: {
            type: null,
            required: true
        },
    },
    setup() { }
}
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

  .image {
    border-radius: 5px 5px 0 0;
    padding: 20px;
    width: 100px;
    height: 100px;
  }

  .container {
    padding: 2px 16px;
  }
}
</style>