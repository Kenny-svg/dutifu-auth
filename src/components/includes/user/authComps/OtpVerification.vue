<template>
  <div class="flex justify-center items-center">
    <div>
      <input
        v-for="index in 6"
        :key="index"
        ref="otpInputs"
        type="text"
        maxlength="1"
        inputmode="numeric"
        @input="handleInput($event, index)"
        @keydown.delete="handleBackspace($event, index)"
        :autofocus="index === 1"
        class="mx-2 w-10 rounded-md h-8 focus:ring-primary focus:border-primary"
      />

      <div class="text-center mt-10 text-sm text-secondary">
        <h1>Enter OTP code that was sent to {{ email }}</h1>
        <h1>Check your email to get the code</h1>
        <button
          type="button"
          @click="OtpVerified"
          class="btn-primary mt-5 w-2/3 bg-primary text-white"
        >
          Comfirm OTP
        </button>
        <p class="text-sm mb-10 mt-5">
          Didn't get a code?<span
            class="text-primary cursor-pointer"
            @click="resendOtp"
            >resend</span
          >
        </p>
      </div>
    </div>

    <!-- <Form @submit="OtpVerified" class="gap-4">
            
            <Field name="number1" id="remember" type="number"  class="mx-2 w-10 rounded-md h-8 focus:ring-primary focus:border-primary" />
            <Field name="number2" id="remember" type="number"  class="mx-2 w-10 rounded-md h-8 focus:ring-primary focus:border-primary" />
            <Field name="number3" id="remember" type="number"  class="mx-2 w-10 rounded-md h-8 focus:ring-primary focus:border-primary" />
            <Field name="number4" id="remember" type="number"  class="mx-2 w-10 rounded-md h-8 focus:ring-primary focus:border-primary" />
            <Field name="number5" id="number" type="number"  class="mx-2 w-10 rounded-md h-8 focus:ring-primary focus:border-primary" />
            <Field name="number6" id="remember" type="number"  class="mx-2 w-10 rounded-md h-8 focus:ring-primary focus:border-primary" />


            <div class="text-center mt-10 text-sm text-secondary">
                <h1>Enter OTP code that was sent to example@gmail.com.</h1>
                <h1>Check your email to get the code</h1>
                <button type="submit" class="btn-primary mt-5 w-2/3 bg-primary text-white">Comfirm OTP</button>
                <p class="text-sm mb-10 mt-5">Didn't get a code?<span class="text-primary">resend</span></p>
            </div>
            
        </Form> -->
  </div>
</template>
<script setup>
import { Form, Field, ErrorMessage } from "vee-validate";

import { ref, onMounted } from "vue";
import { useAuthStore } from "../../../../store/authStore";
import { useRouter, useRoute } from "vue-router";

const route = useRoute();
const email = route.params.id;
const router = useRouter();

const authStore = useAuthStore();

const otpInputs = ref([]);

//  otpInputs.value = Array.from($refs.otpInputs);

const handleInput = (event, index) => {
  const currentValue = event.target.value;

  if (currentValue) {
    if (index < 6) {
      otpInputs.value[index].focus();
    } else {
      // Last input field, submit OTP or perform necessary action
      // console.log("OTP submitted:", getOtpValue());
    }
  }
};

const handleBackspace = (event, index) => {
  if (index > 1 && event.target.value === "") {
    otpInputs.value[index - 2].focus();
  }
};

const getOtpValue = () => {
  let otpValue = "";

  otpInputs.value.forEach((input) => {
    otpValue += input.value;
    console.log(otpValue);
  });

  return otpValue;
};
const OtpVerified = () => {
  const data = { email, otp: getOtpValue() };
  // console.log(otpValue);
  authStore.verifyOtp(data).then(
    (response) => {
      // console.log(response);
      router.push(`/reset_password/${data.email}/${data.otp}`);
    },
    (error) => {
      console.error(error);
    }
  );
};
const resendOtp = () => {
  authStore.resendOtp().then(
    (response) => {
      console.log(response);
    },
    (error) => {
      console.error(error);
    }
  );
};
</script>
