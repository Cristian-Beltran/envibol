import { createApp } from "vue";
import { createWebHistory, createRouter } from "vue-router";

// styles

import "@fortawesome/fontawesome-free/css/all.min.css";
//import "@/assets/styles/tailwind.css";
import "@/assets/styles/style.css";
// mouting point for the whole app

import App from "@/App.vue";

// Vuex
import { store } from "./store/index.js";

// layouts

import Admin from "@/layouts/Admin.vue";
import Auth from "@/layouts/Auth.vue";

// views for Admin layout

import Dashboard from "@/views/admin/Dashboard.vue";
import Settings from "@/views/admin/Settings.vue";
import Card from "@/views/admin/Card.vue";
import TypeCard from "@/views/admin/TypeCard.vue";
import Employee from "@/views/admin/Employee.vue";
import Exit from "@/views/admin/Exit.vue";
import Report from "@/views/admin/Report.vue";
import Role from "@/views/admin/Role.vue";
import Turnstile from "@/views/admin/Turnstile.vue";
import Visit from "@/views/admin/Visit.vue";
import External from "@/views/admin/External.vue";
import Entrie from "@/views/admin/Entrie.vue";

// Forms
import CardForms from "@/views/forms/CardForms.vue";
import TypeCardForms from "@/views/forms/TypeCardForms.vue";
import TurnstileForms from "@/views/forms/TurnstileForms.vue";
import RoleForms from "@/views/forms/RoleForms.vue";
import EmployeeForms from "@/views/forms/EmployeeForms.vue";
import ExternalForms from "@/views/forms/ExternalForms.vue";
import ConnectCardForms from "@/views/forms/ConnectCardForms.vue";
import ConnectCardExternalForms from "@/views/forms/ConnectCardExternalForms.vue";
import VisitForms from "@/views/forms/VisitForms.vue";
import UpdatePassword from "@/views/forms/UpdatePassword.vue";

// views for Auth layout

import Login from "@/views/auth/Login.vue";

// routes

const routes = [
  {
    path: "/",
    redirect: "/admin/dashboard",
    component: Admin,
    meta: { requiresAuth: true },
    children: [
      {
        path: "/admin/dashboard",
        component: Dashboard,
      },
      //Configuracion
      {
        path: "/admin/settings",
        component: Settings,
      },
      {
        path: "/admin/updatePassword",
        component: UpdatePassword,
      },
      // Tarjetas
      {
        path: "/admin/card",
        component: Card,
      },
      {
        path: "/admin/newCard",
        component: CardForms,
      },
      {
        path: "/admin/updateCard",
        component: CardForms,
      },
      // Tipos de tarjetas
      {
        path: "/admin/typecard",
        component: TypeCard,
      },
      {
        path: "/admin/newTypeCard",
        component: TypeCardForms,
      },
      {
        path: "/admin/updateTypeCard",
        component: TypeCardForms,
      },
      //Empleados
      {
        path: "/admin/employee",
        component: Employee,
      },
      {
        path: "/admin/newEmployee",
        component: EmployeeForms,
      },
      {
        path: "/admin/updateEmployee",
        component: EmployeeForms,
      },
      {
        path: "/admin/connectCardEmployee",
        component: ConnectCardForms,
      },
      //Externos
      {
        path: "/admin/external",
        component: External,
      },
      {
        path: "/admin/newExternal",
        component: ExternalForms,
      },
      {
        path: "/admin/updateExternal",
        component: ExternalForms,
      },
      {
        path: "/admin/connectCardExternal",
        component: ConnectCardExternalForms,
      },
      //Salidas
      {
        path: "/admin/exit",
        component: Exit,
      },
      //Entradas
      {
        path: "/admin/entrie",
        component: Entrie,
      },
      //Role
      {
        path: "/admin/role",
        component: Role,
      },
      {
        path: "/admin/newRole",
        component: RoleForms,
      },
      {
        path: "/admin/updateRole",
        component: RoleForms,
      },
      //Molinos
      {
        path: "/admin/turnstile",
        component: Turnstile,
      },
      {
        path: "/admin/newTurnstile",
        component: TurnstileForms,
      },
      {
        path: "/admin/updateTurnstile",
        component: TurnstileForms,
      },
      //Visitas
      {
        path: "/admin/visit",
        component: Visit,
      },
      {
        path: "/admin/newVisit",
        component: VisitForms,
      },
      //Reportes
      {
        path: "/admin/report",
        component: Report,
      },
    ],
  },
  {
    path: "/auth",
    redirect: "/auth/login",
    component: Auth,
    meta: { notAuthenticated: true },
    children: [
      {
        path: "/auth/login",
        component: Login,
      },
    ],
  },
  { path: "/:pathMatch(.*)*", redirect: "/" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (!store.getters["isLogin"]) {
    try {
      await store.dispatch("verifyToken"); // Carga los datos del usuario
    } catch (error) {
      console.error("Error loading user data:", error);
    }
  }

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!store.getters["isLogin"]) {
      next({
        path: "/auth/login",
      });
    } else {
      next();
    }
  }

  if (to.matched.some((record) => record.meta.notAuthenticated)) {
    if (store.getters["isLogin"]) {
      next({
        path: "/",
      });
    } else {
      next();
    }
  }
});

createApp(App).use(router).use(store).mount("#app");
