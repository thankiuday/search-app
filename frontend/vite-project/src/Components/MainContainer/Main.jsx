import React from 'react';

const Main = ({ results }) => {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-12">
          {/* Scrollable container */}
          <div
            className="results-container"
            style={{ height: '500px', overflowY: 'scroll', border: '1px solid #ccc', borderRadius: '5px', padding: '10px' }}
          >
            {results.length > 0 ? (
              results.map((item, index) => (
                // Change the column size to 12 to make full width
                <div key={index} className="col-12 mb-3">
                  <div className="card" style={{ width: '100%' }}> {/* Set width to 100% */}
                    <div className="card-body">
                      <h5 className="card-title">{item.title}</h5>
                      {console.log(item)}
                      {item.type === 'YouTube' ? (
                        <>
                          <p><strong>Views:</strong> {item.views ? item.views : 'N/A'}</p>
                          <p><strong>Likes:</strong> {item.likes ? item.likes : 'N/A'}</p>
                          <a href={item.link} className="btn btn-danger" target="_blank" rel="noopener noreferrer">Watch on YouTube</a>
                        </>
                      ) : (
                        <a href={item.link} className="btn btn-primary" target="_blank" rel="noopener noreferrer">Read Article</a>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className='fw-bold fs-3'>No results found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
