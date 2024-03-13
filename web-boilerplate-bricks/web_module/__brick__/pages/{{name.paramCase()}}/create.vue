<template>
  <div class="page">
    <PageHeader
      backRoute="/{{name.lowerCase()}}"
      title="Create {{name.pascalCase()}}"
    />
    <div class="page__body">
      <ErrorList :errors="errors" v-show="!$_.isEmpty(errors)" />
      <{{ name.pascalCase() }}Form :submitHandler="submitHandler" ref="form" />
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "default",
});
const { $_ } = useNuxtApp();

let errors = ref([]);
async function submitHandler(data: any) {}
</script>

<style lang="postcss" scoped>
.page__body {
  @apply w-full;
}
</style>
