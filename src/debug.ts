export class Debugging {
  private _logs: string[] = [];
  private _use_save_function: boolean = false;
  private _uuid: string = '';

  constructor(use_save_function: boolean, uuid: string) {
    this._use_save_function = use_save_function;
    this._uuid = uuid;
  }

  log(message: string) {
    const msg = `[INFO] ${message}`;
    this._logs.push(msg);
    console.log(msg);
    this.save_logs();
  }

  warn(message: string) {
    const msg = `[WARN] ${message}`;
    this._logs.push(msg);
    console.warn(msg);
    this.save_logs();
  }

  error(message: string, error?: Error) {
    const msg = `[ERROR] ${message} \n ${error}`;
    this._logs.push(message);
    console.error(`[ERROR] ${message}`, error);
    this.save_logs();
  }

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
   * Generates a log file and returns the download URL
   */
  generate_log_file() {
    const blob = new Blob([this._logs as any], { type: 'text/plain' });

    return window.URL.createObjectURL(blob);
  }
}
