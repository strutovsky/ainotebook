import {INotebook, INotebookPage, INotebooks} from '../interfaces/notebooks';
import {instance} from "./rootAPI";

export const NotebookAPI = {
    getNotebooks: async () => {
        return instance.get<INotebooks>('notebooks').then(res => res.data)
    },

    getPage: async (nid: string, page: string) => {
        return instance.get<INotebookPage>('page?nid='+nid+'&pid='+page)
    },

    addBook: async (name: string) => {
        return instance.post<INotebook>('notebook?name='+name)
    },

    addPage: async (notebookId: string, title: string) => {
        return instance.post(`/page`, {title: title, body: "", metadata: "", nid: notebookId})
    },

    getNotebook: async (notebookId: string) => {
        return instance.get('notebook?nid='+notebookId)
    }
}