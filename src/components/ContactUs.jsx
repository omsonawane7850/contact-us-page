import { useRef, useState } from "react";
import styles from "./ContactUs.module.css";

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

    setTimeout(() => {
      console.log("Contact Form Data:", formData);

      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData(initialForm);
    }, 1000);
  };

  return (
    <main className={styles.container}>
      <div className={styles.formWrapper}>
        <h1 className={styles.title}>Contact Us</h1>

        <p className={styles.subtitle}>Have a question? Send us a message.</p>

        {isSubmitted && (
          <div className={styles.successMessage}>
            Your message has been submitted successfully.
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          {/* Name */}
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.label}>
              Name
            </label>

            <input
              ref={nameRef}
              type="text"
              id="name"
              name="name"
              className={`${styles.input} ${
                errors.name ? styles.inputError : ""
              }`}
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
            />

            {errors.name && <div className={styles.error}>{errors.name}</div>}
          </div>

          {/* Email */}
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>

            <input
              ref={emailRef}
              type="email"
              id="email"
              name="email"
              className={`${styles.input} ${
                errors.email ? styles.inputError : ""
              }`}
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />

            {errors.email && <div className={styles.error}>{errors.email}</div>}
          </div>

          {/* Subject */}
          <div className={styles.formGroup}>
            <label htmlFor="subject" className={styles.label}>
              Subject
            </label>

            <input
              ref={subjectRef}
              type="text"
              id="subject"
              name="subject"
              className={`${styles.input} ${
                errors.subject ? styles.inputError : ""
              }`}
              value={formData.subject}
              onChange={handleChange}
              placeholder="Enter subject"
            />

            {errors.subject && (
              <div className={styles.error}>{errors.subject}</div>
            )}
          </div>

          {/* Message */}
          <div className={styles.formGroup}>
            <label htmlFor="message" className={styles.label}>
              Message
            </label>

            <textarea
              ref={messageRef}
              id="message"
              name="message"
              rows="5"
              className={`${styles.textarea} ${
                errors.message ? styles.inputError : ""
              }`}
              value={formData.message}
              onChange={handleChange}
              placeholder="Write your message..."
            />

            {errors.message && (
              <div className={styles.error}>{errors.message}</div>
            )}
          </div>

          <button
            type="submit"
            className={styles.button}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </main>
  );
};

export default ContactUs;
