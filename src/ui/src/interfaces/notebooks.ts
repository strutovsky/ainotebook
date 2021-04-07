export interface INotebookPage {
    id: string,
    title: string,
    create_at: Date | string,
    body: string,
    meta: any
}

export interface INotebook {
    id: string,
    name: string,
    pages: Array<INotebookPage>
}

export type INotebooks = {
    notebooks: Array<INotebook>,
    selectedNotebooks?: INotebook | null,
    activePage?: INotebookPage | null
}

export type IDocument = {
    activeDocument: INotebookPage | null,
}
