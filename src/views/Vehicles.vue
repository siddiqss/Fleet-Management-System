<template>
  <div>
    <v-container class="my-5">
      <v-card class="mx-auto my-10">
        <v-card-title>
          All Vehicles
        </v-card-title>
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">
                  Vehicle Registration Number
                </th>
                <th class="text-left">
                  Vehicle Type
                </th>
                <th class="text-left">
                  Vehicle Manufacturer
                </th>
                <th class="text-left">
                  Vehicle Model
                </th>
                <th class="text-left">
                  Fleet Name
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="item in vehicle_data"
                :key="item.index"
              >
                <td >
                  <router-link :to="{ name: 'VehicleData', 
                  params: { id: item.Vehicle_Registration_Number } }">
                  {{ item.Vehicle_Registration_Number }}
                  </router-link>
                  </td>
                <td>{{ item.Vehicle_Type }}</td>
                <td>{{ item.Vehicle_Manufacturer }}</td>
                <td>{{ item.Vehicle_Model }}</td>
                <td>{{ item.Fleet_Name }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card>
    </v-container>
    
  </div>
</template>

<script>
import db from '@/firebase';
import firebase from 'firebase';
import router from '../router';

export default {

  created(){
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
        db.collection('vehicles').onSnapshot(res => {
        this.vehicle_data = [];
        res.forEach((doc) => {
          this.vehicle_data.push({
            id: doc.id,
            Vehicle_Registration_Number: doc.data().Vehicle_Registration_Number,
            Vehicle_Type: doc.data().Vehicle_Type,
            Vehicle_Manufacturer: doc.data().Vehicle_Manufacturer,
            Vehicle_Model: doc.data().Vehicle_Model,
            Fleet_Name: doc.data().Fleet_Name
          });
        });
        });
      }else {
        this.user = null;
        router.push('/');
      }
    });
    },

  data () {
    return {
      vehicle_data: [],
      user: ''
    }
  },

}
</script>