export function chunkArray(myArray, chunk_size) {
	var results = [];

	let k = 0;
	let length = myArray.length;

	while (length > 3) {
		results.push(myArray.slice(k, chunk_size));
		k += chunk_size;
		length -= chunk_size;
	}

	return results;
}

export const MODAL_PURPOSE_ADD = "add";
export const MODAL_PURPOSE_UPDATE = "update";
