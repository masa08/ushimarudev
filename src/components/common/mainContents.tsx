import { ReactNode } from 'react';

const MainContents = ({ children }: { children: ReactNode }) => {
  return <main className="w-3/4 p-5">{children}</main>;
};

export default MainContents;
