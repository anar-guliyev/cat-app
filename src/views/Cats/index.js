import React from "react";

export const Cats = () => {
  const [cats, setCats] = React.useState([]);
  const [selectedCat, setSelectedCat] = React.useState(null);

  const loadData = () => {
    fetch("cats.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(async (response) => {
        return await response.json();
      })
      .then((data) => {
        const seen = new Set();

        const filteredArr = data.filter((el) => {
          const duplicate = seen.has(el?.name);
          seen.add(el?.name);
          return !duplicate && Object.getOwnPropertyNames(el).length !== 0;
        });

        setCats(filteredArr);
      });
  };

  React.useEffect(() => {
    loadData();
  }, []);

  return (
    <section className="container w-100">
      <div className="row w-100">
        {cats.length > 0 &&
          cats.map((cat, key) => (
            <div
              className="col-12 col-sm-6 col-md-4 text-center my-2"
              key={key}
            >
              <div className="d-flex flex-column align-items-center justify-content-center w-100 h-100">
                <img src={cat.image} alt={cat.name} />
                <h3>{cat.name}</h3>
                <button
                  type="button"
                  className="btn btn-primary mt-auto"
                  data-toggle="modal"
                  data-target="#moreInfo"
                  onClick={() => setSelectedCat(cat)}
                >
                  More info
                </button>
              </div>
            </div>
          ))}
      </div>
      <div
        className="modal fade"
        id="moreInfo"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title text-center" id="exampleModalLabel">
                {selectedCat?.name}
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={() => setSelectedCat(null)}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body d-flex flex-column align-items-center justify-content-center">
              <img src={selectedCat?.image} alt={selectedCat?.name} />
              <p>{selectedCat?.description}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
