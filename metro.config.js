const path = require("path");

const extraNodeModules = {
  "@shared": path.resolve(__dirname + "/../shared/src"),
};

const watchFolders = [path.resolve(__dirname + "/../shared/src")];
const nodeModulesPaths = [path.resolve(path.join(__dirname, "./node_modules"))];

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
  resolver: {
    extraNodeModules,
    nodeModulesPaths,
  },
  watchFolders,
};
