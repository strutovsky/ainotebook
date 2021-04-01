import {INotebook, INotebooks} from "../interfaces/notebooks";
import {instance} from "./rootAPI";

export const NotebookAPI = {
    getNotebooks: async () => {
        return instance.get<INotebooks>('notebooks').then(res => res.data)
    },

    addBook: async (name: string) => {
        const data: INotebook = {
            name,
            id: Date.now(),
            pages: [{id: 1, title: "Новая страница", date: new Date(), text: "", meta: {}}]
        }

        return instance.post<INotebook>('notebook', {name}).then(res => res.data)
    },

    addPage: async (notebookId: number, title: string) => {
        return instance.post(`notebook/${notebookId}/page`, {title: "New page", body: "", metadata: {}})
    },

    getNotebookPage: async (notebookId: number, pageId: number) => {
       instance.get(`notebook/${notebookId}/page/${pageId}`).then(res => {
            debugger
        })
    }
}