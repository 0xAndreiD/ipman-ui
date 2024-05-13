import { CaseReducer, PayloadAction } from "@reduxjs/toolkit";

export enum ModalType {
  None,
  Ipv4RecordAdd,
  Ipv4RecordDetails,
}

export type ModalPayload = { id?: number } | undefined;

export type ModalState = {
  type: ModalType;
  payload?: ModalPayload;
};

type ModalCaseReducer<T = void> = CaseReducer<ModalState, PayloadAction<T>>;

export type ModalCaseReducers = {
  showModal: ModalCaseReducer<ModalState>;
  hideModal: ModalCaseReducer;
};
