export type UserData = {
  _id: string;
  name: string;
  email: string;
  profile: string;
  createdAt: string;
  role: string;
  isAdmin: boolean;
  updatedAt: string;
  __v: number;
  resume: string;
};

export type responseData = {
  message: string;
  data: any;
};

export type response = {
  success: string;
  user: UserData;
};
