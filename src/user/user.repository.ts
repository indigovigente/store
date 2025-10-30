import { Injectable } from "@nestjs/common";
import { UserEntity } from "./user.entity";
import { UpdateUserDto } from "./dto/UpdateUser.dto";

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

    async update(id: string, dataToUpdateUser: Partial<UserEntity>) {
        const userToBeUpdated = this.users.find(user => user.id === id);
        if(!userToBeUpdated) {
          throw new Error("User does not exist!");
        }
        
        Object.entries(dataToUpdateUser).forEach(([key, value]) => {
            if(key == 'id'){
                return;
            }

            if(value !== undefined){
                userToBeUpdated[key] = value;
            }
        });
        return userToBeUpdated;
        
    }
}