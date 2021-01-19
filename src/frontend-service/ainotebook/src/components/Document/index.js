import React from 'react'
import Styles from './document.module.css'

const Document = () => {
    return (<div className={Styles.wrap}>
                <div className={Styles.header}>
                    <h2>First doc</h2>
                </div>

                <div className={Styles.body}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci aperiam debitis dignissimos doloremque
                    enim est incidunt ipsam magni non nulla officiis, perferendis possimus quia quidem quis repudiandae vero
                    voluptas. Accusamus amet dolor esse, expedita incidunt labore minima modi nam, nesciunt optio quidem ratione
                    repellat sit velit vitae voluptatibus voluptatum. Expedita.
                </div>
            </div>)
}

export default Document