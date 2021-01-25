export const Notice = {
    getNotices: async () => {
        const notices = await fetch('http://localhost:4200/notices')
        const noticesJson = await notices.json()
    }
}