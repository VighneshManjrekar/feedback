import axios from "axios";
import { responseData } from "../types/api";

export async function fetchId(token: string) {
  try {
    const response: responseData = await axios.get(
      "http://localhost:7000/api/v1/user/profile",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.user._id;
  } catch (error) {
    console.log(error);
  }
}
