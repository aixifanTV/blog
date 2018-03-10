const crypto = require('crypto')
const axios = require('axios')
const matter = require('gray-matter')
const markdown = require('markdown-it')
const prism = require('markdown-it-prism')
const checkbox = require('markdown-it-task-checkbox')
const emoji = require('markdown-it-emoji')

exports.sourceNodes = async ({ boundActionCreators }, { token, username, repository }) => {
  const { createNode } = boundActionCreators

  const fetch = async (after = '', issues = []) => {
    const { data } = await axios('https://api.github.com/graphql', {
      method: 'post',
      headers: {
        Authorization: `bearer ${token}`
      },
      data: {
        query: `
            {
              repository(owner: "${username}", name: "${repository}") {
                issues(first: 100, states: OPEN, orderBy: {field: CREATED_AT, direction: DESC}${after}) {
                  nodes {
                    number
                    title
                    createdAt
                    body
                    labels(first: 3) {
                      nodes {
                        name
                        color
                      }
                    }
                  }
                  pageInfo {
                    endCursor
                    hasNextPage
                  }
                }
              }
            }
          `
      }
    })

    const { data: { repository: { issues: { nodes, pageInfo } } } } = data
    issues = issues.concat(nodes)
    if (pageInfo.hasNextPage) {
      issues = await fetch(`, after: "${pageInfo.endCursor}"`, issues)
    }
    return issues
  }

  const issues = await fetch()

  issues.forEach(e => {
    const createdAt = new Date(e.createdAt)
    const year = createdAt.getFullYear()
    const month = createdAt.getMonth() + 1
    const date = createdAt.getDate()
    const mdparse = matter(e.body)
    const md2html = markdown()
      .use(prism)
      .use(checkbox)
      .use(emoji)

    e.frontmatter = {
      ...mdparse.data,
      slug: `post/${mdparse.data.slug || e.number}`
    }
    e.createdAt = `${year}-${month}-${date}`
    e.body = md2html.render(mdparse.content)
  })

  createNode({
    nodes: issues,
    id: 'Issues',
    parent: null,
    children: [],
    internal: {
      type: 'issues',
      contentDigest: crypto
        .createHash('md5')
        .update(JSON.stringify(issues))
        .digest('hex')
    }
  })
}
