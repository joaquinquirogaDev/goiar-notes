import { useLocation, useNavigate } from "react-router-dom"
import './Details.css'

export default function Details() {
    const location = useLocation()?.state?.itemNote
    const navigate = useNavigate()

    //ShortText para descripcion
    const shortText = function (text: string) {
        let newText = text?.substring(0, 160);
        newText = newText?.charAt(0)?.toUpperCase() + newText?.slice(1);
        return text?.length && text?.length > 160 ? newText + "..." : (!text?.length) ? "" : newText
    };

    return (
        <>
            <h1>La nota es {location.title}</h1>
            <div className="container_details">

                <div className="card_details">
                    <div className="header_details">
                        <span className="icon_details">
                            <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path clipRule="evenodd" d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z" fillRule="evenodd"></path>
                            </svg>
                        </span>
                        <p className="alert_details">{location?.title}</p>
                    </div>

                    <p className="message_details">
                        {shortText(location?.description)}
                    </p>
                    <p className="message_details">
                        {location?.type}
                    </p>
                    <p className="message_details">
                        {location?.date?.substring(0, 10)}
                    </p>
                    <div className="actions_details">
                        <button
                            className="btnOrangeMini"
                            onClick={() => navigate(-1)}
                        >
                            Atras
                        </button>
                    </div>
                </div>
            </div>

        </>
    )
}