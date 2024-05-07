export const getRandomNumber = () => {
  const randomEightDigitNumber = Math.floor(Math.random() * 900000000) + 100000000;

  const nineDigitNumber = '9' + randomEightDigitNumber.toString().substring(1);

  return parseInt(nineDigitNumber, 10).toString();
};

export interface User {
  username: string;
  password: string;
}

export const standardUserCredentials: User = {
  username: getRandomNumber(),
  password: 'secret_sauce',
};

export const validUsers: User[] = [standardUserCredentials];
