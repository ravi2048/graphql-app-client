import { useQuery } from "@apollo/client";
import ClientRow from "./ClientRow";
import { GET_CLIENTS } from "../../queries/clientQueries";
import "./Clients.css";
import { useState } from "react";
import Modal from "./Modal.jsx";

export default function Clients() {
  const [showModal, setShowModal] = useState(false);
  const { loading, error, data } = useQuery(GET_CLIENTS);
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Something went wrong!!</p>;
  }

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <div className='clients-table'>
        <div className="clients-section-header">
          <h2>Clients Info</h2>
          <div className='add-client'>
            <button onClick={toggleModal} style={{cursor:"pointer"}}>Add Client</button>
          </div>
          { showModal && <Modal setShowModal={setShowModal}/>}
        </div>
        {!loading && !error && (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.clients.map((client) => (
                <ClientRow client={client} key={client.id} />
              ))}
            </tbody>
          </table>
        )}
        <br/>
        <br/>
      </div>
    </>
  );
}
