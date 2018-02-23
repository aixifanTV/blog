module.exports = {
  siteMetadata: {
    title: '少女终末旅行',
    description: '这是一段讲述我成为最强英雄的故事'
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-styled-components',
    {
      resolve: 'gatsby-source-gh-issues',
      options: {
        token: '',
        username: '',
        repository: ''
      }
    }
  ]
}
