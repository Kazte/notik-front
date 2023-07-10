import { useState, useEffect } from 'react';

// Custom hook for fetching data from the server and can passing options and can refetch the data and a event when the data is fetched

const useFetch = (url, options) => {

	const [data, setData] = useState(null);

	const doFetch = async (opt) => {
		try {
			const res = await fetch(url, opt);
			const json = await res.json();
			setData(json);
		} catch (err) {
			console.log(err);
		}
	};

	return { doFetch, data };
};




export default useFetch;