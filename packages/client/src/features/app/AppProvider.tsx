'use client';

import {useStoreDispatch} from '@lib/store/store-hooks';
import {useEffect} from 'react';
import {appMounted} from './app-state';

interface Props {
  children: React.ReactNode;
}

const AppProvider: React.FC<Props> = ({children}) => {
  const dispatch = useStoreDispatch();

  useEffect(() => {
    dispatch(appMounted());
  }, [dispatch]);

  return <>{children}</>;
};

export default AppProvider;
