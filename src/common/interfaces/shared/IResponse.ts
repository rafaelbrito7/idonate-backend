export interface IResponse {
  statusCode: number;
  message: string;
  payload: string | string[] | any;
}
