"use client";

import RegisterIcon from "@mui/icons-material/PersonAdd";
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
import { useRequestRegister } from "@/services/api/requests/auth";
import RegisterFormValues from "@/services/api/types/RegisterFormValues";

const defaultValues = {
  email: "",
  name: "",
  password: "",
  confirmationPassword: "",
};

type JoiMessageCredentials = {
  min?: number;
};

function joiMessages({ min }: JoiMessageCredentials = {}) {
  return {
    "string.empty": "is required",
    "string.email": "is invalid",
    "string.min": `should be at least ${min} characters`,
    "any.only": "doesn't match",
  };
}

const schema = Joi.object({
  email: Joi.string()
    .required()
    .email({ tlds: { allow: false } }),
  name: Joi.string().required(),
  password: Joi.string().min(8).required(),
  confirmationPassword: Joi.any().valid(Joi.ref("password")),
}).messages(joiMessages({ min: 8 }));

export default function Registration() {
  const form = useSchemaForm({
    mode: "onSubmit",
    defaultValues,
    schema,
  });

  const { mutateAsync: register, isPending } = useRequestRegister();

  const handleSubmit = form.handleSubmit(
    (values) =>
      register(values)
        .then(() => toast.success(Message.UserRegistrationSuccess))
        .catch(toast.error),
    () => toast.error(Message.SomeInvalidFields),
  );

  return (
    <Container className="flex-col items-center py-8">
      <Typography className="font-thin" variant="h3">
        Sign up
      </Typography>

      <FormProvider {...form}>
        <Form
          className="flex flex-col w-72 my-6 bg-white rounded-md border p-4"
          onSubmit={handleSubmit}
          noValidate
        >
          <Controller<RegisterFormValues, "email">
            name="email"
            render={({ field, fieldState }) => (
              <FormControl
                className="mb-2"
                type="email"
                color={fieldState.error && "error"}
                label={`Email ${fieldState.error?.message || ""}`}
                autoFocus
                {...field}
              />
            )}
          />

          <Controller<RegisterFormValues, "name">
            name="name"
            render={({ field, fieldState }) => (
              <FormControl
                className="mb-2"
                color={fieldState.error && "error"}
                label={`Name ${fieldState.error?.message || ""}`}
                {...field}
              />
            )}
          />

          <Controller<RegisterFormValues, "password">
            name="password"
            render={({ field, fieldState }) => (
              <FormControl
                className="mb-2"
                color={fieldState.error && "error"}
                label={`Password ${fieldState.error?.message || ""}`}
                type="password"
                {...field}
              />
            )}
          />

          <Controller<RegisterFormValues, "confirmationPassword">
            name="confirmationPassword"
            render={({ field, fieldState }) => (
              <FormControl
                className="mb-4"
                color={fieldState.error && "error"}
                label={`Confirmation password ${
                  fieldState.error?.message || ""
                }`}
                type="password"
                {...field}
              />
            )}
          />

          <LoadingButton
            endIcon={<RegisterIcon />}
            loading={isPending}
            type="submit"
            variant="outlined"
          >
            Sign up
          </LoadingButton>
        </Form>
      </FormProvider>

      <FlexBox className="flex justify-center w-72 rounded-md bg-white border p-4 mb-4">
        <Typography className="text-sm text-center">
          Already have an account?{" "}
          <Link className="text-secondary" href="/auth/login">
            Sign in.
          </Link>
        </Typography>
      </FlexBox>
    </Container>
  );
}
