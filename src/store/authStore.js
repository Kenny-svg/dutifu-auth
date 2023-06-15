import { defineStore } from "pinia";
import axios from 'axios'

// axios.defaults.withCredentials = true;
axios.defaults.baseURL="https://testapi.dutiful.ng/v2";
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Accept'] = 'application/json';


const user = localStorage.getItem('userToken')
const initialState = user 
? {status: {loggedIn:true}, user}
:{status:  {loggedIn:false }, user: null};


export const useAuthStore = defineStore('auth',{
    state: () => ({
        initialState,
        email: null,
        loading: false
        
    }),
    actions: {
        async register(values) {
            this.loading = true; 
            try {
              const response = await axios.post('auth/register', values);
              return Promise.resolve(response);
            } catch (error) {
              return Promise.reject(error.response.data.details);
            } finally {
              this.loading = false; 
            }
          },
         
          async login(values) {
            this.loading = true;
            try {
              const response = await axios.post('auth/login', values);
              const token = response.data.data.token;
              localStorage.setItem("userToken", token);
              return Promise.resolve(response);
            } catch (error) {
              return Promise.reject(error.response.data.error);
            } finally {
              this.loading = false;
            }
          },
        async forgotPassword(values) {
            return await axios.post('auth/password/email', values).then(
                response => {
                    return Promise.resolve(response)
                },
                error => {
                    return Promise.reject(error.response.data.error)
                }
            )
        },
        async verifyOtp(values) {
            return await axios.post('auth/password/verify', values).then(
                response => {
                    return Promise.resolve(response)
                },  
                error => {
                    return Promise.reject(error.response.data.error)
                }
            )
        },
        async resendOtp() {
            return await axios.post('auth/email/resend').then(
                response => {
                    return Promise.resolve(response)
                },
                error => {  
                    Promise.reject(error)
                }
            )
        },
        async resetPassword(values) {
            return await axios.post('auth/password/reset', values).then(
                response => {
                    return Promise.resolve(response)
                },
                error => {  
                    Promise.reject(error)
                }
            )
        },
        logout(){
            try{
            localStorage.removeItem("userToken");
            window.location.reload();
            }catch(error){
              console.error("error logging in",error);
             
            }
  
          },
          //get user
          async getUser() {
            this.loading = true
            try {
                const response =  await axios.get('auth/user');
                return Promise.resolve(response)
            } catch (error) {
                return Promise.reject(error)
            } finally {
                this.loading = false
            }
          },
    }
})