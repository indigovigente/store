import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/createUser.dto";

@Injectable()
export class UserRepository {
  
    private users: CreateUserDto[] = [];
    async save(user: CreateUserDto) {
        this.users.push(user);
    }
    async findAll(): Promise<CreateUserDto[]> {
        return this.users;
    }

    async doesTheEmailAddressExist(mail: string) {
        const likelyUser = this.users.find(user => user.mail === mail);
        return likelyUser !== undefined;
    }
}