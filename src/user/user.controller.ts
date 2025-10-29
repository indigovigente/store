import {Body, Controller, Post, Get } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { CreateUserDto } from "./dto/createUser.dto";

@Controller("/users")
export class UserController {

    constructor(private userRepository: UserRepository){}
    
    @Post()
    async createUser(@Body() user:CreateUserDto) {
       this.userRepository.save(user);
        return {
            message: "User created successfully",
            user: user
        }
    }

    @Get()
    async getAllUsers(): Promise<CreateUserDto[]>{
        return this.userRepository.findAll();
    }
}