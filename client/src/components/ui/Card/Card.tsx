import cn from 'clsx';
import s from './Card.module.scss';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

const Card: React.FC<CardProps> = ({ children, className, ...rest }) => {
  return (
    <div className={cn(s.root, className)} {...rest}>
      {children}
    </div>
  );
};

Card.displayName = 'Card';

export default Card;