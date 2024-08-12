import { user } from "../store/types";

export const verificationOfAuthorization = (arrayUsers: user[], username: string, password: string): boolean => {
    for (let i = 0; i < arrayUsers.length; i++) {
        if (arrayUsers[i].login === username.toString() && arrayUsers[i].password === password.toString()) return true
    }
    return false
}