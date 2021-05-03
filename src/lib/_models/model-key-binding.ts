import {AbstractControlOptions, ValidatorFn} from "@angular/forms";

export interface ModelKeyBinding{
    key: string;
    binding: string;
    value: string;
    validators?: ValidatorFn|ValidatorFn[]|AbstractControlOptions|null,
    default?: any
}
