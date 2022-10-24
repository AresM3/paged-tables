import { Observable } from "rxjs";

export interface Creatable<T> {
  create(obj: T): Observable<T>;
}
