const fs = require('fs');
const path = require('path');

const files = [
  'pages/ai.js',
  'pages/resources.js', 
  'pages/portfolio.js',
  'pages/articles.js',
  'pages/about.js'
];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  // Add Footer import if not present
  if (!content.includes('import Footer from')) {
    const importIndex = content.indexOf('import Header from');
    if (importIndex !== -1) {
      const headerImportLine = content.indexOf('\n', importIndex);
      content = content.slice(0, headerImportLine + 1) + 
                'import Footer from "../components/Footer";\n' + 
                content.slice(headerImportLine + 1);
    }
  }
  
  // Replace the embedded footer with Footer component
  // Find the footer section (starts with <footer className="bg-gray-900")
  const footerStart = content.indexOf('<footer className="bg-gray-900');
  if (footerStart !== -1) {
    // Find the closing </footer> tag
    let footerEnd = content.indexOf('</footer>', footerStart);
    if (footerEnd !== -1) {
      footerEnd = content.indexOf('>', footerEnd) + 1; // Include the closing >
      
      // Replace the entire footer section with <Footer />
      content = content.slice(0, footerStart) + 
                '<Footer />' + 
                content.slice(footerEnd);
    }
  }
  
  fs.writeFileSync(file, content);
  console.log(`Updated ${file}`);
});

console.log('All footers updated!');