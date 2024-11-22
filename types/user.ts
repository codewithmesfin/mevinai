// types/user.ts

export interface USER {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  siteName: string;
  sites?: SITE[];
  status: string;
  company?:any
}


export interface SITE {
  _id: string;
  admin: ADMIN;
  apps?: string[];
  db: DATABASE;
  nginx?: NGINX;
  ownerId: string;
  quota: QUOTA;
  siteName: string;
  ssl?: SSL;
  status: string;
}

export interface ADMIN {
  username: string;
  password: string;
}

export interface DATABASE {
  name: string;
  username: string;
  password: string;
}


export interface QUOTA {
  bandwidth: string;
  cpu: string;
  ram: string;
  storage: string;
}

export interface NGINX {
  siteAvailableDir: string;
  siteEnabledDir: string;
  status: string;
}

export interface SSL {
  sslDir: string;
  status: string;
}
