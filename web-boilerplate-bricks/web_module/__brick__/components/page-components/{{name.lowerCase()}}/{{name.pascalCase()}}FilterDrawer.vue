<template>
  <!-- UPDATE INPUT FIELDS AS YOU SEE FIT -->
  <Drawer title="Filter By" :show="show" @close="$emit('close')">
    <VForm>
      <div class="form">
        <span class="form__filter-label">Search Filters</span>
        <div class="form__filters">
          <Checkbox
            id="Name"
            label="Name"
            inputValue="name"
            name="filterBy"
            v-model="formData.filterBy"
          />
          <Checkbox
            id="Email"
            label="Email"
            inputValue="email"
            name="filterBy"
            v-model="formData.filterBy"
          />
          <Checkbox
            id="Status"
            label="Status"
            inputValue="status"
            name="filterBy"
            v-model="formData.filterBy"
          />
          <Checkbox
            id="Phone Number"
            label="Phone Number"
            inputValue="phone_number"
            name="filterBy"
            v-model="formData.filterBy"
          />
          <Checkbox
            id="Role"
            label="Role"
            inputValue="role"
            name="filterBy"
            v-model="formData.filterBy"
          />
        </div>
        <span class="form__filter-label mt-3">Status</span>
        <div class="form__filters">
          <Checkbox
            id="active"
            label="Active"
            inputValue="active"
            name="statuses"
            v-model="formData.statuses"
          />
          <Checkbox
            id="inactive"
            label="Inactive"
            inputValue="inactive"
            name="statuses"
            v-model="formData.statuses"
          />
        </div>
      </div>
    </VForm>
    <template #footer>
      <Button variant="secondary" @click="emit('close')">Cancel</Button>
      <Button variant="success" @click="emit('apply', formData)">Apply</Button>
    </template>
  </Drawer>
</template>

<script setup lang="ts">

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  appliedFilters: {
    type: Object,
    default() {
      return {
        filterBy: [],
        statuses: [],
      };
    },
  },
});
const emit = defineEmits(["close", "apply"]);
const formData = ref(props.appliedFilters);
</script>

<style lang="postcss" scoped>
.form {
  &__filter-label {
    @apply font-bold text-[1rem] mb-3 block;
  }
  &__filters {
    @apply ml-4;
    @apply flex flex-col gap-4;
  }
}
</style>
