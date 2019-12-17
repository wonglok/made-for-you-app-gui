<template>
  <div v-if="!isAtLanding">
    <div class="h-24"></div>
    <div class="fixed bottom-0 left-0 w-full pb-5 flex justify-center">
      <div class="bg-white px-4 py-3 rounded-full border-gray-500 border fadeinleft flex justify-around">
        <router-link class="fadeinbottom" exact-active-class="active-route" to="/home">
          <div class=" flex flex-col items-center mx-4">
            <img src="../assets/menu/home.svg" alt="Home">
            <p class=" pt-1 text-xs">Home</p>
            <div class="dot"></div>
          </div>
        </router-link>
        <router-link class="fadeinbottom" exact-active-class="active-route" to="/create">
          <div class=" flex flex-col items-center mx-4">
            <img src="../assets/menu/create.svg" alt="Create">
            <p class=" pt-1 text-xs">Create</p>
            <div class="dot"></div>
          </div>
        </router-link>
        <router-link class="fadeinbottom" exact-active-class="active-route" to="/give">
          <div class=" flex flex-col items-center mx-4">
            <img src="../assets/menu/give.svg" alt="Save">
            <p class=" pt-1 text-xs">Give</p>
            <div class="dot"></div>
          </div>
        </router-link>
        <router-link class="fadeinbottom" exact-active-class="active-route" to="/inspire">
          <div class=" flex flex-col items-center mx-4">
            <img src="../assets/menu/inspire.svg" alt="Inspire">
            <p class=" pt-1 text-xs">Inspire</p>
            <div class="dot"></div>
          </div>
        </router-link>
      </div>
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
@keyframes fadeinbottom {
  0%{
    opacity: 0;
    transform: translateY(30px);
  }
  100%{
    opacity: 1;
    transform: translateY(0px);
  }
}
.fadeinbottom{
  --delay: 0.2s;
}
.fadeinbottom:nth-child(1) {
  animation: fadeinbottom 1s ease-in-out 0s 1 normal both;
  animation-delay: calc(var(--delay) * 0);
}
.fadeinbottom:nth-child(2) {
  animation: fadeinbottom 1s ease-in-out 0s 1 normal both;
  animation-delay: calc(var(--delay) * 1);
}
.fadeinbottom:nth-child(3) {
  animation: fadeinbottom 1s ease-in-out 0s 1 normal both;
  animation-delay: calc(var(--delay) * 2);
}
.fadeinbottom:nth-child(4) {
  animation: fadeinbottom 1s ease-in-out 0s 1 normal both;
  animation-delay: calc(var(--delay) * 3);
}
.fadeinbottom:nth-child(5) {
  animation: fadeinbottom 1s ease-in-out 0s 1 normal both;
  animation-delay: calc(var(--delay) * 4);
}
.fadeinbottom:nth-child(6) {
  animation: fadeinbottom 1s ease-in-out 0s 1 normal both;
  animation-delay: calc(var(--delay) * 5);
}
.fadeinbottom:nth-child(7) {
  animation: fadeinbottom 1s ease-in-out 0s 1 normal both;
  animation-delay: calc(var(--delay) * 6);
}
.fadeinbottom:nth-child(8) {
  animation: fadeinbottom 1s ease-in-out 0s 1 normal both;
  animation-delay: calc(var(--delay) * 7);
}
.fadeinbottom:nth-child(9) {
  animation: fadeinbottom 1s ease-in-out 0s 1 normal both;
  animation-delay: calc(var(--delay) * 8);
}
.fadeinbottom:nth-child(10) {
  animation: fadeinbottom 1s ease-in-out 0s 1 normal both;
  animation-delay: calc(var(--delay) * 9);
}
.fadeinbottom:nth-child(11) {
  animation: fadeinbottom 1s ease-in-out 0s 1 normal both;
  animation-delay: calc(var(--delay) * 10);
}
.fadeinbottom:nth-child(12) {
  animation: fadeinbottom 1s ease-in-out 0s 1 normal both;
  animation-delay: calc(var(--delay) * 11);
}
.active-route .dot{
  border-bottom: lime solid 1px;
  width: 100%;
  margin-bottom: -1px;
  box-shadow: 0px 0px 5px 0px lime;
}
</style>
