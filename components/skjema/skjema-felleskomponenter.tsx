import { SkjemaVerdi } from '../../model/skjema';

export interface SkjemaKomponentProps<T> {
    onChange: (value: T | SkjemaVerdi<T>) => void;
    valgt?: T;
}
