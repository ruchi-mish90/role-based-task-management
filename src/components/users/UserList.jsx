import AssignManager from './AssignManager';

const UserList = ({ users, managers, onAssign }) => {
  return (
    <section className="user-list fade-up">
      {users.map((user) => (
        <article className="user-card" key={user.id}>
          <div>
            <h4>{user.name}</h4>
            <p>{user.email}</p>
          </div>

          <AssignManager user={user} managers={managers} onAssign={onAssign} />
        </article>
      ))}
    </section>
  );
};

export default UserList;
