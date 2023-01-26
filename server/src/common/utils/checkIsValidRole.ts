import { Role } from "common/types/types";

export const checkIsValidRole = (role: Role) => {
    return role === Role.ADMIN || role === Role.USER
}