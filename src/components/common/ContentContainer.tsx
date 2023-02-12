import { ReactNode } from 'react';

const ContentContainer = ({ children }: { children: ReactNode }) => {
  return <div className="md:max-w-4xl mx-auto p-4">{children}</div>;
};

export default ContentContainer;
