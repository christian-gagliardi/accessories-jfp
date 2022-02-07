import { Observable } from 'rxjs';
import { AccessoriesByIdInterface } from './accessories-by-id.interface';
import { AccessoriesInterface } from './accessories.interface';


export interface AccessoriesServiceInterface {
    findOne(data: AccessoriesByIdInterface): Observable<AccessoriesInterface>;
    findById(id: AccessoriesByIdInterface): Observable<AccessoriesInterface>;
    findMany(upstream: Observable<AccessoriesByIdInterface>): Observable<AccessoriesInterface>;
}