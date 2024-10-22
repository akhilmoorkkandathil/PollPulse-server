import { StatusCode } from "../interfaces/enum";

const validateEmail = (email: string) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    if (!emailPattern.test(email)) {
      return {
        status: StatusCode.NotAcceptable as number,
        message: "Invalid email address",
      };
    }
  
    return {
      status: StatusCode.OK as number,
      message: "Valid email address",
    };
  };
  
  const validatePassword = (password: string) => {
    // Password validation criteria
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
    if (password.length < minLength) {
      return {
        status: StatusCode.NotAcceptable as number,
        message: `Password must be at least ${minLength} characters long`,
      };
    }
    
    if (!hasUpperCase) {
      return {
        status: StatusCode.NotAcceptable as number,
        message: "Password must contain at least one uppercase letter",
      };
    }
    
    if (!hasLowerCase) {
      return {
        status: StatusCode.NotAcceptable as number,
        message: "Password must contain at least one lowercase letter",
      };
    }
    
    if (!hasDigit) {
      return {
        status: StatusCode.NotAcceptable as number,
        message: "Password must contain at least one digit",
      };
    }
  
    if (!hasSpecialChar) {
      return {
        status: StatusCode.NotAcceptable as number,
        message: "Password must contain at least one special character",
      };
    }
  
    return {
      status: StatusCode.OK as number,
      message: "Valid password",
    };
  };
  
  // Usage
  const data = { email: "example@domain.com", password: "Password123!" }; // Replace with your email and password input
  
  const emailValidationResponse = validateEmail(data.email);
  const passwordValidationResponse = validatePassword(data.password);
  
  // Handle email validation response
  if (emailValidationResponse.status === StatusCode.NotAcceptable) {
    console.error(emailValidationResponse.message);
  } else {
    console.log(emailValidationResponse.message);
  }
  
  // Handle password validation response
  if (passwordValidationResponse.status === StatusCode.NotAcceptable) {
    console.error(passwordValidationResponse.message);
  } else {
    console.log(passwordValidationResponse.message);
  }
  export {validateEmail,validatePassword}