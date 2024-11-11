import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
    DATABASE_URI: string;
}

const envsSchema = joi.object({
    DATABASE_URI: joi.string().required(),
})
.unknown();

const {error, value} = envsSchema.validate(process.env);

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

const envsVars: EnvVars = value;

export const envs = {
    databaseUri: envsVars.DATABASE_URI,
}