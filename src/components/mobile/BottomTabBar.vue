<template>
  <div class="tab-bar">
    <router-link to="/" class="tab" active-class="active">
      <div class="tab-home">
        <div class="tab-icon" />
      </div>
    </router-link>
    <router-link to="/favorite" class="tab" active-class="active">
      <div class="tab-favorite">
        <div class="tab-icon" />
      </div>
    </router-link>
    <router-link to="/about" class="tab" active-class="active">
      <div class="tab-about">
        <div class="tab-icon" />
      </div>
    </router-link>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";

export default {
  setup() {
    const state = reactive({});

    return {
      ...toRefs(state),
    };
  },
};
</script>

<style lang="scss" scoped>
.tab-bar {
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #fff;
  border-top: 1px solid #ddd;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 60px;
  z-index: 1;
  .tab {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    color: #aaa;
    height: 100%;
    width: 100%;
    padding: 10px;
    font-size: 14px;
    transition: color 0.3s ease-in-out;
    .tab-icon {
      width: 15px;
      height: 15px;
      background-repeat: no-repeat;
      background-size: cover;
    }
    .tab-home {
      .tab-icon {
        background-image: url("../../assets/ic_mobile_navigarion_home@3x.png");
      }
    }
    .tab-favorite {
      .tab-icon {
        background-image: url("../../assets/favorite-off.png");
      }
    }
    .tab-about {
      .tab-icon {
        background-image: url("../../assets/ic_mobile_navigarion_info@3x.png");
      }
    }
  }
  .active {
    .tab-home {
      .tab-icon {
        background-image: url("../../assets/ic_mobile_navigarion_home_active@3x.png");
      }
    }
    .tab-favorite {
      .tab-icon {
        background-image: url("../../assets/favorite-on.png");
      }
    }
    .tab-about {
      .tab-icon {
        background-image: url("../../assets/ic_mobile_navigarion_info_active@3x.png");
      }
    }
  }
}
</style>
