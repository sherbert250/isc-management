import _ from 'lodash';
import defaultEnv from '../../env.default';
import userEnv from '../../env';

//
// Env.js
//

const env = (userEnv) ? _.assign({}, defaultEnv, userEnv) : defaultEnv;

export default env;
