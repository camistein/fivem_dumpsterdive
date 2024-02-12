export const getJsonResourceFile = <T>(resource: string, fileName: string) => {
	try {
		const file = LoadResourceFile(resource, fileName);
		return JSON.parse(file) as T;
	} catch (err) {
		console.error(err);
		return null;
	}
};

export const getFile = async (
	resourcePath: string,
	fileName: string,
): Promise<any> => {
	try {
		console.log(resourcePath);
		console.log(fileName);
		const file = await require(resourcePath + fileName);
		return file;
	} catch (err) {
		console.error(err);
		return null;
	}
};
