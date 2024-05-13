import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { toast, ToastContainer, ToastContainerProps } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const toastOpts: ToastContainerProps = {
  pauseOnFocusLoss: false,
  draggable: true,
  pauseOnHover: false,
  theme: "light",
};

export default function ToastNotification() {
  const pathname = usePathname();

  const basePath = pathname.split("/")[1];

  useEffect(() => toast.dismiss(), [basePath]);

  return <ToastContainer {...toastOpts} />;
}
