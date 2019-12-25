<template>
  <div class="w-full md:w-1/2 xl:w-1/3 p-3">
      <!--Template Card-->
      <div class="bg-white border rounded shadow">
          <div class="border-b p-3">
              <h5 class="font-bold uppercase text-gray-600"><slot name="title"></slot></h5>
          </div>
          <div class="p-5">
              <slot name="body"></slot>
          </div>
      </div>
      <!--/Template Card-->
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
