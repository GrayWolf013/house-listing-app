<template>
  <div>
    <img
      v-if="previewImage"
      :src="previewImage"
      alt="upload"
      class="uploading-image"
    />
    <img
      v-else-if="houseImage"
      :src="houseImage"
      alt="upload"
      class="uploading-image"
    />
    <img v-else src="@/assets/ic_upload@3x.png" class="uploading-image" />
    <input type="file" accept="image/jpeg" @change="uploadImage" />
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";

export default {
  props: {
    houseImage: {
      type: null,
      required: true,
    },
  },
  setup(props, context) {
    const state = reactive({
        previewImage: null
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
    return {
      ...toRefs(state),
      uploadImage
    };
  },
};
</script>

<style lang="scss" scoped>
.uploading-image {
  width: 100px;
  height: 100px;
  border-radius: 5px;
}
</style>
