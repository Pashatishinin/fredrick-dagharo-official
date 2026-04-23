export const createPerfTracker = (label: string) => {
	return {
		start: () => console.time(label),
		end: () => console.timeEnd(label),

		track: async <T>(fn: () => Promise<T> | T): Promise<T> => {
			console.time(label);
			const result = await fn();
			console.timeEnd(label);
			return result;
		},
	};
};
