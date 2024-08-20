// import { useTranslation } from "react-i18next";

// const BreadcrumbNameMap = () => {
//   // const { i18n } = useTranslation();

//   // return i18n.language === "en"
//   //   ? {
//   //       "/dashboard": "Dashboard",
//   //       "/dashboard/home": "Home",
//   //       "/dashboard/categories": "Catgeories",
//   //       "/dashboard/categories/create": "Add New Catgeory",
//   //       "/dashboard/services": "Services",
//   //       "/dashboard/templates": "Templates",
//   //       "/dashboard/terms": "Terms",
//   //       "/dashboard/policies": "Pplicies",
//   //       "/dashboard/faqs": "FAQ",
//   //       "/dashboard/about": "About App",
//   //       "/dashboard/coupons": "Coupones",
//   //     }
//   //   : {
//   //       "/dashboard": "لوحة التحكم",
//   //       "/dashboard/home": "المنزل",
//   //       "/dashboard/categories": "التصفنيفات",
//   //       "/dashboard/categories/create": "اضافة تصنيف جديد",
//   //       "/dashboard/services": "الخدمات",
//   //       "/dashboard/templates": "بطاقات الدعوات",
//   //       "/dashboard/terms": "الشروط",
//   //       "/dashboard/policies": "السياسات",
//   //       "/dashboard/faqs": "الاسئلة الشائعة",
//   //       "/dashboard/about": "حول التطبيق",
//   //       "/dashboard/coupons": "الخصومات",
//   //     };
//   return {
//     "/dashboard": "Dashboard",
//     "/dashboard/home": "Home",
//     "/dashboard/categories": "Catgeories",
//     "/dashboard/categories/create": "Add New Catgeory",
//     "/dashboard/services": "Services",
//     "/dashboard/templates": "Templates",
//     "/dashboard/terms": "Terms",
//     "/dashboard/policies": "Pplicies",
//     "/dashboard/faqs": "FAQ",
//     "/dashboard/about": "About App",
//     "/dashboard/coupons": "Coupones",
//   };
// };

// export default BreadcrumbNameMap;

import { useTranslation } from "react-i18next";

// export default breadcrumbNameMap;


const useGetBreadCrumbNameMap = () => {
  const {i18n} = useTranslation()

  return i18n.language === "en"
  ? {
      "/dashboard": "Dashboard",
      "/dashboard/home": "Home",
      "/dashboard/categories": "Catgeories",
      "/dashboard/categories/create": "Add New Catgeory",
      "/dashboard/services": "Services",
      "/dashboard/templates": "Templates",
      "/dashboard/terms": "Terms",
      "/dashboard/policies": "Pplicies",
      "/dashboard/faqs": "FAQ",
      "/dashboard/about": "About App",
      "/dashboard/coupons": "Coupones",
    }
  : {
      "/dashboard": "لوحة التحكم",
      "/dashboard/home": "المنزل",
      "/dashboard/categories": "التصفنيفات",
      "/dashboard/categories/create": "اضافة تصنيف جديد",
      "/dashboard/services": "الخدمات",
      "/dashboard/templates": "بطاقات الدعوات",
      "/dashboard/terms": "الشروط",
      "/dashboard/policies": "السياسات",
      "/dashboard/faqs": "الاسئلة الشائعة",
      "/dashboard/about": "حول التطبيق",
      "/dashboard/coupons": "الخصومات",
    };
}

export default useGetBreadCrumbNameMap
