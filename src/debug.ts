export class Debugging {
  private _logs: string[] = [];
  private _use_save_function: boolean = false;
  private _uuid: string = '';

  constructor(use_save_function: boolean, uuid: string) {
    this._use_save_function = use_save_function;
    this._uuid = uuid;
  }

  /**
   * Logs a message to the console and saves it to the log buffer.
   * @param message The message to log.
   */
  log(message: string) {
    const msg = `[INFO] ${message}`;
    this._logs.push(msg);
    console.log(msg);
    this.save_logs();
  }

  /**
   * Logs a warning message to the console and saves it to the log buffer.
   * @param message The warning message to log.
   */
  warn(message: string) {
    const msg = `[WARN] ${message}`;
    this._logs.push(msg);
    console.warn(msg);
    this.save_logs();
  }

  /**
   * Logs an error message to the console and saves it to the log buffer.
   * @param message The error message to log.
   * @param error The error object associated with the message.
   */
  error(message: string, error?: Error) {
    const msg = `[ERROR] ${message} \n ${error}`;
    this._logs.push(message);
    console.error(`[ERROR] ${message}`, error);
    this.save_logs();
  }

  /**
   * Checks a condition and logs an assertion error message to the console and saves it to the log buffer if the condition is false.
   * @param condition The condition to check.
   * @param message The error message to log if the condition is false.
   */
  assert(condition: boolean, message: string) {
    const msg = `[ASSERTION FAILED] ${message}`;
    if (!condition) {
      this._logs.push(msg);
      console.error(msg);
      this.save_logs();
    }
  }

  private save_logs() {
    if (this._use_save_function) {
      const key = `${this._uuid}_logs`;
      localStorage.setItem(key, JSON.stringify(this._logs));
    }
  }

  /**
   * Generates a log file and returns the download URL.
   * @returns The URL to download the log file.
   */
  generate_log_file() {
    const blob = new Blob([this._logs as any], { type: 'text/plain' });

    return window.URL.createObjectURL(blob);
  }
}
