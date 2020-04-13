import { User } from "../../entities/user";
import { Injectable } from '@angular/core';

@Injectable()
export class Session {
    private user: User;
    private token: String;

    public create(token: String) {
        this.token = token;
    }

    public getToken(): String {
        return this.token;
    }

    public isLoggedIn(): boolean {
        return this.getToken() != null;
    }
 
    public destroy() {

    }
}