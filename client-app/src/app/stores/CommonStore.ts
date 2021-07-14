import { makeAutoObservable, reaction, runInAction } from "mobx";
import { ServerError } from "../../models/ServerError";
import agent from "../api/agent";

export default class CommonStore{

    error: ServerError | null = null;
    token : string | null = window.localStorage.getItem('jwt');
    apploaded=false;

    constructor(){
        makeAutoObservable(this);

        //mobx reaction. This reacts when token value changes
        reaction(
            () => this.token,
            token => {
                if(token){
                    window.localStorage.setItem('jwt', token);
                }
                else {
                    window.localStorage.removeItem('jwt');
                }
            }
        )
    }

    setServerError = (err: ServerError) => {
        this.error = err;
    }


    setToken = (token: string|null) => {
        this.token = token;
    }

    setAppLoaded = () => {
        this.apploaded = true;
    }


}