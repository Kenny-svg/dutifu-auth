<template>
  <Form @submit="signUp" :validation-schema="schema">
    <div class="mb-6">
      <label class="block mb-2 text-sm font-bold text-primary">Full name</label>
      <Field
        name="name"
        type="text"
        class="bg-gray-50 border border-secondary text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
      />
      <ErrorMessage class="text-red-500" name="name" />
    </div>
    <div class="mb-6">
      <label class="block mb-2 text-sm font-bold text-primary">Email</label>
      <Field
        name="email"
        type="email"
        class="bg-gray-50 border border-secondary text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
      />
      <ErrorMessage class="text-red-500" name="email" />
    </div>
    <div class="mb-6">
      <label class="block mb-2 text-sm font-bold text-primary"
        >Phone number</label
      >
      <Field
        name="phone"
        type="tel"
        class="bg-gray-50 border border-secondary text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
      />
      <ErrorMessage class="text-red-500" name="phone" />
    </div>
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
        class="absolute -mt-8 ml-72 lg:ml-[380px] md:ml-[200px] sm:ml-[200px]"
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
        class="absolute -mt-8 ml-72 md:ml-[380px]"
        @click="toggleShowcomfirmPassword"
        :class="showcomfirmPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"
      ></i>
    </div>
    {{ validationMsg }}
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
    <ErrorMessage class="text-red-500" name="remember" />
    <button type="submit" class="btn-primary bg-primary text-white w-full mb-2">
      Sign up
    </button>
    <p class="text-center mb-10">
      Already have an account? <span class="text-primary">login</span>
    </p>
    <div v-if="success">
      {{ success.data.message }}
    </div>
    <div v-for="error in registrationError" :key="error.id">
      <p class="text-red-600">{{ error.toString() }}</p>
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
const comfirmPassword = ref("");
const showcomfirmPassword = ref(false);
const validated = ref(false);
let validationMsg = ref("");
// const name = ref('')
// const email = ref('')
// const phone = ref('')
const success = ref("");
const registrationError = ref(null);

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup.string().required("Phone number is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  comfirmPassword: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  remember: yup.string().required("You must agree to the Terms and Conditions"),
});

console.log(registrationError.value);

const signUp = (values) => {
  if (password.value === comfirmPassword.value) {
    validated.value = true;
    validationMsg = "";
    authStore.register(values).then(
      (response) => {
        // console.log(response)
        // console.log(response.data.value)
        success.value = response;
        router.push("/login");
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

const toggleShowPassword = () => {
  showPassword.value = !showPassword.value;
};
const toggleShowcomfirmPassword = () => {
  showcomfirmPassword.value = !showcomfirmPassword.value;
};
</script>
