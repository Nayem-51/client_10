import React from 'react';

function MyImports() {
  return (
    <div className="py-6">
      <h1 className="text-3xl font-bold mb-6">My Imports</h1>
      
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Origin</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Placeholder data */}
            {[1, 2, 3, 4].map((item) => (
              <tr key={item}>
                <th>{item}</th>
                <td>Import Product {item}</td>
                <td>200 units</td>
                <td>Country {item}</td>
                <td>
                  <span className="badge badge-info">In Transit</span>
                </td>
                <td>
                  <div className="flex gap-2">
                    <button className="btn btn-xs btn-info">View</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MyImports;

