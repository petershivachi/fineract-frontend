import { RouteInfo } from "./sidebar.metadata";
export const ROUTES: RouteInfo[] = [
  // {
  //   path: "",
  //   title: "DASHBOARD PROFILE",
  //   moduleName: "",
  //   iconType: "",
  //   icon: "",
  //   class: "",
  //   groupTitle: true,
  //   badge: "",
  //   badgeClass: "",
  //   role: ["All"],
  //   submenu: [],
  // },

  // // Admin Modules
  // {
  //   path: "",
  //   title: "Dashboard",
  //   moduleName: "dashboard",
  //   iconType: "feather",
  //   icon: "monitor",
  //   class: "menu-toggle",
  //   groupTitle: false,
  //   badge: "",
  //   badgeClass: "",
  //   role: ["Admin"],
  //   submenu: [
  //     {
  //       path: "/admin/dashboard/main",
  //       title: "Profie Dashboard",
  //       moduleName: "dashboard",
  //       iconType: "",
  //       icon: "",
  //       class: "ml-menu",
  //       groupTitle: false,
  //       badge: "",
  //       badgeClass: "",
  //       role: ["Admin"],
  //       submenu: [],
  //     },
  //   ],
  // },

  {
    path: "",
    title: "ROLES AND USERS",
    moduleName: "",
    iconType: "",
    icon: "",
    class: "",
    groupTitle: true,
    badge: "",
    badgeClass: "",
    role: ["Admin"],
    submenu: [],
  },
  {
    path: "",
    title: "Roles",
    moduleName: "RolesModule",
    iconType: "feather",
    icon: "book",
    class: "menu-toggle",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["Admin"],
    submenu: [
      {
        path: "/admin/roles/view",
        title: "View Role",
        moduleName: "RolesModule",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: ["Admin"],
        submenu: [],
      },
    ],
  },
  {
    path: "",
    title: "User Accounts",
    moduleName: "user-accounts",
    iconType: "feather",
    icon: "user",
    class: "menu-toggle",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["Admin"],
    submenu: [
      {
        path: "/admin/user-accounts/add-account",
        title: "Add Account",
        moduleName: "add-account",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: ["Admin"],
        submenu: [],
      },
      {
        path: "/admin/user-accounts/all",
        title: "All Accounts",
        moduleName: "active-accounts",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: ["Admin"],
        submenu: [],
      }
    ],
  },


];
