import StoreProvider from '@lib/store/StoreProvider';
import '@lib/styles/globals.css';

interface Props {
  children: React.ReactNode;
}

const RootLayout = ({children}: Props) => {
  return (
    <html lang="en">
      <body>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
};

export default RootLayout;

export const metadata = {
  title: 'DALL·E 2 Clone',
  description: 'DALL·E 2 Clone',
};
