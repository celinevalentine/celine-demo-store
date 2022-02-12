import Client from 'shopify-buy';
export const client = Client.buildClient({
  storefrontAccessToken: process.env.SHOPIFY_STORE,
  domain: 'celine-demo-shop.myshopify.com',
});
