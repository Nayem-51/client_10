import React from 'react';
import { Link } from 'react-router-dom';

function MyExports() {
  return (
    <div className="py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Exports</h1>
        <Link to="/add-export" className="btn btn-primary">
          + Add New Export
        </Link>
      </div>
      
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Destination</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Placeholder data */}
            {[1, 2, 3].map((item) => (
              <tr key={item}>
                <th>{item}</th>
                <td>Export Product {item}</td>
                <td>100 units</td>
                <td>Country {item}</td>
                <td>
                  <span className="badge badge-success">Active</span>
                </td>
                <td>
                  <div className="flex gap-2">
                    <button className="btn btn-xs btn-info">Edit</button>
                    <button className="btn btn-xs btn-error">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty state if no exports */}
      {/* <div className="text-center py-12">
        <p className="text-2xl mb-4">No exports yet</p>
        <Link to="/add-export" className="btn btn-primary">
          Create Your First Export
        </Link>
      </div> */}
    </div>
  );
}

export default MyExports;

