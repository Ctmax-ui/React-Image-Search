const NextPageButton = ({nextPageClickHandler}) => {
  return (
    <a
    href="#top"
    onClick={nextPageClickHandler}
    className="rounded-lg border-none bg-green-700 text-white hover:bg-green-900 px-4 py-3 text-lg font-semibold"
  >
    Next {">"}
  </a>
  )
}

export default NextPageButton