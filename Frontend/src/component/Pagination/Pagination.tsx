import React from "react";

interface PaginationProps {
  page?: number;
  limit?: number;
  totalPages?: number;
  total: number;
  onPageChange: (page: number) => void;
}

const Pagination:React.FC<PaginationProps> = ({ page = 1, limit = 10, totalPages = 1,total=0, onPageChange }) => {

  const getPaginationButtons = () => {
    const buttons = [];
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <button
          key={i}
          className={`join-item btn ${i === page ? 'btn-active' : ''}`}
          onClick={() => onPageChange(i)}
        >
          {i}
        </button>
      );
    }
    return buttons;
  };
  return (
    <div>
      <div className="pagination-section flex justify-center m-2">
        <div className="join">
          {/* Previous Button */}
          <button
            className={`join-item btn ${page === 1 ? 'btn-disabled' : ''}`}
            onClick={() => page > 1 && onPageChange(page - 1)}
            disabled={page === 1}
          >
            Prev
          </button>

          {/* Pagination Buttons */}
          {getPaginationButtons()}

          {/* Next Button */}
          <button
            className={`join-item btn ${page === totalPages ? 'btn-disabled' : ''}`}
            onClick={() => page < totalPages && onPageChange(page + 1)}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      </div>
      <div className="text-center mt-2">
        <span>
          Page {page} of {totalPages}, Total Items: {total}
        </span>
      </div>
    </div>
  );
};

export default Pagination;
