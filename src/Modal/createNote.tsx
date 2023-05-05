import {
    useState,
} from 'react'

//useForm - validation
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from 'uuid';

//imports Material ui
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

// Material Icons
import CloseIcon from '@mui/icons-material/Close';
import { useAppDispatch } from '../Redux/hooks';
import { addNote } from '../Redux/Slices/note.slice';
// Modal Styles

const styleModal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    maxWidth: 1300,
    maxHeight: 600,
    p: 4,
    overflowY: 'auto'
};

interface Note {
    id: number | string,
    title: string,
    type: string,
    description?: string,
    date?: string
}

export default function createNote() {
    const [open, setOpen] = useState<boolean>(false);
    const { register, reset ,handleSubmit, formState: { errors } } = useForm<Note>();
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const dispatch = useAppDispatch()
    const onSubmit = (data: any) => {
            dispatch(
                addNote({id: uuidv4(), ...data, date: new Date().toISOString()})
            )
        handleClose()
        reset()

    };

    console.log()
    

    return (
        <div className="modal">
            <button onClick={handleOpen} className='btnOrangeMini'>Agregar nota</button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={styleModal}>
                    <div className="modalHeader">
                        <p>Agregar Nota</p>
                        <CloseIcon className="modalClose" onClick={handleClose} />
                    </div>
                    <div
                        className="modalBody"
                    >
                        <input
                            type="text"
                            placeholder='Ingrese titulo'
                            {...register("title", { required: true, maxLength: 20 })}
                        />

                        {errors.title && <span>El titulo es requerido</span>}

                        <select
                            {...register("type", { required: true, maxLength: 20 })}
                            name="type"
                            id=""
                            defaultValue=''
                        >
                            <option value='' disabled >Seleccione tipo de nota</option>
                            <option value='tareas de casa'>tareas de casa</option>
                            <option value='tareas del trabajo'>tareas del trabajo</option>
                            <option value='ideas nuevas'>ideas nuevas</option>
                            <option value='diario personal'>diario personal</option>

                        </select>

                        {errors.type && <span>El tipo de nota es requerido</span>}

                        <textarea
                            {...register("description", { maxLength: 160 })}
                            name='description'
                            placeholder='Ingrese descripción'
                        />

                    <button
                        className="btnOrangeMini"
                        onClick={handleSubmit(onSubmit)}
                    >
                        SUBMIT
                    </button>
                    </div>
                </Box>
            </Modal>
        </div>
    )
}