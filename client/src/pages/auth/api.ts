import axios, { AxiosResponse } from "axios";
import { z } from "zod";
import { responseData } from "@/types/auth";
import { loginSchema } from "./login";
import { resSchema } from "./register";

export const login = async (values: z.infer<typeof loginSchema>) => {
  try {
    const response: AxiosResponse = await axios.post(
      "http://localhost:7000/api/v1/user/login",
      values
    );
    const responseData: responseData = response.data;
    return responseData;
  } catch (error: any) {
    return error;
  }
};

export const register = async (values: z.infer<typeof resSchema>) => {
  try {
    const response: AxiosResponse = await axios.post(
      "http://localhost:7000/api/v1/user/register",
      values
    );
    const responseData: responseData = response.data;
    return responseData;
  } catch (error: any) {
    return error;
  }
};
