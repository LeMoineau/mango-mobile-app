// const { getDefaultConfig } = require("expo/metro-config");

// const config = getDefaultConfig(__dirname);
// const path = require("path");

// const extraNodeModules = {
//   "@shared": path.resolve(__dirname + "/../shared/src"),
// };

// const watchFolders = [path.resolve(__dirname + "/../shared/src")];
// const nodeModulesPaths = [path.resolve(path.join(__dirname, "./node_modules"))];

// module.exports = {
//   ...config,
//   transformer: {
//     getTransformOptions: async () => ({
//       transform: {
//         experimentalImportSupport: false,
//         inlineRequires: false,
//       },
//     }),
//   },
//   resolver: {
//     extraNodeModules,
//     nodeModulesPaths,
//   },
//   watchFolders,
// };

const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

// const path = require("path");
// const extraNodeModules = {
//   shared: path.resolve(__dirname + "/../shared/src"),
// };
// const nodeModulesPaths = [path.resolve(path.join(__dirname, "./node_modules"))];

// config.resolver = {
//   extraNodeModules,
//   nodeModulesPaths,
// };

// const watchFolders = [path.resolve(__dirname + "/../shared/src")];

// config.watchFolders = watchFolders;
// config.transformer = {
//   getTransformOptions: async () => ({
//     transform: {
//       experimentalImportSupport: false,
//       inlineRequires: false,
//     },
//   }),
// };

module.exports = config;
