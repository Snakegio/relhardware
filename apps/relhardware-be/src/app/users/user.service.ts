import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import KeycloakAdminClient from '@keycloak/keycloak-admin-client';
import { UserResponseDto } from './dto/user-response.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UserService {
  kcAdminClient: KeycloakAdminClient;
  realm: string;

  constructor(private configService: ConfigService) {
    this.initAdmin();
    this.realm = this.configService.getOrThrow('KEYCLOAK_SERVER_REALM');
  }

  private dynamicKeycloakImport = async () =>
    new Function("return import('@keycloak/keycloak-admin-client')")();

  private async initAdmin() {
    const KCadmCli = (await this.dynamicKeycloakImport()).default;
    this.kcAdminClient = new KCadmCli({
      baseUrl: this.configService.getOrThrow<string>('KEYCLOAK_SERVER_URL'),
      realmName: this.configService.getOrThrow<string>(
        'KEYCLOAK_SERVER_ADMIN_REALM'
      ),
    });
    await this.kcAdminClient.auth({
      username: this.configService.getOrThrow<string>(
        'KEYCLOAK_SERVER_ADMIN_USERNAME'
      ),
      password: this.configService.getOrThrow<string>(
        'KEYCLOAK_SERVER_ADMIN_PASSWORD'
      ),
      clientId: this.configService.getOrThrow<string>(
        'KEYCLOAK_SERVER_ADMIN_CLIENT_ID'
      ),
      grantType: 'password',
    });
  }

  async getUsers(): Promise<UserResponseDto[]> {
    const users = await this.kcAdminClient.users.find({ realm: this.realm });
    return plainToInstance(UserResponseDto, users);
  }

  async findById(userId: string) {
    const user = await this.kcAdminClient.users.findOne({
      id: userId,
      userProfileMetadata: true,
      realm: this.realm,
    });
    return plainToInstance(UserResponseDto, user);
  }
}
