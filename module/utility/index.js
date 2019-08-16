const fs = require('fs');
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
  const path = app.pwd + '/config/' + file;
  const pathJSON = path + ".json";
  const pathJS = path + ".js";

  let valid = false;
  [ path, pathJSON, pathJS].forEach(path => {
    //if found then found = path;
    if (!fs.exsistsSync(path)){
      return null;
    }
    valid = path;
  })

  if (!valid) {
    return null;
  }

  if(!fs.lstatSync(valid).isFile()) {
    return null;
  }

  //2b. JSON file exists

  //3. Get the file (use fs)
  var content = fs.readFileSync(valid, 'utf8');

  //4. Parse file (JSON.parse)

  var parsed = JSON.parse(content);

  //5. if there is no key (ie null)
    //return the parsed data

  if (key == null) {
    return parsed;
  }

    // if there is no value (ie null)
    //return the key value in the parsed data

  if (value == null) {
    if (typeof parsed[key] == 'undefined') {
      return null;
    }

    return parsed[key];
  }

  //6. Set the value given the key name

  parsed[key] = value;

  //7. Save back to the config file

  fs.writeFileSync(valid,JSON.stringify(parsed))

  return this;

}
