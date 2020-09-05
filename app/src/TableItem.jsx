import React from 'react'

function TableItem(props) {
    return (
        <tr key={props.id}>
            {props.resId && <td>{props.id}</td>}
            {props.resName && <td className='Name'>{props.name}</td>}
            {props.resYear && <td>{props.year}</td>}
            {props.resColor && <td className='Color'>
                <div className="itemColor" style={{ backgroundColor: props.color }} >
                </div>
                {props.color}
            </td>}
            {props.resValue && <td>{props.pantone_value}</td>}
        </tr>
    )
}

export default TableItem
