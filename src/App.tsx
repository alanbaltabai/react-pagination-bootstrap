import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Record, FetchedData } from './interfaces';

function App() {
	const [fetchedData, setFetchedData] = useState<Record[]>([]);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [recordsPerPage] = useState<number>(5);

	const lastRecord: number = currentPage * recordsPerPage;
	const firstRecord: number = lastRecord - recordsPerPage;
	const totalCountOfPages = 6;
	const pageNumbers: number[] = [...Array(totalCountOfPages + 1).keys()].slice(
		1
	); // [1, 2, ..., 6]
	const recordParagraphs: JSX.Element[] = fetchedData.map((item: Record) => (
		<p key={item.id}>
			<span>{item.id}) </span>
			{item.title}
		</p>
	));

	useEffect(() => {
		async function fetchMeds() {
			const response: Response = await fetch(
				`https://dummyjson.com/products?limit=${recordsPerPage}&skip=${firstRecord}`
			);
			const data: FetchedData = await response.json();

			setFetchedData(data.products);
		}

		fetchMeds();
	}, [firstRecord, recordsPerPage]);

	function nextPage() {
		if (currentPage !== totalCountOfPages) setCurrentPage(currentPage + 1);
	}

	function prevPage() {
		if (currentPage !== 1) setCurrentPage(currentPage - 1);
	}

	function changeCurrentPage(number: number) {
		setCurrentPage(number);
	}

	return (
		<div>
			{recordParagraphs}
			<nav>
				<ul className='pagination'>
					{currentPage !== pageNumbers[0] && (
						<li className='page-item'>
							<a href='#' className='page-link' onClick={prevPage}>
								Prev
							</a>
						</li>
					)}

					{pageNumbers.map((number, i) => (
						<li
							className={`page-item ${currentPage === number ? 'active' : ''}`}
							key={i}
						>
							<a
								href='#'
								className='page-link'
								onClick={() => changeCurrentPage(number)}
							>
								{number}
							</a>
						</li>
					))}

					{currentPage !== pageNumbers.at(-1) && (
						<li className='page-item'>
							<a href='#' className='page-link' onClick={nextPage}>
								Next
							</a>
						</li>
					)}
				</ul>
			</nav>
		</div>
	);
}

export default App;
