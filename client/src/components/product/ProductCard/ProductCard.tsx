import { Product } from '@/api/products.api';
import Image from 'next/image'
import Card, { CardProps } from '../../ui/Card'
import s from './ProductCard.module.scss';
import cn from 'clsx';
import Link from 'next/link';
import { formatPrice, mapCondition } from './ProductCard.constants';

export interface ProductCardProps extends CardProps {
  product: Product;
  redirectUrl: string;
  withDivider?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, withDivider, redirectUrl, className, ...rest }) => {
  return (
    <Card 
      className={cn(s.root, className)} {...rest}>
      <div className={s.thumbnail}>
        <Link href={redirectUrl}>
          <Image
            src={product.item.picture}
            alt={product.item.title}
            fill
            style={{
              objectFit: 'contain',
            }}
          />
        </Link>
      </div>
      
      <div className={s.content}>
        <span className={s.price}>
          {formatPrice(product.item.price.amount)}
          
          {product.item.free_shipping && (
            <span className={s['free-shipping']}>
              Envío gratis
            </span>
          )}
        </span>
        
        <p className={s.title}>
          <Link href={redirectUrl}>
            {product.item.title}
          </Link>
        </p>
      </div>
      
      <span className={s.condition}>
        {mapCondition(product.item.condition)}
      </span>
      {withDivider && <hr className={s.divider} />}
    </Card>
  )
}

ProductCard.displayName = 'ProductCard';

export default ProductCard;