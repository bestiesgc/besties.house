const autoprefixer = require('autoprefixer')
const scrollbar = require('postcss-scrollbar')
const apply = require('postcss-class-apply/dist/index')

const config = {
	plugins: [apply, scrollbar, autoprefixer]
}

module.exports = config
