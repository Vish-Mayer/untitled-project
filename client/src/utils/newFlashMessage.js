import { showMessage } from "react-native-flash-message";

const newFlashMessage = (message = "", description = "", type = "") => {
  showMessage({
    message: message,
    description: description,
    type: type
  });
};

export default newFlashMessage;
