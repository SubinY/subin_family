const fse = require('fs-extra');
try {
  fse.copySync('./src/wemark', './dist/wemark');
  console.log('copy wemark success!')
} catch (err) {
  console.error(err)
}