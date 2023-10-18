const regionForm = require("./form/region");

module.exports = {
  postCountDataByRegion: async (regionCounts) => {
    await Promise.all(
      regionCounts.map(async (region) => {
        regionForm.forEach((form) => {
          const splitRegion = region.address.split(" ");
          if (splitRegion[0] === form.region) {
            form.value += region._count.address;
          }
        });
      })
    );

    return regionForm;
  },
};
