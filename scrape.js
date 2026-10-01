import scrape from 'website-scraper';

const options = {
  urls: [
    'https://technopower.in.net/blogs/'
  ],
  directory: './site-clone-pages-blogs',
  recursive: false,
  maxDepth: 1,
  filenameGenerator: 'bySiteStructure'
};

scrape(options).then((result) => {
    console.log("Entire website was successfully downloaded");
}).catch((err) => {
    console.log("Error downloading website: ", err);
});
