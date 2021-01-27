import {instance} from "./rootAPI";
import {INotices} from "../interfaces/notices";


export const NoticeAPI = {
    getNotices: async () => {
        return instance.get<INotices>('notebooks').then(res => res.data)
    }
}