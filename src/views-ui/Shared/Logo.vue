<template>
  <div class="flex">
    <router-link class="flex" to="/">
      <div class="logo-holder">
        <img src="../../assets/images/logo-framed.svg" alt="CreativeCodeLabLogo">
      </div>
      <div class="flex flex-col items-start justify-center adjust-some">
        <div class="pl-2 text-xl font-title font-black text-black">
          CreativeCodeLab.com
        </div>
        <div class="pl-2 text-lg text-gray-700">
          Assisted Creative Coding.
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.logo-holder{
  width: 72px;
  height: 72px;
}
.adjust-some{
  transform: translateY(-3px);
}
</style>
