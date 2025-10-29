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
}