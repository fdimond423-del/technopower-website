const fs = require('fs');
const path = require('path');

const srcDir = './site-clone-pages/technopower.in.net';
const destDir = '.';

const pages = [
    { src: 'about-us/index.html', dest: 'about.html' },
    { src: 'products/index.html', dest: 'products.html' },
    { src: 'applications/index.html', dest: 'applications.html' },
    { src: 'our-projects/index.html', dest: 'projects.html' },
    { src: 'downloads/index.html', dest: 'downloads.html' },
    { src: 'contact-us/index.html', dest: 'contact.html' }
];

for (const page of pages) {
    const srcPath = path.join(srcDir, page.src);
    const destPath = path.join(destDir, page.dest);
    
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
        content = content.replace(/https:\/\/technopower\.in\.net\//g, 'index.html');
        content = content.replace(/https:\/\/technopower\.in\.net/g, 'index.html');
        
        fs.writeFileSync(destPath, content, 'utf8');
        console.log(`Copied and fixed ${page.dest}`);
    } else {
        console.log(`Source not found: ${srcPath}`);
    }
}
