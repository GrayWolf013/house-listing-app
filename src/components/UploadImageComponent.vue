<template>
  <div>
    <div v-if="previewImage" class="uploading-image-container">
      <button @click="removeImage" class="close">
        <span>&times;</span>
      </button>
      <img alt="upload" :src="previewImage" @click="chooseFile" />
    </div>
    <div v-else-if="houseImage" class="uploading-image-container">
      <img alt="upload" :src="houseImage" @click="chooseFile" />
    </div>
    <img v-else src="@/assets/ic_upload@3x.png" @click="chooseFile" />
    <input
      type="file"
      accept="image/jpeg"
      @change="uploadImage"
      ref="fileInput"
    />
  </div>
</template>

<script>
import { reactive, toRefs, ref } from "vue";

export default {
  props: {
    houseImage: {
      type: String,
      required: false,
    },
  },
  setup(props, context) {
    const fileInput = ref(null);

    const state = reactive({
      previewImage: null,
    });

    function chooseFile() {
      fileInput.value.click();
    }

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

    function removeImage() {
      fileInput.value.value = null;
      state.previewImage = null;
      context.emit("selectImage", {
        image: null,
        previewImage: null,
      });
    }
    return {
      ...toRefs(state),
      fileInput,

      chooseFile,
      uploadImage,
      removeImage,
    };
  },
};
</script>

<style lang="scss" scoped>
.uploading-image-container {
  position: relative;
  width: 100px;
  height: 100px;
  img {
    width: 100%;
    height: 100%;
    border-radius: 5px;
  }
  .close {
    top: -5px;
    right: -10px;
    position: absolute;
    border: none;
    border-radius: 20px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
  }
}
input[type="file"] {
  display: none;
}
</style>
