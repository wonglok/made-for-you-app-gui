<template>
  <div class="relative">
    <div class="my-4 fixed bottom-0 left-0 w-full flex justify-center">
      <div class="menu-box flex justify-around">
        <router-link to="/">
          <div class=" flex flex-col items-center px-4">
            <img src="../assets/menu/home.svg" alt="Home">
            <p class=" pt-1 text-xs">Home</p>
          </div>
        </router-link>
        <router-link to="/create">
          <div class=" flex flex-col items-center px-4">
            <img src="../assets/menu/create.svg" alt="Create">
            <p class=" pt-1 text-xs">Create</p>
          </div>
        </router-link>
        <router-link to="/save">
          <div class=" flex flex-col items-center px-4">
            <img src="../assets/menu/give.svg" alt="Save">
            <p class=" pt-1 text-xs">Save</p>
          </div>
        </router-link>
        <router-link to="/inspire">
          <div class=" flex flex-col items-center px-4">
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

<style scoped>
.menu-box{
  background: #F1F1F1;
  border: 0 solid #979797;
  border-radius: 44px;
  padding: 15px 20px;
  box-shadow: 0px 0px 30px 0px #979797;
}
</style>
