import { Creatable } from "./creatable";
import { Indexable } from "./indexable";
import { Showable } from "./showable";
import { Deletable } from "./deletable";
import { Updatable } from "./updatable";

export interface Crudable<T>
  extends Indexable<T>,
    Creatable<T>,
    Showable<T>,
    Deletable<T>,
    Updatable<T> {}
