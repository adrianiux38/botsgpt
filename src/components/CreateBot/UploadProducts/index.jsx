import React, { useState } from 'react';
import CSVParser from 'papaparse';
import { userSignTheme } from '../../../utils/userSignTheme';
import {
  Button,
  TextField,
  Box,
  ThemeProvider,
  Grid,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  IconButton,
  Paper,
  TableContainer,
  Select,
  MenuItem,
  InputLabel,
  Modal,
  Typography
} from '@mui/material';
import { Add, Delete, Publish } from '@mui/icons-material';
import { saveAs } from 'file-saver';

const templateCSV = [
    'Name of the product,Product description,Price,Details,Currency',
    'Sample Product,This is a sample product,9.99,Sample details,USD',
  ].join('\n');

  const downloadCSVTemplate = () => {
    const blob = new Blob([templateCSV], { type: 'text/csv;charset=utf-8' });
    saveAs(blob, 'template.csv');
  };




const UploadProducts = ({ handleCancel, handleContinue, handleBack, updateStepData }) => {
    const [rows, setRows] = useState([{ prodName: '', desc: '', price: '', details: '' }]);
    const [openModal, setOpenModal] = useState(false);

  const handleAddRow = () => {
    setRows([
      ...rows,
      { prodName: '', desc: '', price: '', details: '' },
    ]);
  };

  const handleDeleteRow = (index) => {
    const newRows = [...rows];
    newRows.splice(index, 1);
    setRows(newRows);
  };

  const handleChange = (index, field) => (event) => {
    const newRows = [...rows];
    newRows[index][field] = event.target.value;
    setRows(newRows);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    CSVParser.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        // Check if column names match before updating table data
        if (
          results.meta.fields.includes('Name of the product') &&
          results.meta.fields.includes('Product description') &&
          results.meta.fields.includes('Price') &&
          results.meta.fields.includes('Details') &&
          results.meta.fields.includes('Currency')
        ) {
          setRows(results.data.map((row) => ({
            prodName: row['Name of the product'] || '',
            desc: row['Product description'] || '',
            price: row['Price'] || '',
            details: row['Details'] || '',
            currency: row['Currency'] || '',
          })));
            // Close the modal
            setOpenModal(false);
        } else {
          alert('The CSV column names do not match the expected format.');
        }
      },
    });
  };


  const allFieldsFilled = rows.every((row) => row.prodName && row.desc && row.price && row.details);

  return (
    <ThemeProvider theme={userSignTheme}>
      <Grid container sx={{ minHeight: '100vh', background: 'linear-gradient(45deg, #6a1b9a 30%, #42a5f5 90%)' }}>
        <Grid item xs={12}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '100vh',
            }}
          >
            <Box
              sx={{
                p: 4,
                borderRadius: '20px',
                bgcolor: 'white',
                position: 'relative',
                width: {
                  xs: '90%', // en pantallas extra pequeñas (menos de 600px) el ancho será del 90%
                  sm: '75%', // en pantallas pequeñas (600px o más) el ancho será del 75%
                  md: '60%', // en pantallas medianas (960px o más) el ancho será del 60%
                  lg: '50%', // en pantallas grandes (1280px o más) el ancho será del 50%
                },
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Box
                sx={{ flex: '1', height: '100%' }}
              >
                <Grid container sx={{ display: 'flex', mb: '2%' }}>
                  <Grid item xs sx={{ display: 'flex', alignSelf: 'flex-start' }}>
                    <Box my={1}>
                      <Button variant='contained' color='error' onClick={handleCancel}>
                        Cancel
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
                <p style={{fontFamily:'poppins', fontSize:'1.6em', marginBottom: '1%', marginBottom: '5%'}}>Upload the products you want to sell</p>
                {/*
                <input
                    type="file"
                    id="csv-upload"
                    accept=".csv"
                    onChange={handleFileUpload}
                    style={{ display: 'none' }}
                    />
                    <label htmlFor="csv-upload">
                    <IconButton component="span">
                        <Publish />
                    </IconButton>
                </label>
                */}
                <Grid item xs sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '5%', paddingRight:'5%'}}>
                        {/* Add this button to open the modal */}
                        <Button variant='contained' color='primary' onClick={() => setOpenModal(true)}>
                            Upload products from CSV
                        </Button>
                  </Grid>
                <TableContainer component={Paper} sx={{ maxHeight: 400, marginBottom: '8px' }}>
                  <Table stickyHeader aria-label='simple table'>
                    <TableHead>
                      <TableRow>
                        <TableCell align='center'>Name of the product</TableCell>
                        <TableCell align='center'>Product description</TableCell>
                        <TableCell align='center'>Price</TableCell>
                        <TableCell align='center'>Currency</TableCell>
                        <TableCell align='center'>Details</TableCell>
                        <TableCell align='center'>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map((row, rowIndex) => (
                        <TableRow key={rowIndex}>
                          <TableCell>
                            <TextField
                              fullWidth
                              value={row.prodName}
                              onChange={handleChange(rowIndex, 'prodName')}
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              fullWidth
                              value={row.desc}
                              onChange={handleChange(rowIndex, 'desc')}
                            />
                          </TableCell>

                          <TableCell>
                            <TextField
                              fullWidth
                              value={row.price}
                              onChange={handleChange(rowIndex, 'price')}
                            />
                            </TableCell>
                            <TableCell>
                                <InputLabel id={`currency-label-${rowIndex}`} sx={{ display: 'none' }}>
                                    Currency
                                </InputLabel>
                                <Select
                                    labelId={`currency-label-${rowIndex}`}
                                    id={`currency-select-${rowIndex}`}
                                    value={row.currency || ''}
                                    onChange={handleChange(rowIndex, 'currency')}
                                    fullWidth
                                    sx ={{
                                        minWidth: '80px',
                                    }}
                                >
                                    <MenuItem value='USD'>USD</MenuItem>
                                    <MenuItem value='MXN'>MXN</MenuItem>
                                    <MenuItem value='SOL'>SOL</MenuItem>
                                    <MenuItem value='EUR'>EUR</MenuItem>
                                </Select>
                          </TableCell>


                          <TableCell>
                            <TextField
                              fullWidth
                              value={row.details}
                              onChange={handleChange(rowIndex, 'details')}
                            />
                          </TableCell>
                          <TableCell>
                            <IconButton color='error' onClick={() => handleDeleteRow(rowIndex)}>
                              <Delete />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                {/* 
                {allFieldsFilled && (
                  <Box my={1} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <IconButton color='primary' onClick={handleAddRow}>
                      <Add />
                    </IconButton>
                  </Box>
                )}
                */}
                <Box my={1} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <IconButton color='primary' onClick={handleAddRow}>
                      <Add />
                    </IconButton>
                </Box>
                <Grid container sx={{ display: 'flex' }}>
                  <Grid item xs sx={{ display: 'flex', flex: 0.5, justifyContent: 'flex-start' }}>
                    <Box my={1}>
                      <Button variant='contained' color='backbutton' onClick={handleBack}>
                        Go back
                      </Button>
                    </Box>
                  </Grid>
                  <Grid item xs sx={{ display: 'flex', flex: 0.5, justifyContent: 'flex-end' }}>
                    <Box my={1}>
                      <Button variant='contained' color='success' onClick={handleContinue}>
                        Continue
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby='modal-title'
        aria-describedby='modal-description'
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backdropFilter: 'blur(5px)',
        }}
      >
        <Box
          sx={{
            width: '50%',
            maxWidth: '500px',
            minHeight: '200px',
            bgcolor: 'background.paper',
            borderRadius: '20px',
            boxShadow: 24,
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography id='modal-title' variant='h6' component='h2'>
            Upload Products from CSV
          </Typography>
          <input
            type='file'
            id='csv-upload'
            accept='.csv'
            onChange={handleFileUpload}
            style={{ display: 'none' }}
          />
          <label htmlFor='csv-upload'>
            <IconButton component='span'>
              <Publish />
            </IconButton>
          </label>
          <Button color='secondary' variant='contained' onClick={downloadCSVTemplate}>
            Download template file
          </Button>
        </Box>
      </Modal>
    </ThemeProvider>
  );
};

export default UploadProducts;