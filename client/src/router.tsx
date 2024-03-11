import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  // Main routes
  {
    path: "/",
    lazy: async () => {
      const AppShell = await import("./components/pages/dashboard/layout");
      return { Component: AppShell.default };
    },
    children: [
      {
        lazy: async () => ({
          Component: (
            await import("./components/pages/dashboard/dashboard/index")
          ).default,
        }),
      },
      {
        index: true,
        path: "dashboard",
        lazy: async () => ({
          Component: (
            await import("./components/pages/dashboard/dashboard/index")
          ).default,
        }),
      },
      {
        path: "jobs",
        lazy: async () => ({
          Component: (await import("./components/pages/dashboard/jobs/index"))
            .default,
        }),
      },
      {
        path: "post-job",
        lazy: async () => ({
          Component: (await import("./components/pages/dashboard/jobs/addJobs"))
            .default,
        }),
      },
      {
        path: "applied",
        lazy: async () => ({
          Component: (
            await import("./components/pages/dashboard/applied/index")
          ).default,
        }),
      },
      {
        path: "profiles",
        lazy: async () => ({
          Component: (
            await import("./components/pages/dashboard/profile/index")
          ).default,
        }),
      },
      {
        path: "view-application",
        lazy: async () => ({
          Component: (
            await import("./components/pages/dashboard/view-application/index")
          ).default,
        }),
      },
    ],
  },
  //auth
  {
    path: "/login",
    lazy: async () => ({
      Component: (await import("./components/pages/auth/login")).default,
    }),
  },
  {
    path: "/register",
    lazy: async () => ({
      Component: (await import("./components/pages/auth/register")).default,
    }),
  },

  // Other routes
  {
    path: "/resume",
    lazy: async () => ({
      Component: (
        await import("./components/resume-builer/components/resume-select")
      ).default,
    }),
  },
  {
    path: "/resume/create",
    lazy: async () => ({
      Component: (await import("./components/resume-builer/components/create"))
        .default,
    }),
  },
  {
    path: "/resume/result",
    lazy: async () => ({
      Component: (await import("./components/resume-builer/components/Result"))
        .default,
    }),
  },
]);

export default router;
