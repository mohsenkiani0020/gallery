
import CloseIcon from '../assets/Icons/CloseIcon';

interface ModalProps {
    handleAddImage : (url : string) => void
}

const Modal = ({handleAddImage}:ModalProps) => {


    // handle Add Image
    const handleAddImages = (e : React.FormEvent<HTMLFormElement> ) : void => {
        e.preventDefault();
        const imageUrl =  e.currentTarget["inputImage"].value
        if (!imageUrl) return
        handleAddImage(imageUrl)
    }

  return (
    <>
      <button data-modal-target="popup-modal" data-modal-toggle="popup-modal" className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
        Add Image
      </button>

      <div id="popup-modal" tabIndex={-1} className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button type="button" className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal">
              <CloseIcon color='red'/>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="p-4 md:p-5 text-center">
                <h2 className='mb-5 font-semibold text-2xl'>Please Add Image </h2>
                <form onSubmit={(e)=>handleAddImages(e)} className='flex flex-col gap-5 justify-center items-center'>
                    <input name='inputImage' type="text" className='w-full'/>
                    <button className='bg-blue-500 w-32 h-8 rounded-lg text-white' type='submit'>Add</button>
                </form>       
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
