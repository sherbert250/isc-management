import fs from 'browserify-fs';
import _ from 'lodash';
import defaultEnv from '../../env.default';

//
// Env.js
//

// if user env exists, load it
let userEnv;
try {
  userEnv = require('../../env.js');
  console.log(userEnv); 
} catch (ex) {
  console.log(ex);
}
// fs.exists(fileName, exists => {
//   if (exists) {
//     userEnv = require('../../env');
//     console.log(`${fileName} exists`);
//   } else {
//     console.log(`${fileName} does not exist`);
//   }
// });

const env = (userEnv) ? _.assign({}, defaultEnv, userEnv) : defaultEnv;

export default env;
