import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import { EndpointService } from '../../services/endpointService';
import HTTPService from '../../services/HTTPService';

function Users() {
  const [filteredList, setFilteredList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(10);
  const [perPage, setPerPage] = useState(10);
  const [skip, setSkip] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const columns = [
    {
      name: 'email',
      selector: row => row.email,
      sortable: true,
    },
    {
      name: 'firstName',
      selector: row => row.firstName,
      sortable: true,
    },
    {
      name: 'age',
      selector: row => row.age,
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
    getAllUsersSearch(e.target.value)
  }

  useEffect(() => {
    getAllUsers()
  }, [perPage,skip])


  const getAllUsers = () => {
    let apiUrl = EndpointService.getUser+'?limit='+perPage+'&skip='+skip;
    HTTPService.get(apiUrl, null).then((response) => {
      setFilteredList(response.users)
      setTotalRows(response.total)
      console.log(response)
    });
  }

  const getAllUsersSearch = (query) => {
    let apiUrl = EndpointService.getUserSearch+'?q='+query;
    HTTPService.get(apiUrl, null).then((response) => {
      setFilteredList(response.users)
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

export default Users