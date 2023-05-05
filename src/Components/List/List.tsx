
//Redux
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { removeNote } from '../../Redux/Slices/note.slice';
import { useNavigate } from 'react-router-dom';

import './List.css'
interface Props {
    note: Array<{
        id: string | number,
        title: string,
        type: string
        description: string;
        date?: string
    }>
}
//ShortText para descripcion
const shortText = function (text: string) {
    let newText = text?.substring(0, 160);
    newText = newText?.charAt(0)?.toUpperCase() + newText?.slice(1);
    return text?.length && text?.length > 160 ? newText + "..." : (!text?.length) ? "" : newText
};



const List = ({ note }: Props) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [page, setPage] = useState<number>(1)
    const [dataPage, setDataPage] = useState<any>([])
    const ITEMS_PER_PAGE = 5

    useEffect(() => {
        setDataPage(Fetching())
    }, [page, note])


    const Fetching = () => {
        let item_start = (page - 1) * ITEMS_PER_PAGE
        let item_final = (page * ITEMS_PER_PAGE)
        return note.slice(item_start, item_final)
    }


    return (

        <>
            {dataPage.length == 0 ? (
                <p>Porfavor crea una tarjeta!</p>
            ) : (

                <div className='container'>
                    {dataPage.map((notes: any, key: any) => (
                        <div key={key} className="card">
                            <div className="header">
                                <span className="icon">
                                    <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path clipRule="evenodd" d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z" fillRule="evenodd"></path>
                                    </svg>
                                </span>
                                <p className="alert">{notes?.title}</p>
                            </div>

                            <p className="message">
                                {shortText(notes?.description)}
                            </p>
                            <p className="message">
                                {notes?.type}
                            </p>
                            <p className="message">
                                {notes?.date?.substring(0, 10)}
                            </p>
                            <div className="actions">
                                <button
                                    className="btnOrangeMini"
                                    onClick={() => navigate(`/details/${notes?.id}`, { state: { itemNote: notes } })}
                                >
                                    Ver más
                                </button>

                                <button className="mark-as-read" onClick={() => {
                                    dispatch(
                                        removeNote(notes)
                                    )
                                }}
                                >
                                    Eliminar
                                </button>
                            </div>
                        </div>

                    ))
                    }
                </div>



            )
            }
            <>
                <div className="buttons">
                    <button
                        className='BtnSubmit'

                        disabled={page == 1}
                        onClick={() => setPage(page - 1)}
                    >
                        Atras
                    </button>
                    <p>page: {page}</p>
                    <button
                        className='BtnSubmit'
                        disabled={((ITEMS_PER_PAGE * page) > note.length)}
                        onClick={() => setPage(page + 1)}
                    >
                        siguiente
                    </button>
                </div>
            </>
        </>
    )
}
export default List