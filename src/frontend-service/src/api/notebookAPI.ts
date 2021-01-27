import {INotebook, INotebooks} from "../interfaces/notebooks";
import {instance} from "./rootAPI";

export const NotebookAPI = {
    getNotebooks: async () => {
        return instance.get<INotebooks>('notebooks').then(res => res.data)
    },

    addBook: async (name: string) => {
        const data: INotebook = {
            id: Date.now(),
            name,
            pages: [{id: Date.now(), title: 'Новая страница', date: new Date(), text:"", meta: {}}]
        }

        return instance.post<INotebook>('notebooks', data).then(res => res.data)
    }
}