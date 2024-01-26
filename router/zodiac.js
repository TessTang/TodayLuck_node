const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const zodiac = express.Router();


zodiac.get('/', async (req, res) => {
    try {
        const urls = [];
        for (let i = 0; i < 12; i++) {
            urls.push({html:`https://astro.click108.com.tw/daily_${i}.php?iAstro=${i}`,
            astro:i})
        }

        const results = await Promise.all(
            urls.map(async (url) => {
                const response = await axios.get(url.html);
                const $ = cheerio.load(response.data);

                // Extracting the desired informatio.html
                const astroLogical = $('.ROOT>p>a:nth-of-type(2)').text().split('－')[1].trim();
                const todayWord = $('.TODAY_WORD p').text();
                const luckyNumber = $('.LUCKY:nth-of-type(1) h4').text();
                const luckyColor = $('.LUCKY:nth-of-type(2) h4').text();
                const luckyDirection = $('.LUCKY:nth-of-type(3) h4').text();
                const zodiacSign = $('.LUCKY:nth-of-type(4) h4').text();
                const astroIndex = (url.astro);
                // Return an object with the extracted information
                return {
                    astroIndex,
                    astroLogical,
                    todayWord,
                    luckyNumber,
                    luckyColor,
                    luckyDirection,
                    zodiacSign
                };
            })
        );
        // Sending the results as JSON
        res.json(results);
        
    } catch (error) {
        console.error('Error fetching the webpages:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = zodiac;