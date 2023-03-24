'use client';

import {Provider} from 'react-redux';
import {store} from '.';

interface Props {
  children: React.ReactNode;
}

const StoreProvider = ({children}: Props) => {
  return <Provider store={store}>{children}</Provider>;
};

export default StoreProvider;
