import {BaseModel} from "./base.model";
import {ModelKeyBinding} from "./model-key-binding";
import {AbstractControl, FormBuilder, FormGroup} from "@angular/forms";

export abstract class ModelManager<T extends BaseModel> {
    keyBindings: ModelKeyBinding[];

    protected constructor(protected _model: T, protected _fb: FormBuilder) {}

    abstract form(): FormGroup;

    abstract view(): { name: string, value: string }[];

    abstract get(fg: { [p: string]: AbstractControl }): T;
}
