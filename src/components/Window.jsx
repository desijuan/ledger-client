const Window = ({ title, children }) => (
  <div className='container my-3'>
    <div className='card mx-auto'>
      <div className='card-header'>{title}</div>
      <div className='card-body'>{children}</div>
    </div>
  </div>
);

export default Window;
