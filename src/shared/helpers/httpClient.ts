import { Logger } from './logger';

export class HttpClient {
  private readonly logger: Logger = new Logger();
  async get(url: string) {
    const result = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        this.logger.debug(JSON.stringify(res));
        return res.json();
      })
      .catch((err) => {
        this.logger.error(err);
        return false;
      });

    return result;
  }

  async post(url: string, body: string) {
    const result = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: body,
    })
      .then((res) => {
        this.logger.debug(JSON.stringify(res));
        return res.json();
      })
      .catch((err) => {
        this.logger.error(err);
        return false;
      });

    return result;
  }

  async patch(url: string, body: string) {
    const result = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: body,
    })
      .then((res) => {
        this.logger.debug(JSON.stringify(res));
        return res.json();
      })
      .catch((err) => {
        this.logger.error(err);
        return false;
      });

    return result;
  }
}
