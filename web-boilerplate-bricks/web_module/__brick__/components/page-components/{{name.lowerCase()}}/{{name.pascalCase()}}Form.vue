<template>
  <!-- UPDATE INPUT FIELDS AS YOU SEE FIT -->
  <VForm @submit="onSubmit" :initialValues="formInitialValues">
    <template #default="{ isSubmitting }">
      <q-card>
        <SectionTitle
          title="{{name.pascalCase()}} Details"
          class="rounded-t-sm"
        />
        <div class="{{name.lowerCase()}}__form">
          <div class="row gap-2">
            <InputField
              class="col"
              name="first_name"
              placeholder="First Name"
              rules="max:128|required"
              v-model="formData.first_name"
            >
              <template #label> First Name </template>
            </InputField>
            <InputField
              class="col"
              name="last_name"
              placeholder="Last Name"
              rules="max:128|required"
              v-model="formData.last_name"
            >
              <template #label> Last Name </template>
            </InputField>
          </div>
          <div class="row gap-2">
            <Select
              name="role"
              class="col"
              placeholder="Select role"
              v-model="formData.role"
              :options="[]"
              rules="select_required"
            >
              <template #label> Role </template>
            </Select>
            <InputField
              name="phone_number"
              class="col"
              placeholder="Enter Text"
              v-model="formData.phone_number"
              rules="required|ph_phone_number"
            >
              <template #label> Mobile Number </template>
            </InputField>
          </div>
          <InputField
            name="email"
            placeholder="Enter Text"
            rules="required|email|max:128"
            v-model="formData.email"
          >
            <template #label> Email </template>
          </InputField>
          <InputField
            v-if="!edit"
            type="password"
            name="password"
            placeholder="Enter Text"
            rules="required|max:128"
            v-model="formData.password"
          >
            <template #label> Password </template>
          </InputField>
          <div class="form__footer">
            <Button
              color="positive"
              type="submit"
              :loading="isSubmitting"
              label="Save"
            ></Button>
          </div>
        </div>
      </q-card>

      <ConfirmationDialog
        :title="`${
          edit
            ? 'Cancel Updating {{name.pascalCase()}}'
            : 'Cancel {{name.pascalCase()}} Creation'
        }`"
        v-model="leaveWarningModalVisible"
        @close="leaveWarningModalVisible = false"
        @confirm="confirmLeave"
      >
        <template #message
          >Are you sure you want to cancel
          {{ edit ? "updating" : "creating" }} this data? Changes will not be
          saved.</template
        >
      </ConfirmationDialog>
    </template>
  </VForm>
</template>

<script setup lang="ts">
import type { RouteLocationNormalized } from "#vue-router";
const { $_ } = useNuxtApp();
const props = defineProps({
  isLoading: {
    type: Boolean,
    default: false,
  },
  initialValues: {
    type: Object,
    default() {
      return {
        first_name: null,
        last_name: null,
        email: null,
        phone_number: "+639458288837",
        department: null,
        employee_number: null,
        role: null,
        partners: [],
      };
    },
  },
  submitHandler: {
    type: Function,
    required: true,
  },
  edit: {
    type: Boolean,
    default: false,
  },
});
const leaveWarningModalVisible = ref(false);
const leaveRoute = ref<null | RouteLocationNormalized | Ref>(null);
const allowRouteLeave = ref(false);
const formInitialValues = $_.cloneDeep(props.initialValues);
const formData = reactive(props.initialValues);
onBeforeRouteLeave((to, from, next) => {
  if (allowRouteLeave.value) {
    next();
  } else {
    leaveWarningModalVisible.value = true;
    leaveRoute.value = to;
  }
});

async function onSubmit(values: any) {
  allowRouteLeave.value = true;
  await props.submitHandler(values);
}

function confirmLeave() {
  const router = useRouter();
  leaveWarningModalVisible.value = false;
  allowRouteLeave.value = true;
  router.push(leaveRoute.value);
}
</script>

<style lang="postcss" scoped>
.{{name.lowerCase()}} {
  @apply flex justify-center;

  &__form {
    @apply flex flex-col gap-[24px] p-4;

    .form__footer {
      @apply flex items-end justify-end gap-3;
    }
  }

  .form__col {
    @apply grid grid-cols-2 gap-[12px] items-start;
  }

  .col__button {
    @apply mt-[28px];
  }
}

.modal__message {
  @apply flex flex-col gap-4;
}
</style>
