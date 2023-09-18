const axios = require("axios");
const authUtil = require("../../module/authUtil");
const statusCode = require("../../module/statusCode");
const responseMessage = require("../../module/responseMessage");
require("dotenv").config();

const apiKey = process.env.NAVER_CLIENT_ID;
const secretKey = process.env.NAVER_SECRET_KEY;

module.exports = {
  getAddress: async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc?coords=${longitude},${latitude}&output=json&orders=addr&sourcecrs=epsg:4326&targetcrs=epsg:4326`,
        {
          headers: {
            "X-NCP-APIGW-API-KEY-ID": apiKey,
            "X-NCP-APIGW-API-KEY": secretKey,
          },
        }
      );

      if (response.status === 200) {
        const data = response.data;
        if (data.status.name === "ok") {
          const city = data.results[0].region.area1.name;
          const country = data.results[0].region.area2.name;
          const ward = data.results[0].region.area3.name;
          const address = `${city} ${country} ${ward}`;
          return address;
        } else {
          return null;
        }
      } else {
        return null;
      }
    } catch (e) {
      console.log(e)
      return null;
    }
  },
};
