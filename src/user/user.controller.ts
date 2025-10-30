import {Body, Controller, Post, Get } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { UserEntity } from "./user.entity";
import { CreateUserDto } from "./dto/CreateUser.dto";
import { ListUserDto } from "./dto/ListUser.dto";


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
            user: new ListUserDto(
                userEntity.id,
                userEntity.name,
                userEntity.mail
            )
        }
    }

    @Get()
    async getAllUsers(): Promise<ListUserDto[]>{
        const savedUsers =  this.userRepository.findAll()
        const usersList = (await savedUsers).map(user => {
            return new ListUserDto(
                user.id,
                user.name,
                user.mail
            )
        })
        return usersList;       
        
    }
}