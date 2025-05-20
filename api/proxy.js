import { createProxyMiddleware } from 'http-proxy-middleware';

export default createProxyMiddleware({
  target: 'https://shkolaskorochtenija.megapbx.ru',
  changeOrigin: true,
  pathRewrite: { '^/api/proxy': '' },
});