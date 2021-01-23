<template>
  <div>
    <v-container class="my-5">
      <v-card>
        <v-card-title>
          Register New Vehicle
        </v-card-title>
        <v-alert dense type="success" v-if="addedToDb">Added to Database!</v-alert>
        <v-form class="px-3">
          <v-select :items="items" v-model="veh_type" label="Type of Vehicle"></v-select>
          <v-text-field label="Vehicle Registration Number" v-model="reg_num"></v-text-field>
          <v-text-field label="Vehicle Manufacturer" v-model="veh_man"></v-text-field>
          <v-text-field label="Vehicle Model" v-model="veh_model"></v-text-field>
          <v-text-field label="Vehicle Fleet" v-model="veh_fleet"></v-text-field>
          <v-btn class="success mx-0 mt-3 my-3" @click="submit">Register Vehicle</v-btn> 
        </v-form>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import firebase from 'firebase';
import db from '@/firebase.js';
import router from '../router';

export default {
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
      } else {
        this.user = null;
        router.push('/')
      }
    });
  },

  data () {
    return {
      items: ['Car', 'Bus', 'Truck'],
      reg_num: '',
      veh_type: '',
      veh_man: '',
      veh_model: '',
      veh_fleet: '',
      addedToDb: false,
      user:'',
    }
  },
  methods: {
    submit(){
      if ((this.reg_num !== '') && (this.veh_type!=='') && (this.veh_model!=='') && (this.veh_man!=='') && (this.veh_fleet!=='')){
        const vehicleData = {
          Vehicle_Manufacturer: this.veh_man,
          Fleet_Name: this.veh_fleet,
          Vehicle_Model: this.veh_model,
          Vehicle_Registration_Number: this.reg_num,
          Vehicle_Type: this.veh_type
        }
        db.collection('vehicles').add(vehicleData).then(()=> {
          this.addedToDb = true;
        })
        this.items = '';
        this.reg_num = '';
        this.veh_type = '';
        this.veh_man = '';
        this.veh_model = '';
        this.veh_fleet = '';

      }
      else{
        console.log('Field is empty');
      }
    }
  }
}
</script>