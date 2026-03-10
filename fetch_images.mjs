import fs from 'fs';

const jsonPath = 'C:\\Users\\USER\\.gemini\\antigravity\\scratch\\triveni-store\\src\\data\\products.json';
const products = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

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
    } catch (e) {
        console.error("Error fetching for", cleanQuery, e.message);
    }
    return null;
}

const fallbackImages = {
    "BlackBerry": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/BlackBerry_Classic_Front.jpg/600px-BlackBerry_Classic_Front.jpg",
    "Nokia": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Nokia_Lumia_1020_front.jpg/600px-Nokia_Lumia_1020_front.jpg",
    "Sony": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Sony_Ericsson_W995_front.jpg/600px-Sony_Ericsson_W995_front.jpg",
    "Samsung": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Samsung_Galaxy_S21_5G.jpg/600px-Samsung_Galaxy_S21_5G.jpg",
    "Apple": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/iPhone_15_Pro_Max_-_Natural_Titanium.svg/600px-iPhone_15_Pro_Max_-_Natural_Titanium.svg.png",
    "OnePlus": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/OnePlus_8_Pro_Glacial_Green.png/600px-OnePlus_8_Pro_Glacial_Green.png",
    "Default": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Smartphone_icon_-_The_Noun_Project.svg/600px-Smartphone_icon_-_The_Noun_Project.svg.png"
};

function getBrandFallback(name) {
    for (const [brand, url] of Object.entries(fallbackImages)) {
        if (name.toLowerCase().includes(brand.toLowerCase())) {
            return url;
        }
    }
    return fallbackImages["Default"];
}

async function updateImages() {
    let updatedCount = 0;
    for (let i = 0; i < products.length; i++) {
        const p = products[i];
        // If the image is empty, missing, or is the unsplash generic one
        if (!p.image || p.image.includes('unsplash.com')) {
            let newImage = await fetchWikiImage(p.data);
            if (!newImage) {
                newImage = getBrandFallback(p.data);
            }
            p.image = newImage;
            updatedCount++;
        }
    }

    fs.writeFileSync(jsonPath, JSON.stringify(products, null, 2));
    console.log(`Updated images for ${updatedCount} products.`);
}

updateImages();
