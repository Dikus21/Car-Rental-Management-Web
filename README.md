# Car Management Front End

This repository contains the front-end code for the Car Management application. It is built using Vite and React with TypeScript. The website provides information about the company, its motto, and user reviews, as well as a list of cars available for rent. There is also an admin feature that allows administrators to monitor and manage the car inventory.

Deployed website: https://keygo.netlify.app/

## Tech Stack

- **Frontend Framework**: React
- **Build Tool**: Vite
- **Programming Language**: TypeScript
- **Package Manager**: Yarn
- **CSS Framework**: Bootstrap 5

## Features

- **Company Profile**: View information about the company, including its history and mission statement.
- **Company Motto**: Learn about the company's motto and values.
- **User Reviews**: Read reviews from other users about their experiences.
- **Car Listing**: Browse a list of cars available for rent.
- **Admin Features**:
  - Monitor car inventory
  - Add new cars
  - Edit car details
  - Delete cars from the inventory

## Getting Started

Follow these steps to get the project up and running locally.

### Prerequisites

Make sure you have the following installed on your machine:

- Node.js
- Yarn or npm

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/car-management-frontend.git
cd car-management-frontend
```

2. Install the dependencies:

```bash
yarn
# or if you use npm
npm install
```
### Environment Variables
Create a .env file in the root of the project folder and add the necessary environment variables. 
```
VITE_API_URL=http://localhost:8080
```
Please make sure you have already cloned and installed my [car-management-api](https://github.com/Dikus21/Car-Management-API) repository

#### OR

For Deployment API you can use: https://marginal-kristel-rat-org-1f2a12bb.koyeb.app/

### Running the Development Server

```bash
yarn dev
# or if you use npm
npm run dev
```

## Testing Account

### USER *(Normal user)*

**Email**: user@mail.com

**Password**: 12345

### ADMIN *(Can access admin auth feature)*

**Email**: admin@mail.com

**Password**: 12345

### SUPER ADMIN *(Have all admin ability and can create ADMIN auth account)*

**Email**: super@mail.com

**Password**: 12345

😊 Goodluck 🚀
