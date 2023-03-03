import productsApi from '@/api/products.api';
import { GetStaticProps } from 'next';
import Search from './items/index';

export const getStaticProps: GetStaticProps = async () => {
  const defaultSearch = 'carros';
  const initialProducts = await productsApi.fetchProducts(defaultSearch);

  return {
    props: {
      initialProducts,
    },
  }
}

export default Search;