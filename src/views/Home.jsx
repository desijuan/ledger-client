import { Link } from "react-router-dom";

const Home = () => (
  <div className="container my-3">
    <div className="card mx-auto shadow-sm">
      <div className="card-body text-center">
        <div className="my-3">
          <h1 className="mb-4">Ledger App</h1>
          <Link to="/new-group" className="btn btn-primary btn-lg">
            New group
          </Link>
        </div>
      </div>
    </div>
  </div>
);

export default Home;
