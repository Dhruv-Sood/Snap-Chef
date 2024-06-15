import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
const Modal = ({id, content }) => {
  return (
    <>
      <button className="btn" onClick={() => document.getElementById(`my_modal_${id}`).showModal()}>Expand</button>
      <dialog id={`my_modal_${id}`} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">

          <p className="max-h-[400px] py-4 text-black overflow-y-scroll">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {content}
            </ReactMarkdown>
          </p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  )
}
export default Modal