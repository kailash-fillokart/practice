import React from 'react';
import { Box, Button } from '@mui/material';
import { useRouter } from 'next/router';
import ReportTable from './ReportTable';
import { ArrowLeft } from '@mui/icons-material';
import { CsvBuilder } from 'filefy';

const InventoryHistory = ({ inventoryHisData }) => {
  const router = useRouter();
  const columns = [
    {
      title: 'Batch No',
      field: 'batch_number',
    },
    {
      title: 'Item Name',
      field: 'item_name',
      width: '50%',
    },
    {
      title: 'SKU',
      field: 'sku',
    },
    {
      title: 'Quantity Inhand',
      field: 'stock_inhand',
      align: 'center',
    },
    {
      title: 'Quantity Out',
      field: 'stock_out',
      align: 'center',
    },
  ];

  //   const rows = [];

  const rows = inventoryHisData.map((items) => {
    const {
      attributes: {
        stock_inhand,
        stock_out,
        inventory_history: {
          data: {
            attributes: { batch_number },
          },
        },
        product_id: {
          data: {
            attributes: { name: item_name, sku },
          },
        },
      },
    } = items;

    return {
      stock_inhand,
      stock_out,
      batch_number,
      item_name,
      sku,
    };
  });

  const TableTitle = () => {
    return (
      <Box sx={{ display: 'flex', gap: '20px' }}>
        <Box sx={{ fontWeight: '600', mt: 1, fontSize: '18px' }}>
          Inventory History
        </Box>
      </Box>
    );
  };

  const handleCsv = (data, columns) => {
    const columnTitles = data.map((columnDef) => columnDef.title);
    const csvData = columns.map((rowData) =>
      data.map((columnDef) => rowData[columnDef.field])
    );
    const builder = new CsvBuilder(`Inventory-History.csv`)
      .setColumns(columnTitles)
      .addRows(csvData)
      .exportFile();
    return builder;
  };

  return (
    <Box>
      <Button
        size='small'
        onClick={() => router.push('/report')}
        sx={{ mt: '5px', color: 'rgb(10, 177, 60)' }}
      >
        <ArrowLeft /> Back
      </Button>
      <ReportTable
        columns={columns}
        rows={rows}
        title={<TableTitle />}
        handleCsv={handleCsv}
      />
    </Box>
  );
};

export default InventoryHistory;
