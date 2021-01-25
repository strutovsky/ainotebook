import {INotebook} from "../interfaces/notebooks";

export const NotebookAPI = {
    getNotebooks: async () => {
        const notebooks = await fetch('http://localhost:4200/notebooks')
        const notebooksJson = await notebooks.json()

        return notebooksJson
    },

    addBook: async (name: string) => {
        const data: INotebook = {
            id: Date.now(),
            name,
            pages: [{id: Date.now(), title: 'Новая страница', date: new Date(), text:"", meta: {}}]
        }

        const response = await fetch('http://localhost:4200/notebooks',
            {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                headers:
                    {
                        'Content-Type': 'application/json'
                    },
                body: JSON.stringify(data) // body data type must match "Content-Type" header
            });

        return await response.json()
    }
}