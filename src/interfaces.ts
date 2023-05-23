interface Record {
	id: number;
	title: string;
}

interface FetchedData {
	products: Record[];
}

export type { Record, FetchedData };
