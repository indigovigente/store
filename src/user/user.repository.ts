import { Injectable } from "@nestjs/common";
import { UserEntity } from "./user.entity";

@Injectable()
export class UserRepository {
  
    private users: UserEntity[] = [];
    async save(user: UserEntity) {
        this.users.push(user);
    }
    async findAll(): Promise<UserEntity[]> {
        return this.users;
    }

    async doesTheEmailAddressExist(mail: string) {
        const likelyUser = this.users.find(user => user.mail === mail);
        return likelyUser !== undefined;
    }
}