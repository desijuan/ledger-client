import { Link } from 'react-router-dom';

const Home = () => (
  <div className='container text-center'>
    <h1 className='my-4'>Ledger app</h1>
    <Link to='/new-group' className='btn btn-primary btn-lg'>
      New group
    </Link>
  </div>
);

export default Home;
