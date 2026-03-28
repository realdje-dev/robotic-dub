const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..');
const htmlFiles = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const defaultOgDescription = "Robotic Dub — Electronic Music Group. Spacecraft Records. 111 titres. Music Producers & DJs Since 1993.";

htmlFiles.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // 1. Swap css/style.css to css/style.min.css
  if (content.includes('href="css/style.css"')) {
    content = content.replace('href="css/style.css"', 'href="css/style.min.css"');
  }

  // 2. Preconnect to fonts if not already there
  if (!content.includes('rel="preconnect"')) {
    const preconnect = `<link rel="preconnect" href="https://fonts.googleapis.com">\n  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n  `;
    content = content.replace('<link rel="stylesheet" href="css/style.min.css">', preconnect + '<link rel="stylesheet" href="css/style.min.css">');
  }

  // 3. Defer script
  // e.g. <script src="js/main.js"></script> -> <script defer src="js/main.min.js"></script>
  content = content.replace(/<script\s+src="js\/([^"]+)\.js"><\/script>/g, '<script defer src="js/$1.min.js"></script>');

  // 4. OpenGraph tags
  if (!content.includes('og:title')) {
    const titleMatch = content.match(/<title>(.*?)<\/title>/);
    const title = titleMatch ? titleMatch[1] : 'Robotic Dub';
    const ogTags = `
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${defaultOgDescription}">
  <meta property="og:image" content="https://roboticdub.com/img/logo-white.svg">
  <meta property="og:type" content="website">
  <meta name="twitter:card" content="summary_large_image">`;
    content = content.replace('</head>', ogTags + '\n</head>');
  }

  // 5. Lazy load images
  // To avoid breaking the hero or logo, we only target images without specific classes 
  // or we can target all but hero/logo.
  // We'll replace '<img ' that doesn't have loading="lazy" but only outside of certain patterns or generically just add it and assume hero is at the top.
  // The simplest is to match /<img (?![^>]*loading="lazy")([^>]+)>/ig and replace it, except if class="logo-img" or "hero-logo".
  content = content.replace(/<img (?![^>]*loading="lazy")([^>]+)>/ig, (match, attrs) => {
    if (attrs.includes('class="logo-img"') || attrs.includes('class="hero-logo"')) {
      return match; // Don't lazy load logos
    }
    return `<img loading="lazy" ${attrs}>`;
  });

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Optimized HTML: ${file}`);
});
