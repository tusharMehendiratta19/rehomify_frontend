import React, { useState } from "react";
import "../../App.css";
import Header from "./Header";
import Footer from "./Footer";

const faqData = [
  {
    "question": "What types of furniture does ReHomify.in offer?",
    "answer": "ReHomify offers a wide range of affordable new and refurbished furniture including single beds, double beds, wardrobes, almirahs, and study tables. We serve homes, PGs, hostels, and offices across Mumbai."
  },
  {
    "question": "Do you provide a buyback guarantee on furniture?",
    "answer": "Yes. We offer a 100% buyback guarantee on our new furniture, allowing you to return products in good condition within a specified time frame. This makes buying furniture more affordable than renting."
  },
  {
    "question": "How can I track my furniture order?",
    "answer": "Once your order is dispatched, you can track it in the 'My Orders' section on ReHomify.in. You’ll also receive updates via SMS or email."
  },
  {
    "question": "What is the estimated delivery time for furniture orders in Mumbai?",
    "answer": "Delivery usually takes 5–10 business days depending on your location. We ensure fast, safe, and hassle-free delivery across Mumbai including Andheri, Bandra, Versova, and more."
  },
  {
    "question": "How do you ensure the quality of refurbished furniture?",
    "answer": "Our refurbished furniture goes through deep cleaning, quality checks, and necessary repairs before being listed. Each product is hygienic, durable, and ready to use, making it a reliable choice for customers."
  },
  {
    "question": "What is your return and exchange policy?",
    "answer": "We allow returns and exchanges within a specified period after delivery. For details on refunds, replacements, and conditions, please refer to our Return Policy page."
  },
  {
    "question": "How can I contact ReHomify customer support?",
    "answer": "You can email us at admin@rehomify.in or reach us through the Contact Us page on our website."
  },
  {
    "question": "Where can I buy affordable wardrobes, beds, and tables in Mumbai?",
    "answer": "With ReHomify.in, you can skip long market trips and shop directly online. We offer wardrobes, beds, and study tables in Mumbai, available in both new and refurbished options, with easy EMI and doorstep delivery."
  },
  {
    "question": "Is it better to buy or rent furniture in Mumbai?",
    "answer": "Buying is usually smarter than renting, especially for long-term use. Rental costs often equal or exceed the cost of buying within a year. With our buyback guarantee, buying from ReHomify is more cost-effective than renting."
  },
  {
    "question": "Is engineered wood good for beds and wardrobes?",
    "answer": "Yes. Engineered wood beds and wardrobes are popular for their strength, durability, and smooth finishes. They are affordable compared to solid wood and ideal for urban homes and student housing."
  },
  {
    "question": "How long does engineered wood furniture last?",
    "answer": "Good-quality engineered wood furniture can last 7–10 years with proper care. Avoid direct water exposure and use mats/coasters to extend its life."
  },
  {
    "question": "Which is better: engineered wood or solid wood?",
    "answer": "Solid wood is heavy, long-lasting, and premium.\n\nEngineered wood is affordable, termite-resistant, and stylish.\nIf you want budget-friendly modern furniture, engineered wood is a great choice."
  },
  {
    "question": "Is second-hand furniture hygienic and safe?",
    "answer": "Yes. At ReHomify, all second-hand furniture goes through cleaning, polishing, and quality checks before delivery, ensuring it is hygienic and ready to use."
  },
  {
    "question": "Do you offer EMI on furniture purchases?",
    "answer": "Yes the service will be available soon. We provide easy EMI options so you can buy wardrobes, beds, and tables without financial stress."
  },
  {
    "question": "Do you provide furniture delivery across Mumbai?",
    "answer": "Yes. We deliver to most areas in Mumbai. You can check the delivery service before ordering the furniture."
  },
  {
    "question": "Which bed is best: single, double, queen, or king size?",
    "answer": "The choice depends on your space and needs:\n\n- Single bed – ideal for students and PGs\n- Double bed – compact for couples or small rooms\n- Queen bed – balance of comfort and size\n- King bed – spacious and luxurious for large rooms"
  },
  {
    "question": "Is it worth buying a bed with storage?",
    "answer": "Yes. A bed with storage is a practical choice in Mumbai homes where space is limited. It helps store clothes, bedding, and essentials without extra furniture."
  },
  {
    "question": "Are engineered wood wardrobes durable?",
    "answer": "Yes. With proper care, engineered wood wardrobes are durable, stylish, and perfect for compact city homes."
  },
  {
    "question": "What is the average price of wardrobes in Mumbai?",
    "answer": "The price of wardrobes in Mumbai varies by size and material. At ReHomify.in, we offer affordable wardrobes starting from budget-friendly options to premium designs, both in new and refurbished categories."
  },
  {
    "question": "Why should I buy second-hand furniture instead of renting?",
    "answer": "Buying second-hand furniture is cheaper in the long run compared to renting. Plus, ReHomify offers buyback and replacement options, making your purchase flexible and cost-efficient."
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
