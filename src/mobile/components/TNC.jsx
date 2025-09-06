import React from "react";
import "../allStyles/tnc.css"; // create this file for styling
import Header from "../components/Header";
import Footer from "../components/Footer";

const TNC = () => {
    return (
        <>
            <Header />
            <div className="policy-container">
                <h1 className="policy-title">Returns & Replacements Policy</h1>
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

                <p className="policy-disclaimer">
                    <strong>Disclaimer:</strong> By placing an order on our website, you acknowledge and agree to
                    the terms of this Returns & Replacements Policy.
                </p>
            </div>
            <Footer />
        </>
    );
};

export default TNC;
