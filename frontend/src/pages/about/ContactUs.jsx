import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookSquare, faInstagramSquare, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const ContactUs = () => {
    return (
        <div className="min-h-screen bg-blue-50 text-gray-800 py-16 px-6 sm:px-10">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-800 mb-4">
                        Get in Touch with Dukaan Digital
                    </h1>
                    <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                        We're here to help you succeed. Whether you have a question about our platform, need technical support, or want to explore partnership opportunities, feel free to reach out. We look forward to hearing from you.
                    </p>
                </div>
                <div className="grid lg:grid-cols-2 gap-12">
                    <div>
                        <div className="bg-white shadow-lg rounded-2xl p-8 mb-8">
                            <h2 className="text-2xl font-bold text-blue-700 mb-4">Our Contact Details</h2>
                            <p className="mb-4">
                                You can reach out to our dedicated support team via phone or email during our business hours.
                            </p>
                            <div className="space-y-4">
                                <div className="flex items-center space-x-3">
                                    <span className="text-blue-600 text-xl">📞</span>
                                    <p><b>Phone:</b> +92 300 1234567</p>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <span className="text-blue-600 text-xl">📧</span>
                                    <p><b>Email:</b> <a href="mailto:support@dukaandigital.com" className="text-blue-600 hover:underline">support@dukaandigital.com</a></p>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <span className="text-blue-600 text-xl">📍</span>
                                    <p><b>Address:</b> Main Market, Kotla Arab Ali Khan, District Gujrat, Punjab, Pakistan</p>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <span className="text-blue-600 text-xl">🌐</span>
                                    <p><b>Website:</b> <a href="http://www.dukaandigital.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">www.dukaandigital.com</a></p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white shadow-lg rounded-2xl p-8">
                            <h2 className="text-2xl font-bold text-blue-700 mb-4">Office Hours & Socials</h2>
                            <div className="mb-4">
                                <p>
                                    Our support team is available to assist you during the following hours:
                                </p>
                                <p className="mt-2">
                                    <b>Monday - Friday:</b> 9:00 AM to 5:00 PM (PKT)
                                </p>
                            </div>
                            <div>
                                <p className="mb-2">Follow us on social media for updates:</p>
                                <div className="flex space-x-4 text-2xl text-blue-600">
                                    <a href="https://www.linkedin.com/in/fahad-raza-779524372/" target='__blank' aria-label="LinkedIn">
                                        <FontAwesomeIcon icon={faLinkedin} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white shadow-lg rounded-2xl p-8">
                        <h2 className="text-2xl font-bold text-blue-700 mb-6">Send us a Message</h2>
                        <form className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Your Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                    placeholder="e.g., Muhammad Ali"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Your Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                    placeholder="e.g., yourname@example.com"
                                />
                            </div>
                            <div>
                                <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
                                <select
                                    id="subject"
                                    className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                >
                                    <option value="">Select an inquiry type</option>
                                    <option value="technical_support">Technical Support</option>
                                    <option value="billing_inquiry">Billing Inquiry</option>
                                    <option value="partnership">Partnership Opportunity</option>
                                    <option value="general_feedback">General Feedback</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Your Message</label>
                                <textarea
                                    id="message"
                                    rows="5"
                                    className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                    placeholder="Write your message here..."
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-medium"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
                <div className="mt-16 bg-white shadow-lg rounded-2xl p-8">
                    <h2 className="text-2xl font-bold text-blue-700 mb-4">Frequently Asked Questions</h2>
                    <div className="space-y-6">
                        <div>
                            <h3 className="font-semibold text-lg text-gray-900">
                                How do I get started with Dukaan Digital?
                            </h3>
                            <p className="mt-1 text-gray-600">
                                You can easily sign up for an account on our website. Our intuitive onboarding process will guide you through setting up your shop, adding products, and making your first sale.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg text-gray-900">
                                Is my business data secure with you?
                            </h3>
                            <p className="mt-1 text-gray-600">
                                Yes, data security is our top priority. We use robust encryption and secure cloud servers to ensure that all your business data is protected from unauthorized access. For more details, please see our Privacy Policy.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg text-gray-900">
                                What if I forget my password?
                            </h3>
                            <p className="mt-1 text-gray-600">
                                You can reset your password directly from the login page. Simply click on the "Forgot Password" link and follow the instructions sent to your registered email address.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContactUs