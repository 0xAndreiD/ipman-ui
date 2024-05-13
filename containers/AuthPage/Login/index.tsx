"use client";

import LoginIcon from "@mui/icons-material/Login";
import LoadingButton from "@mui/lab/LoadingButton";
import Typography from "@mui/material/Typography";
import Joi from "joi";
import Link from "next/link";
import { Controller, FormProvider } from "react-hook-form";
import { toast } from "react-toastify";

import Container from "@/components/Common/Container";
import FlexBox from "@/components/Common/FlexBox";
import Form from "@/components/Common/Form";
import FormControl from "@/components/Common/FormControl";
import Message from "@/enums/Message";
import { useSchemaForm } from "@/hooks";
import { useRequestLogin } from "@/services/api/requests/auth";
import LoginFormValues from "@/services/api/types/LoginFormValues";
import { useLogin } from "@/store/hooks/auth";

const defaultValues = {
  email: "",
  password: "",
};

function joiMessages() {
  return {
    "string.empty": "is required",
    "string.email": "is invalid",
  };
}

const schema = Joi.object({
  email: Joi.string()
    .required()
    .email({ tlds: { allow: false } }),
  password: Joi.string().required(),
}).messages(joiMessages());

export default function Login() {
  const form = useSchemaForm({
    mode: "onSubmit",
    defaultValues,
    schema,
  });

  const { mutateAsync: requestLogin, isPending } = useRequestLogin();

  const login = useLogin();

  const handleSubmit = form.handleSubmit(
    (values) => requestLogin(values).then(login).catch(toast.error),
    () => toast.error(Message.SomeInvalidFields),
  );

  return (
    <Container className="flex-col items-center py-8">
      <Typography className="font-thin" variant="h3">
        Sign in
      </Typography>

      <FormProvider {...form}>
        <Form
          className="flex flex-col w-72 my-6 bg-white rounded-md border p-4"
          onSubmit={handleSubmit}
          noValidate
        >
          <Controller<LoginFormValues, "email">
            name="email"
            render={({ field, fieldState }) => (
              <FormControl
                className="mb-4"
                color={fieldState.error && "error"}
                label={`Email ${fieldState.error?.message || ""}`}
                autoFocus
                {...field}
              />
            )}
          />

          <Controller<LoginFormValues, "password">
            name="password"
            render={({ field, fieldState }) => (
              <FormControl
                className="mb-6"
                type="password"
                color={fieldState.error && "error"}
                label={`Password ${fieldState.error?.message || ""}`}
                {...field}
              />
            )}
          />

          <LoadingButton
            endIcon={<LoginIcon />}
            loading={isPending}
            type="submit"
            variant="outlined"
          >
            Sign in
          </LoadingButton>
        </Form>
      </FormProvider>

      <FlexBox className="flex justify-center w-72 rounded-md bg-white border p-4 mb-4">
        <Typography className="text-sm text-center">
          New to IPMan?{" "}
          <Link className="text-secondary" href="/auth/register">
            Create an account.
          </Link>
        </Typography>
      </FlexBox>
    </Container>
  );
}
