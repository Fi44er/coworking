import { Admin } from "@prisma/client";

export class AdminResponse implements Admin {
    id: string;
    login: string;
    password: string;

    constructor(admin: Admin) {
        this.id = admin.id;
        this.login = admin.login;
    }
}