import React from "react";

/**
 * Converts FormData to a plain JavaScript object
 * @param {FormData} formData - The FormData instance to convert
 * @returns {Object} Plain JavaScript object with form values
 */
const formDataToObject = (formData) => {
  const result = {};

  for (let [key, value] of formData.entries()) {
    // Handle multiple values with same key (like checkboxes)
    if (result.hasOwnProperty(key)) {
      if (!Array.isArray(result[key])) {
        result[key] = [result[key]];
      }
      result[key].push(value);
    } else {
      result[key] = value;
    }
  }

  return result;
};

export default formDataToObject;

export const Form = ({ onSubmit, children }) => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSubmit(formDataToObject(new FormData(e.target)));
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return <form onSubmit={handleSubmit}>{children}</form>;
};
