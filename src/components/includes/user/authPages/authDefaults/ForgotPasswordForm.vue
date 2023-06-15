<template>
  <div class="mt-10 w-10/12 md:w-5/12">
    <div>
      <i
        class="bi bi-arrow-left-short text-2xl border rounded-full text-primary cursor-pointer"
      ></i>
    </div>
    <h1 class="font-bold text-primary text-2xl mb-10 mt-5">Forgot password</h1>
    <p class="text-sm mb-5">
      Enter your email and we will send you a mail on how to reset your password
    </p>
    <Form @submit="forgotPassword" :validation-schema="schema">
      <div class="mb-6">
        <label class="block mb-2 text-sm font-bold text-primary">Email</label>
        <Field
          name="email"
          type="email"
          class="bg-gray-50 border border-secondary text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
        />
        <ErrorMessage class="text-red-500" name="email" />
      </div>

      <button
        type="submit"
        class="btn-primary bg-primary text-white w-full mb-2"
      >
        Send email
      </button>
      <p class="text-center mb-10">
        or <span class="text-primary">login</span>
      </p>
    </Form>
  </div>
</template>
<script setup>
import { Form, Field, ErrorMessage } from "vee-validate";
import { ref } from "vue";
import { provide } from "vue";
import * as yup from "yup";
import { useAuthStore } from "../../../../../store/authStore";
import { useRouter } from "vue-router";

const router = useRouter();

const authStore = useAuthStore();

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
});

const forgotPassword = (email) => {
  authStore.forgotPassword(email).then(
    (response) => {
      console.log(response);
      router.push(`/otp_sent/${email.email}`);
    },
    (error) => {
      console.error(error);
    }
  );
};
</script>
