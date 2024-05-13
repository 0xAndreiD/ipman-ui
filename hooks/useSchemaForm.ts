import { joiResolver } from "@hookform/resolvers/joi";
import { Schema } from "joi";
import { FieldValues, useForm, UseFormProps } from "react-hook-form";

export function useSchemaForm<T extends FieldValues>({
  schema,
  ...props
}: UseFormProps<T> & { schema: Schema }) {
  const resolver = joiResolver(schema);

  return useForm({
    ...props,
    resolver,
  });
}
