<template>
  <div class="alert">
    <div class="container">
      <div class="header2">Delete listing</div>
      <div class="listing-information text-darkgrey">
        Are you sure you want to delete this listing? <br />
        This action cannot be undone.
      </div>
      <br />
      <div class="buttons">
        <button
          @click.prevent="deleteHouse"
          class="ok-button input-field-title"
        >
          YES, DELETE
        </button>
        <br />
        <button
          @click.prevent="hideAlert"
          class="cancel-button input-field-title"
        >
          GO BACK
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  name: "DeleteConfirmationAlert",
  props: {
    houseId: {
      type: Number,
      required: true,
    },
  },
  setup(props, context) {
    const store = useStore();
    const router = useRouter();

    function hideAlert() {
      context.emit("hideAlert");
    }

    function deleteHouse() {
      store
        .dispatch("deleteHouse", props.houseId)
        .then(() => {
          // API success
          context.emit("hideAlert");
          router.push({ name: "home" });
          console.log("data deleted");
        })
        .catch(() => {
          // API fail
          console.log("error in request delete");
        });
    }

    return {
      hideAlert,
      deleteHouse,
    };
  },
  emits: ["hideAlert"],
};
</script>

<style lang="scss" scoped>
.alert {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  text-align: center;
  .container {
    background-color: white;
    padding: 40px 120px;
    border-radius: 15px;
  }
  .header2 {
    margin-bottom: 20px;
  }
  .listing-information {
    margin-bottom: 32px;
  }
  .buttons {
    display: grid;
    button {
      width: 100%;
      margin-right: 16px;
      padding: 8px 16px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      pointer-events: auto;
    }
    button.cancel-button {
      background-color: map-get($colors, SECONDARY);
      color: #fff;
    }
    button.ok-button {
      background-color: map-get($colors, PRIMARY);
      color: #fff;
    }
  }
}
</style>
