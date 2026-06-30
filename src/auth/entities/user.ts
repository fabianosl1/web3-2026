import { Role } from '../enums/role.enum';

export class User {
    id?: number;
    role?: Role;

    name?: string;
    email?: string;
}