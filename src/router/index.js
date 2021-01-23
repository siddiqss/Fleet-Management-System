import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Vehicles from '../views/Vehicles.vue'
import New_Vehicle from '../views/New_Vehicle.vue'
import Company_Login from '../views/Company_Login.vue'
import VehicleData from '../views/VehicleData.vue'
import Error404 from '../components/404.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Company_Login
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/vehicles',
    name: 'Vehicles',
    component: Vehicles
  },
  {
    path: '/new_vehicle',
    name: 'New_Vehicle',
    component: New_Vehicle
  },
  {
    path: '/vehicle/:id',
    name: 'VehicleData',
    component:VehicleData
  },
  {
    path: '/404',
    name: 'Error404',
    component:Error404
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
