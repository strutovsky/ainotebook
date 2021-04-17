import React, {useEffect, useState} from 'react';
import {Modal, Button, Input, message} from 'antd';
import {instance} from '../../api/rootAPI';
import {actions} from '../../redux/notebook-reducer';
import {useDispatch} from 'react-redux';

export const NotebookModal: React.FC<{nid: string, hidden: boolean, setHidden: Function, name?: string}> = ({nid, hidden, setHidden, name}) => {
    const [notebookValue, setNotebookValue] = useState("")
    const dispatch = useDispatch()

    useEffect(() => {
        if(name) {
            setNotebookValue(name)
        }
    }, [name])

    const handleOk = () => {
        instance.put('notebook?nid='+nid + '&name='+ notebookValue).then(() => {
            message.success('Name changed')
            dispatch(actions.changeNotebookName(notebookValue, nid))
        }).catch(() => {
            message.error('Something wrong')
        }).finally(() => {
            setHidden(true)
        })
    }
    const handleCancel = () => setHidden(true)


    return (
        <Modal
            title="New notebook name"
            visible={!hidden}
            onOk={handleOk}
            // confirmLoading={confirmLoading}
            onCancel={handleCancel}
        >
            <p>Write new notebook name</p>
            <Input value={notebookValue} onChange={e => setNotebookValue(e.target.value)}/>
        </Modal>
    )
}