import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import { EndpointService } from '../../services/endpointService';
import HTTPService from '../../services/HTTPService';

function Comments() {
  const [commentList, setFilteredList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(10);
  const [perPage, setPerPage] = useState(10);
  const [skip, setSkip] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const columns = [
    {
      name: 'body',
      selector: row => row.body,
      sortable: true,
    },
    {
      name: 'userId',
      selector: row => row.user.username,
      sortable: true,
    }
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
    getAllCommentsSearch(e.target.value)
  }

  useEffect(() => {
    getAllComments()
  }, [perPage,skip])


  const getAllComments = () => {
    let apiUrl = EndpointService.getComments+'?limit='+perPage+'&skip='+skip;
    HTTPService.get(apiUrl, null).then((response) => {
      setFilteredList(response.comments)
      setTotalRows(response.total)
      console.log(response)
    });
  }

  const getAllCommentsSearch = (query) => {
    let apiUrl = EndpointService.getCommentsSearch+'?q='+query;
    HTTPService.get(apiUrl, null).then((response) => {
      setFilteredList(response.comments)
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
          data={commentList}
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

export default Comments