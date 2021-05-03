import {BaseModel} from "./base.model";
import {ModelKeyBinding} from "./model-key-binding";
import {AbstractControl, FormBuilder, FormControl, FormGroup} from "@angular/forms";

export abstract class ModelManager<T extends BaseModel> {
    keyBindings: ModelKeyBinding[];

    protected constructor(protected _model: T, protected _fb: FormBuilder) {}

    form(): FormGroup {
        let controls = {};
        this.keyBindings.forEach(k => controls[k.key] = new FormControl(!!k.default ? k.default : '', k.validators));
        return this._fb.group(controls);
    }

    view(): { name: string, value: string }[]{
        return this.keyBindings.map(k => {
            return {name: k.binding, value: k.value};
        });
    }

    abstract get(fg: { [p: string]: AbstractControl }): T
}
