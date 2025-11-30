import { type FormEvent, type ChangeEvent, useRef, useState } from "react";
import ContactHeader from "~/components/contactHeader";
import { supabase } from "~/supabase_client";
import emailjs from "@emailjs/browser";

interface User {
  name: string;
  email: string;
  comment: string;
}

export default function Contact() {
  const form = useRef<HTMLFormElement>(null);
  const [user, setUser] = useState<User>({ name: "", email: "", comment: "" });
  const [formStatus, setFormStatus] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const sendEmail = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Validation check
    if (!user.name || !user.email || !user.comment) {
      alert("Please enter your information");
      setIsLoading(false);
      return;
    }

    try {
      // 1. Save to database first
      const { data: dbData, error: dbError } = await supabase
        .from("contact_messages")
        .insert([
          {
            name: user.name,
            email: user.email,
            message: user.comment,
          },
        ])
        .select();

      if (dbError) throw new Error(`Database error: ${dbError.message}`);

      // 2. Send email via EmailJS using sendForm
      if (!form.current) {
        throw new Error("Form reference is null");
      }

      await emailjs.sendForm(
        "service_vgkozvc",
        "template_sv5btsr",
        form.current,
        {
          publicKey: import.meta.env.VITE_CONTACT_PUBLIC_KEY,
        }
      );

      // Success
      setFormStatus(
        "Thank you! Your message has been sent successfully. We'll get back to you within 24 hours."
      );
      setUser({ name: "", email: "", comment: "" });

      setTimeout(() => {
        setFormStatus(null);
      }, 5000);
    } catch (error) {
      console.error("Error:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      setFormStatus(`Failed to send message: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <ContactHeader />

      {/* Contact Form Section */}
      <section className="py-16 bg-linear-to-br from-amber-50 to-orange-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Get In Touch
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Have questions about our premium coffee blends or need brewing
              advice? Our coffee experts are here to help you find the perfect
              cup.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <form ref={form} onSubmit={sendEmail} className="space-y-8">
              {/* Name Field */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={user.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition duration-200"
                  placeholder="Enter your full name"
                />
              </div>

              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition duration-200"
                  placeholder="your.email@example.com"
                />
              </div>

              {/* Message Field */}
              <div>
                <label
                  htmlFor="comment"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Your Message *
                </label>
                <textarea
                  id="comment"
                  name="comment"
                  value={user.comment}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition duration-200 resize-vertical"
                  placeholder="Tell us about your coffee journey, questions about our blends, or how we can help you..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-linear-to-r from-amber-600 to-orange-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:from-amber-700 hover:to-orange-700 transform hover:scale-105 transition duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Sending..." : "Send Message"}
              </button>
            </form>

            {/* Status Messages */}
            {formStatus && (
              <div
                className={`mt-8 p-4 rounded-lg ${
                  formStatus.includes("successfully")
                    ? "bg-green-50 border border-green-200 text-green-800"
                    : "bg-red-50 border border-red-200 text-red-800"
                }`}
              >
                <div className="flex items-center">
                  <div className="shrink-0">
                    {formStatus.includes("successfully") ? (
                      <svg
                        className="h-5 w-5 text-green-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="h-5 w-5 text-red-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium">{formStatus}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Additional Contact Info */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-6 h-6 text-amber-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Call Us</h3>
                  <p className="text-gray-600">+1 (555) 123-4567</p>
                </div>

                <div>
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-6 h-6 text-amber-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Email Us</h3>
                  <p className="text-gray-600">hello@coffeecompany.com</p>
                </div>

                <div>
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-6 h-6 text-amber-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Visit Us</h3>
                  <p className="text-gray-600">Mon - Fri: 8AM - 6PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
