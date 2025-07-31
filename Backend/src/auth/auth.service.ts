import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/schemas/user.schema'; // Veya senin modelinin yolu neyse ona göre düzelt


@Injectable()
export class AuthService {
    constructor(
        private  readonly userService :UserService,
       

    ){}

    async register (email : string , password : string, name : string){
        const existingUser = await this.userService.findByEmail(email)
        if(existingUser){
            throw new ConflictException('Bu Eposta Zaten Kullanılıyor..!')

        }

        const hashedPassword = await bcrypt.hash(password , 10);
        const user = await this.userService.createUser({
            email,
            password : hashedPassword,
            name,
        })
        return { message : 'Kayıt Başarılı'}
    }


    async login ( email : string , password:string ){
        const user = await this.userService.findByEmail(email);
        if(!user){
            throw new UnauthorizedException('Kullanıcı Bulunamadı')
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if(!passwordMatch){
            throw new UnauthorizedException('Hatalı Şifre')
        }

        return { message : 'Giriş Başarılı',user};
    }
    async getAllUsers(): Promise<{ users: User[] }> {
  const users = await this.userService.getAllUsers();
  return { users };
    }
}
