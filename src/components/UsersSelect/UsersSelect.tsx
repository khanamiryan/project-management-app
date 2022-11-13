import React from 'react';
import Select, { MultiValue } from 'react-select';
import './UsersSelect.scss';

const options = [
  { value: '123', label: 'Chocolate' },
  { value: '456', label: 'Strawberry' },
  { value: '789', label: 'Vanilla' },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const UsersSelect = ({ onUserSelect }: { onUserSelect: (usersId: string[]) => void }) => {
  const onChange = (
    value: MultiValue<{
      value: string;
      label: string;
    }>
  ) => {
    onUserSelect(value.reduce((acc: string[], current) => [...acc, current.value], []));
  };
  return (
    <Select
      options={options}
      isMulti
      onChange={(value) => onChange(value)}
      className="users-select"
    />
  );
};

export default UsersSelect;
