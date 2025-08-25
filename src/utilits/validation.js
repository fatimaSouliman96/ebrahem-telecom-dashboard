// 📁 src/utils/validation.js

export const validateFields = (fields, rules) => {
  const errors = {};

  for (const key in rules) {
    const value = fields[key];
    const rule = rules[key];

    if (rule.required && !value) {
      errors[key] = `${rule.label} is required`;
      continue;
    }

    if (rule.minLength && value.length < rule.minLength) {
      errors[key] = `${rule.label} must be at least ${rule.minLength} characters`;
      continue;
    }

    if (rule.maxLength && value.length > rule.maxLength) {
      errors[key] = `${rule.label} must be less than ${rule.maxLength} characters`;
      continue;
    }

    if (rule.pattern && !rule.pattern.test(value)) {
      errors[key] = `${rule.label} is invalid`;
    }
  }

  return errors;
};

