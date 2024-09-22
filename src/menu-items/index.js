import { Dashboard } from "@mui/icons-material";
import {
  AboutAppIcon,
  CatgeoryIcon,
  ContactUsIcon,
  CouponIcon,
  FaqIcon,
  OfferIcon,
  PackageIcon,
  PolicyIcon,
  ProhibitedIcon,
  ServiceIcon,
  TemplateIcon,
  TermIcon,
} from "../assets/iconsExporter";
import { useTranslation } from "react-i18next";

const MenuItemsMap = () => {
  const { i18n } = useTranslation();
  return i18n.language === "en"
    ? [
        {
          id: "dashboard",
          path: "/dashboard/home",
          name: "Home",
          icon: <Dashboard />,
        },
        {
          id: "categories",
          path: "/dashboard/categories",
          name: "Categories",
          icon: CatgeoryIcon,
        },
        {
          id: "offers",
          path: "/dashboard/offers",
          name: "Offer",
          icon: OfferIcon,
        },
        {
          id: "templates",
          path: "/dashboard/templates",
          name: "Templates",
          icon: TemplateIcon,
        },
        {
          id: "packages",
          path: "/dashboard/packages",
          name: "Packages",
          icon: PackageIcon,
        },
        {
          id: "featuers",
          path: "/dashboard/featuers",
          name: "Featuers",
          icon: CatgeoryIcon,
        },
        {
          id: "nicknames",
          path: "/dashboard/nicknames",
          name: "Nickname",
          icon: CatgeoryIcon,
        },
        {
          id: "secondaryPackages",
          path: "/dashboard/secondaryPackages",
          name: "Secondary Packages",
          icon: PackageIcon,
        },
        {
          id: "services",
          path: "/dashboard/services",
          name: "Services",
          icon: ServiceIcon,
        },
        {
          id: "terms",
          path: "/dashboard/terms",
          name: "Terms",
          icon: TermIcon,
        },
        {
          id: "policies",
          path: "/dashboard/policies",
          name: "Privacy Policy",
          icon: PolicyIcon,
        },
        {
          id: "faqs",
          path: "/dashboard/faqs",
          name: "FAQ",
          icon: FaqIcon,
        },
        {
          id: "about",
          path: "/dashboard/about",
          name: "About App",
          icon: AboutAppIcon,
        },
        {
          id: "coupons",
          path: "/dashboard/coupons",
          name: "Coupons",
          icon: CouponIcon,
        },
        {
          id: "contact",
          path: "/dashboard/contact",
          name: "Contact Info",
          icon: ContactUsIcon,
        },
        {
          id: "prohibited",
          path: "/dashboard/prohibited",
          name: "Prohibited",
          icon: ProhibitedIcon,
        },
      ]
    : [
        {
          id: "dashboard",
          path: "/dashboard/home",
          name: "المنزل",
          icon: <Dashboard />,
        },
        {
          id: "categories",
          path: "/dashboard/categories",
          name: "التصنيفات",
          icon: CatgeoryIcon,
        },
        {
          id: "offers",
          path: "/dashboard/offers",
          name: "العروض",
          icon: OfferIcon,
        },
        {
          id: "templates",
          path: "/dashboard/templates",
          name: "بطاقات الدعوة",
          icon: TemplateIcon,
        },
        {
          id: "packages",
          path: "/dashboard/packages",
          name: "الحزم",
          icon: PackageIcon,
        },
        {
          id: "featuers",
          path: "/dashboard/featuers",
          name: "الميزات",
          icon: CatgeoryIcon,
        },
        {
          id: "nicknames",
          path: "/dashboard/nicknames",
          name: "الالقاب",
          icon: CatgeoryIcon,
        },
        {
          id: "secondaryPackages",
          path: "/dashboard/secondaryPackages",
          name: "الحزم الثانوية",
          icon: PackageIcon,
        },
        {
          id: "services",
          path: "/dashboard/services",
          name: "الخدمات",
          icon: ServiceIcon,
        },
        {
          id: "terms",
          path: "/dashboard/terms",
          name: "الشروط والاحكام",
          icon: TermIcon,
        },
        {
          id: "policies",
          path: "/dashboard/policies",
          name: "سياسة الخصوصية",
          icon: PolicyIcon,
        },
        {
          id: "faqs",
          path: "/dashboard/faqs",
          name: "الاسئلة الشائعة",
          icon: FaqIcon,
        },
        {
          id: "about",
          path: "/dashboard/about",
          name: "حول التطبيق",
          icon: AboutAppIcon,
        },
        {
          id: "coupons",
          path: "/dashboard/coupons",
          name: "الخصومات",
          icon: CouponIcon,
        },
        {
          id: "contact",
          path: "/dashboard/contact",
          name: "معلومات الاتصال",
          icon: ContactUsIcon,
        },
        {
          id: "prohibited",
          path: "/dashboard/prohibited",
          name: "الممنوعات",
          icon: ProhibitedIcon,
        },
      ];
};

export default MenuItemsMap;
