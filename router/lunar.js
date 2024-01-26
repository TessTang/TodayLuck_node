const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const lunar = express.Router();

lunar.get('/', (req, res) => {
    const url = 'https://wisdom-life.in/calendar/lunar-calendar';
  
    axios.get(url)
      .then((response) => {
        if (response.status === 200) {
          const html = response.data;
          const $ = cheerio.load(html);

      // 爬取農曆、宜、忌、沖、煞、吉時的內容
      const lunarDate = $('.LunarCalendar_dayBlock__9JK1D div').eq(1).text().trim();
      const yiContent = $('.LunarCalendar_infoTitle__pSIZW:contains("宜")').next().text().trim();
      const jiContent = $('.LunarCalendar_infoTitle__pSIZW:contains("忌")').next().text().trim();
      const shaContent = $('.LunarCalendar_infoContainer__Zye93 .LunarCalendar_infoTitle__pSIZW:contains("煞")').next().text().trim();
      const jiShiContent = $('.LunarCalendar_infoTitle__pSIZW:contains("吉時")').next().text().trim();

      // 輸出結果
      const renderData = {
        lunarDate,
        yiContent,
        jiContent,
        shaContent,
        jiShiContent,
      };

      res.json(renderData);
    }
  })
  .catch((error) => res.status(500).send('Error fetching data:', error));
});
module.exports = lunar;