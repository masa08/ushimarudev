import { ReactNode } from 'react';

const Flex = ({ children }: { children: ReactNode }) => {
  return <div className="md:flex">{children}</div>;
};

export default Flex;
