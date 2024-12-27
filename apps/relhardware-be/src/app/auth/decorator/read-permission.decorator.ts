import { SetMetadata } from '@nestjs/common';

export const ReadPermission = () => SetMetadata('readPermission', true);
