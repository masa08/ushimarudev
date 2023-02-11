import React, { ReactNode } from 'react';

const Container = ({ children }: { children: ReactNode }) => {
  return <div className="xl:container xl:mx-auto">{children}</div>;
};

export default Container;
