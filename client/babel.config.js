module.exports = function(api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    env: {
      test: {
        plugins: ["@babel/plugin-transform-runtime"]
      }
    },
    plugins: [
      [
        "module:react-native-dotenv",
        {
          moduleName: "react-native-dotenv"
        }
      ]
    ]
  };
};
