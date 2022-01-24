<template>
  <div>
    <v-container class="my-5">
      <v-alert v-if="error" class="error">{{ errMessage }}</v-alert>
      <v-card class="mx-auto my-10" width="800">
        <v-card-title>
          XYZ Transporters Login
        </v-card-title>
        <v-form class="px-3">
          <v-text-field label="Email" v-model="email"></v-text-field>
          <v-text-field label="Password" v-model="password" 
          :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'" 
          :type="show ? 'text' : 'password'" 
          @click:append="show = !show">
          </v-text-field>
          
          <v-btn class="success mx-0 mt-3 my-3" @click="userLogin()">Log in</v-btn> 
        </v-form>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import firebase from 'firebase';
import router from '../router';
export default {
   name: 'Company_Login',
  data () {
    return {
      show: false,
      email: '',
      password: '',
      error: false,
      errMessage: ''
    }
  },
  methods: {
    userLogin(){
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
            router.push('/dashboard')
        })
        .catch((error) => {
          this.error = true;
          this.errMessage = error.message;
        });
    }
  }
}
</script>