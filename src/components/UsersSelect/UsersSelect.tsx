import React from 'react';
import Select, { MultiValue } from 'react-select';
import { users } from 'mocks/mocks';
import './UsersSelect.scss';

const UsersSelect = ({ onUserSelect }: { onUserSelect: (usersId: string[]) => void }) => {
  const options = users.map(({ _id, name }) => {
    return { value: _id, label: name };
  });

  const onChange = (
    arr: MultiValue<{
      value: string;
      label: string;
    }>
  ) => {
    onUserSelect(arr.map(({ value }) => value));
  };

  return (
    <Select
      options={options}
      isMulti
      isSearchable={true}
      closeMenuOnSelect={false}
      placeholder={'Share with'}
      noOptionsMessage={() => 'no users'}
      onChange={(arr) => onChange(arr)}
      className="users-select"
    />
  );
};

export default UsersSelect;
