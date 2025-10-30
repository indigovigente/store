import { IsEmail, IsNotEmpty, IsOptional, MinLength } from "class-validator";
import { SingleEmail } from "../validation/singleEmail.validator";

export class UpdateUserDto {
    
    @IsNotEmpty({message: "O nome não pode ser vazio!"})
    @IsOptional()
    name: string;
    @IsEmail({}, {message: "O e-mail informado é inválido!"})
    @SingleEmail({message: "O e-mail informado já está em uso!"})
    @IsOptional()
    mail: string;
    @MinLength(6, {message: "A senha deve ter no mínimo 6 caracteres!"})
    @IsOptional()
    password: string;
}   