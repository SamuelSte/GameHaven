import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { UserService } from "./users.service";
import { CreateUserDto } from "./dto/createUser.dto";
import { UpdateUserDto } from "./dto/updateUser.dto";


@Controller('users')
export class UserController {

    constructor(private userService: UserService) {

    }

    @Get()
    async getUsers() { 
        return await this.userService.findUsers();
    }

    @Get(':id')
    async getOne(@Param('id') id: number) {
        return await this.userService.findOneById(id);
    }

    @Get(':username')
    async getOneByUsername(@Param('username') username: string) {
        return await this.userService.findOneByUsername(username);
    }

    @Post()
    @UsePipes(ValidationPipe)
    async createUser(@Body() createUserDto: CreateUserDto) {
        return await this.userService.createUser(createUserDto);
    }

    @Patch(':id')
    @UsePipes(ValidationPipe)
    async updateUserById(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
        return await this.userService.updateUser(id, updateUserDto);   
    }

    @Delete(':id')
    async deleteUserById(@Param('id', ParseIntPipe) id: number) {
        return await this.userService.deleteUser(id);   
    }


}