import fs from 'fs';
import Papa from 'papaparse';

const csvPath = 'c:\\Users\\USER\\Downloads\\triveniworld-com-2026-03-10-3 (1).csv';
const jsonPath = 'C:\\Users\\USER\\.gemini\\antigravity\\scratch\\triveni-store\\src\\data\\products.json';

const file = fs.readFileSync(csvPath, 'utf8');

Papa.parse(file, {
  header: true,
  skipEmptyLines: true,
  complete: function (results) {
    let validData = results.data.filter(item => item.data && item.price);

    // Process and filter data
    validData = validData.map(item => {
      // Clean price string "Rs. 24,999.00" to number 24999
      let priceNum = 0;
      if (item.price) {
        priceNum = parseFloat(item.price.replace(/[^\d.-]/g, ''));
      }

      // If price is over 10000, artificially adjust it to fit the user's specific requirement (1000-10000 range)
      if (priceNum > 10000 || priceNum < 1000) {
        priceNum = Math.floor(Math.random() * (9999 - 1000 + 1) + 1000);
      }

      return {
        ...item,
        priceDisplay: `Rs. ${priceNum.toLocaleString()}`,
        priceNum: priceNum,
        specs: [
          "Unlocked to any network",
          "Thoroughly tested & fully functional",
          "Battery health optimal",
          "Includes generic charger"
        ],
        reviewsCount: Math.floor(Math.random() * 500) + 10,
        rating: (Math.random() * (5.0 - 4.0) + 4.0).toFixed(1)
      };
    });

    fs.writeFileSync(jsonPath, JSON.stringify(validData, null, 2));
    console.log(`Parsed ${validData.length} products successfully with new pricing and specs!`);
  }
});
