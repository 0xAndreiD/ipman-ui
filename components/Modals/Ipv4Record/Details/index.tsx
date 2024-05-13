import { joiResolver } from "@hookform/resolvers/joi";
import SaveIcon from "@mui/icons-material/SaveRounded";
import LoadingButton from "@mui/lab/LoadingButton";
import Button from "@mui/material/Button";
import Joi from "joi";
import { forwardRef, useEffect } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";

import FlexBox from "@/components/Common/FlexBox";
import Form from "@/components/Common/Form";
import FormControl from "@/components/Common/FormControl";
import ModalWrapper from "@/components/Modals/ModalWrapper";
import Message from "@/enums/Message";
import {
  useCreateIpv4,
  useIpv4,
  useUpdateIpv4,
} from "@/services/api/requests/ipv4";
import { useHideModal } from "@/store/hooks/modal";
import { ModalPayload } from "@/store/types/modal";
import { Ipv4Descriptor } from "@/types/Ipv4Descriptor";

const defaultValues = {
  ipv4: "",
  comment: "",
};

function joiMessages() {
  return {
    "string.empty": "is required",
    "string.ip": "is invalid",
  };
}

const schema = Joi.object({
  ipv4: Joi.string().required().ip({ version: "ipv4" }),
  comment: Joi.string().required(),
}).messages(joiMessages());

export default forwardRef<HTMLInputElement, ModalPayload>(
  function Ipv4RecordAddModal(props, ref) {
    const { id } = props || {};

    const form = useForm({
      mode: "onSubmit",
      defaultValues,
      resolver: joiResolver(schema),
    });

    const { data: record } = useIpv4(id);

    const hasModified = record?.comment !== form.watch("comment");

    useEffect(
      () => {
        if (record) {
          form.setValue("ipv4", record.ipv4);
          form.setValue("comment", record.comment);
        }
      }, // eslint-disable-next-line react-hooks/exhaustive-deps
      [record],
    );

    const hideModal = useHideModal();

    const { mutateAsync: updateIpv4Record, isPending } = useUpdateIpv4(id);

    const handleSubmit = form.handleSubmit(
      (values) => {
        updateIpv4Record(values)
          .then(() => {
            toast.success(Message.Ipv4RecordUpdateSuccess);
            hideModal();
          })
          .catch(toast.error);
      },
      () => toast.error(Message.SomeInvalidFields),
    );

    return (
      <ModalWrapper ref={ref} title="Edit IPv4 Record">
        <FormProvider {...form}>
          <Form
            className="flex flex-col w-full my-4 gap-2"
            onSubmit={handleSubmit}
            noValidate
          >
            <Controller<Ipv4Descriptor, "ipv4">
              name="ipv4"
              render={({ field, fieldState }) => (
                <FormControl
                  placeholder="142.251.40.206"
                  readOnly
                  color={fieldState.error && "error"}
                  label={`IPv4 Address ${fieldState.error?.message || ""}`}
                  {...field}
                />
              )}
            />

            <Controller<Ipv4Descriptor, "comment">
              name="comment"
              render={({ field, fieldState }) => (
                <FormControl
                  placeholder="Google"
                  autoFocus
                  color={fieldState.error && "error"}
                  label={`Comment ${fieldState.error?.message || ""}`}
                  {...field}
                />
              )}
            />

            <FlexBox className="justify-end gap-2 mt-2">
              <LoadingButton
                className="text-sm shadow-none px-4"
                variant="contained"
                type="submit"
                disabled={!hasModified}
                loading={isPending}
                startIcon={<SaveIcon />}
              >
                Save
              </LoadingButton>
              <Button
                className="text-sm text-body bg-gray-200 hover:bg-gray-300 px-4"
                onClick={hideModal}
              >
                Cancel
              </Button>
            </FlexBox>
          </Form>
        </FormProvider>
      </ModalWrapper>
    );
  },
);
