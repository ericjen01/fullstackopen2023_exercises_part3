const Notification = ({message}) =>(
    message===null
    ? null 
    : <h4 className={ message.type === "error"
          ? "error" 
          : "notification"}>{message.content}
      </h4>
  )

export default Notification