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
        const userToBeUpdated = this.findIndexById(id);
        
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

    private findIndexById(id: string) {
        const likelyUser = this.users.find(user => user.id === id);
        if(!likelyUser) {
          throw new Error("User does not exist!");
        }

        return likelyUser;
    }

    async delete(id: string) {
        const userToBeDeleted = this.findIndexById(id);
        this.users = this.users.filter(user => user.id !== id);
        return userToBeDeleted;
    }
}