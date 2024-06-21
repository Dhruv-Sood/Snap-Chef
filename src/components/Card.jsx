const Card = ({btn,desc,title}) => {
  return (
      <div className="card  bg-base-100 shadow-xl image-full h-[252px] max-w-[357px]">
          <figure className=" overflow-hidden"><img src="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ2hkcXY1cnMxZW1jcjFuZmYzejhwMWNqZGF3Mmdhdnd2emJlOTJjMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/jKaFXbKyZFja0/giphy.gif" className="w-[800px]"/></figure>
          <div className="card-body">
              <h2 className="card-title">{title}</h2>
              <p className="h-[120px]">{desc}nkjdbkdbcsbc</p>
              <div className="card-actions justify-end">
                  <button className="btn btn-primary">{btn}</button>
              </div>
          </div>
      </div>
  )
}
export default Card