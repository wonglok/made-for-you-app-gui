<template>
  <div class="spinner"></div>
</template>

<script>
export default {

}
</script>

<style scoped>
.spinner {
  width: 40px;
  height: 40px;
  margin: 100px auto;
  background-color: #AEA3EF;

  border-radius: 400px;
  animation: sk-scaleout 1.0s infinite ease-in-out both;
}

@keyframes sk-scaleout {
  0% {
    transform: scale(0);
  } 100% {
    transform: scale(1.0);
    opacity: 0;
  }
}
</style>
