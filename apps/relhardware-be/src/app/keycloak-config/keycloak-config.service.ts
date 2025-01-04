import { Injectable } from '@nestjs/common';
import {
  KeycloakConnectOptions,
  KeycloakConnectOptionsFactory,
  PolicyEnforcementMode,
  TokenValidation,
} from 'nest-keycloak-connect';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class KeycloakConfigService implements KeycloakConnectOptionsFactory {
  constructor(private configService: ConfigService) {}

  createKeycloakConnectOptions(): KeycloakConnectOptions {
    return {
      authServerUrl: this.configService.getOrThrow<string>(
        'KEYCLOAK_SERVER_URL'
      ),
      realm: this.configService.getOrThrow<string>('KEYCLOAK_SERVER_REALM'),
      clientId: this.configService.getOrThrow<string>(
        'KEYCLOAK_SERVER_CLIENT_ID'
      ),
      secret: this.configService.getOrThrow<string>('KEYCLOAK_SERVER_SECRET'),
      policyEnforcement: PolicyEnforcementMode.PERMISSIVE,
      tokenValidation: TokenValidation.ONLINE,
    };
  }
}
