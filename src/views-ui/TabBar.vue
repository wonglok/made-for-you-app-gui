<template>
  <div v-if="!isAtLanding">
    <div class="h-24"></div>
    <div class="fixed bottom-0 left-0 w-full pb-5 flex justify-center">
      <div class="bg-white px-4 py-3 rounded-full border-gray-500 border fadeinleft flex justify-around">
        <router-link exact-active-class="active-route" to="/home">
          <div class=" flex flex-col items-center px-4">
            <img src="../assets/menu/home.svg" alt="Home">
            <p class=" pt-1 text-xs">Home</p>
            <div class="dot"></div>
          </div>
        </router-link>
        <router-link exact-active-class="active-route" to="/create">
          <div class=" flex flex-col items-center px-4">
            <img src="../assets/menu/create.svg" alt="Create">
            <p class=" pt-1 text-xs">Create</p>
            <div class="dot"></div>
          </div>
        </router-link>
        <router-link exact-active-class="active-route" to="/save">
          <div class=" flex flex-col items-center px-4">
            <img src="../assets/menu/give.svg" alt="Save">
            <p class=" pt-1 text-xs">Save</p>
            <div class="dot"></div>
          </div>
        </router-link>
        <router-link exact-active-class="active-route" to="/inspire">
          <div class=" flex flex-col items-center px-4">
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
@keyframes fadeinleft {
  0%{
    opacity: 0;
    transform: translateX(-30px);
  }
  100%{
    opacity: 1;
    transform: translateX(0px);
  }
}
@screen lg{
  .fadeinleft{
    animation: fadeinleft 1s ease-in-out 0s 1 normal both;
  }
}
.active-route .dot{
  border-bottom: lime solid 1px;
  width: 100%;
  margin-bottom: -1px;
  box-shadow: 0px 0px 5px 0px lime;
}
</style>
