module.exports = function(api) {
  api.cache(true);
  return {
    // 'babel-preset-expo' é o conjunto de regras padrão do Expo.
    // Ele já sabe como converter JSX e outras sintaxes do React Native.
    presets: ['babel-preset-expo'],

    // Aqui adicionamos nossas regras customizadas.
    plugins: [
      // IMPORTANTE: Esta é a linha que adiciona a funcionalidade extra
      // que o React Native Reanimated precisa para funcionar corretamente.
      'react-native-reanimated/plugin',
    ],
  };
};