import fs from 'fs';

const jsonPath = 'C:\\Users\\USER\\.gemini\\antigravity\\scratch\\triveni-store\\src\\data\\products.json';
const products = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

// Instead of relying on patchy Wikipedia thumbs, we'll use a curated map of high-quality smartphone images from Unsplash, mapped semantically to the brands.
const highResBrandImages = {
    "BlackBerry": [
        "https://images.unsplash.com/photo-1585060544812-6b45742d762f?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1533552755457-5b4812061619?auto=format&fit=crop&w=800&q=80"
    ],
    "Nokia": [
        "https://images.unsplash.com/photo-1582298538104-fe2e22c002c9?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1596742578564-9d5cb1e5b22b?auto=format&fit=crop&w=800&q=80"
    ],
    "Motorola": [
        "https://images.unsplash.com/photo-1599329064137-d2eab16cff5e?auto=format&fit=crop&w=800&q=80"
    ],
    "Sony": [
        "https://images.unsplash.com/photo-1621330396173-e41b1cafd17f?auto=format&fit=crop&w=800&q=80"
    ],
    "Samsung": [
        "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1610792516300-eaaca3863d04?auto=format&fit=crop&w=800&q=80"
    ],
    "Apple": [
        "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?auto=format&fit=crop&w=800&q=80"
    ],
    "OnePlus": [
        "https://images.unsplash.com/photo-1605236453806-6ff36851218e?auto=format&fit=crop&w=800&q=80"
    ],
    "Xiaomi": [
        "https://images.unsplash.com/photo-1598327105666-5b89351cb31b?auto=format&fit=crop&w=800&q=80"
    ],
    "Retro": [
        "https://images.unsplash.com/photo-1522869635100-9f4c5e86d267?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1533552755457-5b4812061619?auto=format&fit=crop&w=800&q=80"
    ],
    "Default": [
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1598327105666-5b89351cb31b?auto=format&fit=crop&w=800&q=80"
    ]
};

function getRandomImage(brand) {
    const images = highResBrandImages[brand];
    return images[Math.floor(Math.random() * images.length)];
}

function assignHighResImages() {
    let updatedCount = 0;
    for (let i = 0; i < products.length; i++) {
        const p = products[i];
        const name = p.data.toLowerCase();

        // Map to the curated high-res abstract smartphone photography sets
        if (name.includes('blackberry')) { p.image = getRandomImage("BlackBerry"); }
        else if (name.includes('nokia') || name.includes('lumia')) { p.image = getRandomImage("Nokia"); }
        else if (name.includes('motorola') || name.includes('moto')) { p.image = getRandomImage("Motorola"); }
        else if (name.includes('sony')) { p.image = getRandomImage("Sony"); }
        else if (name.includes('samsung') || name.includes('galaxy')) { p.image = getRandomImage("Samsung"); }
        else if (name.includes('apple') || name.includes('iphone')) { p.image = getRandomImage("Apple"); }
        else if (name.includes('oneplus')) { p.image = getRandomImage("OnePlus"); }
        else if (name.includes('xiaomi') || name.includes('redmi') || name.includes('poco')) { p.image = getRandomImage("Xiaomi"); }
        else if (p.specs && p.specs.includes('Vintage Retro Design')) { p.image = getRandomImage("Retro"); }
        else { p.image = getRandomImage("Default"); }

        updatedCount++;
    }

    fs.writeFileSync(jsonPath, JSON.stringify(products, null, 2));
    console.log(`Successfully assigned high-res professional product photography to all ${updatedCount} products.`);
}

assignHighResImages();
