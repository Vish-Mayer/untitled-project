import { showMessage } from "react-native-flash-message";

const newFlashMessage = (message = "", description = "", type = "") => {
  showMessage({
    message: message,
    description: description,
    type: type
  });
  // showMessage()
};

export default newFlashMessage;
