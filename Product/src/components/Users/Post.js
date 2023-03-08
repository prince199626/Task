import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import { EndpointService } from '../../services/endpointService';
import HTTPService from '../../services/HTTPService';

function Post() {
  const [filteredList, setFilteredList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(10);
  const [perPage, setPerPage] = useState(10);
  const [skip, setSkip] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const columns = [
    {
      name: 'title',
      selector: row => row.title,
      sortable: true,
    },
    {
      name: 'userId',
      selector: row => row.userId,
      sortable: true,
    },
    {
      name: 'reactions',
      selector: row => row.reactions,
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
    getAllPostsSearch(e.target.value)
  }

  useEffect(() => {
    getAllPosts()
  }, [perPage,skip])


  const getAllPosts = () => {
    let apiUrl = EndpointService.getPost+'?limit='+perPage+'&skip='+skip;
    HTTPService.get(apiUrl, null).then((response) => {
      setFilteredList(response.posts)
      setTotalRows(response.total)
      console.log(response)
    });
  }

  const getAllPostsSearch = (query) => {
    let apiUrl = EndpointService.getPostSearch+'?q='+query;
    HTTPService.get(apiUrl, null).then((response) => {
      setFilteredList(response.posts)
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

export default Post