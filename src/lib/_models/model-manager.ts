import {BaseModel} from "./base.model";
import {ModelKeyBinding} from "./model-key-binding";
import {AbstractControl, FormBuilder, FormControl, FormGroup} from "@angular/forms";

/**
 * Classe che aiuta nella creazione di form e funzioni di visualizzazione relative ad un modello
 */
export abstract class ModelManager<T extends BaseModel> {
    /**
     * Array che definisce come i vari campi del modello si comportano in relazione ai form e alle funzioni di visualizzazione
     */
    keyBindings: ModelKeyBinding[];

    /**
     * Il nome che si vuole vedere renderizzato relativo al modello
     */
    objectName: string;

    /**
     * Il costruttore richiede il modello e la classe formBuilder che può essere lasciata a null se non si intende
     * creare dei form con il manager
     * @param _model
     * @param _fb
     * @protected
     */
    protected constructor(protected _model: T, protected _fb?: FormBuilder) {}

    /**
     * Crea un form a partire dal modello in oggetto seguendo le specifiche all'interno dei ModelKeyBinding.
     * Richiede il form builder
     * @param edit
     */
    form(edit: boolean = false): FormGroup {
        if(!this._fb) throw new Error('FormBuilder needs to be specified if you want to use the form() method');
        let controls = {};
        this.keyBindings
            .filter(k => (edit && this.isEdit(k)) || (!edit && this.isCreate(k)))
            .forEach(k => controls[k.key] = new FormControl(!!k.default ? k.default : '', k.validators));
        return this._fb.group(controls);
    }

    /**
     * Restituisce un array con il nome delle proprietà e il valore associato, generalmente utilizzato per cerare delle
     * funzioni di visualizzazione del modello
     */
    view(): { name: string, value: string }[] {
        return this.keyBindings
            /*
                Filtra i valori in base alla variabile show, se non impostata viene considerata di valore true.
                Se invece è impostata a false il valore associato viene trascurato
             */
            .filter(k => k.show == undefined || k.show)
            /*
                Se impostato un valore show_value per la funzione view ha la precedenza sul valore value in quanto
                ad esempio potrebbe essere usata anche una pipe per mostrare il risultato
            */
            .map(k => {return {name: k.binding, value: !!k.show_value ? k.show_value : k.value};});
    }

    /**
     * Restituisce vero se il campo compare nei form di modifica
     * @param k
     */
    isEdit(k: ModelKeyBinding): boolean {
        return k.edit == undefined || k.edit;
    }

    /**
     * Restituisce vero se il campo compare nei form di creazione
     * @param k
     */
    isCreate(k: ModelKeyBinding): boolean {
        return k.create == undefined || k.create;
    }

    /**
     * Restituisce il modello come risultato del form associato
     * @param fg
     */
    get(fg: { [p: string]: AbstractControl }): T {
        let obj = Object.assign({}, this._model);
        Object.entries(fg).forEach(fc => obj[fc[0]] = fc[1].value);
        return obj;
    }

    /**
     * Restituisce un oggetto da usare nella funzione patchValues di FormGroup per impostare il valore del form al modello
     * del manager
     */
    set(): any {
        let obj = {};
        this.keyBindings.filter(k => this.isEdit(k)).forEach(k => obj[k.key] = k.value);
        return obj;
    }
}
