import {  } from "mobx";
import { createContext, useContext } from "react";
import ActivityStore from "./activitystore";
import CommonStore from "./CommonStore";

interface Store{
    activitystore : ActivityStore;
    commonstore : CommonStore
}

export const store : Store = {
    activitystore : new ActivityStore(),
    commonstore : new CommonStore()
}

export const storeContext = createContext(store);

export function useStore(){
    return useContext(storeContext)
}