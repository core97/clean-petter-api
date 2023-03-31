import { config } from 'dotenv';
import { initializeServer } from '@shared/infra/server/express-server';
import { setUpDependencies } from '@shared/infra/dependencies/container';

config();

setUpDependencies();

initializeServer();
