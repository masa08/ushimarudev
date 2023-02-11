import React from 'react';

type Props = {
  title: string;
};

const SidebarTitle: React.FC<Props> = ({ title }) => {
  return (
    <>
      <h2 className="text-xl">{title}</h2>
      <hr className="my-3 border-gray-200 dark:border-gray-700" />
    </>
  );
};
export default SidebarTitle;
