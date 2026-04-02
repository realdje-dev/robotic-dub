const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const dirsToScan = [rootDir, path.join(rootDir, 'fr')];

const defaultOgDescription = "Robotic Dub — Electronic Music Group. Spacecraft Records. 111 titres. Music Producers & DJs Since 1993.";

dirsToScan.forEach(dir => {
  if (!fs.existsSync(dir)) return;
  const isFr = dir.endsWith('/fr');
  const htmlFiles = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

  htmlFiles.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // 1. Swap css/style.css to css/style.min.css
    const cssPath = isFr ? '../css/style.css' : 'css/style.css';
    const cssMinPath = isFr ? '../css/style.min.css' : 'css/style.min.css';
    if (content.includes(`href="${cssPath}"`)) {
      content = content.replace(`href="${cssPath}"`, `href="${cssMinPath}"`);
    }

    // 2. Preconnect to fonts if not already there
    if (!content.includes('rel="preconnect"')) {
      const preconnect = `<link rel="preconnect" href="https://fonts.googleapis.com">\n  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n  `;
      content = content.replace(`<link rel="stylesheet" href="${cssMinPath}">`, preconnect + `<link rel="stylesheet" href="${cssMinPath}">`);
    }

    // 3. Defer script
    if (isFr) {
      content = content.replace(/<script\s+src="\.\.\/js\/([^"]+)\.js"><\/script>/g, '<script defer src="../js/$1.min.js"></script>');
    } else {
      content = content.replace(/<script\s+src="js\/([^"]+)\.js"><\/script>/g, '<script defer src="js/$1.min.js"></script>');
    }

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
    content = content.replace(/<img (?![^>]*loading="lazy")([^>]+)>/ig, (match, attrs) => {
      if (attrs.includes('class="logo-img"') || attrs.includes('class="hero-logo"')) {
        return match; // Don't lazy load logos
      }
      return `<img loading="lazy" ${attrs}>`;
    });

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Optimized HTML: ${isFr ? 'fr/' : ''}${file}`);
  });
});
