import {AbstractControlOptions, ValidatorFn} from "@angular/forms";

export interface ModelKeyBinding{
    key: string;
    binding: string;
    value: any;
    show_value?: string;
    validators?: ValidatorFn|ValidatorFn[]|AbstractControlOptions|null;
    default?: any;
    create?: boolean;
    edit?: boolean;
    show?: boolean;
}
