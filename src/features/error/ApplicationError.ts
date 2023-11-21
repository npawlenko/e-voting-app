export enum ErrorSeverity {
    ERROR = "error",
    WARNING = "warning",
    INFO = "info",
    SUCCESS = "success"
}

export type  ApplicationError = {
  message: string;
  severity: ErrorSeverity;
};
