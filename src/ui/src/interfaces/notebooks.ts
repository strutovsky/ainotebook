export interface INotebookPage {
    id: number,
    title: string,
    date: Date,
    text: string,
    meta: any
}

export interface INotebook {
    id: number,
    name: string,
    pages: Array<INotebookPage>
}

export type INotebooks = {
    notebooks: Array<INotebook>,
    selectedNotebooks?: INotebook | null
}
