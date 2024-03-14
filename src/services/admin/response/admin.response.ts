import { ApiProperty } from "@nestjs/swagger";
import { Admin } from "@prisma/client";

export class AdminResponse implements Admin {
    @ApiProperty()
    id: string;

    @ApiProperty()
    login: string;

    @ApiProperty()
    password: string;

    constructor(admin: Admin) {
        this.id = admin.id;
        this.login = admin.login;
    }
}