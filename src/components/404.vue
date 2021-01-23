<template>
    <div>
        <h1 class="pa-3 display-3 font-weight-bold error--text">Error 404: Not found!</h1>
        <v-btn @click="$router.push('/dashboard')" class="mx-3 my-10 warning">Go to Dashboard</v-btn>
    </div>
</template>

<script>
import firebase from 'firebase';
export default {

    created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
      } else {
        this.user = null;
      }
    });
  },
}

</script>

    