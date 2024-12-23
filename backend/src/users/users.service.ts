import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./users.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/createUser.dto";
import { UpdateUserDto } from "./dto/updateUser.dto";

@Injectable()
export class UserService {

    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {

    }

    findUsers() {
        return this.userRepository.find();
    }

    createUser(createUserDto: CreateUserDto) {
        if (!createUserDto.createdAt) {
            createUserDto.createdAt = new Date();
        }
        return this.userRepository.save(createUserDto);
    }

    updateUser(id: number, updateUserDto: UpdateUserDto) {
        return this.userRepository.update({id}, {...updateUserDto})
    }

    deleteUser(id: number) {
        return this.userRepository.delete(id);
    }

    findOne(id: number) {
        return this.userRepository.findOneBy({ id });
    }

}