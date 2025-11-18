import { NavLink } from "react-router";
import type { IMyNavLinkProps } from "./componentsinerfaces";

const MyNavLink: React.FC<IMyNavLinkProps> = ({
  to,
  label,
  Icon,
  ...props
}) => {
  return (
    <NavLink
      to={to}
      replace={true}
      className={({ isActive }) => {
        return isActive
          ? "bg-blue-400/10 rounded-lg text-blue-400 nav-link"
          : "nav-link";
      }}
      {...props}
    >
      <Icon className="pr-1 w-8 h-8 align-top justify-self-start" />{" "}
      <div className="flex items-center">{label}</div>
    </NavLink>
  );
};

export default MyNavLink;
