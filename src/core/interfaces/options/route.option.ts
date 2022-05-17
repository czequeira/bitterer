import { Fn } from "../../types";

export interface RouteOptionsInterface {
  method: string;
  url: string;
  fn: Fn<any>;
  status?: number;
}
