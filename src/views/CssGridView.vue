<script setup lang="ts"></script>

<template>
  <div class="wrapper">
    <div class="box box1">One</div>
    <div class="box box2">Two</div>
    <div class="box box3">Three</div>
    <div class="box box4">Four</div>
    <div class="box box5">Five</div>
  </div>
</template>

<style scoped>
.wrapper {
  display: grid;
  height: 300px;
  /* grid-template-columns: repeat(3, 1fr); */
  grid-template-columns: [first-columns-start] 1fr [first-column-end second-column-start] 1fr [second-column-end third-column-start] 1fr [third-column-end];
  background-color: #222222;
  /* grid-template-rows: repeat(2, 1fr); */
  grid-auto-rows: minmax(100px, auto);
  /* column-gap: 10px; */
  /* row-gap: 10px; */
  gap: 10px;
  /* justify-items: stretch; */
  /* align-items: center; */
  /* place-items: stretch; */
  /* justify-content: space-around; */
  align-content: space-between;
}

.box {
  border: 1px solid red;
}
</style>