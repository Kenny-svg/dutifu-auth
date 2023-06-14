<template>
  <Form @submit="resetPassword" :validation-schema="schema">
    <div class="mb-6">
      <label class="block mb-2 text-sm font-bold text-primary">Password</label>
      <Field
        v-model="password"
        name="password"
        :type="showPassword ? 'text' : 'password'"
        class="bg-gray-50 border border-secondary text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
      />
      <ErrorMessage class="text-red-500" name="password" />

      <i
        class="flex justify-end -mt-7 mr-4"
        @click="toggleShowPassword"
        :class="comfirmPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"
      ></i>
    </div>
    <div class="mb-6">
      <label class="block mb-2 text-sm font-bold text-primary"
        >Re-enter Password</label
      >
      <Field
        v-model="comfirmPassword"
        name="comfirmPassword"
        :type="showcomfirmPassword ? 'text' : 'password'"
        class="bg-gray-50 border border-secondary text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
      />
      <ErrorMessage class="text-red-500" name="comfirmPassword" />

      <i
        class="flex justify-end -mt-7 mr-4"
        @click="toggleShowcomfirmPassword"
        :class="comfirmPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"
      ></i>
    </div>
    <p class="text-red-500">{{ validationMsg }}</p>

    <button type="submit" class="btn-primary bg-primary text-white w-full mb-2">
      Reset password
    </button>
    <p class="text-center mb-10">
      or <span class="text-primary">Create new account</span>
    </p>
  </Form>
</template>
<script setup>
import { ref } from "vue";
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "../../../../../store/authStore";

const authStore = useAuthStore();

const route = useRoute();
const router = useRouter();
const email = route.params.id;
const otp = route.params.otp;
const password = ref("");
const showPassword = ref(false);
const comfirmPassword = ref("");
const showcomfirmPassword = ref(false);
const validated = ref(false);
let validationMsg = ref("");

const toggleShowPassword = () => {
  showPassword.value = !showPassword.value;
};
const toggleShowcomfirmPassword = () => {
  showcomfirmPassword.value = !showcomfirmPassword.value;
};
const schema = yup.object().shape({
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  comfirmPassword: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});
const resetPassword = () => {
  if (password.value === comfirmPassword.value) {
    validated.value = true;
    validationMsg = "";
    console.log("clicked");
    const passwordStr = password.value.toString();
    const data = { email, otp, password: passwordStr };
    console.log(passwordStr);
    authStore.resetPassword(data).then(
      (response) => {
        console.log(response);
        // console.log(response.data.value)
        if (response.status === 200 || response.status === 201) {
          router.push("/login");
        }
      },
      (error) => {
        // const arr = Object.entries(error)
        registrationError.value = error;
        console.error(error);
      }
    );
  } else {
    validated.value = false;
    validationMsg.value = "Password does not match";
  }
};
</script>
