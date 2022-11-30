import BoardsList from 'components/boardsList/BoardsList';
import React from 'react';
import './boards.scss';

import { useUser } from '../../hooks/useUser';
import { useTranslation } from 'react-i18next';

export default function Boards(): JSX.Element {
  const { name } = useUser();
  const { t } = useTranslation();
  return (
    <>
      <h2>{t('welcome', { name })}</h2>
      <BoardsList />
    </>
  );
}
