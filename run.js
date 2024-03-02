const fs = require('fs');
const { parse } = require('csv-parse');
const ghostfolioApi = require('ghostfolio-api').default;

// Initialize the Ghostfolio API client 
const apiClient = ghostfolioApi('token');

// Path to your CSV file
const csvFilePath = './mnt/portfolio.csv';

// Function to parse date
const parseDate = (dateString) => {
  const [date, timeZone] = dateString.split(' ');
  return `${date}T00:00:00.000Z`; 
};

// Read and parse the CSV file
fs.createReadStream(csvFilePath)
  .pipe(parse({
    columns: true,
    skip_empty_lines: true,
    trim: true,
  }))
  .on('data', (row) => {
    if (row['Shares Owned'] && row['Cost Per Share'] && row['Transaction Date']) {

      // Remap "SELL ALL" to "SELL" when parsing "Type"
      let type = row['Type'].toUpperCase(); // Ensure type is uppercase
      if (type === 'SELL ALL') {
        type = 'SELL'; // Remap "SELL ALL" to "SELL"
      }
      
      const activity = {
        currency: row['Currency'],
        dataSource: 'YAHOO', // Assuming all data comes from YAHOO
        date: parseDate(row['Transaction Date']),
        fee: 0, // Assuming fee is not in the CSV, set to 0 or adjust as necessary
        quantity: parseFloat(row['Shares Owned']),
        symbol: row['Symbol'],
        type: type.toUpperCase(), // Ensure type is uppercase
        unitPrice: parseFloat(row['Cost Per Share']),
      };

      // Construct the request body for a single activity
      const requestBody = { activities: [activity] };

      // Make an API call for each activity
      apiClient.importData(requestBody)
        .then(response => {
          console.log('Activity imported successfully:', response);
        })
        .catch(error => {
          console.error('Failed to import activity:', error);
          console.log(`Failed Request: ${JSON.stringify(activity, null, 2)}`)
        });
    }
  })
  .on('end', () => {
    console.log('CSV file processing completed.');
  });