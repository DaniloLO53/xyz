import { Request } from 'express';

type Authorized = {
  user: {
    userId: string;
  };
};

export type AuthorizedRequest = Request & Authorized;
