import Dashboard from "$admin/pages/dashboard";
import CityList from "$admin/pages/city/list";
import FeatureList from "$admin/pages/feature/list";
import RealtyList from "$admin/pages/realty/list";
import RealtyCreate from "$admin/pages/realty/create";
import RealtyEdit from "$admin/pages/realty/edit";
import DeveloperList from "$admin/pages/developer/list";
import DeveloperCreate from "$admin/pages/developer/create";
import DeveloperEdit from "$admin/pages/developer/edit";
import ComplexList from "$admin/pages/complex/list";
import ComplexCreate from "$admin/pages/complex/create";
import ComplexEdit from "$admin/pages/complex/edit";

import LoginPage from "$admin/pages/auth/login";
import RegisterPage from "$admin/pages/auth/register";
import LockScreenPage from "$admin/pages/auth/lock-screen";

import register from "$admin/assets/img/register.jpeg";
import login from "$admin/assets/img/login.jpeg";
import lock from "$admin/assets/img/lock.jpeg";

export const appRoutes = [
  {
    path: "/app/dashboard",
    key: "dashboard",
    title: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/app/city",
    key: "city_list",
    title: "Cities",
    component: CityList,
  },
  {
    path: "/app/feature",
    key: "feature_list",
    title: "Features",
    component: FeatureList,
  },
  //realty
  {
    path: "/app/realty/edit/:id",
    key: "realty_edit",
    name: "Create Realty",
    component: RealtyEdit,
  },
  {
    path: "/app/realty/create",
    key: "realty_create",
    name: "Create Realty",
    component: RealtyCreate,
  },
  {
    path: "/app/realty",
    key: "realty_list",
    name: "Realties",
    component:  RealtyList,
  },
  //complex
  {
    path: "/app/complex/edit/:id",
    key: "complex_edit",
    name: "Create complex",
    component: ComplexEdit,
  },
  {
    path: "/app/complex/create",
    key: "complex_create",
    name: "Create complex",
    component: ComplexCreate,
  },
  {
    path: "/app/complex",
    key: "complex_list",
    name: "Complexes",
    component:  ComplexList,
  },
  //developer
  {
    path: "/app/developer/create",
    key: "developer_create",
    name: "Create Developer",
    component:  DeveloperCreate,
  },
  {
    path: "/app/developer",
    key: "developer_list",
    name: "Developers",
    component:  DeveloperList,
  },
]



export const authRoutes = [
  {
    path: '/auth/login',
    key: 'login',
    title: 'Login Page',
    component: LoginPage,
    bgImage: login
  },
  {
    path: '/auth/register',
    key: 'register',
    title: 'Register Page',
    component: RegisterPage,
    bgImage: register
  },
  {
    path: '/auth/lock-screen',
    key: 'lock_screen',
    title: 'Lock Screen Page',
    component: LockScreenPage,
    bgImage: lock
  },
]

export function getRouteByPath(path) {
  const route = appRoutes.find((item) => item.path === path) || authRoutes.find((item) => item.path === path);

  return route || {};
}
export function getRouteByKey(key) {
  const route = appRoutes.find((item) => item.key === key) || authRoutes.find((item) => item.key === key);

  return route || {};
}

export function isCurrentRoute(path, key) {
  const route = appRoutes.find((item) => item.key === key) || authRoutes.find((item) => item.key === key);

  if (!route) {
    return false
  }

  return route.path === path;
}