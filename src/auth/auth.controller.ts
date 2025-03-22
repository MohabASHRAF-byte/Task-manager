import {
  Body,
  Controller,
  HttpCode,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthGuard } from '@nestjs/passport';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/signup')
  async SignUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return await this.authService.SignUp(authCredentialsDto);
  }
  @Post('/signin')
  @HttpCode(200)
  async SignIn(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accesstoken: string }> {
    return await this.authService.SignIn(authCredentialsDto);
  }
}
