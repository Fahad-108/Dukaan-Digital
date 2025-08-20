import React from "react";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 px-6 py-12 md:px-20">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Page Heading */}
        <h1 className="text-4xl font-bold text-blue-700 text-center md:text-left">
          About Dukaan Digital
        </h1>
        <p className="text-lg leading-relaxed">
          Dukaan Digital isn't just a platform; it's a solution crafted for the heart of local commerce. We are a modern shop management platform built to help shopkeepers, small business owners, and entrepreneurs take control of their business. In an increasingly digital world, we recognize that small shops face unique challenges, and our goal is to empower them with the right tools to thrive.
        </p>

        {/* Our Story Section */}
        <section>
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">
            Our Story
          </h2>
          <p className="text-base leading-relaxed">
            The idea for Dukaan Digital was born from a simple observation: despite the rise of advanced technology, many local businesses still rely on manual ledgers and outdated methods. We saw hardworking shopkeepers spending countless hours managing inventory on paper, tracking credit (udhaar) in notebooks, and manually tallying daily sales. We decided to create an intuitive, powerful, and easy-to-use digital solution that replaces those inefficiencies with seamless automation. Our journey began with a mission to bridge the technology gap for small businesses, one shop at a time.
          </p>
        </section>

        {/* Our Mission Section */}
        <section>
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">
            Our Mission
          </h2>
          <p className="text-base leading-relaxed">
            Our mission is to empower shopkeepers with a simple yet powerful tool that brings transparency and efficiency to their daily operations. We are dedicated to replacing manual registers and complex systems with a user-friendly digital solution that is accessible to everyone. By simplifying tasks like sales tracking, inventory management, and expense logging, we enable business owners to make smarter decisions and focus on what truly matters: serving their customers and growing their business.
          </p>
        </section>

        {/* What We Offer Section */}
        <section>
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">
            Key Features
          </h2>
          <p className="text-base leading-relaxed mb-4">
            Dukaan Digital offers a comprehensive suite of features designed to streamline every aspect of your business operations. Our platform provides a centralized hub for all your data, ensuring you always have a clear view of your business's health.
          </p>
          <ul className="list-disc list-inside space-y-3 text-base">
            <li>
              <b>Real-Time Sales and Purchase Tracking:</b> Instantly record and monitor every transaction, giving you a live look at your business's performance.
            </li>
            <li>
              <b>Hassle-Free Stock and Inventory Management:</b> Effortlessly add, update, and manage your products. Get low-stock alerts to ensure you never run out of a key item again.
            </li>
            <li>
              <b>Reliable Udhaar (Credit) and Payment Records:</b> Ditch the notebooks. Our system securely tracks all outstanding credit and payments, making collection and reconciliation a breeze.
            </li>
            <li>
              <b>Comprehensive Business Reports:</b> Generate insightful reports on sales, expenses, and profit margins to help you make informed business decisions.
            </li>
            <li>
              <b>Intuitive and Easy-to-Use Interface:</b> Designed with non-technical users in mind, our platform is simple to navigate and requires minimal training.
            </li>
            <li>
              <b>Secure and Accessible Anywhere:</b> Your data is safely stored in the cloud, allowing you to manage your business from any device, anytime.
            </li>
          </ul>
        </section>

        {/* Our Vision Section */}
        <section>
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">
            Our Vision
          </h2>
          <p className="text-base leading-relaxed">
            We believe that small businesses are the backbone of the economy. Our vision is to create a future where every shopkeeper, regardless of their size or location, has access to the digital tools they need to succeed. By empowering them with technology, we aim to help them not only survive but also grow, scale, and confidently compete in a digital world. We are committed to fostering a vibrant ecosystem of successful small businesses.
          </p>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;