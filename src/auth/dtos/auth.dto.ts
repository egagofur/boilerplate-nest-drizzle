import {IsEmail ,IsString, MinLength} from "class-validator"

export class SignupDto {
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(5)
    password: string;

    @IsString()
    username: string;
}

export class SigninDto {
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(5)
    password: string;
}

