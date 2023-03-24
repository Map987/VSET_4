import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import InputAndOutput from '../views/InputAndOutput.vue'
import SuperResolution from '../views/SuperResolution.vue'
import EncodeParams from '../views/EncodeParams.vue'
import StartStart from '../views/StartStart.vue'

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/home-view'
    },
    {
      path: '/home-view',
      name: 'home-view',
      component: HomeView
    },
    {
      path: '/input-and-output',
      name: 'input-and-output',
      component: InputAndOutput
    },
    {
      path: '/super-resolution',
      name: 'super-resolution',
      component: SuperResolution
    },
    {
      path: '/encode-params',
      name: 'encode-params',
      component: EncodeParams
    },
    {
      path: '/start',
      name: 'start',
      component: StartStart
    }
  ]
})
