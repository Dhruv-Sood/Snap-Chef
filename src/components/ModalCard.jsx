import Modal from "./Modal"
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
const ModalCard = ({id,note}) => {

   

  return (
      <div className="card w-96 bg-base-100 shadow-xl image-full">
          <figure className=" overflow-hidden"><img src="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ2hkcXY1cnMxZW1jcjFuZmYzejhwMWNqZGF3Mmdhdnd2emJlOTJjMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/jKaFXbKyZFja0/giphy.gif" className="w-[800px]" /></figure>
          <div className="card-body">
              {/* <h2 className="card-title">{title}</h2> */}
              <p className="h-[200px] overflow-hidden">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {note.content}
                  </ReactMarkdown>
              </p>
              <div className="card-actions justify-end">
                  {/* <button className="btn btn-primary">{btn}</button> */}
                  <Modal content={note.content} id={id}/>
              </div>
          </div>
      </div>
  )
}
export default ModalCard