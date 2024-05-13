import Modal from "@mui/material/Modal";
import { FC, Fragment } from "react";

import Ipv4RecordAddModal from "@/components/Modals/Ipv4Record/Add";
import Ipv4RecordDetailsModal from "@/components/Modals/Ipv4Record/Details";
import {
  useHideModal,
  useModalPayload,
  useModalType,
} from "@/store/hooks/modal";
import { ModalType } from "@/store/types/modal";

export default function ModalDialog() {
  const modalType = useModalType();
  const modalPayload = useModalPayload();
  const hideModal = useHideModal();

  const Content: FC<any> = {
    [ModalType.None]: Fragment,
    [ModalType.Ipv4RecordAdd]: Ipv4RecordAddModal,
    [ModalType.Ipv4RecordDetails]: Ipv4RecordDetailsModal,
  }[modalType];

  return (
    <Modal open={!!modalType} onClose={hideModal}>
      <Content {...modalPayload} />
    </Modal>
  );
}
