# Stocks Tracker to Ghostfolio Importer

This Node.js script automates the process of importing stock transaction data from CSV files exported by the Stocks Tracker app into Ghostfolio. It reads stock transaction records from a CSV file and uses the Ghostfolio API to import each transaction as an activity.

## Features

- Parses stock transaction data from CSV files.
- Supports "BUY", "SELL", and "SELL ALL" transaction types.
- Automatically converts dates and formats to Ghostfolio's requirements.
- Makes API calls to Ghostfolio to import transactions.

## Prerequisites

Before you use this script, ensure you have the following:

- Node.js installed on your machine.
- An active Ghostfolio self hosted instance.
- An API token from Ghostfolio for authentication.
- A CSV file exported from the Stocks Tracker app containing your stock transaction data.

## Installation

1. Clone this repository to your local machine.
```
git clone https://github.com/TheekshanaA/Ghostfolio-MSP-Importer.git
```
2. Navigate to the cloned repository directory.
```
cd Ghostfolio-MSP-Importer
```
3. Install the required Node.js packages.
```
npm install
```

## Configuration

1. Obtain your Ghostfolio API token and replace `'token'` in the script with your actual API token.
2. Place your exported CSV file from Stocks Tracker into the same directory as the script or update the `csvFilePath` variable in the script with the path to your CSV file.

## Usage

1. Run the script with Node.js.
```
node run.js
```
2. The script will read the CSV file, parse each transaction, and make API calls to Ghostfolio to import them. You will see logs in the console indicating the progress and any errors.

## Notes

- The script assumes all transactions are in the currency specified in the CSV and uses "YAHOO" as the data source.
- Transaction fees are assumed to be 0 unless specified in the CSV file. Adjust the script if your CSV includes fee information.

## Contributing

Contributions are welcome. Please feel free to fork the repository, make your changes, and submit a pull request.

## License

This project is open-sourced under the MIT License. See the LICENSE file for more information.

## Disclaimer

This script is provided "as is", without warranty of any kind. Use it at your own risk.
