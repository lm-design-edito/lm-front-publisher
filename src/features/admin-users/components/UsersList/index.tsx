import Loader from "../../../../components/Loader";
import { useUsersList } from "../../api/use-users-list";

const UsersList = () => {
  const { list, isLoading } = useUsersList();

  if (isLoading) {
    return <Loader />
  }
  
  return (
    <div>
      {!list.length && (
        <p>Pas d'utilisateurs trouvés.</p>
      )}

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {list.length > 0 && list.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Add your users list implementation here */}
    </div>
  );
}
export default UsersList;