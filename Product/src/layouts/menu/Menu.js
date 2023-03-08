export const menuItems = [
  {
    label: "Products",
    path: "/products",
    icon: "fas fa-home",
  },
  {
    label: "Users",
    path: "/users",
    icon: "fas fa-user",
    children: [
      {
        label: "All Users",
        path: "",
      },
      {
        label: "All Post",
        path: "post",
      },
      {
        label: "All Comment",
        path: "comments",
      },
    ],
  },
  {
    label: "Posts",
    path: "/post",
    icon: "fas fa-info-circle",
  },
  {
    label: "Comments",
    path: "/comments",
    icon: "fas fa-envelope",
  },
];
