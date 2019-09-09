export interface IPromptAnswers {
    name: string;
    description: string;
}

export interface IExampleObject {
    issue: string | number,
    context: string
}


type Example = Array<IExampleObject>;

export type Examples = Array<Example>;

export interface ITemplateVariables { 
    key: string, 
    title: string,
    description: string, 
    rows: string, 
    examples: Examples | string
}

type Schema = {
    schema: {
        describe: any;
    },
    length: number
}

export interface IAction {
    [ actionKey: string ]: Schema,
}