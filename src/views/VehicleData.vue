<template>
    <div>
        <v-container class="my-10">
            <v-layout row column>
                <v-flex xs8 sm6 md4 class="my-10 pa-3">
                    <v-card outlined>
                        <v-card-title>Vehicle Details</v-card-title>
                        <v-list class="transparent">
                            <v-list-item>
                                <v-list-item-title>
                                    Vehicle Registration Number
                                </v-list-item-title>
                                <v-list-item-subtitle>
                                    {{ id }}
                                </v-list-item-subtitle>
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-title>
                                    Vehicle Type
                                </v-list-item-title>
                                <v-list-item-subtitle>
                                    {{ Vehicle_Type }}
                                </v-list-item-subtitle>
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-title>
                                    Vehicle Manufacturer
                                </v-list-item-title>
                                <v-list-item-subtitle>
                                    {{ Vehicle_Manufacturer }}
                                </v-list-item-subtitle>
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-title>
                                    Vehicle Model
                                </v-list-item-title>
                                <v-list-item-subtitle>
                                    {{ Vehicle_Model }}
                                </v-list-item-subtitle>
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-title>
                                    Fleet Name
                                </v-list-item-title>
                                <v-list-item-subtitle>
                                    {{ Fleet_Name }}
                                </v-list-item-subtitle>
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-title>
                                    Vehicle's Speed
                                </v-list-item-title>
                                <v-list-item-subtitle>
                                    {{ speed }}
                                </v-list-item-subtitle>
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-title>
                                    Vehicle's Mileage
                                </v-list-item-title>
                                <v-list-item-subtitle>
                                    {{ mileage }}
                                </v-list-item-subtitle>
                            </v-list-item>
                        </v-list>
                    </v-card>
                </v-flex>
                <v-flex xs8 sm6 md4 class="my-10 pa-3">
                    <v-card outlined>
                        <v-card-title>Faults</v-card-title>
                        <v-card-text v-for="error in errors" :key="error.id" class="error--text">
                            {{ error.toString() }}
                        </v-card-text>
                        <v-card-text v-if="errors.length ===0" class="error--text">
                            No faults found!
                        </v-card-text>
                        
                    </v-card>
                </v-flex>
                <v-flex xs8 sm6 md4 class="my-10 pa-3">
                    <v-card class="pa-1" outlined>
                        <v-card-title>Live Vehicle Tracking</v-card-title>
                        <div><HereMap :center="center"/></div>
                        
                    </v-card>
                </v-flex>

            </v-layout>
        </v-container>
    </div>
</template>

<script>
import router from '../router';
import HereMap from '../components/HereMap'
import db from '@/firebase';
import firebase from 'firebase';
const https = require('https');

export default {

    components: {
        HereMap
    },

    created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        
        this.user = user;
        this.id = this.$route.params.id;
        db.collection('vehicles').onSnapshot(res => {
            res.forEach((doc) => {
            this.all_reg_num.push(doc.data().Vehicle_Registration_Number);
            });
        });
        console.log(this.all_reg_num);
        db.collection("vehicles").where("Vehicle_Registration_Number","==",this.id).get()
        .then((querySnapshot) => {
            const data = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
            }));
            console.log(data[0].id);
            this.Vehicle_Manufacturer = data[0].Vehicle_Manufacturer;
            this.Fleet_Name = data[0].Fleet_Name;
            this.Vehicle_Model = data[0].Vehicle_Model;
            this.Vehicle_Type = data[0].Vehicle_Type;
        });
        if (!this.all_reg_num.includes(this.id.toString())){
            console.log('hello');
        }
        else{
            router.push('/404');
        }
      } else {
        this.user = null;
        router.push('/')
      }

    /*
    Read data from whole feed
    https://api.thingspeak.com/channels/1443892/feeds.json?api_key=UH6F84XDQDXV8JA8

    Read data from a field
    https://api.thingspeak.com/channels/1443892/fields/1/last.json?api_key=UH6F84XDQDXV8JA8
    */

    var all_data;
    https.get('https://api.thingspeak.com/channels/1443892/feeds.json?api_key=UH6F84XDQDXV8JA8',
    (resp) => {
    let data = '';
    // A chunk of data has been received.
    resp.on('data', (chunk) => {
        data += chunk;
    });

    // The whole response has been received. Print out the result.
    resp.on('end', () => {
        all_data = JSON.parse(data);
        console.log(all_data);
        this.center.lng = all_data["feeds"].slice(-1)[0]["field1"];
        if(this.center.lng !== 'null'){
        this.center.lng = this.center.lng.substring(0,this.center.lng.length-1);
        }
        this.center.lat = all_data["feeds"].slice(-1)[0]["field2"];
        // var coordinate1 = "73.206503."
        // coordinate1 = coordinate1.substring(0,coordinate1.length-1);
        // var coordinate2 = "33.567133";
        console.log(this.center.lng+','+this.center.lat);
        // console.log(coordinate1+','+coordinate2);
        this.speed = all_data["feeds"].slice(-1)[0]["field3"];
        this.mileage = all_data["feeds"].slice(-1)[0]["field4"];
        this.errors = all_data["feeds"].slice(-1)[0]["field5"];
        console.log(this.speed+','+this.mileage);

    });

    }).on("error", (err) => {
    console.log("Error: " + err.message);
    });
    });
  },

    data () {

        return {
            id: 0,
            errors: [
            ],

            temp_errors: [
                "P0100",
                "P0300"
            ],
            center: { 
                lat: '', 
                lng: ''
            },
            mileage: '',
            speed: '',
            all_reg_num: [],
            user: '',
            Vehicle_Manufacturer: '',
            Fleet_Name: '',
            Vehicle_Model: '',
            Vehicle_Registration_Number: '',
            Vehicle_Type: ''

        }
    },
    methods: {
        check_faults() {
                if (this.errors.findIndex(error => error === 'No fault found!') === 0){
                    this.errors.pop();
                    if (this.errors.length === 0){
                    this.temp_errors.forEach(arr => this.errors.push(arr));
                    }
                }
        },
    },
    
}
</script>