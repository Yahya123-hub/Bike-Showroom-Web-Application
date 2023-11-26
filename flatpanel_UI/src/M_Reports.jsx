import React, { useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';

const M_Reports = () => {
  useEffect(() => {
    const generatePDF = async () => {
      try {
        // Fetch data from MongoDB orders table
        const response = await axios.get('http://localhost:3001/GetOrders');
        const orders = response.data;

        // Create a new PDF document
        const pdf = new jsPDF();
        pdf.text('Order Report', 20, 10);

        // Add data to the PDF
        let yPosition = 20; // Adjust the starting Y position

        orders.forEach((order, index) => {
          // Check if there's enough space for the order on the current page
          if (yPosition + 10 * Object.keys(order).length > pdf.internal.pageSize.height) {
            pdf.addPage(); // Start a new page if needed
            yPosition = 20; // Reset Y position
          }

          yPosition += 10;

          // Loop through all attributes of the order
          Object.keys(order).forEach((key) => {
            const value = order[key] !== undefined ? order[key].toString() : 'N/A';
            pdf.text(`${key}: ${value}`, 20, yPosition);
            yPosition += 10;
          });

          // Add a separator line between orders
          yPosition += 5;
        });

        // Save or open the PDF
        pdf.save('sales_report.pdf');
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    generatePDF();
  }, []);

  return <div>Downloading</div>;
};

export default M_Reports;
