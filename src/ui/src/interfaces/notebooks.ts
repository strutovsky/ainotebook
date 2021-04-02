export interface INotebookPage {
    id: number,
    title: string,
    create_at: Date | string,
    body: string,
    meta: any
}

export interface INotebook {
    id: number,
    name: string,
    pages: Array<INotebookPage>
}

export type INotebooks = {
    notebooks: Array<INotebook>,
    selectedNotebooks?: INotebook | null,
    activePage?: INotebookPage | null
}
