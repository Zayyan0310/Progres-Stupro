import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react'
import PropTypes from 'prop-types';

const Modal = ({ title, open, addButton }) => {

    return (
        <Transition show={open}>
            <Dialog className="relative z-10" onClose={() => open}>
                <TransitionChild
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </TransitionChild>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <TransitionChild
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <div className="text-sky-400 text-[24px] font-bold font-['Poppins'] px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    {title}
                                </div>
                                <div className="bg-gray-50 px-4 py-3 flex flex-row gap-4 justify-end sm:px-6">
                                    {addButton}
                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}

Modal.propTypes = {
    title: PropTypes.string.isRequired,
    open: PropTypes.bool,
    addButton: PropTypes.element,
    type: PropTypes.string,
};

export { Modal };
