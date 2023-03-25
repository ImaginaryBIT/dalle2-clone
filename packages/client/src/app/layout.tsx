import StoreProvider from '@lib/store/StoreProvider';
import '@lib/styles/globals.css';
import ToastProvider from './(toast)/ToastProvider';

interface Props {
  children: React.ReactNode;
}

const RootLayout = ({children}: Props) => {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <ToastProvider>{children}</ToastProvider>
        </StoreProvider>
      </body>
    </html>
  );
};

export default RootLayout;

export const metadata = {
  title: 'DALL·E 2 Clone',
  description: 'DALL·E 2 Clone',
};
