import { ProductItemDto, ProductResponseDto } from '../dto/product-response.dto';
import { AUTHOR_LASTNAME, AUTHOR_NAME } from '../../constants/api';
import productRepository from '../repository/product.repository';
import { AuthorDto } from '../dto/author.dto';

enum ImageType {
  THUMBNAIL = 'thumbnail',
  ORIGINAL = 'original',
}

function parseProductResponseDto(data: Record<string, unknown>, imageType: ImageType = ImageType.THUMBNAIL): ProductResponseDto {
  const options = {
    picture: data.thumbnail,
  };

  if (imageType === ImageType.ORIGINAL) {
    const pictures = (data as { pictures: Record<string, unknown>[] }).pictures;
    const picture = pictures?.length ? pictures[0].url : null;

    options.picture = picture;
  }

  return {
    author: AuthorDto.parse({ name: AUTHOR_NAME, lastname: AUTHOR_LASTNAME }),
    item: ProductItemDto.parse({
      ...data,
      price: ProductItemDto.shape.price.parse({
        currency: data.currency_id,
        amount: data.price,
        decimals: 0,
      }),
      picture: options.picture,
      free_shipping: (data.shipping as Record<string, unknown>).free_shipping,
      sold_quantity: data.sold_quantity,
      description: data.title,
      category_path: data?.category_path,
    }),
  };
};

export default {
  async listProducts(query: string, limit: number): Promise<ProductResponseDto[]> {
    const products = await productRepository.getProducts(query, limit) as Record<string, unknown>[];

    return products.map((result) => parseProductResponseDto(result));
  },

  async getProductDetail(id: string): Promise<ProductResponseDto> {
    const [product, description] = await Promise.all([
      productRepository.getProductDetail(id),
      productRepository.getProductDescription(id),
    ]);

    const { path_from_root: category_path } = await productRepository.getProductCategory(
      (product as { category_id: string }).category_id
    ) as Record<string, unknown>;

    return parseProductResponseDto({
      ...product as Record<string, unknown>,
      description,
      category_path,
    }, ImageType.ORIGINAL);
  }
}