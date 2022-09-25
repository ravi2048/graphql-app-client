import { useMutation } from '@apollo/client';
import { DELETE_CLIENT } from '../../mutations/clientMutations';
import { GET_CLIENTS } from '../../queries/clientQueries';
// import {FaTrash} from 'react-icons/fa';

export default function ClientRow({client}){
    const [deleteClient] = useMutation(DELETE_CLIENT, {
        variables: { id: client.id },
        refetchQueries: [ { query: GET_CLIENTS } ]
    });

    // console.log(`deleteClient: ${JSON.stringify(deleteClient)}`);
    // console.log(`data: ${JSON.stringify(data)}`);
    return(
        <tr>
            <td>{client.name}</td>
            <td>{client.email}</td>
            <td>{client.phone}</td>
            <td>
                <button onClick={deleteClient} style={{cursor:'pointer'}}>
                    Delete
                </button>
            </td>
        </tr>
    )
}