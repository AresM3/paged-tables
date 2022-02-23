import {BehaviorSubject, Observable} from 'rxjs';
import {ServiceWithConfig} from '@aresm3/api-config';
import {Injectable} from '@angular/core';

@Injectable()
export abstract class CrudService<T> extends ServiceWithConfig{
    isLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    isLoading$: Observable<boolean> = this.isLoadingSubject.asObservable();

    abstract index(): Observable<T[]>;
    abstract show(id: number): Observable<T>;
    abstract create(obj: T): Observable<T>;
    abstract delete(obj: T): Observable<boolean>;
    abstract update(obj: T): Observable<T>;
}
