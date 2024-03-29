import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  // Main routes
  {
    path: "/",
    lazy: async () => {
      const AppShell = await import("./pages/dashboard/sidebar/layout");
      return { Component: AppShell.default };
    },
    children: [
      {
        lazy: async () => ({
          Component: (
            await import("./pages/dashboard/stats/index")
          ).default,
        }),
      },
      {
        index: true,
        path: "dashboard",
        lazy: async () => ({
          Component: (
            await import("./pages/dashboard/stats/index")
          ).default,
        }),
      },
      {
        path: "jobs",
        lazy: async () => ({
          Component: (await import("./pages/dashboard/jobs/index"))
            .default,
        }),
      },
      {
        path: "post-job",
        lazy: async () => ({
          Component: (await import("./pages/dashboard/jobs/addJobs"))
            .default,
        }),
      },
      {
        path: "applied",
        lazy: async () => ({
          Component: (
            await import("./pages/dashboard/applied/index")
          ).default,
        }),
      },
      {
        path: "profiles",
        lazy: async () => ({
          Component: (
            await import("./pages/dashboard/profile/index")
          ).default,
        }),
      },
      {
        path: "view-application",
        lazy: async () => ({
          Component: (
            await import("./pages/dashboard/view-application/index")
          ).default,
        }),
      },
    ],
  },
  //auth
  {
    path: "/login",
    lazy: async () => ({
      Component: (await import("./pages/auth/login")).default,
    }),
  },
  {
    path: "/register",
    lazy: async () => ({
      Component: (await import("./pages/auth/register")).default,
    }),
  },

  // Other routes
  {
    path: "/resume",
    lazy: async () => ({
      Component: (
        await import("./pages/resume-builer/components/resume-select")
      ).default,
    }),
  },
  {
    path: "/resume/create",
    lazy: async () => ({
      Component: (await import("./pages/resume-builer/components/create"))
        .default,
    }),
  },
  {
    path: "/resume/result",
    lazy: async () => ({
      Component: (await import("./pages/resume-builer/components/Result"))
        .default,
    }),
  },
]);

export default router;
