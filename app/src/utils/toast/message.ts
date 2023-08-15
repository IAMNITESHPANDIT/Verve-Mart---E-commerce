import Toast from "react-native-toast-message";

export const ToastOnSuccess = (msg: string) => {
  Toast.show({
    type: "success",
    text1: msg,
  });
  return;
};

export const ToastOnFailure = (msg: string) => {
  Toast.show({
    type: "error",
    text1: msg,
  });
  return;
};
