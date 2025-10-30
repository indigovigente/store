import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { UserRepository } from "../user.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
@ValidatorConstraint({ async: true })
export class SingleEmailValidation implements ValidatorConstraintInterface {
    constructor(private userRepository: UserRepository){}
    async validate(value: any, validationArguments?: ValidationArguments): Promise<boolean>  {
        const doesTheEmailAddressExist = await this.userRepository.doesTheEmailAddressExist(value);
        return !doesTheEmailAddressExist;
    }
}

export const SingleEmail = (validationOptions: ValidationOptions) => {
    return  (object: Object, propertyName: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: SingleEmailValidation,
        });     
    };
};