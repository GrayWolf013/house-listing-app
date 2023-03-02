<template>
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
      <img
        v-if="previewImage"
        :src="previewImage"
        alt="upload"
        class="uploading-image"
      />
      <img
        v-else-if="house.image"
        :src="house.image"
        alt="upload"
        class="uploading-image"
      />
      <img v-else src="@/assets/ic_upload@3x.png" class="uploading-image" />
      <input type="file" accept="image/jpeg" @change="uploadImage" />
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
        <select v-model="house.hasGarage">
          <option value="false">no</option>
          <option value="true">yes</option>
        </select>
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
  </form>
</template>

<script>
import { reactive, toRefs, computed } from "vue";
import { useStore } from "vuex";

export default {
  name: "HouseListingForm",
  props: {
    houseId: {
      type: null,
      required: true,
    },
  },
  setup(props, context) {
    const store = useStore();

    const state = reactive({
      buttonClicked: false,
      previewImage: null,
    });

    const house = computed(() => {
      return store.getters.getByIdEditModel(props.houseId);
    });

    function uploadImage(e) {
      const image = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = (e) => {
        state.previewImage = e.target.result;
        context.emit("selectImage", {
          image: image,
          previewImage: state.previewImage,
        });
      };
    }

    function submitButtonClicked() {
      state.buttonClicked = true;
    }

    function submitForm() {
      context.emit("submitForm", house.value);
    }

    return {
      ...toRefs(state),
      house,

      uploadImage,
      submitButtonClicked,
      submitForm,
    };
  },
};
</script>

<style lang="scss" scoped>
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
</style>
