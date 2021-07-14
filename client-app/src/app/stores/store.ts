import { createContext, useContext } from "react";
import ActivityStore from "./activitystore";
import CommonStore from "./CommonStore";
import userStore from "./userStore";

interface Store{
    activitystore : ActivityStore;
    commonstore : CommonStore;
    userstore: userStore;
}

export const store : Store = {
    activitystore : new ActivityStore(),
    commonstore : new CommonStore(),
    userstore: new userStore()
}

export const storeContext = createContext(store);

export function useStore(){
    return useContext(storeContext)
}