import {  } from "mobx";
import { createContext, useContext } from "react";
import ActivityStore from "./activitystore";

interface Store{
    activitystore : ActivityStore
}

export const store : Store = {
    activitystore : new ActivityStore()
}

export const storeContext = createContext(store);

export function useStore(){
    return useContext(storeContext)
}