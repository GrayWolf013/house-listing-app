<template>
  <form @submit.prevent="">
    <div class="input-field-title">Street name*</div>
    <input
      type="text"
      placeholder="Enter the street name"
      v-model="house.streetName"
      :class="{ error: !house.streetName && buttonClicked }"
    />
    <div class="flex">
      <div>
        <div class="input-field-title">House number*</div>
        <input
          type="number"
          placeholder="Enter the house number"
          v-model="house.houseNumber"
          :class="{ error: !house.houseNumber && buttonClicked }"
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
    />
    <div class="input-field-title">City*</div>
    <input
      type="text"
      placeholder="e.g. Utrecht"
      v-model="house.city"
      :class="{ error: !house.city && buttonClicked }"
    />
    <div class="input-field-title">Upload picture (PNG or JPG)*</div>
    <UploadImageComponent
      :houseImage="house.image"
      @selectImage="selectImage"
    />

    <div class="input-field-title">Price*</div>
    <input
      type="number"
      placeholder="e.g. €150.000"
      v-model="house.price"
      :class="{ error: !house.price && buttonClicked }"
    />
    <div class="flex">
      <div>
        <div class="input-field-title">Size*</div>
        <input
          type="number"
          placeholder="e.g. 60m²"
          v-model="house.size"
          :class="{ error: !house.size && buttonClicked }"
        />
      </div>
      <div class="spacer" />
      <div>
        <div class="input-field-title">Garage*</div>
        <select
          v-model="house.hasGarage"
          :class="{ error: !house.hasGarage && buttonClicked }"
        >
          <option disabled value="">Please select an option</option>
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
        />
      </div>
    </div>
    <div class="input-field-title">Construction date*</div>
    <input
      type="number"
      placeholder="e.g. 1900"
      v-model="house.constructionYear"
      :class="{ error: !house.constructionYear && buttonClicked }"
    />
    <div class="input-field-title">Description*</div>
    <textarea
      cols="30"
      rows="10"
      placeholder="Enter description"
      v-model="house.description"
      :class="{ error: !house.description && buttonClicked }"
    />
    <div class="error-label">
      {{ errorMessage }}
    </div>
    <div class="btn-container">
      <button class="btn" @click="submitButtonClicked">POST</button>
    </div>
  </form>
</template>

<script>
import { reactive, toRefs, computed } from "vue";
import { useStore } from "vuex";
import UploadImageComponent from "./UploadImageComponent.vue";

export default {
  name: "HouseListingForm",
  props: {
    houseId: {
      type: Number,
      required: true,
    },
  },
  setup(props, context) {
    const store = useStore();
    const state = reactive({
      buttonClicked: false,
      errorMessage: "",
    });

    const house = computed(() => {
      if (props && props.houseId) {
        return store.getters.getByIdEditModel(props.houseId);
      }
      return {};
    });

    function selectImage(data) {
      context.emit("selectImage", {
        image: data.image,
        previewImage: data.previewImage,
      });
    }

    function isYearFormat(inputNumber) {
      // Convert inputNumber to a string
      var inputString = inputNumber.toString();

      // Check if inputString is a valid year format 'yyyy'
      var yearRegex = /^\d{4}$/;
      if (!yearRegex.test(inputString)) {
        return false;
      }

      // Check if input year is not before the current year
      var inputYear = parseInt(inputString);
      var currentYear = new Date().getFullYear();
      if (!(inputYear < currentYear)) {
        return false;
      }

      return true;
    }

    function formInvalid() {
      // Check if any required fields are empty
      if (
        !house.value.streetName ||
        !house.value.houseNumber ||
        !house.value.zip ||
        !house.value.city ||
        !house.value.price ||
        !house.value.size ||
        !house.value.bedrooms ||
        !house.value.bathrooms ||
        !house.value.constructionYear ||
        !house.value.description ||
        !house.value.hasGarage
      ) {
        state.errorMessage = "Please fill out all required fields.";
        return true;
      }

      if (!isYearFormat(house.value.constructionYear)) {
        state.errorMessage = "Please enter valid construction year.";
        return true;
      }

      return false;
    }

    function submitButtonClicked() {
      state.buttonClicked = true;
      if (!formInvalid()) context.emit("submitForm", house.value);
    }

    return {
      ...toRefs(state),
      house,

      selectImage,
      submitButtonClicked,
    };
  },
  components: { UploadImageComponent },
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
.error {
  border: 1px solid #f00 !important;

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
.error-label {
  color: red;
}
</style>
