import { ReactNode } from 'react';

const Container = ({ children }: { children: ReactNode }) => {
  return <div className="md:container md:mx-auto">{children}</div>;
};

export default Container;
