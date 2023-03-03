import productsApi, { Product } from '@/api/products.api';
import Searchbar from '@/components/ui/Searchbar';
import { Callback } from '@/types/utils';
import { useRouter } from 'next/router';
import { createContext, KeyboardEvent, ReactNode, useCallback, useEffect, useState } from 'react';
import Header from '../../ui/Header';
import s from './DefaultLayout.module.scss';

export const ProductSearchContext = createContext({
  products: [] as Product[],
  setProducts: (products: Product[]) => {},
  updatingProducts: false,
});

export default function DefaultLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { search: searchQuery } = router.query;
  const singleQuery = Array.isArray(searchQuery) ? searchQuery[0] : searchQuery;

  const [search, setSearch] = useState(singleQuery ?? '');
  const [products, setProducts] = useState<Product[]>([]);
  const [updatingProducts, setUpdatingProducts] = useState(false);
  
  const wrapUpdate = (calback: Callback) => {
    return async () => {
      try {
        setUpdatingProducts(true);
        await calback();
      } finally {
        setUpdatingProducts(false);
      }
    }
  }

  const fetchProducts = wrapUpdate(async () => {
    if (!search) return;

    const results = await productsApi
      .fetchProducts(search)

    if (!results) return;

    setProducts(results);
  });
  
  const handleSearch = async (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter' || search === '') {
      return;
    }
    
    if (router.route === '/items') {
      router.push({ query: { search } }, undefined, { shallow: true });
    } else {
      router.push(`/items?search=${search}`);
    }
    
    fetchProducts().catch(() => setProducts([]));
  }
  
  useEffect(() => {
    if (!router.isReady) return;
    
    if (router.route === '/') {
      setSearch('');
      fetchProducts().catch(() => setProducts([]));
    }
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  return (
    <ProductSearchContext.Provider value={{ products, setProducts, updatingProducts }}>
      <>
        <Header>
          <div className={s['searchbar-container']}>
            <Searchbar
              className={s.searchbar}
              label='Ingresa tu búsqueda'
              placeholder='Nunca dejes de buscar'
              maxLength={120}
              value={search}
              onKeyDown={handleSearch}
              onChange={(event) => setSearch(event.target.value)} />
          </div>
        </Header>

        <div className={s.content}>
          {children}
        </div>
      </>
    </ProductSearchContext.Provider>
  );
}