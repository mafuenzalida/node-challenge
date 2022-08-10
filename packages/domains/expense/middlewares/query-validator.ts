import joi from 'joi';
import * as validators from '../validators';
import { InternalError, BadRequest } from '@nc/utils/errors';

export default (validatorName: string) => {
    if(!validators.hasOwnProperty(validatorName))
        throw InternalError(`'${validatorName}' validator does not exist`);

    return async (req, res, next) => {
        try {
            const validated = await validators[validatorName].validateAsync(req.query)
            req.query = validated
            next()
        } catch (error) {
            if(error.isJoi) 
                return next(BadRequest(`Error when validating schema. ` + error.message ))
            return next(InternalError(`Error when validating ${validatorName}' schema. ` + error.message ));
        }
    }
}