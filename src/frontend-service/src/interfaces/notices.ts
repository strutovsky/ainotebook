export interface IStickItem {
    id: number,
    title: string,
    text: string
}

export interface INotice {
    id: number,
    name: string,
    sticks: Array<IStickItem>
}

export type INotices = Array<INotice>
