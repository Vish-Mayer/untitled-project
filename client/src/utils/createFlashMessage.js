import { showMessage } from "react-native-flash-message";

export const createFlashMessage = ({ message, description, type }) => {
  showMessage({
    message: message,
    description: description,
    type: type
  });
};
