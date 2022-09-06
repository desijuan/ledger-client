const Loading = () => (
  <div className='d-flex align-items-center justify-content-between'>
    <span>Loading...</span>
    <div
      className='spinner-border spinner-border-sm'
      role='status'
      aria-hidden='true'
    ></div>
  </div>
);

export default Loading;
