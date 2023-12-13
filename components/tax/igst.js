import React from 'react';
import { TableRow, TableCell } from '@mui/material';

const IGSTtax = ({ taxPer, taxAmt, css, shipping }) => {
  return (
    <>
      {shipping ? (
        <>
          <TableRow>
            <TableCell style={css}>Shipping Charges (SAC: 9965)</TableCell>
            <TableCell style={css}>Rs. {shipping.toFixed(2)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={css}>
              Shipping IGST18 (18% of {`Rs. ${shipping.toFixed(2)}`})
            </TableCell>
            <TableCell style={css}>
              Rs. {(0.18 * shipping).toFixed(2)}
            </TableCell>
          </TableRow>
        </>
      ) : (
        ''
      )}

      {taxPer[40] ? (
        <>
          <TableRow>
            <TableCell style={css}>
              Cess (12% of {`Rs. ${taxAmt[40]}`})
            </TableCell>
            <TableCell style={css}>
              Rs. {(0.12 * taxAmt[40]).toFixed(2)}
            </TableCell>
          </TableRow>
        </>
      ) : (
        ''
      )}
      {taxPer['00'] === (false || 0) && taxPer['00'] !== undefined ? (
        <>
          <TableRow>
            <TableCell style={css}>
              IGST0 (0% of {`Rs. ${taxAmt['00']}`})
            </TableCell>
            <TableCell style={css}>Rs. {taxPer['00'].toFixed(2)}</TableCell>
          </TableRow>
        </>
      ) : (
        ''
      )}
      {taxPer['05'] ? (
        <>
          <TableRow>
            <TableCell style={css}>
              IGST5 (5% of {`Rs. ${taxAmt['05']}`})
            </TableCell>
            <TableCell style={css}>Rs. {taxPer['05'].toFixed(2)}</TableCell>
          </TableRow>
        </>
      ) : (
        ''
      )}
      {taxPer[12] ? (
        <>
          <TableRow>
            <TableCell style={css}>
              IGST12 (12% of {`Rs. ${taxAmt[12]}`})
            </TableCell>
            <TableCell style={css}>Rs. {taxPer[12].toFixed(2)}</TableCell>
          </TableRow>
        </>
      ) : (
        ''
      )}
      {taxPer[18] ? (
        <>
          <TableRow>
            <TableCell style={css}>
              IGST18 (18% of {`Rs. ${taxAmt[18]}`})
            </TableCell>
            <TableCell style={css}>Rs. {taxPer[18].toFixed(2)}</TableCell>
          </TableRow>
        </>
      ) : (
        ''
      )}
      {taxPer[28] && taxPer[40] ? (
        <>
          <TableRow>
            <TableCell style={css}>
              IGST28 (28% of {`Rs. ${taxAmt[28] + taxAmt[40]}`})
            </TableCell>
            <TableCell style={css}>
              Rs. {(0.28 * (taxAmt[28] + taxAmt[40])).toFixed(2)}
            </TableCell>
          </TableRow>
        </>
      ) : (
        <>
          {taxPer[28] ? (
            <>
              <TableRow>
                <TableCell style={css}>
                  IGST28 (28% of {`Rs. ${taxAmt[28]}`})
                </TableCell>
                <TableCell style={css}>
                  Rs. {(0.28 * taxAmt[28]).toFixed(2)}
                </TableCell>
              </TableRow>
            </>
          ) : (
            ''
          )}
          {taxPer[40] ? (
            <>
              <TableRow>
                <TableCell style={css}>
                  IGST28 (28% of {`Rs. ${taxAmt[40]}`})
                </TableCell>
                <TableCell style={css}>
                  Rs. {(0.28 * taxAmt[40]).toFixed(2)}
                </TableCell>
              </TableRow>
            </>
          ) : (
            ''
          )}
        </>
      )}
    </>
  );
};

export default IGSTtax;
