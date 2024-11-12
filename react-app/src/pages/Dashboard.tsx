import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchApplications } from '../features/applicationListSlice';
import { RootState, AppDispatch } from '../store';
import { useNavigate } from 'react-router-dom';
import { StatusEnum } from '../enums/StatusEnum';
import { clearApplicationState } from '../features/applicationSlice';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch<AppDispatch>();
  const { applications, loading, error } = useSelector(
    (state: RootState) => state.applicationList
  );

  useEffect(() => {
    dispatch(fetchApplications());
  }, [dispatch]);

  const handleRowClick = (id: number) => {
    navigate(`/application/edit/${id}`);
  };

  const handleCreateNew = () => {
    dispatch(clearApplicationState());
    navigate(`/application/create`);
  };

  return (
    <div className="bg-gray-light min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-primary-dark">Dashboard</h1>
          <button
            onClick={handleCreateNew}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition duration-150"
          >
            <svg
              className="-ml-1 mr-2 h-5 w-5 text-white"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            Create New Application
          </button>
        </div>
        <div className="overflow-x-auto bg-white shadow-md rounded-lg border border-gray-200">
          {loading ? (
            <p className="p-4 text-center text-primary-dark">Loading...</p>
          ) : error ? (
            <p className="p-4 text-center text-red-600">Error: {error}</p>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-primary-light">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-dark uppercase tracking-wider">
                    Serial Number
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-dark uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-dark uppercase tracking-wider">
                    License Number
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-dark uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {applications.map((app, index) => (
                  <tr
                    key={app.id}
                    onClick={() =>
                      app.status === StatusEnum.InProgress &&
                      handleRowClick(app.id)
                    }
                    className={`hover:bg-gray-100 transition duration-150 ease-in-out ${
                      app.status === StatusEnum.InProgress
                        ? 'cursor-pointer'
                        : ''
                    }`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-center text-gray-dark">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-dark">
                      {app.first_name + ' ' + app.last_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-dark">
                      {app.license_number}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          app.status === StatusEnum.Submitted
                            ? 'bg-green-100 text-green-800'
                            : app.status === StatusEnum.InProgress
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {app.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
