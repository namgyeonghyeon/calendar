import Vue from 'vue'
import Router from 'vue-router'
import LoginView from '../view/LoginView.vue'
import CalendarView from '../view/CalendarView.vue'
import PhotoView from '../view/PhotoView.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'LoginView',
      component: LoginView
    },
    {
      path: '/LoginView',
      name: 'LoginView',
      component: LoginView
    },
    {
        path: '/CalendarView',
        name: 'CalendarView',
        component: CalendarView 
      },
      {
        path: '/PhotoView',
        name: 'PhotoView',
        component: PhotoView
      },
   ]
})