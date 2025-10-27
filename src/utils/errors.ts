import validationErrorFlattener from "./validationErrorFlattener.js";

export class ErrorConstructor {
  constructor(message: string, code: number, data?: string) {
    this.message = message;
    this.code = code;
    if (data) {
      this.data = validationErrorFlattener(data);
    }
  }

  message: string;
  code: number;
  data?: { path: string; message: string[] }[];
}
