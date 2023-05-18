import { Module } from '@nestjs/common';
import { UserModule } from 'src/common/modules';
import { AuthProvider } from 'src/common/providers';
import { AuthController } from 'src/common/controllers';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [AuthProvider],
  exports: [AuthProvider],
})
export class AuthModule {}
