import { NavLink } from 'react-router-dom';

export const Navbar = () => {
  return (
    <div
      className="fixed top w-full text-left flex flex-row gap-4
    p-4"
    >
      <NavLink to="/" className="text-white text-xs">
        Daily
      </NavLink>
      <NavLink to={'/seed'} className="text-white text-xs">
        Seeded
      </NavLink>
    </div>
  );
};
