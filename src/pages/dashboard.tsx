const Dashboard = () => {
//   const { products } = useProducts();
const products : any = []
  return (
    <section aria-label="Product List" className="product-list-section">
      <div className="slide-view-product">
        <div className="slide-track">
          {/* <img className="slide-img delay-0" src={scroll1} alt="scroll 1" />
          <img className="slide-img delay-1" src={scroll2} alt="scroll 2" />
          <img className="slide-img delay-2" src={scroll3} alt="scroll 3" />
          <img className="slide-img delay-3" src={scroll4} alt="scroll 4" />
          <img className="slide-img delay-4" src={scroll5} alt="scroll 5" /> */}
        </div>
      </div>

      <div className="new-content">
        <strong>
          <h1>WHAT'S SPECIAL</h1>
        </strong>
        <hr className="line"></hr>
        <b>
          <p>FOR TODAY?</p>
        </b>
      </div>

      <div className="new-content1">
        <div className="newd"></div>
      </div>
      <br />
      <div className="arrivals">
        <h1 style={{ width: "92%" }}>NEW ARRIVALS</h1>
      </div>
      <div className="content-grid">
        <div className="appointment-requests">
          <div className="section-header">
            <h2>Fashion</h2>
            <button className="view-all-btn">View All</button>
          </div>

          <div className="appointment-list">
            {products.slice(0,7).map((p:any) => (
              <div key={p} className="appointment-item">
                <div className="patient-info">
                  <img
                    className="w-full h-40 object-cover mb-2 rounded"
                    src={p.image}
                  ></img>
                  <h4>{p.name}</h4>
                  <p>₹{p.price}</p>
                </div>
              </div>
              // <article
              //   className="bg-white p-4 rounded shadow"
              //   style={{ backgroundColor: "seashell" }}
              // >
              //   <img
              //     className="w-full h-40 object-cover mb-2 rounded"
              //     src={p.image}
              //     style={{width:"50px"}}
              //   ></img>
              //   <p className="text-gray-700">{p.price}</p>
              //   <p className="text-gray-700">{p.name}</p>
              //   <Button
              //     className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              //     style={{ backgroundColor: "black" }}
              //     //   onClick={() => navigate(`/watchpage/${p.id}`)}
              //   >
              //     View Product
              //   </Button>
              // </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
