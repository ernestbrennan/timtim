const mix = require('laravel-mix');
const config = require('./webpack.config');

mix.webpackConfig(config);

mix.react('resources/js/app/index.js', 'public/js/app')
 .sass('resources/sass/app/app.scss', 'public/css/app');
//
// mix.react('resources/js/admin/index.js', 'public/js/admin')
//   .sass('resources/sass/admin/app.scss', 'public/css/admin')

if (!mix.inProduction()) {
  mix.sourceMaps()
    .webpackConfig({
      devtool: 'cheap-eval-source-map' // Fastest for development
    });
}

mix.version()
