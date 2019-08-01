import {Home} from "views/home";
import {Settings} from "views/settings";
import { Profile } from "views/profile";

var routes = [
  {
    path: "/home",
    name: "Home",
    icon: "nc-icon nc-bank",
    component: Home
  },
  {
    path: "/settings",
    name: "Settings",
    icon: "nc-icon nc-settings",
    component: Settings
  },
  {
    path: "/profile",
    name: "Profile",
    icon: "nc-icon nc-single-02",
    component: Profile
  }
];
export default routes;
