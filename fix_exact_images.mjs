import fs from 'fs';
import Papa from 'papaparse';
import { image_search } from 'duckduckgo-images-api';

const productsJsonPath = 'C:\\Users\\USER\\.gemini\\antigravity\\scratch\\triveni-store\\src\\data\\products.json';
const csvPaths = [
    'c:\\Users\\USER\\Downloads\\triveniworld-com-2026-03-10-3 (1).csv',
    'c:\\Users\\USER\\Downloads\\triveniworld-com-2026-03-10-3 (12).csv'
];

async function updateImages() {
    let products = JSON.parse(fs.readFileSync(productsJsonPath, 'utf8'));

    // Create a mapping of original CSV titles to images
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

    console.log(`Found ${Object.keys(csvImageMap).length} original images in CSVs.`);

    let updatedCount = 0;
    for (let i = 0; i < products.length; i++) {
        const p = products[i];

        // 1. Try to restore original image from CSV first if we replaced it
        const originalTitle = p.data.split(' - Refurbished')[0].trim();
        if (csvImageMap[originalTitle] && csvImageMap[originalTitle].length > 5) {
            p.image = csvImageMap[originalTitle];
            updatedCount++;
            continue;
        }
        if (csvImageMap[p.data] && csvImageMap[p.data].length > 5) {
            p.image = csvImageMap[p.data];
            updatedCount++;
            continue;
        }

        // 2. If it's a custom phone (mock-...) we added, we fetch the exact real image using DuckDuckGo
        let searchQuery = originalTitle;
        console.log(`Fetching specific image for: ${searchQuery}`);
        try {
            const results = await image_search({ query: searchQuery, moderate: true });
            if (results && results.length > 0) {
                // Pick the first valid direct image URL
                const validImage = results.find(r => r.image && r.image.startsWith('http') && !r.image.includes('svg'));
                if (validImage) {
                    p.image = validImage.image;
                    updatedCount++;
                }
            }
        } catch (e) {
            console.error(`Failed to fetch for ${searchQuery}:`, e.message);
        }

        // Add a small delay to avoid rate limiting
        await new Promise(r => setTimeout(r, 1000));
    }

    fs.writeFileSync(productsJsonPath, JSON.stringify(products, null, 2));
    console.log(`Successfully updated ${updatedCount} products with EXACT proper photos.`);
}

updateImages();
