import { slug } from '@/helpers'

const getProductsUnderHighPrice = (products, showSale, highprice) =>
  products.filter(({ price, sale }) =>
    showSale
      ? price < highprice && sale
      : price < highprice)

const getProductsByCategory = (products, category) =>
  products.filter(product =>
    category !== 'all'
      ? product.article === category
      : product)

export default {
  highprice: ({ highprice }) => highprice,
  showSale: ({ sale }) => sale,
  allProducts: ({ products }) => products,
  products: ({ sale: showSale, products, highprice, categorySelected }) =>
    getProductsByCategory(getProductsUnderHighPrice(products, showSale, highprice), categorySelected),

  productFromSlugParamRoute: ({ products }) => paramSlug =>
    products.find(({ name }) => slug(name) === paramSlug),

  categories: ({ products }) =>
    ['all', ...new Set(products.map(({ article }) => article))].sort(),
  categorySelected: ({ categorySelected }) => categorySelected
}
