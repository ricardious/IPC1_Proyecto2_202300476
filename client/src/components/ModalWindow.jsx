import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

function ModalWindow({ children, show, onClose }) {
    return (
        <>
            {show &&
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="w-96 bg-white rounded-lg shadow-lg p-8">
                        <div className="flex justify-between items-center pb-3 mb-4 border-b border-gray-200">
                            <h3 className="font-semibold text-lg text-blue-500">titulo</h3>
                            <button className="w-8 h-6 border border-transparent rounded-full text-blue-500 transition duration-300 hover:bg-gray-200 flex items-center justify-center">
                                <CloseRoundedIcon className="w-full h-full" />
                            </button>
                        </div>
                        {children}
                    </div>
                </div>
            }
        </>
    );
}

export default ModalWindow;
