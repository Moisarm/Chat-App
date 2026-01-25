import { apiReference } from "@scalar/express-api-reference";
import { scalar_config } from "../../../infrastructure/config/docs/scalar.config";

export const scalar_middleware = apiReference(scalar_config);
