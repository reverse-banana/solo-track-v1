export interface Context {
    request: {
      body: {
        type: string;
        value: object;
      };
    };
    response: {
      status: number;
      body: object;
    };
  }