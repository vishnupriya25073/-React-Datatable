import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios';

const customStyles = {
  headRow: {
    style: {
      backgroundColor: 'blue',
      color: 'white',
    },
  },
  headCells: {
    style: {
      fontSize: '16px',
      fontWeight: '600',
      textTransform: 'uppercase',
    },
  },
  cells: {
    style: {
      fontSize: '15px',
    },
  },
};

function Datatable() {
  const [records, setRecords] = useState([]);
  const [filterRecords, setFilterRecords] = useState([]);

  const columns = [
    {
      name: 'ID',
      selector: row => row.id,
      sortable: true,
    },
    {
      name: 'Name',
      selector: row => row.name,
      sortable: true,
    },
    {
      name: 'Email',
      selector: row => row.email,
      sortable: true,
    },
    {
      name: 'City',
      selector: row => row.address.city,
      sortable: true,
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('https://jsonplaceholder.typicode.com/users');
        setRecords(res.data);
        setFilterRecords(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const handleFilter = event => {
    const searchText = event.target.value.toLowerCase();
    const newData = filterRecords.filter(row =>
      row.name.toLowerCase().includes(searchText) ||
      row.email.toLowerCase().includes(searchText) ||
      row.address.city.toLowerCase().includes(searchText)
    );
    setRecords(newData);
  };

  return (
    <div style={{ padding: '50px 10%', backgroundColor: 'gray' }}>
      <div style={{ display: 'flex', justifyContent: 'right', marginBottom: '10px' }}>
        <input
          type="text"
          placeholder="Search..."
          onChange={handleFilter}
          style={{ padding: '4px 100px', border: '1px solid #ccc', borderRadius: '4px' }}
        />
      </div>

      <DataTable
        columns={columns}
        data={records}
        customStyles={customStyles}
        pagination
        selectableRows
        highlightOnHover
      />
    </div>
  );
}

export default Datatable;
