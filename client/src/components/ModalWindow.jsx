import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

function ModalWindow({ children, show, onClose, title = "Details" }) {
    return (
        <>
            {show &&
                <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black bg-opacity-50 p-4" onClick={onClose}>
                    <div
                        className="w-full max-w-lg rounded-lg bg-themify-bg p-6 shadow-lg"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="mb-4 flex items-center justify-between border-b border-themify-border pb-3">
                            <h3 className="text-lg font-semibold text-blue-500">{title}</h3>
                            <button
                                className="flex h-8 w-8 items-center justify-center rounded-full text-blue-500 transition duration-300 hover:bg-themify-bgSoft"
                                onClick={onClose}
                            >
                                <CloseRoundedIcon />
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
