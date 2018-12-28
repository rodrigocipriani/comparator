import { isMobile } from "react-device-detect";
import HomeComponent from "../modules/Home/HomeComponent";
import Logout from '../modules/Auth/Logout';

const routes = {
  HOME: { path: "/", component: isMobile ? HomeComponent : HomeComponent },
  LOGOUT: { path: '/logout', component: Logout },
};

export default routes;
