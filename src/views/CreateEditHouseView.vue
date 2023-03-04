<template>
  <div class="root">
    <div class="create-house-container">
      <router-link to="/" style="text-decoration: none; color: inherit">
        <div class="back-button">
          <img
            src="@/assets/ic_back_grey@3x.png"
            alt="ic_back"
            width="20"
            height="20"
          />
          <div class="back-button-label">Back to overview</div>
        </div>
      </router-link>
      <div>
        <div v-if="route.params.houseId" class="header1">Edit dlisting</div>
        <div v-else class="header1">Create new listing</div>
        <house-listing-form
          @submitForm="submitForm"
          @selectImage="selectImage"
          :houseId="route.params.houseId"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import HouseListingForm from "@/components/HouseListingFormComponent.vue";

export default {
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();

    const state = reactive({
      image: null,
      previewImage: null,
    });

    function selectImage(data) {
      state.image = data.image;
      state.previewImage = data.previewImage;
    }

    function uploadHouseListingImage(id) {
      const formData = new FormData();
      formData.append("image", state.image);
      if (state.previewImage) {
        store
          .dispatch("uploadHouseImg", {
            id: id,
            body: formData,
            value: state.previewImage,
          })
          .then(() => {
            // API success
            console.log("img uploaded");
            router.push({ name: "houseDetails", params: { houseId: id } });
          })
          .catch((e) => {
            // API fail
            console.log("error in request upload", e);
          });
      } else {
        router.push({ name: "houseDetails", params: { houseId: id } });
      }
    }

    function editHouseListing(houseModel) {
      store
        .dispatch("editHouse", { id: route.params.houseId, body: houseModel })
        .then(() => {
          // API success
          uploadHouseListingImage(route.params.houseId);
          console.log("data edited");
        })
        .catch((e) => {
          // API fail
          console.log("error in request edit", e);
        });
    }

    function createHouseListing(houseModel) {
      store
        .dispatch("createHouse", houseModel)
        .then((data) => {
          // API success
          uploadHouseListingImage(data.id);
          console.log("data created");
        })
        .catch((e) => {
          // API fail
          console.log("error in request create", e);
        });
    }

    function submitForm(houseModel) {
      if (route.params.houseId) editHouseListing(houseModel);
      else createHouseListing(houseModel);
    }

    return {
      ...toRefs(state),

      submitForm,
      selectImage,

      route,
    };
  },
  components: {
    HouseListingForm,
  },
};
</script>

<style lang="scss" scoped>
.root {
  margin: 0;
  padding: 0;
  background-image: url("/src/assets/img_background@3x.png");

  /* Full height */
  height: 100%;

  /* Center and scale the image nicely */
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  .create-house-container {
    margin: 30px 0 0 15%;
  }

  .header1 {
    margin-top: 20px;
    margin-bottom: 20px;
  }
}
</style>
