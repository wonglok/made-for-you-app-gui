<template>
  <div v-if="!isAtLanding" class="bottom-0 left-0 w-full pb-5 flex justify-center">
    <div class="bg-white px-4 py-3 rounded-full border-gray-400 border fadeinleft flex justify-around">
      <router-link class="fade-in-scale" exact-active-class="active-route" to="/home">
        <div class=" flex flex-col items-center mx-4">
          <img class="icon-sizer" src="../assets/menu/home.svg" alt="Home">
          <p class=" pt-1 text-xs">Home</p>
          <div class="dot"></div>
        </div>
      </router-link>

      <router-link class="fade-in-scale" exact-active-class="active-route" to="/create">
        <div class=" flex flex-col items-center mx-4">
          <img class="icon-sizer" src="../assets/menu/create.svg" alt="Create">
          <p class=" pt-1 text-xs">Create</p>
          <div class="dot"></div>
        </div>
      </router-link>

      <router-link class="fade-in-scale" exact-active-class="active-route" to="/give">
        <div class=" flex flex-col items-center mx-4">
          <img class="icon-sizer" src="../assets/menu/give.svg" alt="Save">
          <p class=" pt-1 text-xs">Give</p>
          <div class="dot"></div>
        </div>
      </router-link>

      <router-link class="fade-in-scale" exact-active-class="active-route" to="/inspire">
        <div class=" flex flex-col items-center mx-4">
          <img class="icon-sizer" src="../assets/menu/inspire.svg" alt="Inspire">
          <p class=" pt-1 text-xs">Inspire</p>
          <div class="dot"></div>
        </div>
      </router-link>

      <router-link class="fade-in-scale" exact-active-class="active-route" to="/">
        <div class=" flex flex-col items-center mx-4">
          <img class="icon-sizer" src="../assets/menu/info.svg" alt="What is this site?">
          <p class=" pt-1 text-xs">Info</p>
          <div class="dot"></div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    isAtLanding () {
      return this.$route.fullPath === '/'
    }
  }
}
</script>

<style scoped lang="postcss">
.icon-sizer{
  height: 24px;
}
@keyframes fade-in-scale {
  0%{
    opacity: 0;
    transform: scale(0.5);
  }
  100%{
    opacity: 1;
    transform: scale(1);
  }
}
.fade-in-scale{
  --delay: 0.2s;
}
.fade-in-scale:nth-child(1) {
  animation: fade-in-scale 0.5s ease-in-out 0s 1 normal both;
  animation-delay: calc(var(--delay) * 0);
}
.fade-in-scale:nth-child(2) {
  animation: fade-in-scale 0.5s ease-in-out 0s 1 normal both;
  animation-delay: calc(var(--delay) * 1);
}
.fade-in-scale:nth-child(3) {
  animation: fade-in-scale 0.5s ease-in-out 0s 1 normal both;
  animation-delay: calc(var(--delay) * 2);
}
.fade-in-scale:nth-child(4) {
  animation: fade-in-scale 0.5s ease-in-out 0s 1 normal both;
  animation-delay: calc(var(--delay) * 3);
}
.fade-in-scale:nth-child(5) {
  animation: fade-in-scale 0.5s ease-in-out 0s 1 normal both;
  animation-delay: calc(var(--delay) * 4);
}
.fade-in-scale:nth-child(6) {
  animation: fade-in-scale 0.5s ease-in-out 0s 1 normal both;
  animation-delay: calc(var(--delay) * 5);
}
.fade-in-scale:nth-child(7) {
  animation: fade-in-scale 0.5s ease-in-out 0s 1 normal both;
  animation-delay: calc(var(--delay) * 6);
}
.fade-in-scale:nth-child(8) {
  animation: fade-in-scale 0.5s ease-in-out 0s 1 normal both;
  animation-delay: calc(var(--delay) * 7);
}
.fade-in-scale:nth-child(9) {
  animation: fade-in-scale 0.5s ease-in-out 0s 1 normal both;
  animation-delay: calc(var(--delay) * 8);
}
.fade-in-scale:nth-child(10) {
  animation: fade-in-scale 0.5s ease-in-out 0s 1 normal both;
  animation-delay: calc(var(--delay) * 9);
}
.fade-in-scale:nth-child(11) {
  animation: fade-in-scale 0.5s ease-in-out 0s 1 normal both;
  animation-delay: calc(var(--delay) * 10);
}
.fade-in-scale:nth-child(12) {
  animation: fade-in-scale 0.5s ease-in-out 0s 1 normal both;
  animation-delay: calc(var(--delay) * 11);
}
.dot{
  transition: transform 0.5s;
  transform: scale(0);
}
.active-route .dot{
  transform: scale(1);
  border-bottom: lime solid 1px;
  width: 100%;
  margin-bottom: -1px;
  box-shadow: 0px 0px 5px 0px lime;
}
</style>
