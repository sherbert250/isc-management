import fs from 'browserify-fs';
import _ from 'lodash';
import defaultEnv from '../../env.default';
import userEnv from '../../env';

//
// Env.js
//

const env = _.assign({}, defaultEnv, userEnv);

export default env;
