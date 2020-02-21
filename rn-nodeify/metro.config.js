/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */
const extraNodeModules = require('node-libs-react-native');

module.exports = {

  resolver: {
    extraNodeModules: {
      ...extraNodeModules,
      vm: require.resolve('vm-browserify'),
      fs: require.resolve('react-native-level-fs'),
      randombytes: require.resolve('react-native-randombytes'),
      dns: require.resolve('dns.js')
    },
    resolverMainFields: ["react-native", "main", "browser"]
  },
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
};
