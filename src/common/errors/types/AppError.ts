export class AppError extends Error {
  public readonly message: string;
  public readonly statusCode: number;
  public readonly payload?: any;

  constructor(message: string, statusCode = 400, payload?: any) {
    super();
    this.message = message;
    this.statusCode = statusCode;
    this.payload = payload;
  }
}
