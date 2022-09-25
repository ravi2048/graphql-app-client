import  './ClientInfo.css';

export default function ClientInfo({client}) {
    return(
        <div className="client-info">
            <h2>Name: {client.name} <br/>Email: {client.email} <br/>Phone: {client.phone} </h2>
        </div>
    )
}