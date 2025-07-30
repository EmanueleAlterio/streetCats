import React from 'react';
import Navbar from '../../components/Navbar/navbar';

function Home() {
  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <h1 className="text-center mb-4">Benvenuto su StreetCats!</h1>
        <p className="lead text-center">
          Qui puoi segnalare avvistamenti di gatti randagi e scoprire storie e foto di tanti amici felini.
        </p>
        <div className="d-flex justify-content-center">
          <button className="btn btn-primary btn-lg">Inserisci un nuovo gatto</button>
        </div>
      </div>
    </>
  );
}

export default Home;
