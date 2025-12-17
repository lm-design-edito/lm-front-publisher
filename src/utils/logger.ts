const LOG_TYPES = {
  ERROR: 'ERROR',
  LOG: 'LOG',
  REDIRECTION: 'REDIRECTION',
  SUCCESS: 'SUCCESS',
  QUERY: 'QUERY',
};

const canLog =
  Boolean(import.meta.env.MODE === 'development') ||
  Boolean(import.meta.env.VITE_CAN_LOG !== 'false');
export class Logger {
  static _consoleLog(level: string, key: string, message?: unknown) {
    if (!canLog) {
      return;
    }

    const logHeader = this.getLogHeader(level, key);
    console.log(
      logHeader.head,
      logHeader.options,
      message ? this.formatter(message) : '',
    );
  }

  static log(key: string, message?: unknown) {
    this._consoleLog(LOG_TYPES.LOG, key, message);
  }

  static error(key: string, message?: unknown) {
    this._consoleLog(LOG_TYPES.ERROR, key, message);
  }

  static success(key: string, message?: unknown) {
    this._consoleLog(LOG_TYPES.SUCCESS, key, message);
  }

  static query(key: string, message?: unknown) {
    this._consoleLog(LOG_TYPES.QUERY, key, message);
  }

  static redirection(key: string, message?: unknown) {
    this._consoleLog(LOG_TYPES.REDIRECTION, key, message);
  }

  static getLogHeader(level: string, key: string) {
    const options = [];
    switch (level) {
      case LOG_TYPES.LOG:
        options.push('color: #82c8e8');
        break;
      case LOG_TYPES.ERROR:
        options.push('color: #fab4b4');
        break;
      case LOG_TYPES.SUCCESS:
        options.push('color: #5bac7d');
        break;
      case LOG_TYPES.QUERY:
        options.push('color: #ba99ff');
        break;
      case LOG_TYPES.REDIRECTION:
        options.push('color: #deff66');
        break;
    }
    return {
      head: `%c [${level}][${this.getTime()}] [${key}]`,
      options: options.join(' '),
    };
  }

  static getTime() {
    return new Date().toISOString();
  }

  static formatter(message: unknown) {
    switch (typeof message) {
      case 'string':
        return message;
      case 'object':
        if (message instanceof FormData) {
          const obj: { [key: string]: unknown } = {};
          for (const [key] of message.entries()) {
            const value = message.get(key);
            obj[key] =
              value && isJsonString(value) && !(value instanceof File)
                ? JSON.parse(value)
                : value;
          }
          return obj;
        }
        return message;
      default:
        return String(message);
    }
  }
}

function isJsonString(str: unknown) {
  try {
    JSON.parse(str as string);
  } catch {
    return false;
  }
  return true;
}
