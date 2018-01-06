import products from './products.json'

export default {
  sale: false,
  products: process.env.NODE_ENV === 'test' ? products : [],
  highprice: 300
}
