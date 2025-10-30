import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserRepository } from "./user.repository";
import { SingleEmailValidation } from "./validation/singleEmail.validator";

@Module({
    controllers:[UserController],
    providers:[UserRepository, SingleEmailValidation],
})
export class UserModule{

}