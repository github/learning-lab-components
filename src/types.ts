/**create-new-action.ts */
import { SpawnSyncReturns } from 'child_process';

export { SpawnSyncReturns }

export interface IPromptAnswers {
    name: string;
    description: string;
};

/**index.ts */
type metas = {
    [key: number]: {
        label: string
    }
};

export interface IKeys {
    [key: string]: {
        metas: undefined | metas,
        flags: undefined | {
            description: undefined | string,
            default: undefined |string,
            presence: undefined |string
        },
    }
}{};

type ArrayObj = {
    value: unknown,
    context: undefined | {
        context: string
    }
}[];

export type Examples = Array<ArrayObj>;

type Schema = {
    describe: () => {
        keys: IKeys,
        examples: Examples,
        flags: {
            description: undefined | string
        }
    }
}

export interface IActions {
    [actionKey: string]: {
        schema: Schema
    },
}{}

