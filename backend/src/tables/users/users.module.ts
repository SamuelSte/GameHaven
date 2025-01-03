import { forwardRef, Module } from "@nestjs/common";
import { UserController } from "./users.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./users.entity";
import { UserService } from "./users.service";
import { AuthModule } from "src/auth/auth.module";


@Module({
    imports: [TypeOrmModule.forFeature([User]), forwardRef(() => AuthModule)],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService]
})
export class UserModule {}