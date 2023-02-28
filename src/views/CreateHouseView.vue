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
        <form @submit.prevent="submitForm">
          <div class="input-field-title">Street name*</div>
          <input
            type="text"
            placeholder="Enter the street name"
            v-model="house.streetName"
            :class="{ error: !house.streetName && buttonClicked }"
            required
          />
          <div class="flex">
            <div>
              <div class="input-field-title">House number*</div>
              <input
                type="number"
                placeholder="Enter the house number"
                v-model="house.houseNumber"
                :class="{ error: !house.houseNumber && buttonClicked }"
                required
              />
            </div>
            <div class="spacer" />
            <div>
              <div class="input-field-title">Addition (optional)</div>
              <input
                type="number"
                placeholder="e.g. A"
                v-model="house.numberAddition"
              />
            </div>
          </div>
          <div class="input-field-title">Postal Code*</div>
          <input
            type="text"
            placeholder="e.g. 1000 AA"
            v-model="house.zip"
            :class="{ error: !house.zip && buttonClicked }"
            required
          />
          <div class="input-field-title">City*</div>
          <input
            type="text"
            placeholder="e.g. Utrecht"
            v-model="house.city"
            :class="{ error: !house.city && buttonClicked }"
            required
          />
          <div class="input-field-title">Upload picture (PNG or JPG)*</div>

          <div>
            <img v-if="previewImage" :src="previewImage" alt="upload" class="uploading-image"/>
            <img v-else src="@/assets/ic_upload@3x.png" class="uploading-image"/>
            <input type="file" accept="image/jpeg" @change="uploadImage">
          </div>
          <div class="input-field-title">Price*</div>
          <input
            type="number"
            placeholder="e.g. €150.000"
            v-model="house.price"
            :class="{ error: !house.price && buttonClicked }"
            required
          />
          <div class="flex">
            <div>
              <div class="input-field-title">Size*</div>
              <input
                type="number"
                placeholder="e.g. 60m²"
                v-model="house.size"
                :class="{ error: !house.size && buttonClicked }"
                required
              />
            </div>
            <div class="spacer" />
            <div>
              <div class="input-field-title">Garage*</div>
              <input
                type="text"
                placeholder="Select"
                v-model="house.hasGarage"
              />
            </div>
          </div>
          <div class="flex">
            <div>
              <div class="input-field-title">Bedrooms*</div>
              <input
                type="number"
                placeholder="Enter amount"
                v-model="house.bedrooms"
                :class="{ error: !house.bedrooms && buttonClicked }"
                required
              />
            </div>
            <div class="spacer" />
            <div>
              <div class="input-field-title">Bathrooms*</div>
              <input
                type="number"
                placeholder="Enter amount"
                v-model="house.bathrooms"
                :class="{ error: !house.bathrooms && buttonClicked }"
                required
              />
            </div>
          </div>
          <div class="input-field-title">Construction date*</div>
          <input
            type="number"
            placeholder="e.g. 1900"
            v-model="house.constructionYear"
            :class="{ error: !house.constructionYear && buttonClicked }"
            required
          />
          <div class="input-field-title">Description*</div>
          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            placeholder="Enter description"
            v-model="house.description"
            :class="{ error: !house.description && buttonClicked }"
            required
          />
          <div class="btn-container">
            <button class="btn" @click="submitButtonClicked">POST</button>
          </div>
          <br />
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, computed } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";

export default {
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();

    const state = reactive({
      buttonClicked: false,
      previewImage: null,
    });

    const house = computed(() => {
      return store.getters.getByIdEditModel(route.params.houseId);
    });

    function submitButtonClicked() {
      state.buttonClicked = true;
    }

    function editHouseListing() {
      store
        .dispatch("editHouse", { id: route.params.houseId, body: house.value })
        .then(() => {
          // API success
          router.push({ name: "home" });
          console.log("data edited");
        })
        .catch((e) => {
          // API fail
          console.log("error in request edit", e);
        });
    }

    function createHouseListing() {
      store
        .dispatch("createHouse", house.value)
        .then(() => {
          // API success
          router.push({ name: "home" });
          console.log("data created");
        })
        .catch((e) => {
          // API fail
          console.log("error in request create", e);
        });
    }

    function submitForm() {
      if (route.params.houseId) editHouseListing();
      else createHouseListing();
    }

    function uploadImage(e) {
      const image = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = (e) => {
        this.previewImage = e.target.result;
        console.log(this.previewImage);
      };
    }

    return {
      ...toRefs(state),
      house,
      submitForm,
      submitButtonClicked,
      uploadImage,
      route,
    };
  },
};
</script>

<style lang="scss" scoped>
.root {
  margin: 0;
  padding: 0;
  background-image: url("/src/assets/img_background@3x.png");
  background-repeat: no-repeat;
  background-size: 105%;

  .create-house-container {
    margin: 30px 0 0 15%;
    .back-button {
      margin-bottom: 20px;
    }
    .header1 {
      margin-bottom: 20px;
    }

    .flex {
      display: flex;
    }
    .input-field-title {
      margin: 10px 0;
    }
    .spacer {
      width: 20px;
    }
    .btn-container {
      margin: 50px 275px;
    }
    .uploading-image {
      width: 100px;
      height: 100px;
      border-radius: 5px;
    }
    .error {
      border: 1px solid red;
      &::placeholder {
        color: red;
        opacity: 1; /* Firefox */
      }

      &:-ms-input-placeholder {
        /* Internet Explorer 10-11 */
        color: red;
      }

      &::-ms-input-placeholder {
        /* Microsoft Edge */
        color: red;
      }
    }
  }
}
</style>
