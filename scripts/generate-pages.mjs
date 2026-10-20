import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { resolve } from 'node:path'
import { allPaths, routeMeta } from '../src/data/pages.ts'
const root=resolve('dist')
const template=await readFile(resolve(root,'index.html'),'utf8')
const escape=value=>value.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;')
const origin='https://estruturart-institucional.vercel.app'
function htmlFor(path,meta){
 return template.replace(/<title>[^<]*<\/title>/,`<title>${escape(meta.title)}</title>`)
 .replace(/<meta name="description" content="[^"]*"\s*\/>/,`<meta name="description" content="${escape(meta.description)}" />`)
 .replace('</head>',`  <link rel="canonical" href="${origin+path}" />\n    <meta property="og:type" content="website" />\n    <meta property="og:title" content="${escape(meta.title)}" />\n    <meta property="og:description" content="${escape(meta.description)}" />\n    <meta property="og:url" content="${origin+path}" />\n  </head>`)
}
for(const path of allPaths){
 const directory=resolve(root,path.slice(1))
 await mkdir(directory,{recursive:true})
 await writeFile(resolve(directory,'index.html'),htmlFor(path,routeMeta[path]))
}
await writeFile(resolve(root,'404.html'),htmlFor('/404',{title:'Página não encontrada | Estruturart',description:'Este endereço não está disponível.'}).replace('</head>','<meta name="robots" content="noindex" /></head>'))
await writeFile(resolve(root,'sitemap.xml'),`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${allPaths.map(path=>`<url><loc>${origin+path}</loc></url>`).join('')}</urlset>\n`)
await writeFile(resolve(root,'robots.txt'),`User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`)
console.log(`Generated ${allPaths.length} route documents, 404, sitemap and metadata.`)
