<template>
  <QBasicTable
    :columns="columns"
    :rows="[]"
    @paginate="paginate"
    :pagination="{
      page: params.page,
      page_size: params.page_size,
      // return_count: data?.resource?.pagination?.total_count,
    }"
    @sort="sortDrawerVisible = true"
    @filter="filterDrawerVisible = true"
    @search="searchData"
    no-data-label="No data found."
  >
  </QBasicTable>
  <{{name.pascalCase()}}FilterDrawer
    :appliedFilters="filters"
    :show="filterDrawerVisible"
    @close="filterDrawerVisible = false"
    @apply="applyFilters"
  />
  <{{name.pascalCase()}}SortDrawer
    :sort="sort"
    :show="sortDrawerVisible"
    @close="sortDrawerVisible = false"
    @apply="applySorts"
  />
  <PageHeader title="{{name.pascalCase()}}">
    <template #right-panel>
      <Button
        color="positive"
        :to="{
          path: '/{{name.lowerCase()}}/create',
        }"
        type="button"
        label="New {{name.pascalCase()}}"
      >
      </Button>
    </template>
  </PageHeader>
</template>

<script setup lang="ts">
import type { Column, PaginationParams } from "@/types/q-basic-table";
definePageMeta({
  layout: "default",
});
const { $api, $_, $toast, $dayjs } = useNuxtApp();
const filterDrawerVisible = ref(false);
const sortDrawerVisible = ref(false);
const activeTab = ref<string | null>(null);
// PAGINATION
let search = ref<string | null>(null);
let filters: any = {
  filterBy: [],
  statuses: [],
  roles: [],
  created_at: [
    $dayjs().format("YYYY-MM-DD 00:00:00"),
    $dayjs().format("YYYY-MM-DD 23:59:59"),
  ],
};
let sort = ref("created_at:desc");

let params = reactive<any>({
  page: 1,
  page_size: 10,
  return_count: true,
  sorts: [sort.value],
  search_filters: undefined,
  in_filters: undefined,
  between_filters: undefined,
});
const columns: Column[] = [
  {
    name: "name",
    label: "Name",
    align: "left",
    field: "name",
  },
  {
    name: "email",
    label: "Email",
    align: "left",
    field: "email",
  },
  {
    name: "phone_number",
    label: "Mobile Number",
    align: "left",
    field: "phone_number",
  },
  {
    name: "role",
    label: "Role",
    align: "left",
    field: "role",
  },
  {
    name: "status",
    label: "Status",
    align: "left",
    field: "status",
  },
  {
    name: "created_at",
    label: "Created At",
    align: "left",
    field: "created_at",
  },
  {
    name: "actions",
    align: "left",
    label: "Actions",
    field: "actions",
  },
];

function paginate(newPagination: PaginationParams) {
  params.page = newPagination.page;
  params.page_size = newPagination.rowsPerPage;
}

function applyFilters(appliedFilters: any) {
  // refresh();
}
function applySorts(appliedSort: string) {
  // refresh();
}

function searchData() {}
</script>

<style lang="postcss" scoped>
.page__body {
  @apply w-full;
}
.filter-label {
  @apply font-bold text-[1rem] mb-3 block;
}
.filters {
  @apply flex flex-col gap-4;
}
</style>
