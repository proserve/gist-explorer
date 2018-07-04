module.exports = {
  "extends": "airbnb",
  "parser": "babel-eslint",
  "ecmaFeatures": {
    "classes": true
  },
  "globals": {
    "FormData": true,
    "fetch": true,
    "window": true,
    "Math": true,
    "__DEV__": true,
    "alert": true,
    "navigator": true,
    "document": true,
  },
  "rules": {
    "react/jsx-filename-extension": ["error", { "extensions": [".js", ".jsx"] }],
    "react/prefer-stateless-function": "off",
    "react/jsx-one-expression-per-line": "off",
    "jsx-a11y/no-static-element-interactions": "off",
    "jsx-a11y/click-events-have-key-events": "off"
  }
};