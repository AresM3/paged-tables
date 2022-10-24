import { Observable } from "rxjs";

export interface Deletable<T> {
  delete(obj: T): Observable<T>;
}
