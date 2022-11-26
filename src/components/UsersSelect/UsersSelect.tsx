import * as React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { User } from 'types/types';
import { useGetUsersQuery } from 'services/users.api';
import { useAppSelector } from 'store/redux.hooks';
import { selectUser } from 'store/userSlice';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

type UsersSelectProps = {
  selectedUsersId?: string[];
  onUserSelect: (logins: string[]) => void;
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const getUserIdByLogin = (login: string, users: User[]) => {
  return users.find((user) => user.login === login)?._id;
};

export default function UsersSelect({ selectedUsersId = [], onUserSelect }: UsersSelectProps) {
  const { t } = useTranslation();
  const theme = useTheme();
  const { data: users, isSuccess } = useGetUsersQuery('');

  const [personName, setPersonName] = useState<string[]>([]);
  const { id: currentUserId } = useAppSelector(selectUser);

  useEffect(() => {
    if (isSuccess && selectedUsersId.length) {
      const selectedNames = users
        ? selectedUsersId.reduce((acc: string[], id) => {
            const name = users.find(({ _id }) => id === _id)?.name;
            if (name) {
              acc = [...acc, name];
            }
            return acc;
          }, [])
        : [];
      console.log('useEffect');
      setPersonName(selectedNames);
    }
  }, [isSuccess, selectedUsersId, users]);

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    console.log(value);
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );

    if (typeof value === 'string' && users?.length) {
      onUserSelect(value.split(',').map((login) => getUserIdByLogin(login, users)) as string[]);
    } else if (Array.isArray(value) && users?.length) {
      onUserSelect(value.map((login) => getUserIdByLogin(login, users)) as string[]);
    }
  };

  return (
    <div>
      <FormControl sx={{ m: 0, width: 300 }}>
        <InputLabel id="demo-multiple-chip-label">{t('modal.board.share')}</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {users &&
            users.map(({ _id, login }) => {
              if (_id === currentUserId) return null;
              return (
                <MenuItem key={_id} value={login} style={getStyles(_id, personName, theme)}>
                  {login}
                </MenuItem>
              );
            })}
        </Select>
      </FormControl>
    </div>
  );
}
