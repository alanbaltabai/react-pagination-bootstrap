import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { record } from './interfaces';

function App() {
	const [fetchedData, setFetchedData] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [recordsPerPage] = useState(5);

	useEffect(() => {
		async function fetchMeds() {
			const response = await fetch(
				'https://medical.zhasapp.com/backend/products?searchJoin=and&with=shop&orderBy=updated_at&sortedBy=ASC&page=2&search=status:publish'
			);
			const data = await response.json();
			setFetchedData(data.data);
		}

		fetchMeds();
	}, []);

	const lastRecord = currentPage * recordsPerPage;
	const firstRecord = lastRecord - recordsPerPage;
	const currentRecords = fetchedData.slice(firstRecord, lastRecord);
	const totalCountOfPages = Math.ceil(fetchedData.length / recordsPerPage);
	const pageNumbers = [...Array(totalCountOfPages + 1).keys()].slice(1); // [1, 2, ...]
	const recordParagraphs = currentRecords.map((item: record) => (
		<p>
			<span>{item.id}) </span>
			{item.name}
		</p>
	));

	function prevPage() {
		if (currentPage !== 1) setCurrentPage(currentPage - 1);
	}

	function changeCurrentPage(id: number) {
		setCurrentPage(id);
	}

	function nextPage() {
		if (currentPage !== totalCountOfPages) setCurrentPage(currentPage + 1);
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

					{pageNumbers.map((item, i) => (
						<li
							className={`page-item ${currentPage === item ? 'active' : ''}`}
							key={i}
						>
							<a
								href='#'
								className='page-link'
								onClick={() => changeCurrentPage(item)}
							>
								{item}
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
