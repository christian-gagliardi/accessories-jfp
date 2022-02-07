import { Controller, Get, Inject, OnModuleInit, Param } from '@nestjs/common';
import { ClientGrpc, GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { toArray } from 'rxjs/operators';
import { AccessoriesByIdInterface } from './interfaces/accessories-by-id.interface';
import { AccessoriesInterface } from './interfaces/accessories.interface';
import { AccessoriesServiceInterface } from './interfaces/accessories-service.interface';



@Controller('accessories')
export class AccessoriesController implements OnModuleInit {
  private readonly items: AccessoriesInterface[] = [
    { id: 1, name: 'SpiderPork', owner: 1 },
    { id: 2, name: 'BatMobile', owner: 2 },
  ];

  private accessoriesService: AccessoriesServiceInterface;

  constructor(@Inject('ACCESSORIES_PACKAGE') private readonly client: ClientGrpc) {}

  onModuleInit() {
    this.accessoriesService = this.client.getService<AccessoriesServiceInterface>('AccessoriesService');
  }

  @Get()
  getMany(): Observable<AccessoriesInterface[]> {
    const ids$ = new ReplaySubject<AccessoriesByIdInterface>();
    ids$.next({ id: 1 });
    ids$.next({ id: 2 });
    ids$.complete();
    
    const stream = this.accessoriesService.findMany(ids$.asObservable());
    return stream.pipe(toArray());
  }

  @Get(':id')
  findOneById(@Param('id') id: AccessoriesByIdInterface): Observable<AccessoriesInterface> {
    return this.accessoriesService.findById(id);
  }

  @GrpcMethod('AccessoriesService')
  findById(data: AccessoriesByIdInterface): any  {
    if(!data || !data.id) return 'ERROR';

    const result = this.items.find((item) => {
      return item.id === data.id
    });
    
    return result
  }

  @GrpcMethod('AccessoriesService')
  findOne(data: any): AccessoriesInterface {
    const result = this.items.find(({ id }) => id === data.id);
    return result
  }

  @GrpcStreamMethod('AccessoriesService')
  findMany(data$: Observable<AccessoriesByIdInterface>): Observable<AccessoriesInterface> {
    const accessories$ = new Subject<AccessoriesInterface>();

    const onNext = (accessoriesById: AccessoriesByIdInterface) => {
      const item = this.items.find(({ id }) => id === accessoriesById.id);
      accessories$.next(item);
    };
    const onComplete = () => accessories$.complete();
    data$.subscribe({
      next: onNext,
      complete: onComplete,
    });

    return accessories$.asObservable();
  }
}
