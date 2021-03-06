import { makeAutoObservable, runInAction } from "mobx";
import { history } from "../..";
import { User, UserFormValues } from "../../models/user";
import agent from "../api/agent";
import { store } from "./store";
export default class userStore{
    user : User | null=null;

    constructor(){
        makeAutoObservable(this);
    }

    get isLoggedIn(){
        return !!this.user?.displayName;
    }

    async login(value : UserFormValues){
        try {
            const result = await agent.Account.login(value);
            store.commonstore.setToken(result.token);
            runInAction(() => this.user = result);
            history.push('/activities');
            // console.log(result);
        } catch (error) {
            throw error;
        }

    }

    logout = () => {
        store.commonstore.setToken(null);
        window.localStorage.removeItem('jwt');
        this.user=null;
        history.push('/');
    }

    getUser = async () => {
        try {
            const user = await agent.Account.current();
            runInAction(() => this.user = user);
        } catch (error) {
            console.log(error);
        }
    }
}