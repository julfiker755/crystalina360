import home from './user/home.json';
import contact_us from './user/contact_us.json';
import auth from './user/auth.json';
import profile from './user/profile.json';
import opratorsHome from './oprators/home.json';
import resources from "./user/resources.json"
import explore from "./user/explore.json"
import common from "./common.json"
import details from "./user/slg-details.json"



export default {
    common,
    user: {
        home,
        contact_us,
        auth,
        profile,
        resources,
        explore,
        details
    },
    oprator: {
        home: opratorsHome,
    },

};
