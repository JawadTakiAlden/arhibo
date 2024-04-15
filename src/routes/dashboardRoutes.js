import { lazy } from "react";
import MainLayout from "../layouts/MainLayout";
import Loadable from "../components/Loadable";
const AllCatgeory = Loadable(lazy(() => import("../views/pages/Category")));
const ShowCatgeory = Loadable(
  lazy(() => import("../views/pages/Category/ShowCatgeory"))
);
const InputsOfCategory = Loadable(
  lazy(() => import("../views/pages/Category/Inputs"))
);
const FiltersOfCategory = Loadable(
  lazy(() => import("../views/pages/Category/Filters"))
);
const CreateCatgeory = Loadable(
  lazy(() => import("../views/pages/Category/CreateCatgeory"))
);
const AllTemplate = Loadable(lazy(() => import("../views/pages/Template")));
const ShowTemplate = Loadable(
  lazy(() => import("../views/pages/Template/ShowTemplate"))
);
const CreateTemplate = Loadable(
  lazy(() => import("../views/pages/Template/CreateTemplate"))
);
const AllServices = Loadable(lazy(() => import("../views/pages/Services")));
const CreateService = Loadable(
  lazy(() => import("../views/pages/Services/CreateService"))
);
const ShowService = Loadable(
  lazy(() => import("../views/pages/Services/ShowService"))
);
const AllTerms = Loadable(lazy(() => import("../views/pages/Terms")));
const CreateTerm = Loadable(
  lazy(() => import("../views/pages/Terms/CreateTerm"))
);
const ShowTerm = Loadable(lazy(() => import("../views/pages/Terms/ShowTerm")));
const AllPolicy = Loadable(lazy(() => import("../views/pages/Policy")));
const CreatePolicy = Loadable(
  lazy(() => import("../views/pages/Policy/CreatePolicy"))
);
const ShowPolicy = Loadable(
  lazy(() => import("../views/pages/Policy/ShowPolicy"))
);
const AllFaq = Loadable(lazy(() => import("../views/pages/FAQ")));
const CreateFaq = Loadable(lazy(() => import("../views/pages/FAQ/CreateFaq")));
const ShowFaq = Loadable(lazy(() => import("../views/pages/FAQ/ShowFaq")));
const AbouApp = Loadable(lazy(() => import("../views/pages/About")));
const CreateAbout = Loadable(
  lazy(() => import("../views/pages/About/CreateAbout"))
);
const ShowAbout = Loadable(
  lazy(() => import("../views/pages/About/ShowAbout"))
);
const AllCoupons = Loadable(lazy(() => import("../views/pages/Coupons")));
const ShowCoupon = Loadable(
  lazy(() => import("../views/pages/Coupons/ShowCoupon"))
);
const CreateCoupon = Loadable(
  lazy(() => import("../views/pages/Coupons/CreateCoupon"))
);
const ContactInfo = Loadable(lazy(() => import("../views/pages/Contact")));
const ProhibitedThings = Loadable(
  lazy(() => import("../views/pages/Prohibited"))
);
const CreateProhibited = Loadable(
  lazy(() => import("../views/pages/Prohibited/CreateProhibited"))
);
const PackagesList = Loadable(lazy(() => import("../views/pages/Packages")));
const CreatePackage = Loadable(
  lazy(() => import("../views/pages/Packages/CreatePackage"))
);
const ShowPackage = Loadable(
  lazy(() => import("../views/pages/Packages/ShowPackage"))
);
const PackageDetail = Loadable(
  lazy(() => import("../views/pages/Packages/PackageDetail"))
);
const SecondaryPackages = Loadable(
  lazy(() => import("../views/pages/SecondaryPackages"))
);
const Dashboard = Loadable(lazy(() => import("../views/Dashboard")));
const Offer = Loadable(lazy(() => import("../views/pages/Offer")));

export const dashboardRoutes = {
  path: "dashboard",
  element: <MainLayout />,
  children: [
    {
      path: "",
      element: (
          <Dashboard />
      ),
    },
    {
      path: "home",
      element: <Dashboard />,
    },
    {
      path: "contact",
      element: <ContactInfo />,
    },
    {
      path: "offers",
      element: <Offer />,
    },
    {
      path: "packages",
      children: [
        {
          path: "",
          element: <PackagesList />,
        },
        {
          path: "create",
          element: <CreatePackage />,
        },
        {
          path: ":packageID",
          children: [
            {
              path: "",
              element: <ShowPackage />,
            },
            {
              path: "details",
              element: <PackageDetail />,
            },
          ],
        },
      ],
    },
    {
      path: "secondaryPackages",
      children: [
        {
          path: "",
          element: <SecondaryPackages />,
        },
      ],
    },
    {
      path: "prohibited",

      children: [
        {
          path: "",
          element: <ProhibitedThings />,
        },
        {
          path: "create",
          element: <CreateProhibited />,
        },
      ],
    },
    {
      path: "categories",
      children: [
        {
          path: "",
          element: <AllCatgeory />,
        },
        {
          path: ":catgeoryID",
          children: [
            {
              path: "",
              element: <ShowCatgeory />,
            },
            {
              path: "inputs",
              element: <InputsOfCategory />,
            },
            {
              path: "filters",
              element: <FiltersOfCategory />,
            },
          ],
        },
        {
          path: "create",
          element: <CreateCatgeory />,
        },
      ],
    },
    {
      path: "templates",
      children: [
        {
          path: "",
          element: <AllTemplate />,
        },
        {
          path: ":templateID",
          element: <ShowTemplate />,
        },
        {
          path: "create",
          element: <CreateTemplate />,
        },
      ],
    },
    {
      path: "services",
      children: [
        {
          path: "",
          element: <AllServices />,
        },
        {
          path: ":serviceID",
          element: <ShowService />,
        },
        {
          path: "create",
          element: <CreateService />,
        },
      ],
    },
    {
      path: "terms",
      children: [
        {
          path: "",
          element: <AllTerms />,
        },
        {
          path: ":termID",
          element: <ShowTerm />,
        },
        {
          path: "create",
          element: <CreateTerm />,
        },
      ],
    },
    {
      path: "policies",
      children: [
        {
          path: "",
          element: <AllPolicy />,
        },
        {
          path: ":policyID",
          element: <ShowPolicy />,
        },
        {
          path: "create",
          element: <CreatePolicy />,
        },
      ],
    },
    {
      path: "faqs",
      children: [
        {
          path: "",
          element: <AllFaq />,
        },
        {
          path: ":faqID",
          element: <ShowFaq />,
        },
        {
          path: "create",
          element: <CreateFaq />,
        },
      ],
    },
    {
      path: "about",
      children: [
        {
          path: "",
          element: <AbouApp />,
        },
        {
          path: ":aboutID",
          element: <ShowAbout />,
        },
        {
          path: "create",
          element: <CreateAbout />,
        },
      ],
    },
    {
      path: "coupons",
      children: [
        {
          path: "",
          element: <AllCoupons />,
        },
        {
          path: ":couponID",
          element: <ShowCoupon />,
        },
        {
          path: "create",
          element: <CreateCoupon />,
        },
      ],
    },
  ],
};
