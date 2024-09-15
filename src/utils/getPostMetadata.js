import fs from 'fs'
import matter from 'gray-matter'

export default function getPostMetadata(basePath) {
    const folder = basePath + '/'
    const files = fs.readdirSync(folder)
    const markdownPosts = files.filter(file => file.endsWith('.md'))

    const mappedPosts = markdownPosts.map((filename) => {
        const fileContents = fs.readFileSync(`${basePath}/${filename}`, 'utf8')
        const matterResult = matter(fileContents)
        return {
            title: matterResult.data.title,
            bio: matterResult.data.description,
            date: matterResult.data.date,
            slug: filename.replace('.md', '')
        }
    })
    return mappedPosts.sort((a, b) => new Date(b.date) - new Date(a.date))
}