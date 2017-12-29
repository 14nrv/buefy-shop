const getProductsUnderHighPrice = (products, showSale, highprice) =>
  products.filter(({ price, sale }) =>
    showSale
      ? price < highprice && sale
      : price < highprice
  )

export default {
  highprice: ({ highprice }) => highprice,
  showSale: ({ sale }) => sale,
  allProducts: ({ products }) => products,
  products: ({ sale: showSale, products, highprice }) =>
    getProductsUnderHighPrice(products, showSale, highprice)
}
