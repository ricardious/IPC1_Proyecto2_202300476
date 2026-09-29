import { get } from "react-hook-form";
import { getUsersRequest, deleteUserRequest } from "../api/auth";
import { useEffect, useState, Fragment } from "react";
import ModalWindow from "./ModalWindow";


function Table({ onOpenModal }) {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [validateDelete, setValidateDelete] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showModal, setShowModal] = useState(false);


    useEffect(() => {
        getUsersRequest()
            .then((res) => {
                console.log(res)
                setUsers(res.data);
            })
            .catch((error) => console.error(error));
    }, [validateDelete]);



    const deleteUser = (carnet) => {
        deleteUserRequest(carnet)
            .then(res => {
                setValidateDelete(() => !validateDelete)
            })
            .catch(error => console.error("Error al eliminar el usuario:", error));
    };

    const handleButtonClick = () => {
        // Invertir el estado del modal
        if (onOpenModal) {
            onOpenModal(current => !current); // Invertimos el estado actual del modal
        }
    };


    const viewUser = user => {
        setSelectedUser(user);
    };


    const handleClose = () => {
        setSelectedUser(null);
    };

    const handleLogout = () => {
        removeCookie('usuario');
        navigate('/login');
    };


    return (
        <Fragment>
            <div className="flex items-center h-10vh w-full bg-gray-900 justify-end px-5">
                <button className="btn btn-outline-info" onClick={handleLogout}>
                    Logout
                </button>
            </div>
            <div className="flex justify-center mt-8">
                <div className="table-container overflow-auto max-h-96">
                    <table className="w-full max-w-4xl bg-slate-800 bg-opacity-80 border border-slate-400 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm relative">
                        <thead className="bg-transparent">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Carnet</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Last Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Gender</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="bg-transparent divide-y divide-gray-700">
                            {users.slice(1).map(user => (
                                <tr key={user.carnet} className="hover:bg-gray-700 hover:bg-opacity-30">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-300">{user.carnet}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{user.nombres}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{user.apellidos}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{user.genero}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button 
                                        className="bg-red-500 bg-opacity-80 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2" 
                                        onClick={() => {handleButtonClick}}
                                        >
                                            Delete
                                        </button>
                                        <button className="bg-yellow-500 bg-opacity-80 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded" onClick={() => viewUser(user)}>
                                            Ver
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {selectedUser && (
                        <Modal show={true} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Detalles del Usuario</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <p>
                                    <strong>Carnet:</strong> {selectedUser.carnet}
                                </p>
                                <p>
                                    <strong>Nombre:</strong> {selectedUser.nombre}
                                </p>
                                <p>
                                    <strong>Apellido:</strong> {selectedUser.apellido}
                                </p>
                                <p>
                                    <strong>Edad:</strong> {selectedUser.edad}
                                </p>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Cerrar
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    )}
                </div>
                    
            </div>

        </Fragment>
    )
}

export default Table;