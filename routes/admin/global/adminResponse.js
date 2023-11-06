const regionForm = require("./form/region");
const tagForm = require("./form/tag");

module.exports = {
  postCountDataByRegion: async (regionCounts) => {
    regionForm.forEach((form)=>{
      form.value = 0;
    })
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
  postCountDataByTag : async(tagCounts) =>{
    tagForm.forEach((form)=>{
      form.value = 0;
    })
    await Promise.all(
      tagCounts.map(async(tagCount)=>{
        tagForm.forEach(async(form)=>{
          if(tagCount.tag === form.tagName){
            form.value++;
          }
        });
        
      })
    );
    return tagForm;
  }
};
