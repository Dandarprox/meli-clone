import productsApi, { Product } from '@/api/products.api'
import { ProductSearchContext } from '@/components/layouts/Default'
import ProductCard from '@/components/product/ProductCard/ProductCard'
import s from '@/styles/pages/SearchPage.module.scss'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useContext, useEffect, useRef } from 'react'

export default function Search({ initialProducts }: { initialProducts?: Product[]}) {
  const router = useRouter();
  const { products, updatingProducts, setProducts } = useContext(ProductSearchContext);
  const firstTime = useRef(true);

  useEffect(() => {
    if (initialProducts) {
      setProducts(initialProducts);
      return;
    }

    if (!router.isReady) return;
    const { search } = router.query;
    
    if (!search) router.push('/404');
    
    const initializeData = () => {
      productsApi.fetchProducts(search as string)
        .then((results) => {
          setProducts(results);
        })
        .catch(() => setProducts([]))
    }
    
    if (firstTime.current && !updatingProducts) {
      initializeData();
    }
    
    firstTime.current = false;
  }, [initialProducts, router, setProducts, updatingProducts]);
  
  const redirectUrl = (id: Product['item']['id']) => {
    return `/items/${id}`;
  }
  
  return (
    <>
    <Head>
      <title>{initialProducts ? 'Home' : 'Search'}</title>
    </Head>
    <div className={s['product-container']}>
      <ol>
        {products.map((product, productIndex) => (
          <li
            key={product.item.id}
          >
            <ProductCard
              redirectUrl={redirectUrl(product.item.id)}
              withDivider={productIndex !== products.length - 1}
              product={product}
            />
          </li>
        ))}
      </ol>
    </div>
    </>
  )
}

