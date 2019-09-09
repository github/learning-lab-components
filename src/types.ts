export interface IPromptAnswers {
    name: string;
    description: string;
}

export interface IExampleObject {
    issue: string | number,
    context: string
}


export type Examples = Array<Array<IExampleObject>>;

export interface ITemplateVariables { 
    key: string, 
    title: string,
    description: string, 
    rows: string, 
    examples: Examples | string
}

export interface ISubChildrenObject {
    meta: {
        [index: number]: {
            label: string
        }
    },
    description: string,
    flags: {
        default: string,
        presence: string
    }
}

export interface Children {
    [key: string]: ISubChildrenObject
}

export type Schema = {
    describe: () => Partial<Schema>,
    children: Children,
    examples: Examples,
    meta: {
        [index: number]: {
            label: string
        }
    },
    description: string
};

export interface ISubActionObject {
    schema: Schema,
    length: () => number
};

export interface IAction {
     [actionKey: string]: ISubActionObject;
}