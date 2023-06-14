import { createRouter, createWebHistory } from "vue-router";
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/user/auth/LoginView.vue'
import RegisterView from '../views/user/auth/RegisterView.vue'
import DefaultLayout from '../components/layouts/DefaultLayout.vue'
import AuthLayout from '../components/layouts/AuthLayout.vue'
import ForgotPasswordView from '../views/user/auth/ForgotPasswordView.vue'
import OtpSentView from '../views/user/auth/OtpSentView.vue'
import ComfirmOtpView from '../views/user/auth/ComfirmOtpView.vue'
import ResetPasswordView from '../views/user/auth/ResetPasswordView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            redirect: '/home',
            name: DefaultLayout,
            component: DefaultLayout,
            children: [
                {
                    path: '/home',
                    name: HomeView,
                    component: HomeView,
                }
            ]
        },
        {
            path: '/login',
            redirect: '/login',
            name: AuthLayout,
            component: AuthLayout,
            children: [
                {
                    path: '/login',
                    name: LoginView,
                    component: LoginView
                },
                {
                    path: '/register',
                    name: RegisterView,
                    component: RegisterView
                },
                {
                    path: '/forgot_password',
                    name: ForgotPasswordView,
                    component: ForgotPasswordView,
                },
                {
                    path: '/otp_sent/:id',
                    name: OtpSentView,
                    component: OtpSentView,
                    props: true
                },
                {
                    path: '/otp_verification/:id',
                    name: ComfirmOtpView,
                    component: ComfirmOtpView,
                    props: true
                },
                {
                    path: '/reset_password/:id/:otp',
                    name: ResetPasswordView,
                    component: ResetPasswordView,
                    props: true
                }
            ]
        }
        
    ]
})

export default router;