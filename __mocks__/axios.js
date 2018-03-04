export default {
  post: jest.fn((url) =>
    url === 'fail'
      ? Promise.reject(new Error('fail'))
      : Promise.resolve({ data: 'plop' })
  )
}
