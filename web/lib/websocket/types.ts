export type WebSocketMessage<T = unknown> = {
  type: string;
  payload?: T;
  ts?: string;
};

