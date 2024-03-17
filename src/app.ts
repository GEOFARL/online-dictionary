import { serverApplication } from "~/libs/modules/server-application/server-application.js";
import { auth } from "~/modules/auth/auth.js";

serverApplication.initControllers([auth]);
serverApplication.start();
