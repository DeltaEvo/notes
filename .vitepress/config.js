import fs from 'fs'
import { defineConfig } from 'vitepress'

const notes = fs.readdirSync('.').filter(path => path !== 'index.md' && path.endsWith('.md')).map(path => path.slice(0, -3))

const unsnake = text => text.split('_').map(word => word[0].toUpperCase() + word.slice(1)).join(' ')

export default defineConfig({
  title: "DeltaEvo's Notes",
  themeConfig: {
    sidebar: notes.map(note => ({ text: unsnake(note), link: note }))
  },
  mpa: true
})
