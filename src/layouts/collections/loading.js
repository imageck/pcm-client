export default function Loading({ n }) {
  let cards = [];
  for (let i = 0; i < n; i++)
    cards.push(
      <div className="col col-sm-6" key={i}>
       <div className="card h-100 shadow">
        <svg width="100%"
             height="180"
             xmlns="http://www.w3.org/2000/svg"
             className="card-img-top rounded-top-2 w-100 object-fit-contain">
         <rect width="100%" height="100%" fill="#6c757d" />
        </svg>
        <div className="card-body">
         <h5 className="card-title link-primary placeholder-glow">
          <span className="placeholder col-4"></span>&nbsp;
          <span className="placeholder col-5"></span>&nbsp;
          <span className="placeholder col-3"></span>&nbsp;
          <span className="placeholder col-8"></span>&nbsp;
         </h5>
         <p className="card-text placeholder-glow">
          <span className="placeholder col-7"></span>&nbsp;
          <span className="placeholder col-4"></span>&nbsp;
          <span className="placeholder col-4"></span>&nbsp;
          <span className="placeholder col-6"></span>&nbsp;
          <span className="placeholder col-8"></span>
         </p>
        </div>
        <div className="card-footer placeholder-wave">
         <small className="text-muted placeholder w-100"></small>
        </div>
       </div>
      </div>
    );
  return (
    <div className="row row-cols-1 row-cols-md-3 g-4">
     {cards}
    </div>
  );
}
