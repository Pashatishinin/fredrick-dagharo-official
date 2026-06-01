interface VimeoOEmbed {
	thumbnail_url: string;
	[key: string]: any;
}

export const getVimeoThumbnail = async (
	vimeoUrl: string | undefined | null,
	fallback: string = "/image.jpg",
): Promise<string> => {
	if (!vimeoUrl) return fallback;

	try {
		const videoId = vimeoUrl.split("/").pop();

		const response = await fetch(
			`https://vimeo.com/api/oembed.json?url=https://vimeo.com/${videoId}`,
		);

		if (!response.ok) throw new Error("Vimeo API response was not ok");

		const cardData: VimeoOEmbed = await response.json();
		const thumbUrl = cardData.thumbnail_url;

		const thumbId = thumbUrl.split("/").pop()?.split("_")[0];

		return thumbId ? `https://i.vimeocdn.com/video/${thumbId}_1280.jpg` : fallback;
	} catch (e) {
		console.error("Error with upload preview Vimeo:", e);
		return fallback;
	}
};
