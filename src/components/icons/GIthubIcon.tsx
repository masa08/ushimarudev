import { GitHub } from 'iconoir-react';

type Props = {
  className?: string;
};

const GithubIcon: React.FC<Props> = (props) => {
  const { className } = props;

  return (
    <a
      href="https://github.com/masa08"
      className={className}
      target="_blank"
      rel="noreferrer"
    >
      <GitHub />
    </a>
  );
};
export default GithubIcon;
