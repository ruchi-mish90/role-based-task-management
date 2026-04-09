const Pagination = ({ page, totalPages, onPage }) => {
  const prevDisabled = page <= 1;
  const nextDisabled = page >= totalPages;

  return (
    <div className="pager-wrap">
      <button disabled={prevDisabled} onClick={() => onPage(page - 1)} type="button">
        ← Prev
      </button>
      <span>
        Page {page} / {Math.max(totalPages, 1)}
      </span>
      <button disabled={nextDisabled} onClick={() => onPage(page + 1)} type="button">
        Next →
      </button>
    </div>
  );
};

export default Pagination;
