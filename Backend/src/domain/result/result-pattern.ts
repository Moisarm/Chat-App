export type Result<T, E> =
  | { succes: true; data: T }
  | { succes: false; error: E };

export function success<T>(data: T): Result<T, never> {
  return { succes: true, data };
}

export function failure<E>(error: E): Result<never, E> {
  return { succes: false, error };
}
