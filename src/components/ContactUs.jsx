import { useRef, useState } from "react";

const initialForm = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

const ContactUs = () => {
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const subjectRef = useRef(null);
  const messageRef = useRef(null);

  const inputRefs = {
    name: nameRef,
    email: emailRef,
    subject: subjectRef,
    message: messageRef,
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required.";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required.";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters.";
    }

    setErrors(newErrors);

    const firstError = Object.keys(newErrors)[0];

    if (firstError) {
      inputRefs[firstError].current.focus();
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsSubmitted(false);

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulating API request
    setTimeout(() => {
      console.log("Contact Form Data:", formData);

      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData(initialForm);
    }, 1000);
  };

  return (
    <main className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-sm">
            <div className="card-body p-4">
              <h1 className="text-center mb-2">Contact Us</h1>

              <p className="text-center text-muted mb-4">
                Have a question? Send us a message.
              </p>

              {isSubmitted && (
                <div className="alert alert-success">
                  Your message has been submitted successfully.
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate>
                {/* Name */}
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>

                  <input
                    ref={nameRef}
                    type="text"
                    id="name"
                    name="name"
                    className={`form-control ${
                      errors.name ? "is-invalid" : ""
                    }`}
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                  />

                  {errors.name && (
                    <div className="invalid-feedback">{errors.name}</div>
                  )}
                </div>

                {/* Email */}
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>

                  <input
                    ref={emailRef}
                    type="email"
                    id="email"
                    name="email"
                    className={`form-control ${
                      errors.email ? "is-invalid" : ""
                    }`}
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                  />

                  {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                </div>

                {/* Subject */}
                <div className="mb-3">
                  <label htmlFor="subject" className="form-label">
                    Subject
                  </label>

                  <input
                    ref={subjectRef}
                    type="text"
                    id="subject"
                    name="subject"
                    className={`form-control ${
                      errors.subject ? "is-invalid" : ""
                    }`}
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Enter subject"
                  />

                  {errors.subject && (
                    <div className="invalid-feedback">{errors.subject}</div>
                  )}
                </div>

                {/* Message */}
                <div className="mb-3">
                  <label htmlFor="message" className="form-label">
                    Message
                  </label>

                  <textarea
                    ref={messageRef}
                    id="message"
                    name="message"
                    rows="5"
                    className={`form-control ${
                      errors.message ? "is-invalid" : ""
                    }`}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write your message..."
                  />

                  {errors.message && (
                    <div className="invalid-feedback">{errors.message}</div>
                  )}
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ContactUs;
