import React from "react";
import "../allStyles/bbp.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

const BuybackPolicy = () => {
  return (
    <>
      <Header />
      <div className="policy-container">
        <h1 className="policy-title">Rehomify Buyback Policy</h1>

        <section className="policy-section">
          <h2>1. Purpose</h2>
          <p>
            At Rehomify, we understand that your furniture needs can change over
            time. Our Buyback Policy allows you to return your newly purchased
            furniture after use and recover part of its value — keeping your
            home setup flexible, affordable, and sustainable.
          </p>
        </section>

        <section className="policy-section">
          <h2>2. Eligibility</h2>
          <ul>
            <li>
              The buyback guarantee is available only on new product purchases
              made through Rehomify. Refurbished or pre-owned furniture is not
              covered.
            </li>
            <li>
              The furniture must be in usable condition — no major cracks, water
              damage, or missing parts.
            </li>
            <li>
              Buyback requests must be made within 24 months of purchase, with
              at least 30 days’ prior notice.
            </li>
            <li>
              If our partner shops cannot repurchase the item due to demand or
              space limits, Rehomify will provide a flat refund:
              <ul>
                <li>₹500–₹1,000 if in excellent condition and less than 1 year old</li>
                <li>₹500 if more than 1 year old</li>
              </ul>
            </li>
          </ul>
        </section>

        <section className="policy-section">
          <h2>3. Buyback Value</h2>
          <table className="policy-table">
            <thead>
              <tr>
                <th>Usage Period</th>
                <th>Condition</th>
                <th>Approx. Buyback Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>0–3 months</td>
                <td>Excellent</td>
                <td>50–60% of purchase price</td>
              </tr>
              <tr>
                <td>3–6 months</td>
                <td>Good</td>
                <td>35–45% of purchase price</td>
              </tr>
              <tr>
                <td>6–12 months</td>
                <td>Fair</td>
                <td>20–30% of purchase price</td>
              </tr>
              <tr>
                <td>12–24 months</td>
                <td>Fair/Usable</td>
                <td>10–20% of purchase price</td>
              </tr>
              <tr>
                <td>After 24 months</td>
                <td>–</td>
                <td>Buyback not available</td>
              </tr>
            </tbody>
          </table>
          <p>
            *Prices exclude dismantling (“unfixing”) and pickup costs, which
            will be deducted from the final amount. Final value is determined
            after inspection or customer-shared media.
          </p>
        </section>

        <section className="policy-section">
          <h2>4. Inspection Process</h2>
          <ol>
            <li>
              Customers share images or a short video showing current condition.
            </li>
            <li>Partner stores verify structural stability and usability.</li>
            <li>
              A buyback quote is shared within 24–48 hours after evaluation.
            </li>
          </ol>
        </section>

        <section className="policy-section">
          <h2>5. Pickup & Payment</h2>
          <ul>
            <li>
              Pickups are arranged through Rehomify’s delivery partners or
              associated stores.
            </li>
            <li>
              Once approved and collected, payment is made within 24 hours via
              UPI or bank transfer.
            </li>
          </ul>
        </section>

        <section className="policy-section">
          <h2>6. Exclusions</h2>
          <ul>
            <li>Refurbished or pre-owned furniture</li>
            <li>
              Broken, water-damaged, termite-affected, or structurally modified
              furniture
            </li>
            <li>Items sold under “as-is,” “clearance,” or “final sale” categories</li>
            <li>Products older than 24 months from purchase</li>
          </ul>
        </section>

        <section className="policy-section">
          <h2>7. Terms & Conditions</h2>
          <ul>
            <li>
              Rehomify reserves the right to accept, reject, or revise any
              buyback quote after inspection.
            </li>
            <li>
              The assured refund applies only if the item is in usable condition
              but cannot be repurchased.
            </li>
            <li>
              Requests made without 30 days’ notice may result in lower value or
              delayed pickup.
            </li>
          </ul>
        </section>

        <p className="policy-disclaimer">
          <strong>Disclaimer:</strong> By placing an order on our website, you
          acknowledge and agree to the terms of this Buyback Policy.
        </p>
      </div>
      <Footer />
    </>
  );
};

export default BuybackPolicy;
