'use client';

import {Toaster} from 'react-hot-toast';

interface Props {
  children: React.ReactNode;
}

const ToastProvider = ({children}: Props) => {
  return (
    <>
      <Toaster position="bottom-center" />
      {children}
    </>
  );
};

export default ToastProvider;
