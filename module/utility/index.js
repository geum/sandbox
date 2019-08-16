const fs = rqeuire('fs');
const { app } = require('geum');

const cache = {};

/**
 * Should either parse the configuration file
 * - or parse it and return the key give (null if it doesnt exist)
 * - or set the value (if it is not null)
 *
 * ex1. app.config('services') //--> { mysql: { host: '127.0.0.1', user: 'root', name: 'sample'}}
 * ex2. app.config('services', 'mysql') //--> { host: '127.0.0.1', user: 'root', name: 'sample'}
 *
 * ex3. app.config('services', 'mysql', { host: '127.0.0.1', user: 'root', name: 'sample'})
 * where `services` is found in `[PROJECT_PATH]/config/services.json`
 * You can determine project path using app.pwd OR process.env.PWD
 *
 * see: https://github.com/CradlePHP/Cradle/blob/master/bootstrap/paths.php#L55-L116
 *
 * @param {String} file - the name or path of the config file in the
 *                       `/config` directory
 * @param {String} [key = null] - the name of the key to return, if any
 * @param {*} - [value = null] - the arbitrary value, if any
 *
 * @return {Application}
 */
app.config = (file, key = null, value = null) => {
  //1. Form the absolute path
  //2. Check to see if the path exists
  //2a.if it doesnt exist (use fs)
    //return null
  //2b. it does exist
  //3. Get the file (use fs)
  //4. Parse file (JSON.parse)
  //5. if there is no key (ie null)
    //return the parsed data
  //5a. There is a key...
  // if there is no value (ie null)
    //return the key value in the parsed data
  //6. Set the value given the key name
  //7. Save back to the config file
  //8. return this
  return this;
}
