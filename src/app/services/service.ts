import { environment } from "@env/environment";

export abstract class Service {
    public readonly BASE_API_URL: String;

    public constructor() {
        this.BASE_API_URL = environment.apiUrl;
    }
}