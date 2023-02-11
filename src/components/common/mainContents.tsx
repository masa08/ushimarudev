import { ReactNode } from 'react';

const MainContents = ({ children }: { children: ReactNode }) => {
  return <section className="md:w-3/4 p-5">{children}</section>;
};

export default MainContents;
