import React, { ReactNode } from 'react';

const SideContents = ({ children }: { children: ReactNode }) => {
  return <aside className="w-1/4 p-5">{children}</aside>;
};

export default SideContents;
