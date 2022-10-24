import { Observable } from "rxjs";

export interface Updatable<T> {
  update(obj: T): Observable<T>;
}
