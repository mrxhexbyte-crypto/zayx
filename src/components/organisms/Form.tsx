'use client';

import React, { createContext, useContext } from 'react';
import { VStack, HStack } from '@/components/primitives';
import { Input } from '@/components/molecules';
import { Button } from '@/components/molecules';
import { FieldValues, FormProvider, useForm, useFormContext, Controller } from 'react-hook-form';

/**
 * Form Context for field management
 */
interface FormContextType {
  error?: boolean;
}

const FormContext = createContext<FormContextType>({});

/**
 * Form Component
 * Wrapper around react-hook-form FormProvider
 */
interface FormProps<T extends FieldValues = FieldValues> {
  onSubmit: (data: T) => void;
  defaultValues?: Partial<T>;
  children: React.ReactNode;
  className?: string;
  layout?: 'vertical' | 'horizontal' | 'inline';
}

export const Form = React.forwardRef<
  HTMLFormElement,
  FormProps
>(
  (
    {
      onSubmit,
      defaultValues,
      children,
      className,
      layout = 'vertical',
    },
    ref
  ) => {
    const methods = useForm({ defaultValues });

    return (
      <FormProvider {...methods}>
        <FormContext.Provider value={{}}>
          <form
            ref={ref}
            onSubmit={methods.handleSubmit(onSubmit)}
            className={className}
          >
            <div
              className={
                layout === 'horizontal'
                  ? 'grid gap-6'
                  : layout === 'inline'
                    ? 'flex gap-4 items-end'
                    : 'space-y-6'
              }
            >
              {children}
            </div>
          </form>
        </FormContext.Provider>
      </FormProvider>
    );
  }
);

Form.displayName = 'Form';

/**
 * Form Field Component
 * Automatically handles validation and error display
 */
interface FormFieldProps {
  name: string;
  label?: React.ReactNode;
  description?: React.ReactNode;
  placeholder?: string;
  type?: string;
  required?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  validate?: (value: any) => boolean | string;
<<<<<<< HEAD
  render?: (props: any) => React.ReactNode;
=======
  render?: (props: any) => React.ReactElement;
>>>>>>> 1770abf (Update package.json and improve text formatting across multiple components)
}

export const FormField: React.FC<FormFieldProps> = ({
  name,
  label,
  description,
  placeholder,
  type = 'text',
  required,
  disabled,
  icon,
  validate,
  render,
}) => {
  const { control, formState: { errors } } = useFormContext();
  const error = errors[name];

  return (
    <Controller
      control={control}
      name={name}
      rules={{
        required: required ? `${label || name} is required` : false,
        validate,
      }}
      render={({ field }) => (
        render ? (
          render(field)
        ) : (
          <Input
            {...field}
            label={label}
            description={description}
            placeholder={placeholder}
            type={type}
            disabled={disabled}
            icon={icon}
            error={error?.message as string | undefined}
            state={error ? 'error' : 'default'}
          />
        )
      )}
    />
  );
};

/**
 * Form Group
 * Group multiple fields together
 */
interface FormGroupProps {
  title?: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode;
  columns?: number;
}

export const FormGroup: React.FC<FormGroupProps> = ({
  title,
  description,
  children,
  columns = 1,
}) => (
  <VStack gap="md">
    {title && <h3 className="text-lg font-semibold">{title}</h3>}
    {description && <p className="text-sm text-slate-600 dark:text-slate-400">{description}</p>}
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: '1.5rem',
      }}
    >
      {children}
    </div>
  </VStack>
);

/**
 * Form Actions
 * Button group for form submission/reset
 */
interface FormActionsProps {
  onSubmit?: () => void;
  onCancel?: () => void;
  submitText?: string;
  cancelText?: string;
  loading?: boolean;
  align?: 'left' | 'center' | 'right';
}

export const FormActions: React.FC<FormActionsProps> = ({
  submitText = 'Submit',
  cancelText = 'Cancel',
  loading = false,
  align = 'left',
}) => {
  const alignMap = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end',
  };

  return (
    <HStack gap="md" className={`justify-${align}`}>
      <Button type="submit" loading={loading}>
        {submitText}
      </Button>
      <Button variant="ghost" type="reset">
        {cancelText}
      </Button>
    </HStack>
  );
};
