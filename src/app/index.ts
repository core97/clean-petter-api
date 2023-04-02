import 'dotenv/config';

import { initializeServer } from '@shared/infra/server/express-server';
import { setUpDependencies } from '@shared/infra/dependencies/container';

setUpDependencies();

initializeServer();
