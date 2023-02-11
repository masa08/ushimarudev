import { ReactNode } from 'react';

const Flex = ({ children }: { children: ReactNode }) => {
  return <div className="flex">{children}</div>;
};

export default Flex;
