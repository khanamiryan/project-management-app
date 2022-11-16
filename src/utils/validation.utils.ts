// UseControllerProps<TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>
// : Omit<
// RegisterOptions<TFieldValues, TName>,
// 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
// >

export const rules = {
  login: {
    required: 'form.errors.noLogin',
    minLength: {
      value: 3,
      message: 'form.errors.shortLogin',
    },
  },
  password: {
    required: 'form.errors.noPassword',
    minLength: {
      value: 3,
      message: 'form.errors.shortPassword',
    },
  },
  name: {
    required: 'form.errors.noName',
    minLength: {
      value: 3,
      message: 'form.errors.shortName',
    },
  },
};
