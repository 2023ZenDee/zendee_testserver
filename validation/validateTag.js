

exports.validTag = async(tag) =>{
    const validTags = ["경고", "뜨거움", "재미", "행운", "공지", "활동", "사랑"];
    const valid = await Promise.all(
        tag.map((tag)=>{
            if(!validTags.includes(tag)){
                return null;
            }
            return tag;
        })
    )
    return valid.filter((tag) => tag!== null);
}