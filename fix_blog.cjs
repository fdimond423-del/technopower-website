const fs = require('fs');
const path = require('path');

const srcPath = './site-clone-pages-blogs/technopower.in.net/blogs/index.html';
const destPath = './blog.html';

if (fs.existsSync(srcPath)) {
    let content = fs.readFileSync(srcPath, 'utf8');
    
    // Fix asset paths
    content = content.replace(/\.\.\/wp-content/g, 'wp-content');
    
    // Fix navigation links
    content = content.replace(/https:\/\/technopower\.in\.net\/about-us\//g, 'about.html');
    content = content.replace(/https:\/\/technopower\.in\.net\/products\//g, 'products.html');
    content = content.replace(/https:\/\/technopower\.in\.net\/applications\//g, 'applications.html');
    content = content.replace(/https:\/\/technopower\.in\.net\/our-projects\//g, 'projects.html');
    content = content.replace(/https:\/\/technopower\.in\.net\/downloads\//g, 'downloads.html');
    content = content.replace(/https:\/\/technopower\.in\.net\/contact-us\//g, 'contact.html');
    content = content.replace(/https:\/\/technopower\.in\.net\/blogs\//g, 'blog.html');
    content = content.replace(/https:\/\/technopower\.in\.net\//g, 'index.html');
    content = content.replace(/https:\/\/technopower\.in\.net/g, 'index.html');
    
    fs.writeFileSync(destPath, content, 'utf8');
    console.log(`Copied and fixed blog.html`);
} else {
    console.log(`Source not found: ${srcPath}`);
}
