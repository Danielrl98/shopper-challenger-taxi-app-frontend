export class Logger {
  log(message: string): void {
    console.log(`[Logger] ${message}`);
  }
  error(message: string): void {
    console.error(`[Error] ${message}`);
  }
  debug(message: string): void {
    console.error(`[DEBUG] ${message}`);
  }
}
