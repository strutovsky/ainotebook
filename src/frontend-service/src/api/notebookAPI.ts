export const NotebookAPI = {
    getNotebooks: async () => {
        const notebooks = await fetch('http://localhost:4200/notebooks')
        const notebooksJson = await notebooks.json()

        return notebooksJson
    },

    addBook: async () => {
        // const response = await fetch('http://localhost:4200/notebooks',
        //     {
        //         method: 'POST', // *GET, POST, PUT, DELETE, etc.
        //         headers:
        //             {
        //                 'Content-Type': 'application/json'
        //             },
        //         body: JSON.stringify(data) // body data type must match "Content-Type" header
        //     });
    }
}