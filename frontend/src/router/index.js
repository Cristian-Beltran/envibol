import { createRouter, createWebHistory } from "vue-router";

import Admin from "@/templates/Layout.vue";
import Auth from "@/templates/Auth.vue";
// views for Admin layout
import Dashboard from "@/views/admin/Dashboard.vue";
import Settings from "@/views/admin/Settings.vue";
import Card from "@/views/admin/Card.vue";
import TypeCard from "@/views/admin/TypeCard.vue";
import Employee from "@/views/admin/Employee.vue";
import Exit from "@/views/admin/Exit.vue";
import Role from "@/views/admin/Role.vue";
import Turnstile from "@/views/admin/Turnstile.vue";
import Visit from "@/views/admin/Visit.vue";
import External from "@/views/admin/External.vue";
import Entrie from "@/views/admin/Entrie.vue";

// Biometric
import TimeTable from "@/views/admin/TimeTable.vue";

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
import TimeTableForms from "@/views/forms/TimeTableForms.vue";

// views for Auth layout
import Login from "@/views/auth/Login.vue";

import { useProfileStore } from "@/stores/profile";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/dashboard",
      component: Admin,
      meta: { requiresAuth: true },
      children: [
        {
          path: "/dashboard",
          component: Dashboard,
        },
        //Configuracion
        {
          path: "/profile",
          component: Settings,
        },
        {
          path: "/updatePassword",
          component: UpdatePassword,
        },
        // Tarjetas
        {
          path: "/card",
          component: Card,
        },
        {
          path: "/newCard",
          component: CardForms,
        },
        {
          path: "/updateCard",
          component: CardForms,
        },
        // Tipos de tarjetas
        {
          path: "/typecard",
          component: TypeCard,
          meta: { requiresAdmin: true },
        },
        {
          path: "/newTypeCard",
          component: TypeCardForms,
          meta: { requiresAdmin: true },
        },
        {
          path: "/updateTypeCard",
          component: TypeCardForms,
          meta: { requiresAdmin: true },
        },
        //Empleados
        {
          path: "/employee",
          component: Employee,
        },
        {
          path: "/newEmployee",
          component: EmployeeForms,
        },
        {
          path: "/updateEmployee",
          component: EmployeeForms,
        },
        {
          path: "/connectCardEmployee",
          component: ConnectCardForms,
        },
        //Externos
        {
          path: "/external",
          component: External,
        },
        {
          path: "/newExternal",
          component: ExternalForms,
        },
        {
          path: "/updateExternal",
          component: ExternalForms,
        },
        {
          path: "/connectCardExternal",
          component: ConnectCardExternalForms,
        },
        //Salidas
        {
          path: "/exit",
          component: Exit,
        },
        //Entradas
        {
          path: "/entry",
          component: Entrie,
        },
        //Role
        {
          path: "/role",
          component: Role,
          meta: { requiresAdmin: true },
        },
        {
          path: "/newRole",
          component: RoleForms,
          meta: { requiresAdmin: true },
        },
        {
          path: "/updateRole",
          component: RoleForms,
          meta: { requiresAdmin: true },
        },
        //Molinos
        {
          path: "/turnstile",
          component: Turnstile,
          meta: { requiresAdmin: true },
        },
        {
          path: "/newTurnstile",
          component: TurnstileForms,
          meta: { requiresAdmin: true },
        },
        {
          path: "/updateTurnstile",
          component: TurnstileForms,
          meta: { requiresAdmin: true },
        },
        //Visitas
        {
          path: "/visit",
          component: Visit,
        },
        {
          path: "/newVisit",
          component: VisitForms,
        },
        {
          path: "/timetable",
          component: TimeTable,
        },
        {
          path: "/updateTimeTable",
          component: TimeTableForms,
        },
        {
          path: "/newTimeTable",
          component: TimeTableForms,
        },
        //Reportes
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
  ],
});

router.beforeEach(async (to, from, next) => {
  let ok = false;
  let path = "";
  const profileStore = useProfileStore();
  if (!profileStore.isAuthenticated) {
    try {
      await profileStore.verifyToken();
    } catch (error) {
      console.error("Error loading user data:", error);
    }
  }

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!profileStore.isAuthenticated) {
      path = "/auth/login";
      ok = false;
    } else {
      ok = true;
    }
  }

  if (to.matched.some((record) => record.meta.notAuthenticated)) {
    if (profileStore.isAuthenticated) {
      ok = false;
      path = "/";
    } else {
      ok = true;
    }
  }

  if (to.matched.some((record) => record.meta.requiresAdmin)) {
    if (!profileStore.isAdmin) {
      ok = false;
      path = "/";
    } else {
      ok = true;
    }
  }
  if (ok) {
    next();
  } else {
    next({ path });
  }
});

export default router;
