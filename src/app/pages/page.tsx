import exp from "constants";

const Pages = ({
  id,
  name,
  age,
  address,
}: {
  id: number;
  name: string;
  age: number;
  address: Text;
}) => {
  return <Dashboard role="user"/>;
};

export default Pages;

const Dashboard = ({ role }:{role:string}) => {
  return (
    <div>
      {
        {
          admin: <AdminDashboard />,
          user: <UserDashboard />,
        }[role] ?? <NotFound/>
      }
    </div>
  );
};

function AdminDashboard() {
  return <div>Admin Dashboard</div>;
}
function UserDashboard() {
  return <div>User Dashboard</div>;
}
function NotFound() {
  return <div>NotFound</div>;
}
