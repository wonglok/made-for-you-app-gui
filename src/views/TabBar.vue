<template>
  <div class="relative">
    <div class="h-32 lg:hide">
    </div>
    <div class="my-4 mb-6 menu-pos w-full flex justify-center">
      <div class="menu-box fadeinleft flex justify-around">
        <router-link to="/">
          <div class=" flex flex-col items-center px-4 lg:py-4">
            <img src="../assets/menu/home.svg" alt="Home">
            <p class=" pt-1 text-xs">Home</p>
          </div>
        </router-link>
        <router-link to="/create">
          <div class=" flex flex-col items-center px-4 lg:py-4">
            <img src="../assets/menu/create.svg" alt="Create">
            <p class=" pt-1 text-xs">Create</p>
          </div>
        </router-link>
        <router-link to="/save">
          <div class=" flex flex-col items-center px-4 lg:py-4">
            <img src="../assets/menu/give.svg" alt="Save">
            <p class=" pt-1 text-xs">Save</p>
          </div>
        </router-link>
        <router-link to="/inspire">
          <div class=" flex flex-col items-center px-4 lg:py-4">
            <img src="../assets/menu/inspire.svg" alt="Inspire">
            <p class=" pt-1 text-xs">Inspire</p>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="postcss">
.menu-pos{
  position: fixed;
  bottom: 0px;
  left: 0px;
}

@screen lg {
  .menu-pos{
    position: fixed;
    top: 0px;
    left: -17rem;
    bottom: unset;
    height: unset;
  }
}

.menu-box{
  background: #f9f9f9;
  border: 1px solid #ececec;
  border-radius: 44px;
  padding: 15px 20px;
  box-shadow: 0px 0px 20px 0px #ececec;
}

@screen lg {
  .menu-box{
    display: flex;
    flex-direction: column;
  }
}

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
</style>
