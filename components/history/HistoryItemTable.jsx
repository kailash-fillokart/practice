import { Box } from '@mui/material';
import MaterialTable from 'material-table';
import React from 'react';

const HistoryItemTable = ({ tableData, stock, setStock }) => {
  const handleStockChange = (index, event) => {
    let tempValues = [...stock];
    tempValues[index].stock_out = event.target.value;
    setStock(tempValues);
  };
  const columns = [
    {
      title: 'Item Name',
      field: 'item_name',
      cellStyle: { fontSize: '13px' },
      width: '70%',
    },
    {
      title: 'Stock Inhand',
      field: 'stock_inhand',
      cellStyle: { fontSize: '13px' },
      align: 'center',
    },
    {
      title: 'Stock to be Out',
      field: 'stock_out',
      align: 'right',
      cellStyle: { fontSize: '13px' },
      render: (rowData) => (
        <>
          <input
            type='number'
            className='form-control form-control-sm'
            placeholder='Enter Stock Out'
            style={{ width: '125px', float: 'right' }}
            required
            onChange={(e) => handleStockChange(rowData.index, e)}
            value={stock.stock_out}
          />
        </>
      ),
    },
  ];

  // const rows = [];

  const rows = tableData.map((items, index) => {
    const { item_name, stock_inhand } = items;
    return {
      item_name,
      stock_inhand,
      index,
    };
  });

  return (
    <Box>
      {/* <pre>{JSON.stringify(stock, 0, 2)}</pre> */}
      <MaterialTable
        columns={columns}
        data={rows}
        title='List of Items'
        options={{
          pageSizeOptions: [50, 100, 150],
          pageSize: 50,
          columnsButton: false,
          search: false,
          toolbar: false,
          border: false,
          rowStyle: { fontSize: '12px' },
          headerStyle: {
            fontWeight: '600',
            fontSize: '13px',
            borderBottom: '2px solid rgb(10, 177, 60)',
          },
          onPageChange: '',
          sorting: true,
          maxBodyHeight: '53vh',
        }}
        sx={{ width: 'auto' }}
      />
    </Box>
  );
};

export default HistoryItemTable;
