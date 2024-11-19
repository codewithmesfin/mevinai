'use client';  // This makes it a Client Component

import store from '@/redux/store';
import { Provider } from 'react-redux';


interface ProviderProps {
  children: React.ReactNode;
}

const AppProvider = ({ children }: ProviderProps) => {
  return <Provider store={store}>{children}</Provider>;
};

export default AppProvider;
