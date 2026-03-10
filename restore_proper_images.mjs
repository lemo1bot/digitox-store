import fs from 'fs';
import Papa from 'papaparse';

const productsJsonPath = 'C:\\Users\\USER\\.gemini\\antigravity\\scratch\\triveni-store\\src\\data\\products.json';
const csvPaths = [
    'c:\\Users\\USER\\Downloads\\triveniworld-com-2026-03-10-3 (1).csv',
    'c:\\Users\\USER\\Downloads\\triveniworld-com-2026-03-10-3 (12).csv'
];

async function fetchWikiImage(query) {
    const cleanQuery = query.split('-')[0].split(' Refurbished')[0].split('(')[0].split('|')[0].trim();
    console.log(`Searching wiki for: ${cleanQuery}`);
    try {
        const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(cleanQuery)}&utf8=&format=json&origin=*`;
        const searchRes = await fetch(searchUrl);
        const searchData = await searchRes.json();

        if (searchData.query && searchData.query.search.length > 0) {
            const title = searchData.query.search[0].title;
            const imgUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=pageimages&format=json&pithumbsize=600&origin=*`;
            const imgRes = await fetch(imgUrl);
            const imgData = await imgRes.json();
            const pages = imgData.query.pages;
            const pageId = Object.keys(pages)[0];
            if (pages[pageId].thumbnail) {
                return pages[pageId].thumbnail.source;
            }
        }
    } catch (e) { }
    return null;
}

async function updateImages() {
    let products = JSON.parse(fs.readFileSync(productsJsonPath, 'utf8'));

    const csvImageMap = {};
    for (const csvPath of csvPaths) {
        if (fs.existsSync(csvPath)) {
            const file = fs.readFileSync(csvPath, 'utf8');
            Papa.parse(file, {
                header: true,
                skipEmptyLines: true,
                complete: function (results) {
                    results.data.forEach(item => {
                        if (item.data && item.image) {
                            csvImageMap[item.data.trim()] = item.image;
                        }
                    });
                }
            });
        }
    }

    let updatedCount = 0;
    for (let i = 0; i < products.length; i++) {
        const p = products[i];

        // 1. Try to restore original image from CSV
        const originalTitle = p.data.split(' - Refurbished')[0].trim();
        if (csvImageMap[originalTitle] && csvImageMap[originalTitle].length > 5) { p.image = csvImageMap[originalTitle]; updatedCount++; continue; }
        if (csvImageMap[p.data] && csvImageMap[p.data].length > 5) { p.image = csvImageMap[p.data]; updatedCount++; continue; }

        // 2. Otherwise use Wikipedia API
        let wikiImage = await fetchWikiImage(p.data);
        if (wikiImage) {
            p.image = wikiImage;
            updatedCount++;
        } else {
            // Fallback to the Unsplash one if Wiki fails
            if (!p.image) p.image = "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80";
        }
        await new Promise(r => setTimeout(r, 200));
    }

    fs.writeFileSync(productsJsonPath, JSON.stringify(products, null, 2));
    console.log(`Successfully updated ${updatedCount} products with EXACT proper photos.`);
}

updateImages();
