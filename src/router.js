import homePage from "./homePage.vue";
import login from './login.vue'
export const routes = [
	{
		path:'/login',
		component:login
	},
	{
		path:"/homePage",
		component: homePage
	},
]