import React from "react";
import "../allStyles/tnc.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

const TNC = () => {
    return (
        <>
            <Header />
            <div className="policy-container">
                <h1 className="policy-title">Returns, Replacements and Buy Back Policy</h1>
                <p className="policy-intro">
                    At Rehomify, we take utmost care to ensure that your furniture is delivered in good
                    condition. This Policy governs the terms under which customers may seek repair or
                    replacement of products purchased through our website.
                </p>

                <section className="policy-section">
                    <h2>1. Reporting of Damages</h2>
                    <ul>
                        <li>
                            Any damage or defect must be reported to Rehomify at the time of
                            delivery/installation, supported with clear photographs or videos of the affected product.
                        </li>
                        <li>
                            Claims made after this period will not be considered under this Policy.
                        </li>
                    </ul>
                </section>

                <section className="policy-section">
                    <h2>2. Scope of Replacement/Repair</h2>
                    <ul>
                        <li>
                            <strong>Minor Damages</strong> (scratches, alignment issues, fittings, minor chips): We will
                            arrange for repair or rectification on-site at no additional cost.
                        </li>
                        <li>
                            <strong>Major Damages</strong> (structural breakage, unusable parts): We will arrange for
                            replacement of the affected component(s). Where repair or part replacement is not
                            feasible, a full product replacement will be provided at our discretion.
                        </li>
                    </ul>
                </section>

                <section className="policy-section">
                    <h2>3. Exclusions</h2>
                    <p>This Policy does not cover:</p>
                    <ul>
                        <li>
                            Damages arising from misuse, mishandling, relocation, or improper installation by persons
                            other than our authorized technicians.
                        </li>
                        <li>Normal wear and tear resulting from usage.</li>
                        <li>
                            Natural variations in texture, grain, colour, or finish of wood or other materials.
                        </li>
                    </ul>
                </section>

                <section className="policy-section">
                    <h2>4. Process</h2>
                    <ol>
                        <li>
                            Customers must share order details and evidence of damage through the contact channels
                            provided in our About Us section (email/helpline/WhatsApp).
                        </li>
                        <li>
                            Upon verification, our team will schedule service within a reasonable period, typically 2–3
                            business days.
                        </li>
                        <li>The decision regarding repair or replacement shall rest solely with Rehomify.</li>
                    </ol>
                </section>

                <section className="policy-section">
                    <h2>5. Non-Returnable Products</h2>
                    <p>
                        All products are non-returnable once delivered, except in cases covered under this Policy.
                    </p>
                </section>

                {/* Added Buyback Policy Section */}
                <section className="policy-section">
                    <h2>6. Buyback Policy</h2>

                    <h3>Purpose</h3>
                    <p>
                        At Rehomify, we understand that your furniture needs can change over time. Our Buyback Policy allows you to return your newly purchased furniture after use and recover part of its value — keeping your home setup flexible, affordable, and sustainable.
                    </p>

                    <h3>Eligibility</h3>
                    <ul>
                        <li>The buyback guarantee is available only on new product purchases made through Rehomify. Refurbished or pre-owned furniture is not covered.</li>
                        <li>The furniture must be in usable condition — no major cracks, water damage, or missing parts.</li>
                        <li>Buyback requests must be made within 24 months of purchase, with at least 30 days’ prior notice.</li>
                        <li>
                            If our partner shops cannot repurchase the item due to demand or space limits, Rehomify will provide a flat refund:
                            <ul>
                                <li>₹500–₹1,000 if in excellent condition and less than 1 year old</li>
                                <li>₹500 if more than 1 year old</li>
                            </ul>
                        </li>
                    </ul>

                    <h3>Buyback Value</h3>
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
                        *Prices exclude dismantling (“unfixing”) and pickup costs, which will be deducted from the final amount. Final value is determined after inspection or customer-shared media.
                    </p>

                    <h3>Inspection Process</h3>
                    <ol>
                        <li>Customers share images or a short video showing current condition.</li>
                        <li>Partner stores verify structural stability and usability.</li>
                        <li>A buyback quote is shared within 24–48 hours after evaluation.</li>
                    </ol>

                    <h3>Pickup & Payment</h3>
                    <ul>
                        <li>Pickups are arranged through Rehomify’s delivery partners or associated stores.</li>
                        <li>Once approved and collected, payment is made within 24 hours via UPI or bank transfer.</li>
                    </ul>

                    <h3>Exclusions</h3>
                    <ul>
                        <li>Refurbished or pre-owned furniture</li>
                        <li>Broken, water-damaged, termite-affected, or structurally modified furniture</li>
                        <li>Items sold under “as-is,” “clearance,” or “final sale” categories</li>
                        <li>Products older than 24 months from purchase</li>
                    </ul>

                    <h3>Terms & Conditions</h3>
                    <ul>
                        <li>Rehomify reserves the right to accept, reject, or revise any buyback quote after inspection.</li>
                        <li>The assured refund applies only if the item is in usable condition but cannot be repurchased.</li>
                        <li>Requests made without 30 days’ notice may result in lower value or delayed pickup.</li>
                        <li>Market demand and partner store capacity may influence acceptance of a buyback request.</li>
                    </ul>
                </section>

                <p className="policy-disclaimer">
                    <strong>Disclaimer:</strong> By placing an order on our website, you acknowledge and agree to
                    the terms of this Returns & Replacements Policy and Buyback Policy.
                </p>
            </div>
            <Footer />
        </>
    );
};

export default TNC;
