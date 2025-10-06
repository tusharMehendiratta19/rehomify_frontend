import React from "react";
import "../allStyles/ChooseWardrobe.css";
import Header from "./Header";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

const ChooseWardrobe = () => {
  const navigate = useNavigate()
  return (
    <>
      <Header />
      <div className="chooseWardrobe-container">
        <h1 className="chooseWardrobe-title">Choose the Perfect Wardrobe</h1>

        <p className="chooseWardrobe-paragraph">
          Choosing the right wardrobe in 2025 is about much more than storage—it’s
          about finding the perfect balance of style, function, and durability.
          With evolving lifestyles and compact city homes, wardrobes today must be
          space-efficient, stylish, and long-lasting. Whether you’re considering
          solid wood or engineered wood (including particle and MDF options), the
          right choice depends on your needs and priorities.
        </p>

        <h2 className="chooseWardrobe-subtitle">Understanding Your Storage Needs</h2>
        <ul className="chooseWardrobe-list">
          <li>Do you need more hanging space or shelving for folded clothes?</li>
          <li>Would drawers help with accessories and smaller items?</li>
          <li>Do you need loft storage for bulky, seasonal belongings?</li>
          <li>Are you furnishing for adults, kids, or shared spaces?</li>
        </ul>
        <p className="chooseWardrobe-paragraph">
          Asking these questions upfront ensures you select a wardrobe that truly
          fits your lifestyle rather than just filling a corner of your bedroom.
        </p>

        <h2 className="chooseWardrobe-subtitle">Choosing Between Solid Wood and Engineered Wood</h2>

        <h3 className="chooseWardrobe-subsubtitle">Solid Wood Wardrobes</h3>
        <p className="chooseWardrobe-paragraph">
          Solid wood has always been associated with luxury, craftsmanship, and
          longevity. These wardrobes are sturdy and can last for decades if well
          maintained. However, they come with certain downsides:
        </p>
        <ul className="chooseWardrobe-list">
          <li>High cost compared to other options.</li>
          <li>Heavy weight, making them harder to move during relocation.</li>
          <li>Regular maintenance needed to protect from termites or moisture.</li>
        </ul>

        <h3 className="chooseWardrobe-subsubtitle">Engineered Wood Wardrobes (Including Particle & MDF)</h3>
        <p className="chooseWardrobe-paragraph">
          Engineered wood has quickly become the go-to choice for modern homes.
          Unlike solid wood, it’s crafted to balance affordability with style and
          resilience. Some key advantages include:
        </p>
        <ul className="chooseWardrobe-list">
          <li>Budget-friendly without compromising on looks.</li>
          <li>Lightweight and versatile, ideal for compact Mumbai-style apartments.</li>
          <li>Multiple finishes—laminates, matte, glossy, or textured—to match modern interiors.</li>
          <li>Low maintenance, with smooth finishes that resist scratches and stains.</li>
        </ul>
        <p className="chooseWardrobe-paragraph">
          Earlier, particle board and MDF had a reputation for being less durable.
          But with today’s advanced manufacturing, engineered wood wardrobes are
          far stronger, resistant to warping, and better suited to city living.
          This makes them an excellent balance of value, aesthetics, and practicality.
        </p>

        <h2 className="chooseWardrobe-subtitle">Sizes and Layout Options</h2>
        <ul className="chooseWardrobe-list">
          <li><strong>2-door wardrobes:</strong> Compact, efficient, and versatile—perfect for smaller bedrooms and city apartments. Easier to transport and usually have better resale demand.</li>
          <li><strong>3-door wardrobes:</strong> Extra storage for couples or families but heavier and less flexible. Lower resale value.</li>
          <li><strong>4-door wardrobes:</strong> Spacious and ideal for large bedrooms or joint families but harder to dismantle and resell.</li>
          <li><strong>Custom modular wardrobes:</strong> Maximize storage and personalization but not always easy to relocate.</li>
        </ul>

        <h2 className="chooseWardrobe-subtitle">Features That Enhance Daily Living</h2>
        <ul className="chooseWardrobe-list">
          <li>Built-in mirrors to double as a dressing unit.</li>
          <li>Soft-close doors and drawers for smooth, quiet use.</li>
          <li>Lockable compartments for jewellery and valuables.</li>
          <li>Loft storage to keep luggage or seasonal items out of sight.</li>
        </ul>

        <h2 className="chooseWardrobe-subtitle">Style and Design That Fits Your Home</h2>
        <ul className="chooseWardrobe-list">
          <li>Minimalist designs in neutral tones like white, beige, or grey.</li>
          <li>Textured and matte finishes that add depth and elegance.</li>
          <li>Two-tone wardrobes for a stylish modern touch.</li>
          <li>Custom handles and panels to reflect your personal taste.</li>
        </ul>
        <p className="chooseWardrobe-paragraph">
          Engineered wood wardrobes, in particular, shine here because they can be
          customized with a wide range of finishes and styles—something that’s
          harder to achieve with heavy, traditional solid wood.
        </p>

        <h2 className="chooseWardrobe-subtitle">Final Thoughts</h2>
        <p className="chooseWardrobe-paragraph">
          If you’re choosing a wardrobe in 2025, both solid wood and engineered
          wood have their place. Solid wood wardrobes bring unmatched heritage and
          longevity but can be expensive and high-maintenance. Engineered wood
          wardrobes (including particle board and MDF) provide a modern,
          affordable, and versatile solution, perfect for city homes where space,
          style and budget matter.
        </p>
        <p className="chooseWardrobe-paragraph">
          The smartest choice depends on your lifestyle—but for most modern
          households, engineered wood wardrobes offer the best mix of durability,
          design, and value.
        </p>

        <div className="chooseWardrobe-cta-box">
          <p>
            For finding your smart choice, visit{" "}
            <span className="chooseWardrobe-brand" onClick={()=>navigate("/home")}>Rehomify</span>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ChooseWardrobe;
