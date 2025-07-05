import React, { useState } from "react";
import "../../App.css";
import Header from "./Header";
import Footer from "./Footer";

const faqData = [
  {
    question: "What is ReHomify?",
    answer: "ReHomify is an online marketplace to buy and sell pre-owned furniture."
  },
  {
    question: "How do I list my furniture?",
    answer: "Click 'Sell Your Furniture', choose a category, fill the details, and submit."
  },
  {
    question: "Is there a listing fee?",
    answer: "No, listing your furniture is completely free on ReHomify."
  },
  {
    question: "How are buyers verified?",
    answer: "We verify buyers through email and phone OTP authentication."
  },
  {
    question: "Can I edit my listing?",
    answer: "Yes, go to your dashboard and click 'Edit' next to your listing."
  },
  {
    question: "How long does a listing stay active?",
    answer: "Listings stay active for 30 days unless sold or removed earlier."
  },
  {
    question: "Is delivery provided?",
    answer: "Delivery is available in selected cities through our partner logistics."
  },
  {
    question: "How do I contact customer support?",
    answer: "You can reach us via the 'Contact Us' page or email support@rehomify.com."
  },
  {
    question: "Can I sell as a business?",
    answer: "Yes, register as a Seller and you'll get a dedicated portal."
  },
  {
    question: "What payment methods are accepted?",
    answer: "We accept UPI, credit/debit cards, and net banking."
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
    <Header />
    <div className="faq-wrapper">
      <h2 className="faq-heading">Frequently Asked Questions</h2>
      <div className="faq-container">
        {faqData.map((item, index) => (
          <div key={index} className="faq-item">
            <div
              className="faq-question"
              onClick={() => toggleAccordion(index)}
            >
              {item.question}
              <span className="faq-toggle">
                {openIndex === index ? "-" : "+"}
              </span>
            </div>
            {openIndex === index && (
              <div className="faq-answer">{item.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
    <Footer />
    </>
  );
};

export default FAQ;
