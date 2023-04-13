

function Pagination({ currentPage, totalPages, onPageClick }) {
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination justify-content-center">
        {pageNumbers.map((pageNumber) => (
          <li
            key={pageNumber}
            className={
              pageNumber === currentPage ? "page-item active" : "page-item"
            }
          >
            <button
              className="page-link"
              onClick={() => onPageClick(pageNumber)}
            >
              {pageNumber}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Pagination;
