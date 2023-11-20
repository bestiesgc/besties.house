const autoprefixer = require('autoprefixer')
const scrollbar = require('postcss-scrollbar')
const nesting = require('postcss-nesting')

const config = {
	plugins: [scrollbar, nesting, autoprefixer]
}

module.exports = config
