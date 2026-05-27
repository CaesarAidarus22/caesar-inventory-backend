import { useEffect, useState } from "react";
import api from "../../services/api";

const Users = () => {

  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {

    try {

      const response = await api.get("/users");

      setUsers(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    fetchUsers();

  }, []);

  return (

    <div>

      {/* HEADER */}
      <div className="mb-8">

        <h1 className="text-4xl font-bold text-slate-800">
          Users
        </h1>

        <p className="text-slate-500 mt-2">
          Manage system users
        </p>

      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">

        <table className="w-full">

          <thead className="bg-slate-50">

            <tr>

              <th className="text-left p-5">
                User
              </th>

              <th className="text-left p-5">
                Email
              </th>

              <th className="text-left p-5">
                Created
              </th>

            </tr>

          </thead>

          <tbody>

            {users.map((user) => (

              <tr
                key={user.id}
                className="border-t border-slate-100"
              >

                {/* USER */}
                <td className="p-5">

                  <div className="flex items-center gap-3">

                    <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">

                      {user.initials}

                    </div>

                    <span className="font-medium text-slate-700">
                      {user.fullName}
                    </span>

                  </div>

                </td>

                {/* EMAIL */}
                <td className="p-5 text-slate-600">
                  {user.email}
                </td>

                {/* CREATED */}
                <td className="p-5 text-slate-500">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

};

export default Users;