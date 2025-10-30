import {Body, Controller, Post, Get } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { UserEntity } from "./user.entity";
import { CreateUserDto } from "./dto/createUser.dto";


@Controller("/users")
export class UserController {

    constructor(private userRepository: UserRepository){}
    
    @Post()
    async createUser(@Body() user:CreateUserDto) {
        const { v4 : uuid } = await import("uuid") 
        const userEntity = new UserEntity();
        userEntity.id = uuid();
        userEntity.name = user.name;
        userEntity.mail = user.mail;
        userEntity.password = user.password;

       this.userRepository.save(userEntity);
        return {
            message: "User created successfully",
            id: userEntity.id
        }
    }

    @Get()
    async getAllUsers(): Promise<UserEntity[]>{
        return this.userRepository.findAll();
    }
}