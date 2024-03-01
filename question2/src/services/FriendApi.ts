import { RequestPayload } from "../store/requestContainerSlice";

export const GetFriendsAlias = "get/overview/project";
export const GetFriends = (): RequestPayload => {
  return { alias: GetFriendsAlias, request: { method: "get", url: `https://api.json-generator.com/templates/-xdNcNKYtTFG/data` } };
};
