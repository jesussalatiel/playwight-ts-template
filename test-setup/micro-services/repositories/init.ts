import { LambdaClient } from '@aws-sdk/client-lambda';
import { CognitoIdentityProviderClient } from '@aws-sdk/client-cognito-identity-provider';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  B2B_CLIENT_ID,
  B2C_CLIENT_ID,
  CUSTOMERS_USER_POOL_ID,
  CognitoRepository,
  CustomersRepository,
  EMPLOYEES_USER_POOL_ID,
  LeadsRepository,
  LoansRepository,
  NotificationsRepository,
} from '@ihf-rivendell/qa';

const configuration = {
  customers: {
    userPoolId: CUSTOMERS_USER_POOL_ID,
    lambda: 'CustomersLambdaDev',
    groupName: 'DocumentKeyValidated',
    table: 'CustomersDev',
    customersReniecTable: 'CustomersReniecDev',
  },
  leads: {
    lambda: 'LeadsLambdaDev',
    table: 'LeadsDev',
  },
  loans: {
    lambda: 'LoansLambdaDev',
    table: 'LoansDev',
  },
  employees: {
    defaultEmployeeId: 'rivendell',
    userPoolId: EMPLOYEES_USER_POOL_ID,
  },
  b2c: {
    personas: { clientId: B2C_CLIENT_ID },
  },
  b2b: {
    backoffice: { clientId: B2B_CLIENT_ID },
  },
  contracts: {
    lambda: 'ContractsLambdaDev',
  },
  cards: {
    lambda: 'CardsLambdaDev',
  },
  notifications: {
    lambda: 'NotificationsLambdaDev',
    cacheTable: 'NotificationsCacheDev',
  },
};
const dynamoDbClient = DynamoDBDocumentClient.from(new DynamoDBClient({}), {
  marshallOptions: {
    removeUndefinedValues: true,
  },
});

const lambdaClient = new LambdaClient({});
const cognitoClient = new CognitoIdentityProviderClient({});

export const customersRepository = new CustomersRepository({
  lambdaClient,
  dynamoDbClient,
  cognitoClient,
  customersLambda: configuration.customers.lambda,
  customersTable: configuration.customers.table,
  groupName: configuration.customers.groupName,
  accountingTable: '',
  customersReniecTable: configuration.customers.customersReniecTable,
  userPoolId: configuration.customers.userPoolId,
  applications: {
    internetBanking: configuration.b2c.personas.clientId,
    backOffice: configuration.b2b.backoffice.clientId,
  },
  employeeId: configuration.employees.defaultEmployeeId,
});
export const cognitoRepository = new CognitoRepository({
  cognitoClient,
  userPoolId: configuration.customers.userPoolId,
  applications: {
    internetBanking: configuration.b2c.personas.clientId,
    backOffice: configuration.b2b.backoffice.clientId,
  },
  employeeId: configuration.employees.defaultEmployeeId,
});

export const leadsRepository = new LeadsRepository({
  lambdaClient,
  dynamoDbClient,
  leadsLambda: configuration.leads.lambda,
  leadsTable: configuration.leads.table,
  leadsPromotionsTable: '',
  secretId: '',
  applications: {
    internetBanking: configuration.b2c.personas.clientId,
    backOffice: configuration.b2b.backoffice.clientId,
  },
  employeeId: configuration.employees.defaultEmployeeId,
});

export const loansRepository = new LoansRepository({
  dynamoDbClient,
  lambdaClient,
  loansTable: configuration.loans.table,
  loansLambda: configuration.loans.lambda,
  loansInstallmentsTable: '',
  loansSimulationsTable: '',
  mambuLoansTable: '',
  applications: {
    internetBanking: configuration.b2c.personas.clientId,
    backOffice: configuration.b2b.backoffice.clientId,
  },
  employeeId: configuration.employees.defaultEmployeeId,
});

export const notificationsRepository = new NotificationsRepository({
  lambdaClient,
  dynamoDbClient,
  notificationsLambda: configuration.notifications.lambda,
  cacheTable: configuration.notifications.cacheTable,
  applications: {
    internetBanking: configuration.b2c.personas.clientId,
    backOffice: configuration.b2b.backoffice.clientId,
  },
  employeeId: configuration.employees.defaultEmployeeId,
});
