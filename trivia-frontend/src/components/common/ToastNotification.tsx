import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { hideToast } from "../../features/toast/toastSlice";

const ToastNotification: React.FC = () => {
  const dispatch = useDispatch();
  const { message, type, visible } = useSelector(
    (state: RootState) => state.toast
  );

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        dispatch(hideToast());
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [visible, dispatch]);

  if (!visible) return null;

  return (
    <div
      className={`fixed top-5 left-5 z-50 px-4 py-2 rounded-lg shadow-lg text-white text-sm transition-transform duration-300 ease-in-out ${
        visible ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
      } ${
        type === "success"
          ? "bg-green-500 border-l-4 border-green-700"
          : "bg-red-500 border-l-4 border-red-700"
      }`}
    >
      {message}
    </div>
  );
};

export default ToastNotification;
