import { NgModule, InjectionToken, Inject } from "@angular/core";
import { CommonModule } from "@angular/common";

export const LIST_TASK: InjectionToken<string> = new InjectionToken<string>(
  "LIST_TASK"
);
export const LIST_DONE: InjectionToken<boolean> = new InjectionToken<boolean>(
  "LIST_DONE"
);
export const LIST_ID: InjectionToken<number> = new InjectionToken<number>(
  "LIST_ID"
);

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    { provide: LIST_TASK, useValue: "" },
    { provide: LIST_DONE, useValue: false },
    { provide: LIST_ID, useValue: 0 },
  ],
})
export class TodoModule {
  constructor(
    @Inject(LIST_TASK) public task: string,
    @Inject(LIST_DONE) public done: boolean,
    @Inject(LIST_ID) public id: number
  ) {}
}
