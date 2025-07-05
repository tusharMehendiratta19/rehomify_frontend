import React, { useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "../sellerstyles/sellerTransactions.css";

import SellerNav from "./SellerNav";
import SellerHeader from "./SellerHeader";
const sampleTransactions = [
  { id: "TXN1001", debit: 200, credit: 0 },
  { id: "TXN1002", debit: 0, credit: 500 },
  { id: "TXN1003", debit: 300, credit: 0 },
  { id: "TXN1004", debit: 0, credit: 200 },
  { id: "TXN1005", debit: 400, credit: 0 },
  { id: "TXN1006", debit: 0, credit: 100 },
  { id: "TXN1007", debit: 100, credit: 0 },
  { id: "TXN1008", debit: 0, credit: 700 },
  { id: "TXN1009", debit: 250, credit: 0 },
  { id: "TXN1010", debit: 0, credit: 150 },
  { id: "TXN1011", debit: 0, credit: 150 },
  { id: "TXN1012", debit: 500, credit: 0 },
  { id: "TXN1013", debit: 300, credit: 0 },
  { id: "TXN1014", debit: 0, credit: 150 },
  { id: "TXN1015", debit: 0, credit: 150 },
];

const sellerTransactions = () => {
  const [transactions, setTransactions] = useState(sampleTransactions);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortKey, setSortKey] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  const itemsPerPage = 10;

  const sortData = (key) => {
    const order = sortKey === key && sortOrder === "asc" ? "desc" : "asc";
    const sorted = [...transactions].sort((a, b) => {
      if (a[key] < b[key]) return order === "asc" ? -1 : 1;
      if (a[key] > b[key]) return order === "asc" ? 1 : -1;
      return 0;
    });
    setSortKey(key);
    setSortOrder(order);
    setTransactions(sorted);
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    const tableColumn = ["S.No.", "Transaction ID", "Debit", "Credit"];
    const tableRows = [];

    transactions.forEach((txn, index) => {
      const rowData = [index + 1, txn.id, txn.debit, txn.credit];
      tableRows.push(rowData);
    });

    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    doc.text("Seller Transaction Report", 14, 15);
    doc.save("seller_transaction_report.pdf");
  };

  const paginatedData = transactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(transactions.length / itemsPerPage);

  return (
    <>
      
      <div className="seller-transaction-container">
        <div className="seller-transaction-header">
          <h2>Transaction History</h2>
          <button className="seller-download-btn" onClick={downloadPDF}>
            Download in PDF
          </button>
        </div>
        <table className="seller-transaction-table">
          <thead>
            <tr>
              <th>S.No.</th>
              <th onClick={() => sortData("id")}>Transaction ID</th>
              <th onClick={() => sortData("debit")}>Debit</th>
              <th onClick={() => sortData("credit")}>Credit</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((txn, index) => (
              <tr key={txn.id}>
                <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                <td>{txn.id}</td>
                <td>{txn.debit}</td>
                <td>{txn.credit}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="seller-pagination">
          <button
            onClick={() => setCurrentPage((prev) => prev - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => prev + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default sellerTransactions;
