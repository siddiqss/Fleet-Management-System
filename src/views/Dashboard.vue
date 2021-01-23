<template>
<div>
  <v-container class="my-5">
    <h1>Dashboard</h1>
    <v-layout v-model="num_vehicles" row wrap>
      <v-flex xs8 sm6 md4 class="my-10 pa-3">
        <v-card outlined class="pa-3" color="blue lighten-5" width="300px">
          <v-card-title>OVERALL VEHICLES</v-card-title>
          <v-card-subtitle>Total number of vehicles managed by {{ user.email }}</v-card-subtitle>
          <v-card-text class="display-4 font-weight-bold text-left black--text">{{ num_vehicles }}</v-card-text>
          <v-card-actions>
            <v-btn
              color="blue darken-4"
              text
              @click="$router.push('vehicles')"
            >
              View all
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex> 
      <v-flex v-model="num_fleet" xs8 sm6 md4 class="my-10 pa-3">
        <v-card outlined class="pa-3" color="blue lighten-5" width="300px">
          <v-card-title>TOTAL FLEET</v-card-title>
          <v-card-subtitle>Number of fleets managed by {{ user.email }}</v-card-subtitle>
          <v-card-text class="display-4 font-weight-bold text-left black--text">{{ num_fleet }}</v-card-text>
          <v-card-actions>
            <v-btn
              color="blue darken-4"
              text
              @click="$router.push('vehicles')"
            >
              View all
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex> 
      <v-flex xs8 sm6 md4 class="my-10 pa-3">
        <v-card outlined class="pa-3 error" width="300px">
          <v-card-title>ALERTS</v-card-title>
          <v-card-subtitle>Faults identified in vehicles</v-card-subtitle>
          <v-card-text v-for="error in errors" :key="error.id" class="subtitle-1 font-weight-bold text-left black--text">
            {{ error }}
          </v-card-text>
        </v-card>
      </v-flex> 
    </v-layout>
  </v-container>
</div>
</template>

<script>
import db from '@/firebase';
import firebase from 'firebase';
import router from '../router';

export default {
  name: 'Dashboard',
  data () {
    return {
      num_vehicles: 0,
      num_fleet: 0,
      errors: [
        'P0300 in ABC123',
        'P0100 in XYZ000',
      ],
      fleets: [],
      user: '',

    }

  },

  created(){

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
        db.collection('vehicles').onSnapshot(res => {
        res.forEach((doc) =>{
          if (doc.data()){
            this.num_vehicles += 1;
          }
          this.fleets.push(doc.data().Fleet_Name);
          this.num_fleet = new Set(this.fleets).size;
        })  
      });

      } else {
        this.user = null;
        router.push('/');
      }
    });
  }
}
</script>
