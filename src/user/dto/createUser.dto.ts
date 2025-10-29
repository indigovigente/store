import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class CreateUserDto {
    
    @IsNotEmpty({message: "O nome não pode ser vazio!"})
    name: string;
    @IsEmail({}, {message: "O e-mail informado é inválido!"})
    mail: string;
    @MinLength(6, {message: "A senha deve ter no mínimo 6 caracteres!"})
    password: string;
}   