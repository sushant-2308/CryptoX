# CryptoX - Cryptocurrency Price Monitoring Application

This is a full-stack web application developed to monitor real-time changes in cryptocurrency prices. It provides a user-friendly interface with live updates and incorporates TradingView charts to provide detailed technical analysis of the cryptocurrency market. The application is built using Node.js for the backend, which serves a REST API, and React for the frontend.

## Tech Stack

- HTML
- CSS
- JavaScript
- React
- Bootstrap
- Node.js

## Features

- Real-time cryptocurrency price monitoring
- Live updates for price changes
- Detailed technical analysis using TradingView charts
- User-friendly interface with responsive design
- RESTful API for retrieving cryptocurrency data
- Easy integration with different cryptocurrency exchanges

## Installation

1. Clone the repository: `git clone https://github.com/your-username/cryptocurrency-price-monitoring`
2. Navigate to the project directory: `cd cryptocurrency-price-monitoring`
3. Install the dependencies for the backend: `npm install`
4. Install the dependencies for the frontend: `cd client && npm install`
5. Start the backend server: `npm start`
6. In a separate terminal, start the frontend development server: `cd client && npm start`
7. Access the application in your browser at `http://localhost:3000`

## Configuration

To configure the application, you may need to update certain parameters:

- API endpoints: If you are using a specific cryptocurrency data provider, update the API endpoints in the backend code (`server.js`) to retrieve the required data.
- TradingView integration: To use TradingView charts, you will need to sign up for an account and obtain the necessary API key. Update the code in the frontend (`Chart.js`) to include your API key.

## Usage

1. Launch the application by following the installation instructions.
2. On the homepage, you will see a list of available cryptocurrencies and their current prices.
3. Click on a specific cryptocurrency to view more detailed information.
4. The application will continuously update the prices in real time, reflecting any changes in the market.
5. To view the TradingView chart, click on the "Chart" button on the cryptocurrency details page.
6. The chart will provide a comprehensive overview of the cryptocurrency's price history, along with various technical indicators and analysis tools.
