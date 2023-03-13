<template>
  <form @submit.prevent="">
    <div class="input-field-title">Street name*</div>
    <input
      type="text"
      placeholder="Enter the street name"
      v-model="house.streetName"
      :class="{ error: isInvalid('streetName') }"
      @input="setFieldTouched('streetName')"
    />
    <div class="flex">
      <div class="flex-item">
        <div class="input-field-title">House number*</div>
        <input
          type="number"
          placeholder="Enter the house number"
          v-model="house.houseNumber"
          :class="{ error: isInvalid('houseNumber') }"
          @input="setFieldTouched('houseNumber')"
        />
      </div>
      <div class="spacer" />
      <div class="flex-item">
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
      :class="{ error: isInvalid('zip') }"
      @input="setFieldTouched('zip')"
    />
    <div class="input-field-title">City*</div>
    <input
      type="text"
      placeholder="e.g. Utrecht"
      v-model="house.city"
      :class="{ error: isInvalid('city') }"
      @input="setFieldTouched('city')"
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
      :class="{ error: isInvalid('price') }"
      @input="setFieldTouched('price')"
    />
    <div class="flex">
      <div class="flex-item">
        <div class="input-field-title">Size*</div>
        <input
          type="number"
          placeholder="e.g. 60m²"
          v-model="house.size"
          :class="{ error: isInvalid('size') }"
          @input="setFieldTouched('size')"
        />
      </div>
      <div class="spacer" />
      <div class="flex-item">
        <div class="input-field-title">Garage*</div>
        <select
          v-model="house.hasGarage"
          :class="{ error: isInvalid('hasGarage') }"
          @click="setFieldTouched('hasGarage')"
        >
          <option selected disabled :value="null">
            Please select an option
          </option>
          <option :value="true">Yes</option>
          <option :value="false">No</option>
        </select>
      </div>
    </div>
    <div class="flex">
      <div class="flex-item">
        <div class="input-field-title">Bedrooms*</div>
        <input
          type="number"
          placeholder="Enter amount"
          v-model="house.bedrooms"
          :class="{ error: isInvalid('bedrooms') }"
          @input="setFieldTouched('bedrooms')"
        />
      </div>
      <div class="spacer" />
      <div class="flex-item">
        <div class="input-field-title">Bathrooms*</div>
        <input
          type="number"
          placeholder="Enter amount"
          v-model="house.bathrooms"
          :class="{ error: isInvalid('bathrooms') }"
          @input="setFieldTouched('bathrooms')"
        />
      </div>
    </div>
    <div class="input-field-title">Construction date*</div>
    <input
      type="number"
      placeholder="e.g. 1900"
      v-model="house.constructionYear"
      :class="{ error: isInvalid('constructionYear') }"
      @input="setFieldTouched('constructionYear')"
    />
    <div class="input-field-title">Description*</div>
    <textarea
      cols="30"
      rows="10"
      placeholder="Enter description"
      v-model="house.description"
      :class="{ error: isInvalid('description') }"
      @input="setFieldTouched('description')"
    />
    <div class="error-label">
      {{ errorMessage }}
    </div>
    <div class="btn-container">
      <button
        class="btn"
        @click="submitButtonClicked"
        :disabled="submitButtonDisabled"
      >
        POST
      </button>
    </div>
  </form>
</template>

<script>
import { reactive, toRefs, computed, onMounted, watch } from "vue";
import { useStore } from "vuex";
import UploadImageComponent from "./UploadImageComponent.vue";

export default {
  name: "HouseListingForm",
  props: {
    houseId: {
      type: String,
      required: false,
    },
  },
  setup(props, context) {
    const store = useStore();
    const state = reactive({
      house: {
        image: null,
        price: null,
        bedrooms: null,
        bathrooms: null,
        size: null,
        description: null,
        streetName: null,
        houseNumber: null,
        numberAddition: null,
        city: null,
        zip: null,
        constructionYear: null,
        hasGarage: null,
      },
      errorMessage: "",
      touchedFields: {}, // object to track if each field has been touched or not
    });

    const isInvalid = computed(() => (field) => {
      const { touchedFields } = state;
      if (touchedFields[field]) return validateField(field, true);
      else return false;
    });

    function validateField(field, error) {
      const { house } = state;
      let isInvalid = false;

      switch (field) {
        case "numberAddition":
          break;
        case "image":
          break;
        case "hasGarage":
          isInvalid = !(typeof house[field] === "boolean");
          if (isInvalid && error)
            state.errorMessage = "Please pick a garage option.";
          break;

        case "constructionYear":
          isInvalid = !isYearFormat(house[field]);
          if (isInvalid && error)
            state.errorMessage = "Please pick a valid construction year.";
          break;

        default:
          isInvalid = !house[field];
          if (isInvalid && error)
            state.errorMessage = "Please fill out all required fields.";
          break;
      }
      return isInvalid;
    }

    const submitButtonDisabled = computed(() => {
      let isInvalid = false;
      const { house } = state;
      Object.keys(house).map((key) => {
        if (validateField(key)) {
          isInvalid = true;
          return;
        }
      });
      return isInvalid;
    });

    watch(submitButtonDisabled, (newValue) => {
      if (!newValue) {
        state.errorMessage = "";
      }
    });

    function selectImage(data) {
      context.emit("selectImage", {
        image: data.image,
        previewImage: data.previewImage,
      });
    }

    function isYearFormat(inputNumber) {
      if (!inputNumber) return false;
      // Convert inputNumber to a string
      var inputString = inputNumber.toString();
      // Check if inputString is a valid year format 'yyyy'
      var yearRegex = /^\d{4}$/;
      if (!yearRegex.test(inputString)) return false;
      // Check if input year is not before the current year
      var inputYear = parseInt(inputString);
      var currentYear = new Date().getFullYear();
      if (!(inputYear < currentYear)) return false;

      return true;
    }

    // method to set the touched status of a field to true
    function setFieldTouched(field) {
      state.touchedFields = {
        ...state.touchedFields,
        [field]: true,
      };
    }

    function submitButtonClicked() {
      context.emit("submitForm", state.house);
    }

    onMounted(async () => {
      if (props && props.houseId) {
        state.house = store.getters.getByIdEditModel(props.houseId);
      }
    });

    return {
      ...toRefs(state),
      submitButtonDisabled,

      isInvalid,
      setFieldTouched,
      selectImage,
      submitButtonClicked,
    };
  },
  components: { UploadImageComponent },
  emits: ["selectImage", "submitForm"],
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

@media screen and (max-width: 767px) {
  input[type="text"],
  input[type="number"],
  select,
  textarea {
    width: 100%;
  }
  .flex {
    .flex-item {
      flex: 1;
      flex-basis: 50%;
    }
  }
}
</style>
