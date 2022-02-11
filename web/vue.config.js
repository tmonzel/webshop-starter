const path = require('path');

const multiConfig = {
  shop: {
    pages: {
      index: {
        entry: 'apps/shop/main.ts',
        template: 'apps/shop/public/index.html',
        filename: 'index.html',
      }
    },
  },

  admin: {
    pages: {
      index: {
        entry: 'apps/admin/main.ts',
        template: 'apps/admin/public/index.html',
        filename: 'index.html',
      }
    },
  }
}

const APP_NAME = process.env.APP_NAME ?? 'default';

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@shop': path.resolve(__dirname, 'apps/shop'),
        '@admin': path.resolve(__dirname, 'apps/admin')
      }
    }
  },

  ...multiConfig[APP_NAME]
}