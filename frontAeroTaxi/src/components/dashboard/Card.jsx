function Card({ title, value }) {
  return (
    <div className="col-md-4 mb-3">
      <div className="card text-center bg-dark text-light shadow-sm h-100">
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text display-6 text-white">{value}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
