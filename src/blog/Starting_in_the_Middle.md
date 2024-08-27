---
title: "Starting in the Middle"
description: "It's the first blog post, but it's not the beginning."
date: "August 24, 2024"
---

# Starting in the Middle
# 
<p>Well, maybe not the middle exactly, but this blog -- like seemingly many things in life -- starts somewhere after the beginning.</p> 
  
<p>This is something I've wanted to do for a while, to keep a blog where I can chronicle my journey as a developer and reflect on my work, my growth, the joys and frustrations therein.</p>
  
<p>Barriers to entry weren't many and they were not high. Mainly, I guess, just the question of whether I'd really have anything to say, the wherewithall to say it, and the focus and discipline to sit down once a week or so and reflect and write. All of that remains to be seen.</p>
  
<p>The technical side of constructing the blog was very straightforward. Each blog post is written in the form of a markdown file and stored in the code repository of this site. Nextjs reads the file with the `fs` built-in node library, parses post metadata with [gray-matter](https://www.npmjs.com/package/gray-matter),  and renders the contents to the page using [markdown-to-jsx](https://www.npmjs.com/package/markdown-to-jsx).</p>  

<p>This is my first experience rendering Markup in this way. Styling appears to be minimal, and some of the basic GSM syntax doesn't seem to render as expected on the page, but a blog it is. In the future I will need to dive deeper into the `markdown-to-jsx` library and/or perhaps look into converting to `MDX` with Nextjs for better styling on the page.</p>
  
<p>The quality and quantity of this blog will really come down to whether I make the time regularly to write a post, and whether I have anything to say when I do so.</p>  
  


