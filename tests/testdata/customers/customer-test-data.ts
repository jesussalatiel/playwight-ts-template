import { faker } from '@faker-js/faker';

const getRandomNumber = () => {
  const randomEightDigitNumber = Math.floor(Math.random() * 900000000) + 100000000;
  return `9${randomEightDigitNumber.toString().substring(1)}`;
};

const getRandomDocument = () => {
  const randomEightDigitNumber = Math.floor(Math.random() * 90000000) + 10000000;
  return `9${randomEightDigitNumber.toString().substring(1)}`;
};

export interface User {
  name: string;
  middleName?: string;
  lastName: string;
  motherLastName: string;
  mobile: string;
  email: string;
  identityDocument: {
    number: string;
    type: string;
  };
}

export const standardUserCredentials: User = {
  name: 'Deorro',
  lastName: 'Dev',
  middleName: '',
  motherLastName: 'Test',
  email: faker.internet.email({
    provider: 'globant.com',
  }),
  mobile: getRandomNumber(),
  identityDocument: {
    number: getRandomDocument(),
    type: 'DNI',
  },
};

export const validUsers: User[] = [standardUserCredentials];
