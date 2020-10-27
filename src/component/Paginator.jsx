import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";

export default function Paginator() {
  const [currentPage, setCurrentPage] = useState(0); //manejo el número de página
  const [data, setData] = useState([]); //guardo la data

  useEffect(() => {
    fetchData();
  }, []);

  //funcion para setear la página seleccionada
  function handlePageClick({ selected }) {
    setCurrentPage(selected);
  }

  //GET a api donde está la info a mostrar
  function fetchData() {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }

  const PER_PAGE = 10; //cantidad de elementos por página
  const offset = currentPage * PER_PAGE; // número de elementos que ya se han mostrado en las páginas anteriores.
  const currentPageData = data
    .slice(offset, offset + PER_PAGE) //devuelve una copia de una parte del array dentro de un nuevo array empezando por inicio hasta fin
    .map(({ body }) => <p>{body} </p>); //map del nuevo array

  //variable que contiene la cantidad de páginas que tendra
  const pageCount = Math.ceil(data.length / PER_PAGE);

  return (
    <div className="container">
      <h1>React Paginate Example</h1>
      <nav>
        <ReactPaginate
          previousLabel={"← Previous"}
          nextLabel={"Next →"}
          breakLabel={"..."}
          breakClassName={"page-link"} //estilo de los ...
          pageCount={pageCount} //cantidad de páginas
          onPageChange={handlePageClick} //cuando hago clic en una página
          // pageClassName={"page-link"}
          pageLinkClassName={"page-link"}
          containerClassName={"pagination"}
          previousLinkClassName={"page-link"}
          nextLinkClassName={"page-link"}
          disabledClassName={"page-item disabled"}
          activeClassName={"page-item active"}
        />
      </nav>

      {currentPageData}
    </div>
  );
}
