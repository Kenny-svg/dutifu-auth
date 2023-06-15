<template>
  <Form @submit="login" :validation-schema="schema">
    <div class="mb-6">
      <label class="block mb-2 text-sm font-bold text-primary">Email</label>
      <Field
        name="email"
        type="email"
        class="bg-gray-50 border border-secondary text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
      />
      <ErrorMessage name="email" />
    </div>
    <div class="mb-6">
      <label class="block mb-2 text-sm font-bold text-primary">Password</label>
      <Field
        name="password"
        :type="showPassword ? 'text' : 'password'"
        class="bg-gray-50 border border-secondary text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
      />
      <span class="password-toggle" @click="toggleShowPassword">
        <i :class="showPassword ? 'bi bi-eye' : 'bi bi-eye-slash'"></i>
      </span>
    </div>

    <ErrorMessage name="password" />
    <div class="flex justify-end text-primary w-full">
      <router-link class="mb-2" to="/forgot_password">
        <p>forgot password?</p>
      </router-link>
    </div>

    <div class="flex items-start mb-6">
      <div class="flex items-center h-5">
        <Field
          name="remember"
          id="remember"
          type="checkbox"
          value="false"
          class="text-primary w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
        />
      </div>
      <label
        for="remember"
        class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >I agree to Dutiful
        <span class="text-primary cursor-pointer"
          >Terms and conditions</span
        ></label
      >
    </div>
    <ErrorMessage name="remember" />
    <button type="submit" class="btn-primary bg-primary text-white w-full mb-2">
      Login
    </button>
    <p class="text-center mb-10">
      Don't have an account?
      <span class="text-primary"
        ><router-link to="/register">Sign up</router-link></span
      >
    </p>
    <div v-if="success">
      {{ success.data.message }}
    </div>
    <div v-if="loginError">
      <p class="text-red-600">password is incorrect</p>
    </div>
  </Form>
</template>
<script setup>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import { ref } from "vue";
import { useAuthStore } from "../../../../../store/authStore";
import { useRouter } from "vue-router";

const router = useRouter();

const authStore = useAuthStore();

const password = ref("");
const showPassword = ref(false);

const success = ref("");
const loginError = ref(null);

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  remember: yup.string().required("You must agree to the Terms and Conditions"),
});

const toggleShowPassword = () => {
  showPassword.value = !showPassword.value;
};

const login = (values) => {
  authStore.login(values).then(
    (response) => {
      console.log(response);
      success.value = response;
      router.push("/");
      location.reload();
    },
    (error) => {
      loginError.value = error;
      console.error(error);
    }
  );
};
</script>
