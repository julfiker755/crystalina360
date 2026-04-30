import home from "./user/home.json";
import contact_us from "./user/contact_us.json";
import auth from "./user/auth.json";
import profile from "./user/profile.json";
import opratorsHome from "./oprators/home.json";
import resources from "./user/resources.json";
import explore from "./user/explore.json";
import common from "./common.json";
import details from "./user/slg-details.json";
import opratorsDashboard from "./oprators/dashboard.json";
import opratorsProfile from "./oprators/profile.json";
import evStoreAll from "./oprators/ev-store-all.json";
import questionAddon from "./oprators/addon-question.json";

export default {
  common,
  user: {
    home,
    contact_us,
    auth,
    profile,
    resources,
    explore,
    details,
  },
  oprator: {
    home: opratorsHome,
    dashboard: opratorsDashboard,
    profile: opratorsProfile,
    evStoreAll: evStoreAll,
    question: questionAddon
  },
};
