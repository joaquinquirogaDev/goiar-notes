import { useAppSelector } from "../../Redux/hooks"
import CreateNote from "../../Modal/createNote";
import { useState } from "react";

//Styles
import style from './Home.module.css'
import List from "../../Components/List/List";



export default function Home() {
    const state = useAppSelector((state) => state.noteReducer)
    const [categoryValues, setCategoryValues] = useState<string>('Todos')
    const [busqueda, setBusqueda] = useState<string>('')

    //Filter y Busqueda
    const Filter = () => {
        return state.filter((item: any) => (item.type == categoryValues || categoryValues == 'Todos') && 
        item.title.toLowerCase().includes(busqueda))
    }
  
    //Select dinamico
    const unique = [...new Set(state?.map((item: any) => item?.type))]


    const handleChange = (e: any) => {
        setCategoryValues(e.target.value)
    }



    return (
        <>
            <div className={style.container_title}>
                <h1>Mis notas</h1>
            </div>
            <br />
            <div className={style.filters}>
                <input
                    className={style.filters_search}
                    type="text"
                    placeholder="Que desea buscar ?"
                    onChange={(e: any) => {
                        setBusqueda(e.target.value)
                    }}
                />
                <select
                    className={style.filters_select}
                    name=""
                    id=""
                    onChange={handleChange}
                >
                    <option value="Todos">Todos</option>
                    {unique.map((item: any, key) => (
                        <option key={key} value={item}>{item}</option>
                    ))}
                </select>
                <>
                <CreateNote />
                </>
            </div>
            <br />
                <List note={Filter()} />
        </>
    )
}   