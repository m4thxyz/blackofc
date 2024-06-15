const axios = require("axios").default;

module.exports = qc = async (conn, user, pushname, text) => {
  try {
picimg = await conn.profilePictureUrl(`${user.split("@")[0]}@c.us`, 'image') 
} catch {
picimg = "https://i0.wp.com/telegra.ph/file/134ccbbd0dfc434a910ab.png"
}
    try {
        let result;
        let jsonstik = {
            type: "quote",
            format: "webp",
            backgroundColor: "#1f2c34",
            width: 512,
            height: 768,
            scale: 2,
            messages: [
                {
                    entities: [],
                    avatar: true,
                    from: {
                        id: 1,
                        name: pushname || 'Unknown',
                        photo: {
                            url: picimg,
                        },
                    },
                    text,
                    replyMessage: {},
                },
            ],
        };

        await axios.post('https://bot.lyo.su/quote/generate', jsonstik)
            .then(res => {
                result = res.data.result.image;
            });

        return result;
    } catch (error) {
        throw new Error(error);
    }
};