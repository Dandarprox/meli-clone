/* eslint-disable @next/next/no-img-element */
import productsApi, { Product } from "@/api/products.api";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import s from "@/styles/pages/ProductDetailPage.module.scss";
import BreadCrumb from "@/components/ui/Breadcrum";
import Image from "next/image";
import cn from "clsx";
import { formatPrice, mapCondition } from "@/components/product/ProductCard/ProductCard.constants";



export default function ProductDetail() {
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const imageAlt = product?.item.title || 'Imagen del producto';
  
  useEffect(() => {
    if (!router.isReady) return;

    const fetchProductDetail = async () => {
      const productDetail = await productsApi.fetchProductDetail(router.query.id as string);
      setProduct(productDetail);
    }
    
    fetchProductDetail();
  }, [router.isReady, router.query.id]);
  
  const imageClass = cn(s.image, {
    [s['image--loading']]: !product?.item.picture
  })

  return (
    <div className={s.root}>
      {
        product?.item.category_path && (
          <BreadCrumb 
            path={product.item.category_path as NonNullable<Product['item']['category_path']>
          }/>
        )
      }

      <div className={s['main-content']}>
        <div className={imageClass}>
          {
            product?.item.picture && (
            <img
              src={product?.item.picture!}
              alt={imageAlt}
              loading="lazy"
              style={{ 
                objectFit: 'contain',
                width: '100%',
                height: '100%'
              }}
            />
            )
          }
        </div>
        <div className={s['product-details']}>
          <span>
            {mapCondition(product?.item.condition)} - {product?.item.sold_quantity} vendidos
          </span>
          
          <h2 className={s.title}>
            {product?.item.title}
          </h2>
          <span className={s.price}>
            {formatPrice(product?.item.price.amount)}
            
            <span className={s['price-decimals']}>00</span>
          </span>
          
          <button
            type="button"
            className={s.button}
          >
            Comprar
          </button>
        </div>
      </div>
      
      <div className={s['description-title']}>
        <h3>Descripción del producto</h3>
        <p className={s.description}>
          {product?.item.description}
        </p>
      </div>
    </div>
  );
}