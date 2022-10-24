import { Observable } from "rxjs";

export interface Showable<T> {
  show(id: number): Observable<T>;
}
