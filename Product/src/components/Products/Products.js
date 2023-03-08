import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import { EndpointService } from '../../services/endpointService';
import HTTPService from '../../services/HTTPService';

function Products() {
  const [filteredList, setFilteredList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(10);
  const [perPage, setPerPage] = useState(10);
  const [skip, setSkip] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const columns = [
    {
      name: 'brand',
      selector: row => row.brand,
      sortable: true,
    },
    {
      name: 'category',
      selector: row => row.category,
      sortable: true,
    },
    {
      name: 'price',
      selector: row => row.price,
      sortable: true,
    },
  ];

  const handlePageChange = page => {
    setSkip((page-1)*perPage)
  };
  // HandlePerRowsChange
  const handlePerRowsChange = async (newPerPage, page) => {
     setPerPage(newPerPage)
  };

  const handleRowSelected = (row, event) => { }

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value)
    getAllProductsSearch(e.target.value)
  }

  useEffect(() => {
    getAllProducts()
  }, [perPage,skip])


  const getAllProducts = () => {
    let apiUrl = EndpointService.getProducts+'?limit='+perPage+'&skip='+skip;
    HTTPService.get(apiUrl, null).then((response) => {
      setFilteredList(response.products)
      setTotalRows(response.total)
      console.log(response)
    });
  }

  const getAllProductsSearch = (query) => {
    let apiUrl = EndpointService.getProductsSearch+'?q='+query;
    HTTPService.get(apiUrl, null).then((response) => {
      setFilteredList(response.products)
      console.log(response)
    });
  }


  return (
    <>
      <div className='layout-body'>
        <div className='filter'>
          <div className="search-box">
            <input
              className="search-box__input"
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleInputChange}
            />
          </div>

        </div>
        <DataTable
          columns={columns}
          data={filteredList}
          progressPending={loading}
          pagination
          paginationServer
          responsive
          selectableRows
          selectableRowsHighlight
          paginationTotalRows={totalRows}
          onChangeRowsPerPage={handlePerRowsChange}
          onChangePage={handlePageChange}
          persistTableHead
          onSelectedRowsChange={(row) => handleRowSelected(row)}
          className="react-table"
        />
      </div>
    </>
  );
}

export default Products