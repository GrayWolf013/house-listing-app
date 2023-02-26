<template>
  <div class="root">
    <div class="create-house-container">
      <router-link to="/" style="text-decoration: none; color: inherit">
        <div class="back-button">
          <img src="@/assets/ic_back_grey@3x.png" alt="ic_back" width="20" height="20" />
          <div class="back-button-label">Back to overview</div>
        </div>
      </router-link>
      <div>
        <div class="header1">Create new listing</div>
        <div class="input-field-title">Street name*</div>
        <input type="text" placeholder="Enter the street name" />
        <div class="flex">
          <div>
            <div class="input-field-title">House number*</div>
            <input type="text" placeholder="Enter the house number" />
          </div>
          <div class="spacer" />
          <div>
            <div class="input-field-title">Addition (optional)</div>
            <input type="text" placeholder="e.g. A" />
          </div>
        </div>
        <div class="input-field-title">Postal Code*</div>
        <input type="text" placeholder="e.g. 1000 AA" />
        <div class="input-field-title">City*</div>
        <input type="text" placeholder="e.g. Utrecht" />
        <div class="input-field-title">Upload picture (PNG or JPG)*</div>
        <img src="@/assets/ic_upload@3x.png" alt="upload" />
        <div class="input-field-title">Price*</div>
        <input type="text" placeholder="e.g. €150.000" />
        <div class="flex">
          <div>
            <div class="input-field-title">Size*</div>
            <input type="text" placeholder="e.g. 60m²" />
          </div>
          <div class="spacer" />
          <div>
            <div class="input-field-title">Garage*</div>
            <input type="text" placeholder="Select" />
          </div>
        </div>
        <div class="flex">
          <div>
            <div class="input-field-title">Bedrooms*</div>
            <input type="text" placeholder="Enter amount" />
          </div>
          <div class="spacer" />
          <div>
            <div class="input-field-title">Bathrooms*</div>
            <input type="text" placeholder="Enter amount" />
          </div>
        </div>
        <div class="input-field-title">Construction date*</div>
        <input type="text" placeholder="e.g. 1900" />
        <div class="input-field-title">Description*</div>
        <textarea name="" id="" cols="30" rows="10" placeholder="Enter description" />
        <div class="btn-container">
          <button class="btn">POST</button>
        </div>
        <br>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    return {};
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
}
}
</style>
