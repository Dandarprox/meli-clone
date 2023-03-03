import cn from 'clsx';
import { HTMLAttributes } from 'react';
import s from './Breadcrumb.module.scss';

export interface BreadCrumbProps extends HTMLAttributes<HTMLDivElement> {
  path: {
    name: string;
    id?: string;
  }[]
}

export const BreadCrumb: React.FC<BreadCrumbProps> = ({ className,path, ...rest }) => {  
  return (
    <nav className={cn(s.root, className)} {...rest}>
      {
        path.map((pathItem, pathIndex) => (
          <span key={pathItem.id}>
            <span>
              {pathItem.name}
            </span>
            {pathIndex !== path.length - 1 &&  (
              <span className={s.divider}>
                {'>'}
              </span>
            ) }
          </span>
        ))
      }
    </nav>
  );
}; 

BreadCrumb.displayName = 'BreadCrumb';

export default BreadCrumb;
