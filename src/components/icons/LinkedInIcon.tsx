import { LinkedIn } from 'iconoir-react';

type Props = {
  className?: string;
};

const LinkedInIcon: React.FC<Props> = (props) => {
  const { className } = props;

  return (
    <a
      href="https://www.linkedin.com/in/masataka-ushijima-a82944119/"
      className={className}
      target="_blank"
      rel="noreferrer"
    >
      <LinkedIn />
    </a>
  );
};
export default LinkedInIcon;
