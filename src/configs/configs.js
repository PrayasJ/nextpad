import configs_overwrite from './configs_overwrite'

var configs = {
  FIREBASE_CONFIG: {
    apiKey: '',
    authDomain: '',
    projectId: '',
    storageBucket: '',
    messagingSenderId: '',
    appId: '',
    measurementId: '',
  },
  CREDENTIAL_FILE: 'credentials.json',
}

try {
  var overwriteConfig = configs_overwrite
  for (var key in overwriteConfig) {
    configs[key] = overwriteConfig[key]
  }
} catch (exception) {
  console.log(
    '[[[[[[[ No Overwrite Configs File Found to overwrite any config key ]]]]]]]]'
  )
}

module.exports = {
  configs,
}
