import * as React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { decodedToken, useGetUsersQuery } from 'services/api';
import { User } from 'types/types';
// import { users } from 'mocks/mocks';

type UsersSelectProps = { onUserSelect: (logins: string[]) => void };

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

export default function UsersSelect({ onUserSelect }: UsersSelectProps) {
  const theme = useTheme();
  const [personName, setPersonName] = React.useState<string[]>([]);
  const { data: users } = useGetUsersQuery('');

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
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
        <InputLabel id="demo-multiple-chip-label">Share</InputLabel>
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
              //TODO apply value from state for this
              if (_id === decodedToken.id) return null;
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
