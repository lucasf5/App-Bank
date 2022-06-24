// referencia: https://pt.stackoverflow.com/questions/72617/validar-email-em-javascript;

const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return regex.test(String(email).toLowerCase());
};

export default isValidEmail;
